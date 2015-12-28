module.exports = function (router) {
    router.map({
        "/" : {
            name : "home",
            component : require("../components/home/home.vue")
        },
        "/orderList" : {
            name : "orderlist",
            component :  require("../components/order/orderlist.vue")
        },
        "/itemquery" : {
            name : "itemquery",
            component : require("../components/item/itemquery.vue")
        },
        "/orderLinkCount" : {
            name : "orderLinkCount",
            component : require("../components/order/orderLinkCount.vue")
        }
    });
};