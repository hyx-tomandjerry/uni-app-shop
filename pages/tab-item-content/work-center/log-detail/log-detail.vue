<template>
	<view >
		<!-- <view class="header flex justify-between bg-white">
			<view><text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text></view>
			<text class="title">日志详情</text>
			<image src="../../../../static/icon/garbage.png"
			@click="deleteLog()"
			style="width:15px;height:15px;"></image>
		</view> -->
		<cu-custom :isBack="true">
			<block slot="left">
				<text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text>
			</block>
			<block slot="content"><text class="title">汇报详情</text></block>
			<block slot="right">
				<image src="../../../../static/icon/garbage.png"
				@click="deleteLog()"
				style="width:15px;height:15px;"></image>
			</block>
		</cu-custom>
		<view class="log-content">
			<view class="cu-form-group">
				<view class="log-title"><text class="text-red ">*</text>标题</view>
				<view><text class="log-title">{{selectItem.title}}</text></view>
			</view>

			<view class="cu-form-group" style="position:relative">
				<view style="padding:20px 0 26px 0;">
					<text class="log-title log-summary">{{selectItem.summary}}</text></view>
				</view>


			</view>

			<view class="bg-white padding">
				<view class="grid col-4 grid-square">
					<view class="bg-img" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + item.url + ')' }]"></view>
				</view>
			</view>

		<view class="img-content margin-top-13">
			<!--<view class="cu-bar bg-white margin-top">-->
				<!--<view class="action">-->
					<!--上传附件-->
				<!--</view>-->
				<!--<view class="action">-->

				<!--</view>-->
			<!--</view>-->

			<!--<view class="cu-form-group">-->
				<!--<view class="flex justify-between">-->
					<!--<image src="../../../../static/img/shop-img/shop1.jpg" style="width:78px;height:78px;margin:0 6px;"></image>-->
					<!--<image src="../../../../static/img/shop-img/shop1.jpg" style="width:78px;height:78px;margin:0 6px;"></image>-->
					<!--<image src="../../../../static/img/shop-img/shop1.jpg" style="width:78px;height:78px;margin:0 6px;"></image>-->
					<!--<image src="../../../../static/img/shop-img/shop1.jpg" style="width:78px;height:78px;margin:0 6px;"></image>-->
					<!--&lt;!&ndash; <view class="padding-xs solids" @tap="ChooseImage()" v-if="imgList.length<4">-->
						<!--<image src="../../../../static/img/work/camera.png" style="width:78px;height:78px;"></image>-->
					<!--</view> &ndash;&gt;-->
				<!--</view>-->
			<!--</view>-->

			<!--<view class="cu-form-group margin-top">-->
				<!--<view class="log-title"><text class="text-red">*</text>抄送人</view>-->
				<!--<view><text class="log-title">TomAndJerry</text></view>-->
			<!--</view>-->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
			    selectItem:{},
				id:'',
				log:{
					title:'',//标题
					content:'',//内容
				},
				imgList: [],
				copyList: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				index:-1,
                CustomBar: this.CustomBar,
                avatar:[]
			}
		},
        onLoad(params){
		    this.id = params.id
			this.getItem()
		},
		methods: {
			//删除日志
			deleteLog(){

			},
			//返回上一级
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getItem(){
			    this.$ajax('WorkReportByShop',{
			        id:this.id
				},res=>{
			        this.selectItem = res
					this.avatar = res.files?res.files:[]
				})
			}
		},
	}
</script>

<style lang="less">
	.header{
		padding: 44px 15px 10px 15px;
		line-height:15px;
		align-items: center;
		border-bottom:1px solid #EEEEED;
		.title{
			font-size:16px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
		}
	}
	.cu-form-group uni-input{
		text-align: right;
	}
	.num{
		font-size:13px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(137,136,136,1);
		position:absolute;
		bottom:13px;
		right:12px;
	}
	.img-content{
		background:#fff;
		margin-bottom:13px;
	}
	.grid.grid-square>uni-view{
		margin-bottom:24px;
		border-bottom:1px solid #EEEEED
	}
	.log-title{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:#2A2A2A
	}
	.log-summary{
		word-break: break-all;
		white-space: pre-wrap;
	}
</style>
