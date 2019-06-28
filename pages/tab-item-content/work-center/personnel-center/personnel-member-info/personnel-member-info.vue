<template>
	<view>
		<view v-if="type=='member'">
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
		<view v-if="type=='company'">
			<cu-custom bgColor="#1967B4">
				<block slot="left">
					<view class="cuIcon-back font-size-big font-weight-bold " @click="goBack()"></view>
				</block>
				<block slot="content">
					<view>公司详情</view>
				</block>
				<block slot="right">
					<view class="cuIcon-more font-size-big font-weight-bold "></view>
				</block>
			</cu-custom>

			<view class="position_relative"
				  style="height:200px;background:url('../../../../../static/img/bg.png') no-repeat;background-size:cover">
				<view class="position_absolute flex justify-start align-center" style="bottom:14px;left:22px;">
					<image :src="user.logourl?user.logourl:'../../../../../static/img/default.png'" class="company-img"></image>
					<view class=" text-white font-weight-bold" style="font-size:20px;">{{user.name}}</view>
				</view>
			</view>

			<view class="company-info-container bg-white margin-bottom-normal">
				<view class="font-size-big font-weight-bold">客户信息</view>
				<view class="company-info">
					<view class="company-info-item flex justify-start">
						<view class="color-placeholder text-right" style="margin-right:34px;width:25%;">客户名称</view>
						<view class="color-normal">{{user.name}}</view>
					</view>
					<view class="company-info-item flex justify-start">
						<view class="color-placeholder text-right" style="margin-right:34px;width:25%;">客户简称</view>
						<view class="color-normal">{{user.alias||'无'}}</view>
					</view>
					<view class="company-info-item flex justify-start">
						<view class="color-placeholder text-right" style="margin-right:34px;width:25%;">联系人</view>
						<view class="color-normal">{{user.contactor}}</view>
					</view>
					<view class="company-info-item flex justify-start">
						<view class="color-placeholder text-right" style="margin-right:34px;width:25%;">联系电话</view>
						<view class="color-normal">{{user.telephone}}</view>
					</view>
					<view class="company-info-item flex justify-start">
						<view class="color-placeholder text-right" style="margin-right:34px;width:25%;">公司地址</view>
						<view class="color-normal" style="font-size:12px;">{{user.provinceName || ''}}{{user.districtName || ''}}{{user.cityName || ''}}{{user.address || ''}}</view>
					</view>
					<view class="company-info-item flex justify-start">
						<view class="color-placeholder text-right" style="margin-right:34px;width:25%;">开始合作时间</view>
						<view class="color-normal" v-if="user.bgndate">{{user.bgndate | formatTime('YMD')}}</view>
					</view>
					<view class="company-info-item flex justify-start">
						<view class="color-placeholder text-right" style="margin-right:34px;width:25%;">合作截止时间</view>
						<view class="color-normal" v-if="user.duedate">{{user.duedate | formatTime('YMD')}}</view>
					</view>
				</view>
			</view>

			<view class="company-info-container bg-white">
				<view class="font-size-big font-weight-bold">联系人信息</view>
				<view class="company-info borderBottom flex justify-start align-center">
					<view style="width:15%;">
						<image src="../../../../../static/img/cute.jpg"  	style="width:40px;height:40px;border-radius: 50%;vertical-align: middle;"></image>

					</view>
					<view style="margin-left:10px;">
						张三/18838280588
					</view>
				</view>
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
				
				user:'',
				companyMemberList:[],
				type:'',
				img:'../../../../../static/img/default.png',
				page:1
			}
		},
		methods: {
			getMemberList(id){
				switch(this.type){
					case 'member':
						this.$ajax('Users',{
							team:-1,
							status:-1,
							type:1
						},res=>{
							res.forEach(item=>{
								if(item.id==id){
									if(!item.headurl){
										item.headurl='../../../../../static/img/default.png'
									}
									this.user=item;

								}
							})
						})
					break;
					case 'company':
						this.$ajax('Vendorship',{
							id:id
						},res=>{
							this.user=res;
						})
							this.$ajax('ExternalUsers',{
								department:id,
								peer:0,
								offset:this.$utils.getOffset(this.page)
							},res=>{
								this.companyMemberList=res;
							})
				}

			},

			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(options){
			console.log(options)
			if(options){
				this.type=options.type;
				this.getMemberList(options.id)

				
			}
			
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1)
	}
	.company-img{
		margin-right:10px;width:52px;height:52px;vertical-align: center;border-radius:50%;
	}
	.company-info-container{
		padding-top:27px;
		padding-left:16px;
		padding-bottom:27px;
		.company-info{
			padding-top:14px;
			.company-info-item{
				margin-bottom:8px;
			}
		}
	}

</style>
