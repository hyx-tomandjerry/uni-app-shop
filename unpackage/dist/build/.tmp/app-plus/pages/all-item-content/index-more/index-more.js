(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/all-item-content/index-more/index-more"],{"62fe":function(t,e,n){"use strict";var i=n("edf7"),a=n.n(i);a.a},d843:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/head-tab").then(n.bind(null,"3edb"))},a={data:function(){return{exampleList:[],skillList:[],title:"",value:""}},components:{headTab:i},methods:{checkItemInfo:function(e){t.navigateTo({url:"../detail-content/detail-content?id="+e.id+"&type="+this.value})},goBack:function(){t.navigateBack({delta:1})},getArticleList:function(){var t=this;this.$ajax("Articles",{zone:-1},function(e){e.forEach(function(e){"skill"==t.value&&1==e.type?t.skillList.push(e):"example"==t.value&&2==e.type&&(console.log("----"," at pages\\all-item-content\\index-more\\index-more.vue:122"),t.skillList.push(e))}),console.log(t.skillList," at pages\\all-item-content\\index-more\\index-more.vue:126")})}},onLoad:function(t){"skill"==t.value?(this.title="销售技巧",this.value=t.value):"example"==t.value&&(this.title="陈述案例",this.value=t.value),this.getArticleList()}};e.default=a}).call(this,n("6e42")["default"])},da09:function(t,e,n){"use strict";n.r(e);var i=n("db21"),a=n("f2a7");for(var l in a)"default"!==l&&function(t){n.d(e,t,function(){return a[t]})}(l);n("62fe");var o=n("2877"),u=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=u.exports},db21:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.skillList.map(function(e,n){var i=t._f("formatTime")(e.createdate,"YMD","/");return{$orig:t.__get_orig(e),f0:i}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},edf7:function(t,e,n){},f2a7:function(t,e,n){"use strict";n.r(e);var i=n("d843"),a=n.n(i);for(var l in i)"default"!==l&&function(t){n.d(e,t,function(){return i[t]})}(l);e["default"]=a.a}},[["725b","common/runtime","common/vendor"]]]);