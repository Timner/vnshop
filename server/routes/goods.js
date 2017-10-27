var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var Goods = require('../models/goods');
var User = require('../models/user');

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


router.get('/list', function(req, res, next) {
    let priceLevel = req.param('priceLevel');

    let currentPage = parseInt(req.param('page')) > 0 ? parseInt(req.param('page')) : 1;
    let pageSize = parseInt(req.param('pageSize')) > 0 ? parseInt(req.param('pageSize')) : 8;

    //要跳过多少条
    let skip = (currentPage - 1) * pageSize;

    let sort = req.param('sort');

    let priceGt = '',
        priceLte = '';
    let param = {};
    if (priceLevel != 'all') {
        // switch (priceLevel) {
        //     case '0':
        //         priceGt = 0;
        //         priceLte = 100;
        //         break;
        //     case '1':
        //         priceGt = 100;
        //         priceLte = 500;
        //         break;
        //     case '2':
        //         priceGt = 500;
        //         priceLte = 1000;
        //         break;
        //     case '3':
        //         priceGt = 1000;
        //         priceLte = 2000;
        //         break;
        // }
        //表驱动法
        let priceItem = [
            [0, 100],
            [100, 500],
            [500, 1000],
            [1000, 2000]
        ];
        param = {
            salePrice: {
                // $gt: priceGt,
                // $lte: priceLte
                $gt: priceItem[priceLevel][0],
                $lte: priceItem[priceLevel][1]
            }
        }
    }

    let goodsModel = Goods.find(param);
    goodsModel.sort({ 'salePrice': sort }).skip(skip).limit(pageSize);

    goodsModel.exec({}, function(err, doc) {
        if (err) {
            res.json({ status: "1", msg: err.message })
        } else {
            res.json({ status: "0", msg: '', result: doc })
        }
    })
});
router.post('/addCart', function(req, res, next) {
    // 接收商品的id
    var productId = req.body.productId;
    console.log(productId);
    // user_id
    var userId = 100000077;

    // 根据用户id查询用户数据，确定好用户
    User.findOne({ userId: userId }, function(err, userDoc) {

        let goodItem = '';
        userDoc.cartList.forEach(function(item) {
            if (item.productId == productId) {
                goodItem = item;
                item.productNum++; //给商品数量加一
            }
        })

        if (goodItem) {
            userDoc.save(function(err2, doc2) {
                    if (err2) {
                        res.json({ status: "1", msg: err2.message })
                    } else {
                        res.json({ status: "0", msg: '', result: '商品数量添加成功' })
                    }
                })
                // 就把用户的这个商品数量加一
        } else {
            Goods.findOne({ 'productId': productId }, function(err, goodsDoc) {
                console.log(goodsDoc);
                goodsDoc.productNum = 1;
                console.log(goodsDoc);

                userDoc.cartList.push(goodsDoc);
                userDoc.save(function(err2, doc2) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: '加入购物车成功',
                        // data: userDoc
                    })
                })
            })
        }
    })
})
module.exports = router;