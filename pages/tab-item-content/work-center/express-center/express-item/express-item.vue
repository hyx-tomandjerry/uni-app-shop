<template>
	<view>
		<view class="item-container bg-white borderBottom">
			<view class="item-title flex justify-between align-center">
				<view class="flex justify-start align-center">
					<image src="../../../../../static/img/work/express/other/BG.png"
						   style="width:50px;height:46px;vertical-align: middle;margin-right:16px;"></image>
					<view>
						<view class="color-normal font-size-normal">京东快递</view>
						<view class="font-size-litter " style="color:rgba(66,176,237,1);">71301609174859</view>
					</view>
				</view>
				<view>代取件</view>
			</view>
		</view>
		<view class="item-info-container borderBottom">
			<view class="item-info-list flex justify-start align-center" >
				<view class="color-placeholder font-size-normal" style="margin-right:27px;width:17%;">寄件类型</view>
				<view class="color-normal font-size-normal">特快送</view>
			</view>
			<view class="item-info-list flex justify-start align-center" >
				<view class="color-placeholder font-size-normal" style="margin-right:27px;width:17%;">寄件地址</view>
				<view class="color-normal font-size-normal">宜家仓库02 13223451234（南风）</view>
			</view>
			<view class="item-info-list flex justify-start align-center" >
				<view class="color-placeholder font-size-normal" style="margin-right:27px;width:25%;"></view>
				<view class="color-normal font-size-normal">上海 上海市 长宁区 金钟路658号东华 大学科技园4栋6层608室</view>
			</view>
			<view class="item-info-list flex justify-start align-center" >
				<view class="color-placeholder font-size-normal" style="margin-right:27px;width:17%;">收件地址</view>
				<view class="color-normal font-size-normal">宜家仓库02 13223451234（南风）</view>
			</view>
			<view class="item-info-list flex justify-start align-center" >
				<view class="color-placeholder font-size-normal" style="margin-right:27px;width:25%;"></view>
				<view class="color-normal font-size-normal">上海 上海市 长宁区 金钟路658号东华 大学科技园4栋6层608室</view>
			</view>
			<view class="item-info-list flex justify-start align-center" >
				<view class="color-placeholder font-size-normal" style="margin-right:27px;width:17%;">是否到付</view>
				<view class="color-normal font-size-normal">是</view>
			</view>
			<view class="item-info-list flex justify-start align-center" >
				<view class="color-placeholder font-size-normal" style="margin-right:27px;width:17%;">包裹备注</view>
				<view class="color-normal font-size-normal">无</view>
			</view>
		</view>
		<view class="item-info-time bg-white">
			<view class="flex justify-start" style="margin-bottom:10px;">
				<view class="font-size-normal color-placeholder" style="margin-right:27px;width:17%;">订单编号</view>
				<view class="font-size-normal color-blue">789345672</view>
			</view>
			<view class="flex justify-start">
				<view class="font-size-normal color-placeholder" style="margin-right:27px;width:17%;">下单时间</view>
				<view class="font-size-normal color-blue">789345672</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
		
			}
		},
		components:{
			
		},
		onLoad(){
			
		},
	}
</script>
<style lang="less">
	.item-container{
		.item-title{
			padding:23px 26px 11px 15px;
		}

	}
	.item-info-container{
		background:#fff;
		padding-top:18px;
		padding-left:21px;
		.item-info-list{
			margin-bottom:8px;
		}
	}
	.item-info-time{
		padding-top:18px;
		padding-left:21px;
		padding-bottom:36px;
	}
</style>