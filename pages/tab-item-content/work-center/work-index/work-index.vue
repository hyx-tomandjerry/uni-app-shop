<template>
	<view>
		<view class="flex text-center bg-white">
			<view class="cu-item flex-sub" :class="index==TabCur?'borderBottomRed':''" v-for="(item,index) in tabList"
				:key="index" @tap="tabSelect(index)" :data-id="index">
				<text >{{tabList[index]}}</text>
			</view>
		</view>
		<view  v-if="TabCur==0">
			<view class="work-item" @click="itemDetail(TabCur)">
				<view class="user flex justify-start">
					<image src="../../../../static/img/avatar.jpg" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;"></image>
					<view class="user-info">
						<view  style="margin-bottom:1px;">
							<text class="user-name">TomAndJerry</text>
						</view>
						<view class="work-date"><text style="margin-right:10px">2019/03/20</text>18:00</view>
					</view>
				</view>
				<view class="work-content">
					<text class="user-name">今日工作设计工作日志界面完成，banner图设计完成 完成设计流程，完成h5界面。</text>
				</view>
				<view class="work-tag">
					<text class="tag-name">工作日志</text>
				</view>
			</view>

			<view class="work-item" @click="itemDetail(TabCur)">
				<view class="user flex justify-start">
					<image src="../../../../static/img/avatar.jpg" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;"></image>
					<view class="user-info">
						<view  style="margin-bottom:1px;">
							<text class="user-name">TomAndJerry</text>
						</view>
						<view class="work-date"><text style="margin-right:10px">2019/03/20</text>18:00</view>
					</view>
				</view>
				<view class="work-content">
					<text class="user-name">今日工作设计工作日志界面完成，banner图设计完成 完成设计流程，完成h5界面。</text>
				</view>
				<view class="work-tag">
					<text class="tag-name">工作日志</text>
				</view>
			</view>

			<view class="work-item" @click="itemDetail(TabCur)">
				<view class="user flex justify-start">
					<image src="../../../../static/img/avatar.jpg" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;"></image>
					<view class="user-info">
						<view  style="margin-bottom:1px;">
							<text class="user-name">TomAndJerry</text>
						</view>
						<view class="work-date"><text style="margin-right:10px">2019/03/20</text>18:00</view>
					</view>
				</view>
				<view class="work-content">
					<text class="user-name">今日工作设计工作日志界面完成，banner图设计完成 完成设计流程，完成h5界面。</text>
				</view>
				<view class="work-tag">
					<text class="tag-name">工作日志</text>
				</view>
			</view>

			<view class="work-item">
				<view class="user flex justify-start">
					<image src="../../../../static/img/avatar.jpg" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;"></image>
					<view class="user-info">
						<view  style="margin-bottom:1px;">
							<text class="user-name">TomAndJerry</text>
						</view>
						<view class="work-date"><text style="margin-right:10px">2019/03/20</text>18:00</view>
					</view>
				</view>
				<view class="work-content">
					<text class="user-name">今日工作设计工作日志界面完成，banner图设计完成 完成设计流程，完成h5界面。</text>
				</view>
				<view class="work-tag">
					<text class="tag-name">工作日志</text>
				</view>
			</view>
			<view class="work-item" @click="itemDetail(TabCur)">
				<view class="user flex justify-start">
					<image src="../../../../static/img/avatar.jpg" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;"></image>
					<view class="user-info">
						<view  style="margin-bottom:1px;">
							<text class="user-name">TomAndJerry</text>
						</view>
						<view class="work-date"><text style="margin-right:10px">2019/03/20</text>18:00</view>
					</view>
				</view>
				<view class="work-content">
					<view><text class="user-name" style="margin-bottom:12px;">今日工作设计工作日志界面完成，banner图设计完成 完成设计流程，完成h5界面。</text></view>
					<view class="work-img flex justify-around">
						<image src="../../../../static/img/shop-img/shop1.jpg" style="height:102px;"></image>
						<image src="../../../../static/img/shop-img/shop2.jpg" style="height:102px;margin:0 13px;"></image>
						<image src="../../../../static/img/shop-img/shop3.jpg" style="height:102px;"></image>
					</view>
				</view>
				<view class="work-tag" style="rgba(238,255,249,1)">
					<text class="tag-name">工作日志</text>
				</view>
			</view>

			<image src="../../../../static/icon/add.png"
			style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createWork(TabCur)"></image>
		</view>

		<view v-if="TabCur==1">
			<text>叫快递</text>
		</view>
		<view  v-if="TabCur==2">
			<view class="order_content position_relative" >
				<scroll-view scroll-y="true" class="page show" >
					<view class="list-item" @click="itemDetail(TabCur)">
						<view class=" flex justify-between">
							<view class="list-item-title">热水器维修</view>
							<view>
								<view class='cu-tag radius bg-green'>处理中</view>
							</view>
						</view>
						<view class="list-content">
							<view class="list-content-item">
								<image src="../../../../static/icon/shop.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">门店名称:</text> 包你满意门店
							</view>


							<view class="list-content-item">
								<image src="../../../../static/icon/time.png" class="img20 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修时间:</text> 2019/2/10
							</view>

							<view class="list-content-item">
								<image src="../../../../static/icon/client.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修人:</text> TomAndJerry  <text class="text-blue" style="margin:0 5px;">|</text> 18838280488
							</view>
						</view>
					</view>

					<view class="list-item" @click="itemDetail(TabCur)">
						<view class=" flex justify-between">
							<view class="list-item-title">热水器维修</view>
							<view>
								<view class='cu-tag radius bg-blue'>已处理</view>
							</view>
						</view>
						<view class="list-content">
							<view class="list-content-item">
								<image src="../../../../static/icon/shop.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">门店名称:</text> 包你满意门店
							</view>


							<view class="list-content-item">
								<image src="../../../../static/icon/time.png" class="img20 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修时间:</text> 2019/2/10
							</view>

							<view class="list-content-item">
								<image src="../../../../static/icon/client.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修人:</text> TomAndJerry  <text class="text-blue" style="margin:0 5px;">|</text> 18838280488
							</view>
						</view>
					</view>

					<view class="list-item" @click="itemDetail(TabCur)">
						<view class=" flex justify-between">
							<view class="list-item-title">热水器维修</view>
							<view>
								<view class='cu-tag radius bg-red'>无效</view>
							</view>
						</view>
						<view class="list-content">
							<view class="list-content-item">
								<image src="../../../../static/icon/shop.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">门店名称:</text> 包你满意门店
							</view>

							<view class="list-content-item">
								<image src="../../../../static/icon/time.png" class="img20 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修时间:</text> 2019/2/10
							</view>

							<view class="list-content-item">
								<image src="../../../../static/icon/client.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修人:</text> TomAndJerry  <text class="text-blue" style="margin:0 5px;">|</text> 18838280488
							</view>

							<view class="comment flex justify-between" style="border-top:1px solid rgba(238, 238, 237, 1);padding-top:10px;">
								<view></view>
								<view class='cu-tag line-red' >删除</view>
							</view>
						</view>
					</view>

					<view class="list-item" @click="itemDetail(TabCur)">
						<view class=" flex justify-between">
							<view class="list-item-title">热水器维修</view>
							<view>
								<view class='cu-tag radius bg-orange'>等待处理</view>
							</view>
						</view>
						<view class="list-content">
							<view class="list-content-item">
								<image src="../../../../static/icon/shop.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">门店名称:</text> 包你满意门店
							</view>

							<view class="list-content-item">
								<image src="../../../../static/icon/time.png" class="img20 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修时间:</text> 2019/2/10
							</view>

							<view class="list-content-item">
								<image src="../../../../static/icon/client.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修人:</text> TomAndJerry  <text class="text-blue" style="margin:0 5px;">|</text> 18838280488
							</view>
						</view>
					</view>

					<view class="list-item" @click="itemDetail(TabCur)">
						<view class=" flex justify-between">
							<view class="list-item-title">热水器维修</view>
							<view>
								<view class='cu-tag radius bg-gradual-purple'>已完成</view>
							</view>
						</view>
						<view class="list-content">
							<view class="list-content-item">
								<image src="../../../../static/icon/shop.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">门店名称:</text> 包你满意门店
							</view>

							<view class="list-content-item">
								<image src="../../../../static/icon/time.png" class="img20 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修时间:</text> 2019/2/10
							</view>

							<view class="list-content-item">
								<image src="../../../../static/icon/client.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
								<text style="margin-right:5px;">报修人:</text> TomAndJerry  <text class="text-blue" style="margin:0 5px;">|</text> 18838280488
							</view>

							<view class="comment flex justify-between" style="border-top:1px solid rgba(238, 238, 237, 1);padding-top:10px;">
								<view></view>
								<view class='cu-tag line-blue' >查看评价</view>
							</view>
							<image src="../../../../static/icon/add.png"
							style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createWork(TabCur)"></image>
						</view>


					</view>

				</scroll-view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur:0,
				tabList:['工作日志','快递包裹','我的报修'],
			}
		},
		methods: {
			tabSelect(event){
				this.TabCur = event;
			},
			//新建
			createWork(event){
				if(event==0){
					uni.navigateTo({
						url:'../create-log/create-log'
					})
				}else if(event==1){
					uni.navigateTo({
						url:'../../shop-center/create-order/create-order'
					})
				}
			},
			//查看详情
			itemDetail(event){
				if(event==0){
					uni.navigateTo({
						url:'../log-detail/log-detail'
					})
				}else if(event==1){
					uni.navigateTo({
						url: '../../shop-center/repair-order-item/repair-order-item',
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.work-item{
		margin:13px 10px 0;
		border-radius:10px;
		padding:18px 12px 13px 17px;
		background: #fff;
	}
	.user-info{
		margin-top:4px;
		margin-bottom:8px;
		.user-name{
			font-size:15px;
			font-family:PingFangSC-Medium;
			font-weight:500;
			color:rgba(42,42,42,1);
		}
		.work-date{
			font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(164,164,164,1);
		}
	}
	.work-content{
		margin-bottom:8px;
	}
	.work-tag{
		width:67px;
		padding:2px 8px 3px 9px;
		background:rgba(246,238,253,1);
		.tag-name{
			font-size:10px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
		}
	}
	.flex-sub{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
		padding:10px 0;
	}
	.list-item{
		padding:18px 16px 17px 20px;
		background: #fff;
		margin:13px 10px 0;
		border-radius: 10px;
		.list-item-title{
			font-size:16px;
			font-weight:400;
			color:rgba(42,42,42,1);
			margin-bottom:10px;

		}
	}
	.marginRight10{
		margin-right:10px;
	}
	.lineHeight18{
		line-height:18px;

	}
	.lineHeight20{
		line-height: 20px;

	}
	.list-content-item{
		font-size:14px;
		font-weight:400;
		color:rgba(137,136,136,1);
		margin-bottom:12px;
	}

</style>
