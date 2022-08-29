const bodyParser = require('body-parser');

const express = require('express');

const dishRouterId = express.Router();

dishRouterId.use(bodyParser.json());

dishRouterId.route('/dishes')
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
delete((req,res,next)=>{
    res.end(req.params.dishId + "deleted from the dish list");
});

module.exports = dishRouterId;

