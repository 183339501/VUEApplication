var http = require('./xhr');

exports.getOrderLinkList = function (params,callback){
    var url = "api/v1/logisticsLogItems";
    http.get(url,params,callback);
};

exports.addOrder = function (params,callback) {
    var url = "api/v1/logistics_items";
    http.post(url,params,callback);
};

exports.queryItem = function (params,callback) {
    var url = "api/v1/items";
    http.get(url,params,callback);
};

exports.orderLinkCount = function (params,callback) {
    var url = "api/v1/orderStat";
    http.get(url,params,callback);
};
