var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var Goods = require('../models/goods');

mongoose.connect('mongodb://localhost:27017/shop');

mongoose.connection.on('connected', function() {
    console.log("Mongodb connected success");
})
mongoose.connection.on('error', function() {
    console.log("Mongodb connected fail");
})
mongoose.connection.on('disconnected', function() {
    console.log("Mongodb connected disconnected");
})
router.get('/', function(req, res, next) {
    res.json({ data: "您现在访问的是goods api" })
})

// router.get('/list', function(req, res, next) {
//     Goods.find({}, function(err, doc) {
//         if (err) {
//             res.json({ status: "1", msg: err.message })
//         } else {
//             res.json({ status: "0", msg: '', result: doc })
//         }
//     });
// });
router.get('/list', function(req, res, next) {
    let sort = req.param('sort');

    let goodsModel = Goods.find({}).sort({ 'salePrice': sort });

    goodsModel.exec({}, function(err, doc) {
        if (err) {
            res.json({ status: "1", msg: err.message })
        } else {
            res.json({ status: "0", msg: '', result: doc })
        }
    })
});
module.exports = router;