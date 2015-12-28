<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand glyphicon glyphicon-home" href="/">&nbsp;</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a v-link="{name:'home'}">订单关联 <span class="sr-only">(current)</span></a></li>
                    <li><a v-link="{name : 'itemquery'}">商品查询 <span class="sr-only">(current)</span></a></li>
                    <li><a v-link="{name:'orderLinkCount'}">绑定订单统计</a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
</template>
<style>
    [v-cloak] {
        display: none;
    }
    .expand-transition {
        transition: all .3s ease;
        height: 30px;
        padding: 10px;
        background-color: #eee;
        overflow: hidden;
    }

    .expand-enter, .expand-leave {
        height: 0;
        padding: 0 10px;
        opacity: 0;
    }
</style>
