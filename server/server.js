let express = require('express');
let bodyParser = require('body-parser');

let PORT = process.env.PORT || 5000;

let musicRouter = require('./routes/music.route.js');

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('server/public'));

app.use('/music', musicRouter);

app.listen(PORT, ()=>{
    console.log("app is listening on port " + PORT);
})