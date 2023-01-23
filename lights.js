var fs = require('fs');
var express = require('express');

var LightSetting = fs.readFileSync('light.json');

var Lighty = JSON.parse(LightSetting);

var port = (8008);

console.log('Staring Server');

const { finished } = require('stream');

var app = express();

var Server = app.listen(port, listening);

function listening() {
    console.log("listening port ", port);
}

app.use(express.static('Room'));

app.get('/light', lighthouse);
app.get('/colour', colourTime);
app.get('/Set', Setting);
app.get('/ping', Ping);

function lighthouse(request, response) {
    var data = request.params;
    var lighty = data.light;

    fs.writeFile('light.json', data, finished);
        
    function finished(err) {
        reply = {
            light: lighty 
        }
    
        response.send(reply);
    }
    
}

function colourTime(request, response) {
    var data = request.params;
    var col = data.colour;

    fs.writeFile('light.json', data, finished);
    
    function finished(err) {

        reply = {
            colour: col
        }

        response.send(reply);
    }


}
function Setting(request, response) {
    response.send(lighty);
}

function Ping(request, response) {
    response.send('Pong!!!!!!');
}