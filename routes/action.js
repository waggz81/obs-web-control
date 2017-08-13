let express = require('express');
let router = express.Router();

let control = require('../obs-control');

router.post('/', function(req, res, next) {
    console.log(req.body);
    let newscene = req.body.newscene;
     control.switchScene(newscene);
    res.send('ok');
});

router.post('/togglestream', function(req, res, next) {
    control.toggleStreaming();
    res.send('ok');
});


module.exports = router;