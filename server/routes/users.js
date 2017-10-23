var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(' haha ha aaa hello you');
});

module.exports = router;