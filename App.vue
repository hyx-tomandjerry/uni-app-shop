<script>
// import Vue from 'vue';

   import im from "./common/im.js"
	import Vue from 'vue'

	export default {
		
		data(){
			return{

			}
		},
		onLoad(){
			
		},
		methods:{
		},
		onLaunch() {
			uni.getSystemInfo({
						success: function(e) {
							// #ifndef MP
							Vue.prototype.StatusBar = e.statusBarHeight;
							if (e.platform == 'android') {
								Vue.prototype.CustomBar = e.statusBarHeight + 50;
							} else {
								Vue.prototype.CustomBar = e.statusBarHeight + 45;
							};
							// #endif
							// #ifdef MP-WEIXIN
							Vue.prototype.StatusBar = e.statusBarHeight;
							let custom = wx.getMenuButtonBoundingClientRect();
							Vue.prototype.Custom = custom;
							Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
							// #endif
							// #ifdef MP-ALIPAY
							Vue.prototype.StatusBar = e.statusBarHeight;
							Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
							// #endif
			    }
			})
		}
	}
</script>

<style>
	@import "colorui/main.css";
    @import "colorui/icon.css";
	@import url("./static/css/index.css");
    @import url("./static/font/font.css");
	page{
		font-family:PingFangSC;
		color:rgba(42,42,42,1);
		font-weight: 400;
		font-size:14px;
	}
</style>
