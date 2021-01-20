const app = require("express")()
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const expressWs = require('express-ws')(app)

let port = 8888;

function generateCSV(array){

    let myArrayOfStrings = array.split(',');
    let arrayOfValues = myArrayOfStrings.map(function(x) {
        return {value:parseInt(x)}
    });

    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            {id: 'value', title: 'Value'}
        ]
    });

    csvWriter
        .writeRecords(arrayOfValues)
        .then(()=> console.log('The CSV file was written successfully'));
}

app.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg)
        if(msg.length > 100){
            generateCSV(msg)
        }
        ws.send(msg);
    });
});

app.listen(port, (err) =>{
    if(!err)
        console.log("Server is listening at port " + port );
})
