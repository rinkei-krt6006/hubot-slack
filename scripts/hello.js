'use strict';
const directory = "/home/rinkei/program/hubot/data"
var fs = require('fs');


module.exports = (robot) => {


///////////////////////////////////////////////////////


  fs.watch( directory + '/xmldata/jrkanto-now.xml', 'utf8', function (err, text) {//JRサイトよりデータ取得
  //fs.readFile(directory + '/xmldata/jrkanto-sample-1.xml', 'utf8', function (err, text) {//テストデータ-全線平常
  //fs.readFile(directory + '/xmldata/jrkanto-sample-2.xml', 'utf8', function (err, text) {//テストデータ-水戸線運転見合わせ
  //fs.readFile( directory + '/xmldata/jrkanto-sample-3.xml', 'utf8', function (err, text) {//テストデータ-川越線遅延
  //fs.readFile( directory + '/xmldata/jrkanto-sample-4.xml', 'utf8', function (err, text) {//テストデータ-埼京線直通運転中止
    const jrkantoxml = text.split("class=\"text-tit-xlarge\">")//括弧内で分割して配列

    //----------------時間取得-----------------------
    require('date-utils');
    var dt = new Date();
    var formatted = dt.toFormat("YYYYMMDDHH24MISS");
    console.log(formatted);
    //----------------時間取得--------------------
    const jrkantoold = fs.readFileSync(directory + '/logdata/jrkanto-temp.txt', 'utf8')//古い-nowデータの取得
    fs.writeFileSync(directory + '/logdata/jrkanto-old.txt', jrkantoold, 'utf8')//古い-nowデータを-oldへ書き込み
    fs.writeFileSync(directory + '/logdata/jrkanto-temp.txt', "", 'utf8')//jrkanto-tempのリセット
    fs.appendFileSync(directory + '/logdata/jrkanto.txt', "\r\n", 'utf8')//jrkantoの改行
    fs.appendFileSync(directory + '/logdata/jrkanto.txt', formatted, 'utf8')//時間挿入
    let jrkanto = ''

    const company = "/logdata/tetsucom"
    const xmldata = text.split("class=\"text-tit-xlarge\">")//括弧内で分割して配列
    const judgment = "情報なし"
    let line = ""
    let linetemp = ""
    let linetemp2 = ""
    let linetemp3 = ""
    for (let i = 1; i < xmldata.length; i++) {
      let linetemp = ""
      let linetemp2 = ""
      let linetemp3 = ""
      let datatemp = ""
      let datatemp2 = ""
      linetemp = xmldata[i].split('class="general-anchor">');
      linetemp2 = linetemp[0].split("</th>")
      if (linetemp2[1].match("平常運転")) {
        line += linetemp2[0] + ",平常運転中,0,end"
      } else {
        datatemp = linetemp2[1].split('<td colspan="2" class="cause">');
        datatemp2 = datatemp[1].split('</td>')
        line += linetemp2[0] + "," + datatemp2[0] + ",1,end"



      }

      line += "\r\n"
    }
    console.log(line)

    console.log(jrkanto)
    fs.appendFileSync(directory + '/logdata/jrkanto.txt', line, 'utf8')
    fs.appendFileSync(directory + '/logdata/jrkanto.txt', "\r\n", 'utf8')
    fs.appendFileSync(directory + '/logdata/jrkanto-temp.txt', line, 'utf8')
    fs.appendFileSync(directory + '/logdata/jrkanto-temp.txt', "\r\n", 'utf8')
    fs.writeFileSync(directory + '/logdata/jrkanto-now.txt', line, 'utf8')
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    var send = function (channel, msg) {
        return robot.send({
            room: channel
        }, msg);
    };

    //前回の取得から情報の変化した路線を自動的に返す
    fs.watch(directory + '/logdata/jrkanto-now.txt', function (event, filename) {
        const jrkantotxtnow = fs.readFileSync(directory + '/logdata/jrkanto-now.txt', 'utf8');
        const jrkantonow = jrkantotxtnow.split("end");
        const jrkantotxtold = fs.readFileSync(directory + '/logdata/jrkanto-old.txt', 'utf8');
        const jrkantoold = jrkantotxtold.split("end");
        let temp = "";
        for (let i = 0; i < 48; i++) {
            if (jrkantonow[i].split(",")[1] === jrkantoold[i].split(",")[1]) {
            } else {
                      if (jrkantonow[i].match("平常運転")) {
                temp += jrkantonow[i].split(",")[0] + jrkantonow[i].split(",")[1] +"\r\n"
            }else{
                temp += jrkantonow[i].split(",")[1] +"\r\n"

            }}
        };
        if (temp === "") {
            console.log("全て変化なし");
        } else {
            console.log(temp)
            return send('#jr関東_遅延情報', temp);
        };
    });

    //使い方やコマンドの説明を入れる
    robot.hear(/hello/i, (msg) => {
        const username = msg.message.user.name;
        msg.send("JR東日本公式サイトの遅延情報を取得、送信するbotです。");
    });

    //JR関東全路線を返す
    robot.hear(/jr/i, (msg) => {
        const jrkantotxtnow = fs.readFileSync(directory + '/logdata/jrkanto-now.txt', 'utf8');
        const jrkantonow = jrkantotxtnow.split("end");
        let temp = "";
        for (let i = 0; i < 48; i++) {
            temp += jrkantonow[i].split(",")[0] +" "+ jrkantonow[i].split(",")[1] 
        };
        msg.send(temp);
    });

    //情報のある路線だけを返す
    robot.hear(/delay/i, (msg) => {
        const jrkantotxtnow = fs.readFileSync(directory + '/logdata/jrkanto-now.txt', 'utf8')
        const jrkantonow = jrkantotxtnow.split("end")
        let temp = "情報のある路線は以下の通りです。"
        for (let i = 0; i < 48; i++) {
            if (jrkantonow[i].split(",")[1] === "平常運転中") {
            } else {
                temp += "\r\n" + jrkantonow[i].split(",")[1] + "\r\n"
            }
        }
        if (temp === "情報のある路線は以下の通りです。") {
            msg.send("全路線平常運転中です。")
        } else {
            msg.send(temp)
        }
    });

    //情報が変化したら随時返す
    /*
     fs.watch(directory + '/logdata/jrkanto-now.txt', function(event, filename) {
         msg.send("情報変化察知")
            const jrkantotxtnow = fs.readFileSync( directory + '/logdata/jrkanto-now.txt', 'utf8')
            const jrkantonow = jrkantotxtnow.split("end")
            const jrkantotxtold = fs.readFileSync( directory + '/logdata/jrkanto-old.txt', 'utf8')
            const jrkantoold = jrkantotxtold.split("end")
            for(let i = 1; i <49; i++){
                if(jrkantonow[i].split(",")[2] === jrkantoold[i].split(",")[2]){
                }else{
                    msg.send(jrkantonow[i].split(",")[1]+jrkantonow[i].split(",")[2])
        }}})
        
     robot.hear(/delay/i, (msg) => {
    
    });
    */



};
