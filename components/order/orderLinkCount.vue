<template>
    <form class="form-horizontal" onsubmit="return false;">
        <div class="form-group">
            <label for="startDate" class="col-sm-2 control-label">日期范围</label>
            <div class="col-sm-4">
                <input type="date" class="form-control" id="startDate" placeholder="开始日期" v-model="startDate" />
            </div>
            <div  class="col-sm-4">
                <input type="date" class="form-control" id="endDate" placeholder="结束日期"  v-model="endDate"/>
            </div>
        </div>
    </form>
    <div class="text-center mt20" style="margin-bottom: 20px;">
        <button type="button" class="btn btn-default" @click="query">查询</button>
    </div>
    <table class="table table-bordered table-condensed">
        <thead>
            <tr>
                <th>日期</th>
                <th>数量</th>
            </tr>
        </thead>
        <tbody class="tbody">
            <tr v-for="list in countList">
                <td>{{list.purchase_date}}</td>
                <td>{{list.order_count}}</td>
            </tr>
            <tr v-if="total">
               <td>合计</td>
                <td>{{total}}</td>
            </tr>
        </tbody>
    </table>
    <logo class="loading center" v-if="fetching"></logo>
</template>
<script>
    var api = require("../../js/api");
    require("../../js/util/utils");
    module.exports = {
        data : function (){
            return {
                startDate : new Date().Format("yyyy-MM-dd"),
                endDate : new Date().Format('yyyy-MM-dd'),
                countList : [],
                total : 0,
                fetching : false
            }
        },
        methods : {
            query : function () {
                this.fetching = true;
                var params = {
                    startDate : this.startDate,
                    endDate : this.endDate
                };
                api.orderLinkCount(params,function (res) {
                    this.countList = res.data;
                    for(var i = 0; i < this.countList.length;i++) {
                        this.total += this.countList[i].order_count;
                    }
                    this.fetching = false;
                }.bind(this));
            }
        },
        components : {
            'logo' : require('../common/loading.vue')
        }
    }
</script>