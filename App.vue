<script>
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
		filters:{
			repairStatus(value){
				return this.$store.state.repairStatusZn[value]
			},
			repairStatusColor(value){
				return this.$store.state.repairStatusColor[value]
			},
			
		},
		onLaunch: function() {
			// console.log('kkkk')
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
},
	}
</script>

<style>
	@import "colorui/main.css";
    @import "colorui/icon.css";
	page{
		font-family: PingFangSC-Medium;
	}
	.img20{
		width:20px;
		height:20px;
	}
	.img18{
		width:18px;
		height:18px;
	}
	.borderBottom{
		border-bottom:1px solid rgba(238, 238, 237, 1);
	}
	.submitBtn{
		background:rgba(66,176,237,1);
		border-radius:5px;
		margin-right:12px;
		margin-left:15px;
		font-size:16px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.tabTitle{
		
	}
	
</style>
