<template>
	<view>
		<view class="flex justify-around" style="width:100%;flex-wrap: wrap;padding-top:10px;">
			<view style="width:45%;position:relative" v-for="(item,index) in tabImg" :key="index" @click="showItem(item.type)">
				<image :src="item.url" mode="" style="height:168px"></image>
				<text class="position_absolute font-size-big font-weight-bold text-white" style="bottom:48px;left:59px;">{{item.text}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabImg:[
					{type:'log',url:'../../../static/img/work/tab/construct.png',text:'工作日志'},
					{type:'express',url:'../../../static/img/work/tab/express.png',text:'快递包裹'},
					{type:'repair',url:'../../../static/img/work/tab/repair.png',text:'我的报修'},
					{type:'employee',url:'../../../static/img/work/tab/construct.png',text:'组织结构'},
				]
			}
		},
		methods: {
			showItem(type){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						if(res.data.status!=1){
							uni.showToast({
								title:'您没有该权限',
								icon:'none'
							})
						}else{
							switch(type){
								case 'log':
								uni.navigateTo({
									url:'../../tab-item-content/work-center/work-log/work-log'
								});
								break;
								case 'express':
								uni.navigateTo({
									url:'../../tab-item-content/work-center/express-center/express-index/express-index'
								});
								break;
								case 'repair':
								uni.navigateTo({
									url:'../../tab-item-content/shop-center/shop-center?type=alone'
								});
								break;
								case 'employee':
								uni.navigateTo({
									url:'../../tab-item-content/work-center/personnel-center/personnel-index/personnel-index'
								})
								
							}
						}
					}
				})
				
			},
			showMineClick(){
				uni.navigateTo({
					url:'../mine/mine'
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
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
		height:100%;
	}
	.tab-content{
		padding-top:16px;
		padding-right:12px;
		padding-left:14px;
	}
	.tab-item{
		min-height:95px;
		text-align:center;
		border-radius:8px;
		padding-top:13px;
		padding-bottom:11px;
		margin-bottom:11px;
	}
</style>
