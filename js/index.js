var Vue = require("vue");
Vue.config.debug = true
var App = Vue.extend(require("../components/app.vue"));

var Router = require("vue-router");

Vue.use(Router);

var router = new Router({
    history : true,
    hashbang : false,
    saveScrollPosition : true
});

require("./routers")(router);

router.start(App,"#app");


