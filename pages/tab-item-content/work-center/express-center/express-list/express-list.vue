<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left"><view class="cuIcon-back font-size-middle color-placeholder" @click="goBack"></view></block>
			<block slot="content"><view class="font-size-big font-weight-bold">寄件记录</view></block>
			<block slot="right">
				<view class="flex justify-start">
					<image src="../../../../../static/img/work/express/other/scan.png" style="width:16px;height:16px;margin-right:20px;" @click="scanCodeClick"></image>
					<image src="../../../../../static/img/work/express/other/search.png" style="width:16px;height:16px;"></image>
				</view>
			</block>
		</cu-custom>
		<view class="borderTop">
			<view class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub font-size-big" :class="item.id==navTabCur?'text-orange cur':''"
						  v-for="(item,index) in navList" :key="index"
						  @tap="tabSelect(item,'nav')" :data-id="item.id">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="borderTop nav-container bg-white">
				<view v-for="(item,index) in expressTypeList"
					  :class="{'navActive':item.id==expressTabCur}"
					  @click="tabSelect(item,'tab')"
					  class="nav-item" :key="index">{{item.name}}</view>
			</view>
		</view>
		<view class="list-container">
			<view	@click="checkItem()" class="list-item bg-white">
				<view class="list-title flex justify-space align-center">
					<view style="width:75%">
						<image src="../../../../../static/img/work/express/other/tag-speed.png" style="vertical-align: middle;width:20px;height:20px;margin-right:5px;"></image>
						<text class="color-normal">订单编号：oks 2019 888 345</text>
					</view>
					<view>代取件</view>
				</view>
				<view class="express-info">
					<view class="color-placeholder" style="margin-bottom:5px;">下单时间：2019-06-28 09:35</view>
					<view class="flex justify-start">
						<view class="color-normal font-size-normal" style="width:35%">上海市(李雷雷）</view>
						<view><image src="../../../../../static/img/work/express/other/arrow.png" style="height:25px;width:76px;"></image></view>
						<view class="color-normal font-size-normal" style="width:35%;margin-left:20px;">上海市(李雷雷）</view>
					</view>
				</view>
				<view class="flex justify-end borderTop" style="padding-top:10px;">
					<view style="padding:4px 9px; border:1px solid #EEEEED;border-radius:8px;" class="color-blue"
						  @click.stop="packageTracking()">物流跟踪</view>
				</view>
			</view>
			<view	@click="checkItem()" class="list-item bg-white">
				<view class="list-title flex justify-space align-center">
					<view style="width:75%">
						<image src="../../../../../static/img/work/express/other/tag-speed.png" style="vertical-align: middle;width:20px;height:20px;margin-right:5px;"></image>
						<text class="color-normal">订单编号：oks 2019 888 345</text>
					</view>
					<view>代取件</view>
				</view>
				<view class="express-info">
					<view class="color-placeholder" style="margin-bottom:5px;">下单时间：2019-06-28 09:35</view>
					<view class="flex justify-start">
						<view class="color-normal font-size-normal" style="width:35%">上海市(李雷雷）</view>
						<view><image src="../../../../../static/img/work/express/other/arrow.png" style="height:25px;width:76px;"></image></view>
						<view class="color-normal font-size-normal" style="width:35%;margin-left:20px;">上海市(李雷雷）</view>
					</view>
				</view>
			</view>
			<view	@click="checkItem()" class="list-item bg-white">
				<view class="list-title flex justify-space align-center">
					<view style="width:75%">
						<image src="../../../../../static/img/work/express/other/tag-speed.png" style="vertical-align: middle;width:20px;height:20px;margin-right:5px;"></image>
						<text class="color-normal">订单编号：oks 2019 888 345</text>
					</view>
					<view>代取件</view>
				</view>
				<view class="express-info">
					<view class="color-placeholder" style="margin-bottom:5px;">下单时间：2019-06-28 09:35</view>
					<view class="flex justify-start">
						<view class="color-normal font-size-normal" style="width:35%">上海市(李雷雷）</view>
						<view><image src="../../../../../static/img/work/express/other/arrow.png" style="height:25px;width:76px;"></image></view>
						<view class="color-normal font-size-normal" style="width:35%;margin-left:20px;">上海市(李雷雷）</view>
					</view>
				</view>
			</view>
			<view	@click="checkItem()" class="list-item bg-white">
				<view class="list-title flex justify-space align-center">
					<view style="width:75%">
						<image src="../../../../../static/img/work/express/other/tag-speed.png" style="vertical-align: middle;width:20px;height:20px;margin-right:5px;"></image>
						<text class="color-normal">订单编号：oks 2019 888 345</text>
					</view>
					<view>代取件</view>
				</view>
				<view class="express-info">
					<view class="color-placeholder" style="margin-bottom:5px;">下单时间：2019-06-28 09:35</view>
					<view class="flex justify-start">
						<view class="color-normal font-size-normal" style="width:35%">上海市(李雷雷）</view>
						<view><image src="../../../../../static/img/work/express/other/arrow.png" style="height:25px;width:76px;"></image></view>
						<view class="color-normal font-size-normal" style="width:35%;margin-left:20px;">上海市(李雷雷）</view>
					</view>
				</view>
			</view>
			<view	@click="checkItem()" class="list-item bg-white">
				<view class="list-title flex justify-space align-center">
					<view style="width:75%">
						<image src="../../../../../static/img/work/express/other/tag-speed.png" style="vertical-align: middle;width:20px;height:20px;margin-right:5px;"></image>
						<text class="color-normal">订单编号：oks 2019 888 345</text>
					</view>
					<view>代取件</view>
				</view>
				<view class="express-info">
					<view class="color-placeholder" style="margin-bottom:5px;">下单时间：2019-06-28 09:35</view>
					<view class="flex justify-start">
						<view class="color-normal font-size-normal" style="width:35%">上海市(李雷雷）</view>
						<view><image src="../../../../../static/img/work/express/other/arrow.png" style="height:25px;width:76px;"></image></view>
						<view class="color-normal font-size-normal" style="width:35%;margin-left:20px;">上海市(李雷雷）</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				navTabCur:1,
				navList:[
					{name:'寄',id:1,value:'send'},
					{name:'收',id:2,value:'receiver'},
				],
				expressTypeList:[
					{name:'速递',value:'speed',id:1},
					{name:'物流',value:'logistics',id:2},
					{name:'同城',value:'local',id:3},
					{name:'代发',value:'replace',id:4},
				],
				expressTabCur:1,

			}
		},
		components:{
			
		},
		onLoad(){
			
		},
		methods:{
			//扫描二维码
			scanCodeClick(){
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			packageTracking(){
				uni.navigateTo({
					url:'../package-tracking/package-tracking'
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			checkItem(){
				console.log('jjjj')
				uni.navigateTo({
					url:'../express-item/express-item'
				})
			},
			tabSelect(item,type){
				switch(type){
					case 'nav':
						this.navTabCur=item.id;
						break;
					case 'tab':
						this.expressTabCur=item.id;
						break;
				}
			}
		}
	}
</script>
<style lang="less">
	.nav-container{
		padding:14px 17px 11px 15px;
		display:flex;
		justify-content: space-around;
		.nav-item{
			padding:2px 22px;
			border:1px solid #EEEEED;
			border-radius:14px;
		}
		.navActive{
			background:rgba(66,176,237,1);
			color:white;
		}
	}
	.list-container{
		padding-top:13px;
		padding-right:12px;
		padding-left:14px;
		.list-item{
			padding:13px 15px 13px 16px;
			margin-bottom:13px;
			.list-title{
				padding-bottom:11px;
				border-bottom:1px solid #EEEEED;
			}
			.express-info{
				padding-top:8px;
			}
		}
	}
</style>