<template>
	<view >
		<cu-custom>
				<block slot="left">
					<view class="cuIcon-back font-size-big  color-regular" @click="goBack()"></view>
				</block>
				<block slot="content">
					
				</block>
				<block slot="right">
					<view class=" font-size-big color-regular " style="margin-right:20px;">分享</view>
				</block>
			</cu-custom>
		<view class="express-container position_relative" >
			<view class="top-container">
				<view class="font-weight-bold success-tag text-white">下单成功</view>
				<view class="text-white">请等待快递小哥上门揽件哦～</view>
			</view>
			<view class="express-tag">
				<view class="margin-bottom-normal font-size-big">
					<text class="color-regular" style="margin-right:6px;">运单编号 : </text>
					<text>{{express.id}}</text>
				</view>
				<view class="margin-bottom-normal font-size-big">
					<text class="color-regular" style="margin-right:6px;">下单时间 : </text>
					<text>{{new Date() | formatTime('YMDHMS')}}</text>
				</view>
				<view class="margin-bottom-normal font-size-big">
					<text class="color-regular" style="margin-right:6px;">下单人 : </text>
					<text>{{userInfo.name || ''}}/{{userInfo.mobile}}</text>
				</view>
			</view>
		</view>
		<view class="btn-container flex justify-between position_absolute">

			<view class="btn-tag flex-1" @click="operateItem('again')">继续下单</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['expressCatalog','userInfo']),
		data() {
			return {
				expressItem:'',
				express:{
					way:'',//区分是快递还是调拨
					id:'',//快递的ID,
					catalog:'',//区分是物流还是速递
				},
				type:''
				
			}
		},
		methods: {
			goBack(){
				if(this.type=='create'){
					uni.navigateBack({
						delta:2
					})
				}else if(this.type=='distribute'){
					uni.navigateBack({
						delta:3
					})
				}
			},
			/*
				获得快递的编号信息
			*/
		   getExpressItemInfo(type,id){
			   this.$ajax('Express',{
				   way:type,
				   id:id
			   },res=>{
				   this.expressItem=res;
				   console.log(this.expressItem)
			   })
		   },
		   /*
				继续下单/查看详情
		   */
		  operateItem(type){
			  switch(type){
				  case 'check':
				  break;
				  case 'again':
				  let val=this.express.catalog==this.expressCatalog.express?'speed':'logistics';
				   uni.redirectTo({
				  	url:"../create-express/create-express?type="+val
				  })
				  break;
				  
			  }
		  }
		},
		onLoad(params){
			if(params){
				// this.type=params.type;
				console.log(params)
				this.express={
					way:params.way,
					id:params.id,
					catalog:params.catalog
				}
				this.type=params.type;

			}
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1)
	}
	.express-container{
		height:226px;
		width:100%;
		background: url('../../../../../static/img/work/express/other/top-bg.png') no-repeat 0 0;
		background-size: cover;
		.top-container{
			position: absolute;
			right:80px;
			bottom:66px;
			.success-tag{
				font-size:24px;
				text-indent: 2em;
				margin-bottom:6px;
			}
		}
		.express-tag{
			background: url('../../../../../static/img/work/express/other/send-info.png') no-repeat center center;
			background-size: cover;
			position:absolute;
			bottom:-140px;
			right:22px;
			width:86%;
			height:177px;
			padding-top:48px;
			padding-left:42px;
		}

	}
	.btn-container{
		
		
		width:100%;
		background:#fff;
		padding:10px 20px;
		bottom:0;
		.btn-tag{
			padding:0 53px;
			text-align: center;
			height:36px;
			line-height:36px;
			color:#00B2F2;
			border-radius:18px;
			border:1px solid rgba(0,178,242,1);
		}
	}
	
</style>
