var ping = require('ping');
var fs = require('fs');

function log(log) {
    console.log(log);
    writablelog = log.replace(" nicht erreichbar", "")
    datum = new Date;

    sekunde = datum.getSeconds();
    if (sekunde.toString().length == 1) {
        sekunde = "0" + sekunde;
    }
    console.log("Sekunde: " + sekunde);

    minute = datum.getMinutes();
    if (minute.toString().length == 1) {
        minute = "0" + minute;
    }
    console.log("Minute: " + minute);

    stunde = datum.getHours();
    if (stunde == 25) {
        stunde = "01";
    }
    console.log("Stunde: " + stunde);

    tag = datum.getDate();
    if (tag.toString().length == 1) {
        tag = "0" + tag;
    }
    console.log("Tag: " + tag);

    monat = datum.getMonth() + 1;
    if (monat.toString().length == 1) {
        monat = "0" + monat;
    }
    console.log("Monat: " + monat);

    jahr = datum.getFullYear();
    console.log("kombiniere für Zeilenbeginn");
    zeilenbeginn = tag + "." + monat + "." + jahr + "," + stunde + ":" + minute + ":" + sekunde + ","
    console.log("schreibe Datei");
    fs.appendFile('log.csv', zeilenbeginn + writablelog + "\n", (err) => {
        if (err) throw err;
    });
    console.log("Datei geschrieben");
}
console.log("setze hosts");
var hosts = ['8.8.8.8'];
console.log("teste");
hosts.forEach(function(host) {
    ping.sys.probe(host, function(isAlive) {
        var msg = isAlive ? '' + host + ' erreichbar' : '' + host + ' nicht erreichbar';
        if (msg.includes("nicht erreichbar")) {
            log(msg);
        }
    });
});