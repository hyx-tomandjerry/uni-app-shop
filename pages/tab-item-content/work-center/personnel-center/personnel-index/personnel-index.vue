<template>
	<view style="background: url(../../../../../static/img/work/head.png) center top / 100% no-repeat;width: 100%;">
		<view style="padding:65px 25px 0 27px;">
			
			<view class="operate-item flex justify-between align-center bg-white " style="padding:12px 8px 14px 27px;border-radius:6px;border-left:5px solid #FFC613" @click="opereateItem('inner')">
				<view class="font-size-normal  font-weight-bold">公司组织</view>
				<view><image src="../../../../../static/img/work/person/inner.png" style="width:59px;height:59px;vertical-align: middle;"></image></view>
			</view>
			
			<view class="operate-item flex justify-between align-center bg-white " style="padding:12px 8px 14px 27px;border-radius:6px;border-left:5px solid #FF4C4C;margin-top:11px;margin-bottom:11px;" @click="opereateItem('outer')">
				<view class="font-size-normal  font-weight-bold">外部组织</view>
				<view><image src="../../../../../static/img/work/person/outer.png" style="width:59px;height:59px;vertical-align: middle;"></image></view>
			</view>
			
			<!-- <view class="operate-item flex justify-between align-center bg-white " style="padding:12px 8px 14px 27px;border-radius:6px;border-left:5px solid #15AFA1;"  @click="opereateItem('worker')">
				<view class="font-size-normal  font-weight-bold">内部组织</view>
				<view><image src="../../../../../static/img/work/person/worker.png" style="width:59px;height:59px;vertical-align: middle;"></image></view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			opereateItem(type){
				switch(type){
					case 'inner':
					uni.navigateTo({
						url:'../personnel-inner/personnel-inner'
					})
					break;
					case 'outer':
						uni.navigateTo({
							url:'../personnel-outer/personnel-outer'
						})
					break;
					case 'worker':
					break;
				}
			}
		}
	}
</script>

<style lang="less">
	
</style>
