var ping = require('ping');
var fs = require('fs');

function log(log) {
    datum = new Date;
    sekunde = datum.getSeconds();
    minute = datum.getMinutes();
    stunde = datum.getHours();
    tag = datum.getDate();
    monat = datum.getMonth() + 1;
    jahr = datum.getFullYear();
    zeilenbeginn = "[" + tag + ":" + monat + ":" + jahr + ":" + stunde + ":" + minute + "] "
    fs.appendFile('log.txt', zeilenbeginn + log + "\n", (err) => {
        if (err) throw err;
    });
    console.log(log);
}

var hosts = ['fritz.box', '8.8.8.8'];
hosts.forEach(function(host) {
    ping.sys.probe(host, function(isAlive) {
        var msg = isAlive ? 'host: ' + host + ' is alive' : 'host ' + host + ' is dead';
        if (msg.includes("is dead")) {
            log(msg);
        }
    });
});