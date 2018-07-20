let express = require('express');
let router = express.Router();

let pool = require('../modules/pool');

router.post('/artist', (req, res) => {
    console.log('got to get');
    let artist = req.body;

    let queryParam = `INSERT INTO "artist" ("name", "api_url") VALUES ($1, $2)`
    
    let queryValues = [artist.name, artist.api_url];

    pool.query(queryParam, queryValues)
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })

});

router.get('/artist', (req, res) => {
    console.log(req.body);

    let queryParam = 'SELECT * FROM "artist"';

    pool.query(queryParam)
        .then((response)=>{
            console.log(response);
            res.send(response.rows);
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(201)
        });
    
})

router.get('/track', (req, res) => {

    res.sendStatus(201)
})

router.post('/track', (req, res) => {
    console.log("got to post of track");
    let data = req.body;

    console.log(data);
    

    let queryParam = `INSERT INTO "track" ("title","image_url", "api_url", "artist_id") VALUES ($1, $2, $3, $4)`

    let queryValues = [data.track.title,
        data.track.image_url, data.track.api_url, data.artistId];

    pool.query(queryParam, queryValues)
        .then((response) => {
            console.log(response);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})


module.exports = router;