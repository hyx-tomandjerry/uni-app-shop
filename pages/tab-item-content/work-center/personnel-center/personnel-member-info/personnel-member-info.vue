<template>
	<view>
		<cu-custom bgColor="#1967B4">
			<block slot="left">
				<view class="cuIcon-back font-size-big font-weight-bold " @click="goBack()"></view>
			</block>
			<block slot="content">
				<view>成员详情</view>
			</block>
			<block slot="right">
				<view class="cuIcon-more font-size-big font-weight-bold "></view>
			</block>
		</cu-custom>
		<view class="position_relative" :style="[{ backgroundImage:'url(' + user.headurl  + ')' }]"
		style="height:214px;">
		
			<view class="position_absolute" style="bottom:14px;left:22px;">
				<view style="font-size:29px;" class="font-size-big text-white font-weight-bold">{{user.name}}</view>
				<view class="font-size-normal text-white">{{userInfo.ownerName}}</view>
			</view>
		</view>
		<view class="flex justify-between bg-white font-size-small margin-bottom-normal explain-color" style="padding:17px 12px 15px 23px;">
			<view>手机号</view>
			<view>{{user.mobile}}</view>
		</view>
		<view style="padding-top:14px;padding-left:22px;padding-bottom:16px;" class="bg-white margin-bottom-normal">
			<view class="color-placeholder font-size-litter" style="margin-bottom:4px;">组织结构</view>
			<view class="font-size-normal color-normal font-weight-bold">{{user.departmentName ||'内部组织' }}</view>
		</view>
		
		<view class="bg-white">
			<view class="flex justify-between  font-size-small  explain-color borderBottom" style="padding:17px 12px 15px 23px;">
				<view class="color-normal">职位</view>
				<view class="explain-color">{{user.job || '员工'}}</view>
			</view>
			<view class="flex justify-between  font-size-small explain-color" style="padding:17px 12px 15px 23px;">
				<view class="color-normal">地址</view>
				<view class="explain-color"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				
				user:''
				
			}
		},
		methods: {
			getMemberList(id){
				this.$ajax('Users',{
					team:-1,
					status:-1,
					type:1
				},res=>{
					res.forEach(item=>{
						if(item.id==id){
							if(!item.headurl){
								item.headurl='../../../../../static/img.1/default.png'
							}
							this.user=item;
							console.log(item)
						}
					})
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(options){
			
			if(options){
				this.getMemberList(options.id)
				
			}
			
		}
	}
</script>

<style lang="less">
	
	
</style>
