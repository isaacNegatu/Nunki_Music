let express = require('express');
let router = express.Router();

let pool = require('../modules/pool');

router.get('/', (req, res)=>{
    console.log('got to get');
    
    res.send('get from server works');

});

router.post('/', (req, res)=>{
    console.log("got to post");
    
    res.sendStatus(201)
})


module.exports = router;
