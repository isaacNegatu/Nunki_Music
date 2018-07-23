let express = require('express');
let router = express.Router();

let pool = require('../modules/pool');

router.post('/artist', (req, res) => {
    console.log('got to get');
    let artist = req.body;

    let queryValues = [artist.name, artist.api_url];

    let queryParam = `INSERT INTO "artist" ("name", "artist_api_url") VALUES ($1, $2)`;

    pool.query(`SELECT * FROM "artist" WHERE "name" = $1`, [artist.name])
        .then((selectRes) => {


            if (selectRes.rows.length == 0) {
                pool.query(queryParam, queryValues)
                    .then((response) => {
                        pool.query(`SELECT * FROM "artist" WHERE "name" = $1`, [artist.name])
                            .then((finalRes) => {
                                res.send(finalRes);
                            })
                            .catch((err) => {
                                console.log(err);
                                res.sendStatus(500);

                            })
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(500);
                    })
            } else {
                res.send(selectRes)
            }

        })
        .catch((err) => {
            console.log(err);
        })

});

router.get('/artist', (req, res) => {
    console.log(req.body);

    let queryParam = 'SELECT * FROM "artist"';

    pool.query(queryParam)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500)
        });

})

router.get('/track/:id?', (req, res) => {
    let queryParam = '';
    if (req.params.id) {

        let track_api_url = `https://api.spotify.com/v1/tracks/${req.params.id}`;
        console.log('======================================');
        console.log(track_api_url);

        queryParam = `SELECT * FROM "track" WHERE "track".track_api_url = $1`;

        pool.query(queryParam, [track_api_url])
            .then((response) => {

                res.send(response.rows);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(201)
            });
    } else {
        queryParam = `SELECT * FROM "artist"
                      JOIN "track" ON "artist"."id" = "track"."artist_id"`;

        pool.query(queryParam)
            .then((response) => {
                res.send(response.rows);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(201)
            });
    }



})



router.post('/track', (req, res) => {
    let data = req.body;

    console.log(data);


    let queryParam = `INSERT INTO "track" ("title","image_url", "track_api_url", "artist_id") VALUES ($1, $2, $3, $4)`

    let queryValues = [data.track.title,
        data.track.image_url, data.track.api_url, data.artistId
    ];

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

router.delete('/track/:id', (req, res) => {

    let trackId = req.params.id;

    pool.query(`DELETE FROM "track_playlist" WHERE "track_id" = $1`, [trackId])
        .then((response) => {
            pool.query(`DELETE FROM "track" WHERE "id" = $1`, [trackId])
                .then((response) => {
                    console.log(response);
                    res.sendStatus(200);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                })

        })
        .catch((err) => {
            console.log(err);

            res.sendStatus(500);
        })


})


router.post('/playlist', (req, res) => {

    let playlistName = req.body.name;


    pool.query(`INSERT INTO "playlist" ("title") VALUES ($1)`, [playlistName])
        .then((response) => {
            console.log(response);
            res.sendStatus(201);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(err);
        })
})

router.get('/playlist', (req, res) => {

    pool.query('SELECT * FROM "playlist"')
        .then((response) => {
            console.log(response);
            res.send(response.rows)
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })

})

router.delete('/playlist/:id', (req, res) => {

    pool.query('DELETE FROM "track_playlist" WHERE "playlist_id" = $1', [req.params.id])
        .then((response) => {
            pool.query('DELETE FROM "playlist" WHERE "playlist"."id" = $1', [req.params.id])
                .then((response) => {
                    console.log(response);
                    res.sendStatus(201);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                })
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);

        })


});


router.post('/track_playlist', (req, res) => {

    let data = req.body;

    console.log(data);


    pool.query('INSERT INTO "track_playlist" ("track_id", "playlist_id") VALUES ($1, $2)', [data.trackId, data.playlistId])
        .then((response) => {
            console.log(response);
            res.sendStatus(201);

        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})


router.get('/track_playlist/:id', (req, res) => {

    let playlistId = req.params.id;

    let queryParam = `SELECT * FROM "track_playlist"
    JOIN "playlist" ON "playlist".id = track_playlist.playlist_id
    JOIN "track" ON "track".id = track_playlist.track_id
    JOIN "artist" ON "artist".id = "track".artist_id
    WHERE "track_playlist"."playlist_id" = $1;`;

    pool.query(queryParam, [playlistId])
        .then((response) => {


            res.send(response.rows);

        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);

        })
})


router.delete('/track_playlist/:trackId/:playlistId', (req, res) => {
    let data = req.params;

    console.log(data);

    pool.query(`DELETE FROM "track_playlist" WHERE "track_id" = $1 AND "playlist_id" = $2`, [data.trackId, data.playlistId])
        .then((respose) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            res.sendStatus(500);
        })

})


module.exports = router;