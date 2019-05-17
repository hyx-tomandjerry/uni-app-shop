<template>
	<view style="position:relative">
		<view class="header-content flex justify-between">
			<view class="flex justify-start" @click="operateItem(0)">
				<image :src="avatar.resurl"
					v-if="avatar"
					style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;border-radius: 50%;"
				></image>
				<image src="../../../static/img/avatar.jpg"
					v-else
					style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;border-radius: 50%;"
				></image>
				<view>
					<text class="header-title">{{userInfo.name || ''}}</text>
					<text class="header-tel">{{userInfo.mobile}}</text>
				</view>
				<text class="cuIcon-right" style="position:absolute;right:20px;top:52px;color:rgba(0,0,0,1)" ></text>
			</view>
		</view>
		<view style="height:13px;width:100%;"></view>
		<view class="list-content">
			<view class="list-content-item flex justify-start"

			 v-for="(item,index) in operateList" :key="index"  @click="operateItem(index)">
				<image :src="item.image" class="img28"></image>
				<view class="list-content-item-title" >
					<text>{{item.text}}</text>
				</view>
				<text class="cuIcon-right" style="position: absolute;right:30px;font-size:18px;"></text>
			</view>
		</view>
		
		<!-- <view class="box" style="position:fixed;bottom:0px;width:100%;">
			<view class="cu-bar tabbar bg-white">
				<view class="action" style="padding-top:5px;" @click="showIndexClick()">
					<view class="cuIcon-cu-image">
						<image src="../../../static/img/tab_img/shouye.png"></image>
						
					</view>
					<view class="text-gray">首页</view>
				</view>
				<view class="action" style="padding-top:5px;" @click="showMessageClick()">
					<view class="cuIcon-cu-image" >
						<image src="../../../static/img/tab_img/xiaoxi.png" ></image>
						<view class="cu-tag badge">99</view>
					</view>
					<view class="text-gray">消息</view>
				</view>
				<view class="action" style="padding-top:5px;" @click="showWorkClick()">
					<view class="cuIcon-cu-image" >
						<image src="../../../static/img/tab_img/gongzuo.png" ></image>
						
					</view>
					<view class="text-gray">工作</view>
				</view>
				<view class="action" style="padding-top:5px;">
					<view class="cuIcon-cu-image">
						
						<image src="../../../static/img/tab_img/mine_color.png"></image>
					</view>
					<view class="text-blue">我的</view>
				</view>
			</view>
		</view> -->
		<view class="cu-modal" :class="isQuit?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl">
					确定退出门店助手
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-green" @tap="hideModal('cancel')">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="hideModal('agree')">确定</button>

					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import popModal from '../../../components/popmodal.vue'
	export default{
		data(){
			return{
				isQuit:false,
				avatar:'',
				userInfo:'',
				operateList:[
					{image:'../../../static/img/mine/icon-shezhi@2x.png',index:0,text:'基本设置'},
					{image:'../../../static/img/mine/icon-xiugaimima@2x.png',index:1,text:'修改密码'},
					{image:'../../../static/img/mine/icon-fankui@2x.png',index:2,text:'意见反馈'},
					{image:'../../../static/img/mine/tuichu.png',index:3,text:'退出登录'},
				]
			}
		},
		components: {
			popModal
		},
		methods:{
			hideModal(type){
				this.isQuit=false;
				console.log('11111')
				if(type=='agree'){
					
					uni.clearStorage()
					setTimeout(()=>{
						uni.navigateTo({
							url:'../../login-design/login/login'
						})
					},500)
				}
				
			},
			showWorkClick(){
				uni.navigateTo({
					url:'../work/work'
				})
			},
			showMessageClick(){
				uni.navigateTo({
					url:'../message/message'
				})
			},
			showIndexClick(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
			getUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.userInfo=res.data;
						
					}
				})
			},
			
			operateItem(index){

				switch(index){
					case 0:
					//基本设置
					uni.navigateTo({
						url:'../../tab-item-content/mine-center/basic-setting/basic-setting'
					})
					break;
					case 1:
					//修改密码
					uni.navigateTo({
						url:'../../tab-item-content/mine-center/edit-password/edit-password'
					})
					break;
					case 2:
					//意见反馈
					uni.navigateTo({
						url:'../../tab-item-content/mine-center/suggestion-list/suggestion-list'
					})
					break;
					case 3:
					this.isQuit=true;
					//退出登录
					// uni.clearStorage();
					
				}
			},
		
			//获得头像图片
			getAvater(id){
				this.$ajax('File',{id:id},res=>{
					this.avatar=res;
					uni.setStorage({
						key:'logo',
						data:this.avatar
					})
				})
			},
		},
		onLoad(){
			this.getUserInfo()
			uni.getStorage({
				key:'logo',
				success: (res) => {
					
					this.avatar=res.data
					console.log(this.avatar)
				}
			})
			this.$fire.on('image',res=>{
				if(res){
					this.getAvater(res)
				}
			})
		}
	}
</script>

<style lang="less">
	page{
		background: #fff;
	}
	.header-content{
		
		background:#fff;
		padding:29px 16px 23px 22px;
		box-shadow:0px 4px 6px 0px rgba(242,241,241,0.5);
		border-radius:4px;
		.header-title{
			font-size:18px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
			margin-bottom:3px;
			display: block;
			padding:5px;
		}
		.header-tel{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(137,136,136,1);
			display: block;
			padding:5px;
		}
	}
	.list-content{
		background:#fff;
		padding-top:26px;
		padding-left:22px;
		padding-right:20px;
		.list-content-item{
			padding-top:16px;
			padding-bottom:16px;
			.list-content-item-title{
				font-size:15px;
				margin-left:8px;
				padding-bottom:16px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(42,42,42,1);
				border-bottom:1px solid #EEEEED;
				width:100%;
			}
		}
		.img28{
			width:30px;
			height:28px;
			vertical-align: middle
		}

	}
</style>



