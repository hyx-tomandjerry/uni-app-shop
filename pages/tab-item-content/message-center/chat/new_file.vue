<template>
	<view>
		<view class="header-content flex justify-between" style="height:44px;line-height:44px;padding:0 15px;border-bottom:1px solid #EEEEED">
			<view><text class="cuIcon-back"></text></view>
			<view><text>聊天对象</text></view>
			<view></view>
		</view>
	</view>
</template>
<script>
	import webim from '../../../../static/js/webim.js'
	export default{
		data(){
			return{
		
			}
		},
		components:{
			
		},
		onLoad(){
			this.getChatObjInfo()
		},
		methods: {
			getChatObjInfo() {
				let options={
						"To_Account":"LX17621233017", 
						"TagList":
							[
								"Tag_Profile_IM_Nick",
								"Tag_Profile_IM_AllowType",
								"Tag_Profile_IM_SelfSignature",
								"Tag_Profile_Custom_888888_Test"
							]
				}
				webim.getProfilePortrait(options,res=>{
					console.log(res)
				},error=>{
					console.log('获得用户信息失败')
					})
			}
		},
	}
</script>
<style lang="less">
	page{
		background:#fff;
	}
		.header-content{
			
		}
</style>

