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

//All get commands
app.get('/Add/:Item/:Num?', AddToBox);
app.get('/all', sendStores);
app.get('/search/:Item/', InsideBox);
app.get('/Ping', Poggers);


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

function sendStores(request, response) {
    response.send(Stores);
}

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