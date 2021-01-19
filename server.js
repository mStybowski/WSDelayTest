const app = require("express")()

const expressWs = require('express-ws')(app)

let port = 8888;

app.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg)
        ws.send(msg);
    });
});

app.listen(port, (err) =>{
    if(!err)
        console.log("Server is listening at port " + port );
})