<template>
	<view>
		<view  class="flex justify-between"
		style="padding:0 15px;height:44px;line-height:44px;border-bottom: 1px solid #EEEEED;width:100%;">
			<text class="cuIcon-back " style="float:left"></text>
			<text>{{chatObj.name}}</text>
			<text></text>
		</view>
	</view>
</template>
<script>
	import webim from '../../../../static/js/webim.js'
	export default{
		data(){
			return{
				chatObj:{
					name:'',
					To_Account:''
				}
			}
		},
		components:{
			
		},
		onLoad(){
			this.getChatObjInfo()
		},
		methods: {
			getChatObjInfo() {
				  var tag_list = [
						"Tag_Profile_IM_Nick",//昵称
						"Tag_Profile_IM_Gender",//性别
						"Tag_Profile_IM_AllowType",//加好友方式
						"Tag_Profile_IM_Image"//头像
					
					];
					var options = {
						'To_Account':["LX17621233017"],
						'TagList': tag_list
					};
					    webim.getProfilePortrait( options,resp=>{
							if(resp.ActionStatus=='OK'){
								
								this.chatObj={
									name:resp.UserProfileItem[0].ProfileItem[0].Value,
									To_Account:resp.UserProfileItem[0].To_Account
								}
								
							}
						},error=>{
							console.log(error)
						});
			}
		},
	}
</script>
<style lang="less">
	page{
		background:#fff;
	}
</style>