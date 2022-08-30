const express = require('express');

const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain'); 
    console.log("app.all route");
    next();
})

.get((req,res)=>{
    res.end('Will send all the dishes to you!');
})

.post((req,res,next)=>{
    res.end("Will add the dish: ",req.body.name + 'with details' + req.body.description);
    
})
.put((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Put operation not supported on /dishes");

})

.delete((req,res,next)=>{
    res.end("Delete request delete the dishes");
});

dishRouter.route('/:dishId')
.get((req,res)=>{
    res.end('Will send details of the dish!' + req.params.dishId + 'to you');
})

.post((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Post operation not supported on /dishes/" + req.params.dishId);
})
.put((req,res,next)=>{

    res.write("updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish:" + req.body.name + "with details: " + req.body.description)

})
.delete((req,res,next)=>{
    res.end(req.params.dishId + "deleted from the dish list");
});


module.exports = dishRouter;
