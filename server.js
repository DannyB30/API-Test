var fs = require('fs');
var express = require('express');

var StoreData = fs.readFileSync('MainStorage.Json');

var Stores = JSON.parse(StoreData);

var port = (3000);

console.log('Staring Server');

const { finished } = require('stream');

var app = express();

var Server = app.listen(port, listening);

function listening() {
    console.log("listening port ", port, "......");
}

app.use(express.static('Room'));

//All get commands
app.get('/Add/:Loc/:Item/:Num?', AddToBox);
app.get('/all', sendStores);
app.get('/search/:Item/', InsideBox);
app.get('/Ping', Pogges);


function AddToBox(request, response) {
    var data = request.params;
    var Loc = data.Loc;
    var Item = data.Item;
    var Num = Number(data.Num);

    Stores[Item] = Num;
        var data = JSON.stringify(Stores, null, 2);
        fs.writeFile('Stores.json', data, finished);

            function finished(err) {
                console.log('Incoming ');
                var reply = {
                    Status: 'Success',
                    Item: Item,
                    Quantity: Num
                }
                
                response.send(reply);
                console.log(reply);
            }
}

function sendStores(request, response) {
    response.send(Stores);
}

function InsideBox(request, response) {
    var Item = request.params.Item;
    var reply;
    console.log('Someone be snooping');
    if (Stores[Item]) {

        reply = {
            Status: 'found', Item: Item, Number: Stores[Item],
        }

        console.log(reply);

    } else {

        reply = {
            Status: 'Not Found',
            Item: Item
        }
        
        console.log('Dead');
    }
    
    response.send(reply);
}

function Pogges(request, response) {

    reply = {
        Pogchamp
    }

    response.send(reply);
    console.log('ping');

}