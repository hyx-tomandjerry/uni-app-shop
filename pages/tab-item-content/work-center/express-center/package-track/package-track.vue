<template>
	<view>
		<template>
			<image src="../../../../../static/img/work/express/other/track.png" mode="widthFix" lazy-load class="track-img"></image>
			<view class="content">
				<view class="express-info">
					<view class="flex">
						<view class="font-size-mini color-regular flex-xs">寄件地址</view>
						<view class="flex-1 font-size-mini color-normal">
							<view style="margin-bottom:10upx;">
								<text style="margin-right:30upx;">{{expressDetail.senderName || ''}}</text>
								<text>{{expressDetail.senderMobile}}</text>
							</view>
							<view class="color-regular font-size-mini">
								{{expressDetail.depaddr || ''}}
							</view>
						</view>
					</view>
					<view class="flex borderBottom">
						<view class="font-size-mini color-regular flex-xs">收件地址</view>
						<view class="flex-1 font-size-mini color-normal">
							<view style="margin-bottom:10upx;">
								<text style="margin-right:30upx;">{{expressDetail.recverName || ''}}</text>
								<text>{{expressDetail.recverMobile}}</text>
							</view>
							<view class="color-regular font-size-mini">
								{{expressDetail.desaddr || ''}}
							</view>
						</view>
					</view>
					<view>京东快递 {{expressDetail.seq || '71301609174859'}}</view>
				</view>
				
					<view class="load-container">
						<template v-if="trackList.length">
							<block v-for="(item,index) in trackList" :key="index">
								<view class="flex">
									<view class="font-size-mini"
										:class="{
											'color-blue':index==0,
											'color-regular':index!=0
										}"
										style="width:150upx;word-break: break-word;">2019/11/21 20:26:44</view>
									<view class="position_relative">
										<view class="border-line" v-show="index!=trackList.length-1"></view>
										<image :src="index==0?'../../../../../static/icon/insign.png':'../../../../../static/icon/icon-inloading.png'" mode="widthFix" lazy-load class="load-img"></image>
									</view>
									<view class="flex-1" :class="{
											'color-blue':index==0,
											'color-regular':index!=0
										}">
										<view  class="font-size-normal">{{item.opeTitle || ''}}</view>
										<view class=" font-size-mini" style="word-break: break-word;">
											{{item.opeRemark}}
										</view>
									</view>
									
								</view>
							</block>
						</template>
						<template v-else>
							<view class="pos-container">
								<image src="../../../../../static/img/noticeNo.png" mode="widthFix" lazy-load class="img-notice"></image>
								<view>暂无更多物流信息</view>
							</view>
							
						</template>
					</view>
				
				
			</view>
		</template>
		
	</view>
</template>

<script>
	import text from './text.json'
	import normalDetailItem from '../../../../../components/common/normal-detail-item.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	
	import {TraceWaybillApi,WaybillApi} from '../../../../../api/express_api.js'
	export default {
		components:{LxEmpty,normalDetailItem},
		data() {
			return {
				trackList:[],
				expressDetail:{}
			}
		},
		methods: {
			async getItemInfo(id){
				this.expressDetail = await WaybillApi(id)
			},
			async showTrack(){
				this.trackList = await TraceWaybillApi(this.expressDetail.id)
				
			}
		},
		onLoad(options){
			this.getItemInfo(options.id)
			this.trackList=text.reverse();
		}
	}
</script>

<style scoped>
	.track-img{
		width:100%;
		height:300upx !important;
	}
	.content{
		padding:30upx 28upx;
		background:#F7F7F7;
	}
	.express-info{
		background-color: #fff;
		padding:20upx 30upx;
	}
	.express-info>view:first-child{
		margin-bottom: 20upx;
	}
	.express-info>view:nth-child(2){
		padding-bottom: 20upx;
	}
	.express-info>view:last-child{
		padding:10upx 0;
		font-size:12px;
		color:#898888;
	}
	.load-container{
		margin-top:26upx;
		background-color: #fff;
		padding:40upx 30upx;
		min-height:600upx;
		position: relative;
	}
	.load-container>view{
		margin-bottom:90upx;
		height:140upx;
	}
	.load-img{
		width:54upx;
		margin:0 20upx;
		height:54upx !important;
		flex-shrink: 0;
	}
	.border-line{
		width:1upx;
		height:180upx;
		position:absolute;
		background:#CACACA;
		left:50%;
		transform: translateX(-50%);
		top:50upx;
	}
	.img-notice{
		width:240upx;
		height:250upx !important;
		
	}
	.pos-container{
		position:absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
	.pos-container>view{
		margin-top:30upx;
		color:#898888
	}
</style>
