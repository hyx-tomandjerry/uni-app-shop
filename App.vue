<script>
// import Vue from 'vue';
import {mapState,mapMutations} from 'vuex';
	import Vue from 'vue'
	export default {
		computed:mapState(['hasLogin','userInfo']),
		data(){
			return{

			}
		},
		onLoad(){

		},
		methods:{
			
		},
// 		filters:{
// 			repairStatus(value){
// 				return this.$store.state.repairStatusZn[value]
// 			},
// 			repairStatusColor(value){
// 				return this.$store.state.repairStatusColor[value]
// 			},
// 
// 		},
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
					if(res.data){
						uni.switchTab({
							url:'./pages/tab-item/index/index'
						})
						
					}else{
						uni.navigateTo({
							url:'./pages/login-design/login/login'
						})
					}
				}
			})
			// if(!this.hasLogin){
			// 	uni.switchTab({
			// 		url:'./pages/tab-item/index/index'
			// 	})
			// }else{
			// 	uni.navigateTo({
			// 		url:'./pages/login-design/login/login'
			// 	})
			// }
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
	}



</style>
