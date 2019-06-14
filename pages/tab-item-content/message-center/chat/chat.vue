<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left">
				<text class="cuIcon-back" style="font-size:20px" @click="goBack()"></text>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold">张三</view>
			</block>
			<block slot="right">

			</block>
		</cu-custom>

		<!--<view  class="flex justify-between"-->
		<!--style="padding:0 15px;height:44px;line-height:44px;border-bottom: 1px solid #EEEEED;width:100%;">-->
			<!--<text class="cuIcon-back " style="float:left"></text>-->
			<!--<text>{{chatObj.name}}</text>-->
			<!--<text></text>-->
		<!--</view>-->
		<view class="cu-chat">
			<view class="cu-item self">
				<view class="main">
					<view class="content bg-green shadow">
						<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">2018年3月23日 13:23</view>
			</view>
			<view class="cu-info round">对方撤回一条消息!</view>
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view>
			<view class="cu-info">
				<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
			</view>
			<view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view>
			<view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view>
			<view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			<view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view>
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
				   @focus="InputFocus" @blur="InputBlur"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow">发送</button>
		</view>
	</view>
</template>
<script>
	import webim from '../../../../static/js/webim.js'
    import { mapState } from 'vuex'
	export default{
		data(){
			return{
				chatObj:{
					name:'',
					To_Account:''
				},
                InputBottom: 0
			}
		},
		components:{

		},
        computed: {
            ...mapState(['chatWith'])
        },
		mounted(){
            // console.log(this.chatWith)
            console.log(this.chatWith)
		},
		onLoad(){
			this.getChatObjInfo()
		},
		methods: {
            goBack(){
                uni.navigateBack({
                    delta:1
                })
            },
            InputFocus(e) {
                this.InputBottom = e.detail.height
            },
            InputBlur(e) {
                this.InputBottom = 0
            },
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
		/*background:#fff;*/
		padding-bottom: 100upx;
	}
</style>
