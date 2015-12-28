<template>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="logisticsNo" class="col-sm-2 control-label">快递单号</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="logisticsNo" placeholder="请输入快递单号" autofocus="autofocus"  v-model="logisticsNo"/>
            </div>
        </div>
        <div class="form-group sn" v-for="ser in serialNumbers">
            <label  class="col-sm-2 control-label">商品序列号</label>
            <div class="col-sm-8">
                <input type="text" class="form-control serialNumbers" placeholder="商品序列号(请切换英文输入法)" v-model="ser.serialNumber" />
            </div>
            <div class="col-sm-2">
                <a href="javascript:;" class="btn btn-primary add">添加</a>
                <a href="javascript:;" class="btn btn-danger del">删除</a>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <a href="javascript:;" class="btn btn-default" @click="saveOrder" v-if="!saving">保存</a>
                <loadbar  class="loading center" v-if="saving"></loadbar>
            </div>
        </div>
    </form>
    <table class="table table-bordered table-condensed">
        <thead>
        <tr>
            <th>关联时间</th>
            <th>快递单号</th>
            <th>商品序列号</th>
            <th>关联状态</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="item in topics">
                <td>{{new Date(item.create_time).Format('yyyy-MM-dd hh:mm:ss')}}</td>
                <td >{{item.logistics_no}}</td>
                <td style="word-break: break-all;width: 55%">{{item.serial_number_list}}</td>
                <td>{{item.status|orderStatuFilter}}</td>
            </tr>
        </tbody>
    </table>
    <logo class="loading center" v-if="fetching"></logo>
    <div class="load-more" v-if="pageNo" @click="fetchMore(pageNo)">加载更多</div>
</template>
<script>
    var api = require("../../js/api");
    require("../../js/util/utils");
    module.exports =  {
        data : function () {
            return {
                topics : [],
                logisticsNo : "",
                fetching: true,
                pageNo : 0,
                serialNumbers : [{serialNumber : ""}],
                saving : false
            }
        },
        route: {
            data: function(transition) {
                this.fetching = true;
                var params = {};
                params.pageSize = 10;
                params.pageNo = 1;
                api.getOrderLinkList(params, function(res) {
                    transition.next({
                        topics: res.data,
                        pageNo : res.page_no,
                        fetching : false
                    });
                });
            }
        },
        components :  {
            'logo' : require('../common/loading.vue'),
            "loadbar" : require("../common/loadbar.vue")
        },
        methods : {
            fetchMore : function (pageNo) {
                this.fetching = true;
                var params = {pageSize : 10,pageNo : this.pageNo+1}
                api.getOrderLinkList(params, function(res) {
                    this.pageNo = res.page_no;
                    this.topics = this.topics.concat(res.data);
                    this.fetching = false;
                }.bind(this));
            },
            saveOrder : function () {
                var self = this;
                this.saving = true;
                var params = {
                    logistics_no : this.logisticsNo,
                    serial_numbers : []
                };
                for(var i = 0;i<this.serialNumbers.length;i++) {
                    params.serial_numbers.push(this.serialNumbers[i].serialNumber);
                };
                api.addOrder(params,function (res) {
                    alert(res.msg);
                    self.logisticsNo = "";
                    self.serialNumbers = [{serialNumber : ""}];
                    self.saving = false;
                });
            }
        },
        filters : {
            "orderStatuFilter": function (val) {
                    return val === 1?"已关联":"待关联"
            }
        }
    }
</script>
<style>
    /* load more button */
    .load-more {
        padding: 8px 0;
        text-align: center;
        color: #999;
        background-color: #f0f0f0;
        list-style-type: none;
        cursor: pointer;
    }
    .load-more:hover {
        background-color: #dadada;
    }
</style>