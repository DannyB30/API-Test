var fs = require('fs');
var Stores = fs.readFileSync('Stores.json');

console.log(Stores);

//console.log('Staring Server');

const { response, request } = require('express');
var express = require('express');

var app = express();

var Server = app.listen(3000, listening);

function listening() {
    console.log("listening port 3000......");
}

app.use(express.static('Room'));

app.get('/Add/:Item/:Num?', AddToBox);


function AddToBox(request, response) {
    var data = request.params;
    var Item = data.Item;
    var Num = Number(data.Num);
    if (!Num) {
        var reply = {
            msg: "Number of items is required."
        }
    } else {

        Stores[Item] = Num;

        var reply = {
            msg: "Has been added to stores."
        }
    }
    response.send(reply); 
}

app.get('/all', sendStores);

function sendStores(request, response) {
    response.send(Stores);
}

app.get('/search/:Item/', InsideBox);

function InsideBox(request, response) {
    var Item = request.params.Item;
    var reply;
    if (Stores[Item]) {

        reply = {
            Status: 'found', Item: Item, Num: Stores[Item]
        }

    } else {

        reply = {
            Status: 'Not Found',
            Item: Item
        }
         
    }
    
    response.send(reply);
}