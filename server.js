var fs = require('fs');

var StoreData = fs.readFileSync('Stores.json');

var Stores = JSON.parse(StoreData);

console.log('Staring Server');

var express = require('express');
const { finished } = require('stream');

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

    Stores[Item] = Num;
        var data = JSON.stringify(Stores, null, 2);
        fs.writeFile('Stores.json', data, finished);

            function finished(err) {
                console.log('Incomming ');
                var reply = {
                    Status: 'Success',
                    Item: Item,
                    Quantity: Num
                }
                
                response.send(reply);
                console.log(reply);
            }
}

    /*if (!Num) {

        var reply = {
            msg: "Number of items is required."
        }
        response.send(reply);
    } else {*/

app.get('/all', sendStores);

function sendStores(request, response) {
    response.send(Stores);
}

app.get('/search/:Item/', InsideBox);

function InsideBox(request, response) {
    var Item = request.params.Item;
    var reply;
    console.log('Someone be snoopin');
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