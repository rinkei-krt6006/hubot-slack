'use strict';
//const directory = "/home/ubuntu/workspace/aaa/train-delay"
var fs = require('fs');

///////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = (robot) => {
    robot.hear(/オーム/i, (msg) => {
        let output = "";
        let text = msg.message.text;
        text = text.split(",");

        let dennatsu = text[1];
        let dennryuu = text[2]; 
        let teikou = text[3];

        output += ' 電圧 ' + dennryuu*teikou + ' V ';
        output += ' 抵抗 ' + dennatsu/dennryuu + ' Ω ';
        output += ' 電流 ' + dennatsu/teikou + ' A ';
        output += ' 電力 ' + dennryuu*dennatsu + ' W ';
        return send('#test_1',output);
    })

    var send = function (channel, msg) {
        return robot.send({
            room: channel
        }, msg);
    };

    robot.hear(/抵抗/i, (msg) => {

        let text = msg.message.text;
        text = text.split(",");
    
        const heire0 = text[1]
        const heire1 = text[2]
        const heire2 = text[3]
        const heire3 = text[4]
        const heire4 = text[5]
        const heire5 = text[6]
        const heire6 = text[7]
        const heire7 = text[8]
        const heire8 = text[9]
        const heire9 = text[10]
    
        let heiretsu0 = '';
        let heiretsu1 = '';
        let heiretsu2 = '';
        let heiretsu3 = '';
        let heiretsu4 = '';
        let heiretsu5 = '';
        let heiretsu6 = '';
        let heiretsu7 = '';
        let heiretsu8 = '';
        let heiretsu9 = '';
console.log(heire9)
            /*
        const heire0 = hei0.value;
        const heire1 = hei1.value;
        const heire2 = hei2.value;
        const heire3 = hei3.value;
        const heire4 = hei4.value;
        const heire5 = hei5.value;
        const heire6 = hei6.value;
        const heire7 = hei7.value;
        const heire8 = hei8.value;
        const heire9 = hei9.value;
*/
        if(  heire0 === undefined) {heiretsu0 = 0 }else{ heiretsu0 = 1/(heire0)};
        if(  heire1 === undefined) {heiretsu1 = 0 }else{ heiretsu1 = 1/(heire1)};
        if(  heire2 === undefined) {heiretsu2 = 0 }else{ heiretsu2 = 1/(heire2)};
        if(  heire3 === undefined) {heiretsu3 = 0 }else{ heiretsu3 = 1/(heire3)};
        if(  heire4 === undefined) {heiretsu4 = 0 }else{ heiretsu4 = 1/(heire4)};
        if(  heire5 === undefined) {heiretsu5 = 0 }else{ heiretsu5 = 1/(heire5)};
        if(  heire6 === undefined) {heiretsu6 = 0 }else{ heiretsu6 = 1/(heire6)};
        if(  heire7 === undefined) {heiretsu7 = 0 }else{ heiretsu7 = 1/(heire7)};
        if(  heire8 === undefined) {heiretsu8 = 0 }else{ heiretsu8 = 1/(heire8)};
        if(  heire9 === undefined) {heiretsu9 = 0 }else{ heiretsu9 = 1/(heire9)};
        console.log(heire9)
        var heiretsu = 1/(heiretsu0 + heiretsu1+heiretsu2+heiretsu3+heiretsu4+heiretsu5+heiretsu6+heiretsu7+heiretsu8+heiretsu9 )
        if(  heiretsu === Infinity ) {heiretsu = 0 }else{ heiretsu = ( heiretsu )};
                return send('#test_1',heiretsu);
    })
}

