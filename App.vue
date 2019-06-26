<script>
// import Vue from 'vue';
import {mapState,mapMutations} from 'vuex';
	import Vue from 'vue'
	export default {
		computed:mapState(['hasLogin','userInfo','replacerObj','shoperObj',]),
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
			uni.getStorage({
				key:'userInfo',
				success: (res) => {
					if(res){
						uni.switchTab({
							url:'./pages/tab-item/index/index'
						})
					}
					
				},
				fail: () => {
					uni.navigateTo({
						url:'./pages/login-design/login/login'
					})
				}
			})
			
		}
	}
</script>

<style>
	@import "colorui/main.css";
    @import "colorui/icon.css";
	@import url("./static/css/index.css");
	page{
		font-family:PingFangSC-Medium;
		color:rgba(42,42,42,1);
		font-weight: 400;
		font-size:14px;
	}



</style>
