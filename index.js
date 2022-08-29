const express = require('express');

const http = require('http');

const morgan = require('morgan');

const bodyParser = require('body-parser');


const hostname = 'localhost';

const port = 3000;

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.all('dishes',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain'); 
    console.log("app.all route");
    next();
});
app.get('/dishes',(req,res)=>{
    res.end('Will send all the dishes to you!');
});

app.post('/dishes',(req,res,next)=>{
    res.end("Will add the dish: ",req.body.name + 'with details' + req.body.description);
    
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Put operation not supported on /dishes");

});

app.delete('/dishes',(req,res,next)=>{
    res.end("Delete request delete the dishes");
});

//using dishId
app.get('/dishes/:dishId',(req,res)=>{
    res.end('Will send details of the dish!' + req.params.dishId + 'to you');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Post operation not supported on /dishes/" + req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{

    res.write("updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish:" + req.body.name + "with details: " + req.body.description)

});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end(req.params.dishId + "deleted from the dish list");
});

app.use(express.static(__dirname+ '/public'));

app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type","text/html");
    res.end("<html><body><h1>This is express server running</h1></body></html>");
})

const server = http.createServer(app);

server.listen(port,hostname, ()=>{
    console.log(`server is running @http://${hostname}:${port}`);
})