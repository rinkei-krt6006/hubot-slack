'use strict';
const directory = "/home/rinkei/program/hubot/"
var fs = require('fs');
let point = ""

///////////////////////////////////////////////////////
//チンチロリン
const dise = [1, 2, 3, 4, 5, 6]
const yaku = ["ヒフミ", "メナシ", "インケツ", "ニタコ", "サンタ", "シニメ", "ゴケ", "ロッポウ", "シゴロ", "アラシ(2)", "アラシ(3)", "アラシ(4)", "アラシ(5)", "アラシ(6)", "ピンゾロ"]
//0"ヒフミ",1"メナシ",2"インケツ",3"ニタコ",4"サンタ",5"シニメ",6"ゴケ",7"ロッポウ",8"シゴロ",9"アラシ(2)",10"アラシ(3)",11"アラシ(4)","12アラシ(5)","13アラシ(6)","14ピンゾロ"

function shake() {
    let temp = []
    let disenomber = []

    disenomber.push(dise[Math.floor(Math.random() * dise.length)])
    disenomber.push(dise[Math.floor(Math.random() * dise.length)])
    disenomber.push(dise[Math.floor(Math.random() * dise.length)])

    temp = disenomber.sort()
    if (temp.indexOf(4) >= 0 && temp.indexOf(5) >= 0 && temp.indexOf(6) >= 0) {
        temp = ["シゴロ", " "]
    } else {
        if (temp.indexOf(1) >= 0 && temp.indexOf(2) >= 0 && temp.indexOf(3) >= 0) {
            temp = ["ヒフミ", " "]
        } else {
            if (temp[0] === temp[1] && temp[1] === temp[2]) {
                if (temp[0] === 1) {
                    temp = ["ピンゾロ", " "]
                } else {
                    temp = ["アラシ(" + temp[0] + (")"), temp[0]]
                }
            } else {
                if (temp[0] === temp[1]) {
                    temp = [yakumei(temp[2]), temp[2]]
                } else {
                    if (temp[1] === temp[2]) {
                        temp = [yakumei(temp[0]), temp[0]]
                    } else {
                        if (temp[2] === temp[0]) {
                            temp = [yakumei(temp[1]), temp[1]]
                        } else {
                            temp = ["メナシ", " "]
                        }
                    }
                }
            }
        }
    }
    temp.push(disenomber[0])
    temp.push(disenomber[1])
    temp.push(disenomber[2])
    for (let i = 0; i < yaku.length; i++) {
        if (temp[0] === yaku[i]) {
            temp.push(i)
        }
    }
    return (temp)
}
function yakumei(temp) {
    if (temp === 1) {
        return "インケツ"
    }
    if (temp === 2) {
        return "ニタコ"
    }
    if (temp === 3) {
        return "サンタ"
    }
    if (temp === 4) {
        return "シニメ"
    }
    if (temp === 5) {
        return "ゴケ"
    }
    if (temp === 6) {
        return "ロッポウ"
    }
}

function walletread(username) {
    //TODO元のポイント取得
    let temp = ""
    let tmp = ""
    let returntemp = ""
    let csv = fs.readFileSync(directory + "data/point.csv", 'utf8')
    temp = csv.split("end")
    for (let i = 0; i < temp.length-1; i++) {
        tmp = temp[i]
        tmp = tmp.split(",")
        let nametemp = tmp[1]
        console.log(nametemp)
//        if (nametemp.match(username)) {//twitterの場合0を参照するようにする
        if (nametemp === username) {//twitterの場合0を参照するようにする
            returntemp = tmp[2].value
        }
    }
    console.log(returntemp)
    if (returntemp === undefined){
        fs.appendFileSync(directory + 'data/point.csv',"\r\n,"+username+",100,end", 'utf8')
        return 100
    }else{
        return returntemp
    }
}
function walletwrite(msg,point){
    const username = msg.message.user.name;
    const room = msg.message.user.room;
    let writetemp = ""
    let csv = fs.readFileSync(directory + "data/point.csv", 'utf8')
    let temp = csv.split("end")
    let tmp
    for (let i = 0; i < temp.length-1; i++) {
        tmp = temp[i]
        tmp = tmp.split(",")
        if (tmp[1].match(username)) {//twitterの場合0を参照するようにする
            tmp[2] = point
            writetemp += tmp
        }else{
            writetemp += tmp
        }
    }
}

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    module.exports = (robot) => {

        var send = function (channel, msg) {
            return robot.send({
                room: channel
            }, msg);
        };

        robot.hear(/チンチロ/i, (msg) => {
            let power1
            let power2
            const username = msg.message.user.name;
            point = walletread(username)
            let betpoint = msg.message.text;
            betpoint = betpoint.split(",");
            betpoint = betpoint[1]
            let temp = shake()
            let output = 'あなたのターン\r\n1回目の出目 ' + temp[2] + "," + temp[3] + "," + temp[4] + " 判定:" + temp[0]
            if (temp[0] === "メナシ") {
                temp = shake()
                output += ('\r\n2回目の出目:' + temp[2] + "," + temp[3] + "," + temp[4] + " 判定:" + temp[0]);
                if (temp[0] === "メナシ") {
                    temp = shake()
                    output += ('\r\n3回目の出目:' + temp[2] + "," + temp[3] + "," + temp[4] + " 判定:" + temp[0]);
                }
            }
            output += "\r\n判定:" + temp[0]
            power1 = temp[5]

            temp = shake()
            output += '\r\n\r\nbotのターン\r\n1回目の出目 ' + temp[2] + "," + temp[3] + "," + temp[4] + " 判定:" + temp[0]
            if (temp[0] === "メナシ") {
                temp = shake()
                output += ('\r\n2回目の出目:' + temp[2] + "," + temp[3] + "," + temp[4] + " 判定:" + temp[0]);
                if (temp[0] === "メナシ") {
                    temp = shake()
                    output += ('\r\n3回目の出目:' + temp[2] + "," + temp[3] + "," + temp[4] + " 判定:" + temp[0]);
                }
            }
            output += "\r\n判定:" + temp[0]
            power2 = temp[5]
            if (power1 > power2) {
                output += "\r\nyou win"
                if (power1 === 14) {
                    point = betpoint * 5 + point
                }
                if (power1 === 8) {
                    point = betpoint * 2 + point
                }
                if (8 < power1) {
                    point = betpoint * 3 + point
                }
                if (power1 < 8) {
                    point = betpoint * 1 + point
                }
            } else {
                if (power1 < power2) {
                    output += "\r\nyou lose"
                    if (power2 === 14) {
                        point = betpoint * -5 + point
                    }
                    if (power2 === 8) {
                        point = betpoint * -2 + point
                    }
                    if (8 < power2) {
                        point = betpoint * -3 + point
                    }
                    if (power2 < 8) {
                        point = betpoint * -1 + point
                    }

                } else {
                    if (power1 = power2) {
                        output += "\r\ndrew"
                    }
                }
            }
            output += "\r\n現在の得点は " + point + " です。"
            msg.reply(output);
            walletwrite(msg,point)
        });
    }
