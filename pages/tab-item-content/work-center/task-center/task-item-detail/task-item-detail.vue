<template>
	<view>
		<!--任务详情 start-->
		<view class="task-detail borderTop margin-bottom-normal">
			<view class="task-title  flex justify-between">
				<view class="font-size-big color-normal font-weight-bold">上海zara旗舰店01001</view>
				<view class="item-tag">已接受</view>
			</view>
			<view class="item-detail flex justify-start">
				<view style="width:18%;" class="text-left color-regular">任务名称 : </view>
				<view style="flex:1;text-align:left;" class="color-normal">门店陈列整改</view>
			</view>
			<view class="item-detail flex justify-start">
				<view style="width:18%;" class="text-left color-regular">派发人 : </view>
				<view style="flex:1;text-align:left;" class="color-normal">张三</view>
			</view>
			<view class="item-detail flex justify-start">
				<view style="width:18%;" class="text-left color-regular">验收人 : </view>
				<view style="flex:1;text-align:left;" class="color-normal">张三</view>
			</view>
			<view class="item-detail flex justify-start">
				<view style="width:18%;" class="text-left color-regular">执行人 : </view>
				<view style="flex:1;text-align:left;" class="color-normal">张三</view>
			</view>
			<view class="item-detail flex justify-start">
				<view style="width:18%;" class="text-left color-regular">开始时间 : </view>
				<view style="flex:1;text-align:left;" class="color-normal">2019-03-29  </view>
			</view>
			<view class="item-detail flex justify-start">
				<view style="width:18%;" class="text-left color-regular">结束时间 : </view>
				<view style="flex:1;text-align:left;" class="color-normal">2019-05-29  </view>
			</view>
			<view class="item-detail flex justify-start">
				<view style="width:12%;" class="text-left color-regular">备注 : </view>
				<view style="flex:1;text-align:left;" class="color-normal">啦啦啦啦啊啦啦啦啦啦啦啦～</view>
			</view>
		</view>
		<!--任务详情 end-->
		<!--任务附件 start-->
		<view class="task-files bg-white margin-bottom-normal">
			<view class="font-size-normal color-normal font-weight-bold" style="margin-bottom:15px;">附件</view>
			<view class="grid col-4 grid-square">
				<view class="bg-img" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
			</view>
		</view>
		<!--任务附件 end-->
		<!--任务动态 start-->
		<view class="task-trend bg-white margin-bottom-normal">
			<view class="font-size-normal color-normal font-weight-bold" style="margin-bottom:15px;">任务动态</view>
			<view class="task-trend-list">
				<view class="trend-item flex justify-start " >
					<view class="item-time text-center">
						<view style="font-size:11px;" class="color-normal">18：32</view>
						<view style="font-size:9px;" class="color-regular">2019-03-29</view>
					</view>
					<view style="margin:0 13px;">
						<view style="width:14px;height:14px;border-radius:50%;background:rgba(66,176,237,1);"></view>
						<view style="width:1px;height:50px;background:#ccc;margin-left:6px;"></view>
					</view>
					<view >张晓晓创建任务</view>
				</view>
				<view class="trend-item flex justify-start" >
					<view class="item-time text-center">
						<view style="font-size:11px;" class="color-normal">18：32</view>
						<view style="font-size:9px;" class="color-regular">2019-03-29</view>
					</view>
					<view style="margin:0 13px;">
						<view style="width:14px;height:14px;border-radius:50%;background:rgba(66,176,237,1);"></view>
						<view style="width:1px;height:50px;background:#ccc;margin-left:6px;padding-bottom:10px;"></view>
					</view>
					<view >张晓晓创建任务</view>
				</view>
				<view class="trend-item flex justify-start" >
					<view class="item-time text-center">
						<view style="font-size:11px;" class="color-normal">18：32</view>
						<view style="font-size:9px;" class="color-regular">2019-03-29</view>
					</view>
					<view style="margin:0 13px;">
						<view style="width:14px;height:14px;border-radius:50%;background:rgba(66,176,237,1);"></view>
						<view style="width:1px;height:50px;background:#ccc;margin-left:6px;"></view>
					</view>
					<view >张晓晓创建任务</view>
				</view>
				<view class="trend-item flex justify-start" >
					<view class="item-time text-center">
						<view style="font-size:11px;" class="color-normal">18：32</view>
						<view style="font-size:9px;" class="color-regular">2019-03-29</view>
					</view>
					<view style="margin:0 13px;">
						<view style="width:14px;height:14px;border-radius:50%;background:rgba(66,176,237,1);"></view>
						<view style="width:1px;height:50px;background:#ccc;margin-left:6px;"></view>
					</view>
					<view >张晓晓创建任务</view>
				</view>
				<view class="trend-item flex justify-start" >
					<view class="item-time text-center">
						<view style="font-size:11px;" class="color-normal">18：32</view>
						<view style="font-size:9px;" class="color-regular">2019-03-29</view>
					</view>
					<view style="margin:0 13px;">
						<view style="width:14px;height:14px;border-radius:50%;background:rgba(66,176,237,1);"></view>
					</view>
					<view >张晓晓创建任务</view>
				</view>

			</view>
		</view>
		<!--任务动态 end-->

		<!--按钮 start-->
		<view class="btn-container bg-white">
			<view class="submit-btn">申请验收</view>
		</view>
		<!--按钮 end-->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
				],

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.task-detail{
		padding:14px 13px 22px;
		background-color: #fff;
		.task-title{
			margin-bottom: 14px;
			.item-tag{
				width: 70px;
				color:rgba(10,91,157,1);
				height: 25px;
				text-align: center;
				line-height:25px;
				background:rgba(180,226,254,1);
				border-radius:11px;
			}
		}
	}
	.item-detail{
		margin-bottom: 8px;
	}
	.task-files,.task-trend{
		padding:17px 16px 19px 14px ;
	}
	.btn-container{
		width: 100%;
		background: #fff;
		padding:11px 13px;
		text-align: center;
		.submit-btn{
			width: 100%;
			background:rgba(66,176,237,1);
			border-radius:5px;
			height: 40px;
			line-height: 40px;
			font-size:16px;
			color:#fff;
		}
	}
</style>
