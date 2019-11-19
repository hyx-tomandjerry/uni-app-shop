<template>
	<view class="sale-man-item flex justify-between align-center" >
							<image :src="item.headurl?item.headurl:'../../../../../../static/img/default.png'" mode="" class="sale-avatar"></image>
							<view class="flex-1">
								<view class="sale-info flex justify-between">
									<view style="margin-bottom:7px;">
										<text>{{item.name || ''}}</text>
										<text style="margin-left:20px;">{{item.pre}}%</text>
									</view>
									<view class="font-weight-bold font-size-big text-yellow"
										  :class="{
											'text-blue':(index+1)%2==0,
											'text-orange':(index+1)%3==0,
											'text-red':(index+1)%5==0,
											'text-purple':(index+1)%7==0
											}"
									>￥{{item.value || 0}}</view>
								</view>
								<view class="cu-progress round sm striped active" >
									<view
											:class="{
											'bg-yellow':(index+1)%1==0,
											'bg-blue':(index+1)%2==0,
											'bg-orange':(index+1)%3==0,
											'bg-red':(index+1)%5==0,
											'bg-purple':(index+1)%7==0
										}"
											:style="[{'width':item.pre+'%'}]"></view>
									<!-- <view class="bg-color-purple" style="width:60%"></view> -->
								</view>
							</view>
						</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style scoped>
	.sale-man-item{
		margin-bottom: 18px;
		
	}
	.sale-avatar{
		width: 50px;
		height: 50px;
		border-radius:50%;
		margin-right:8px;
		vertical-align: middle;
	}
</style>
