<template>
    <form class="form-horizontal" onsubmit="return false;">
        <div class="form-group">
            <label for="startDate" class="col-sm-2 control-label">出货日期范围</label>
            <div class="col-sm-4">
                <input type="date" class="form-control" id="startDate" placeholder="开始日期" v-model="startDate" />
            </div>
            <div  class="col-sm-4">
                <input type="date" class="form-control" id="endDate" placeholder="结束日期" v-model="endDate"/>
            </div>
        </div>
        <div class="form-group">
            <label for="item" class="col-sm-2 control-label">商品SN</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="item" placeholder="商品SN" v-model="sn" />
            </div>
        </div>
    </form>
    <div class="text-center mt20" style="margin-bottom: 20px;">
        <button type="button" class="btn btn-default" @click="query">查询</button>
    </div>
    <table class="table table-bordered table-condensed">
        <thead>
        <tr>
            <th>商品SN</th>
            <th>mac地址</th>
            <th>出货日期</th>
        </tr>
        </thead>
        <tbody class="tbody">
            <tr v-for="item in itemList">
                <td>{{item.serial_number}}</td>
                <td>{{item.mac|macConveter}}</td>
                <td>{{new Date(item.purchase_date).Format('yyyy-MM-dd')}}</td>
            </tr>
        </tbody>
    </table>
    <logo class="loading center" v-if="fetching"></logo>
    <div class="load-more" v-if="pageNo" @click="fetchMore(pageNo)">加载更多</div>
</template>
<script>
    require("../../js/util/utils");
    var api = require("../../js/api");
    module.exports = {
        data : function () {
            return {
                endDate: new Date().Format("yyyy-MM-dd"),
                startDate: new Date().Format("yyyy-MM-dd"),
                sn: "",
                itemList : [],
                pageNo : 0,
                fetching : false
            }
        },
        methods :  {
            query : function (){
                this.fetching = true;
                var params = {
                    startDate : this.startDate,
                    endDate : this.endDate,
                    pageSize : 10,
                    pageNo : 1,
                    sn : this.sn
                }
                api.queryItem(params,function (res) {
                    this.itemList = res.data;
                    this.pageNo = res.page_no
                    this.fetching = false;
                }.bind(this))
            },
            fetchMore : function (pageNo) {
                this.fetching = true;
                var params = {
                    startDate : this.startDate,
                    endDate : this.endDate,
                    pageSize : 10,
                    pageNo : pageNo+1,
                    sn : this.sn
                }
                api.queryItem(params,function (res) {
                    this.itemList = this.itemList.concat(res.data);
                    this.pageNo = res.page_no
                    this.fetching = false;
                }.bind(this))
            }
        },
        components : {
            'logo' : require('../common/loading.vue')
        },
        filters : {
            "macConveter" : function (val) {
                return val.match( /.{1,2}/g).join(":");
            }
        }
    }
</script>
