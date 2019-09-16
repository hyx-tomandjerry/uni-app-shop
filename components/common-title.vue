<template>
	<view >
		<view class="container borderTop bg-white margin-bottom-normal">
			<view class="font-size-big color-normal font-weight-bold" >
				<slot name="title"></slot>
			</view>
			<view class="desc  font-weight-normal" style="margin:14px 0 18px 0;">
				<view class="font-size-normal font-weight-normal color-normal flex justify-start">
					<view class="font-size-small font-weight-normal" style="color:rgba(24,111,148,1);margin-right:15px;">
						<slot name="senderName"></slot>
					</view>
					<view style="color:rgba(137,136,136,1);" class="font-size-small font-weight-norma color-placeholder">
						<slot name="time"></slot>
					</view>
				</view>
			</view>
			<view >
				<slot name="cover">
					<div class="coverImg" :style="[{ backgroundImage:'url(' + itemInfo.coverurl+ ')' }]" @click="showImg()" v-if="itemInfo.coverurl">
					
					</div>
				</slot>
			</view>
			<view class="detail">
				<slot name="content"></slot>
			</view>
			
		</view>
		
			<view class="files-container bg-white"  style="padding:10px 15px;"  >
				<view class="flex justify-between borderBottom" >
					<view style="padding:5px 15px;" class="font-weight-bold color-normal">附件</view>
				</view>
				<view v-if="type=='article'">
					<view  v-for="(item,index) in itemInfo.files" :key="index" @click="downFiles(item)" v-if="itemInfo.files">
						<view v-if="item.postfix && (item.postfix.toLowerCase()=='jpg' || item.postfix.toLowerCase()=='png')"
							  style="padding:10px 15px;height:76px;" class="position_relative  flex justify-start align-center align-center borderBottom">
							<view style="width:10%;margin-right:10px;">
								<image :src="item.url"  style="width:100%;height:26px;vertical-align: middle"></image>
							</view>
							<view style="flex:1;">
								<view style="margin-bottom:6px;width:80%" class="font-size-normal text-ellipse color-blue">{{item.name}}</view>
							</view>
						</view>
					
						<view v-else
							  style="padding:10px 15px;" class="position_relative  flex justify-start align-center align-center">
							  <view style="width:5%;margin-right:10px;">
								  <image src="../../../static/img/article/word.png" style="width:100%;height:21px;vertical-align: middle;"
								  	   v-if="item.postfix && item.postfix.toLowerCase()=='doc'"></image>
								  <image src="../../../static/img/article/ppt.png" style="width:100%;height:21px;vertical-align: middle;"
								  	   v-else-if=" item.postfix && item.postfix.toLowerCase()=='ppt'"></image>
								  <image src="../../../static/img/article/pdf.png" style="width:100%;height:21px;vertical-align: middle;"
								  	   v-else-if=" item.postfix && item.postfix.toLowerCase()=='pdf'"></image>
								  <image src="../../../static/img/article/other.png" style="width:100%;height:21px;vertical-align: middle;"
								  	   v-else></image>
							  </view>
							<view  style="width:33%">
								<view style="margin-bottom:6px;border-bottom:1px solid #00BFFF;" class="font-size-mini  color-blue text-ellipse">{{item.name}}</view>
							</view>
						</view>
					</view>
				</view>	
				<view v-if="type=='notice'">
					<view class="bg-white padding">
						<view class="grid col-4 grid-square">
							<view class="bg-img" @click="checkImage(item)"
							v-for="(item,index) in itemInfo.files" :key="index" :style="[{ backgroundImage:'url(' + item.url + ')' }]"></view>
						</view>
					</view>
				</view>	
			</view>
		<imageModel :isShow="modalName=='imageModal'" :url="itemInfo.coverurl || imgItem.url" @hideModal="hideModal" @downImg="downImg"></imageModel>
		<!-- <view class="cu-modal" :class="modalName=='imageModal'?'show':''" @click="hideModal()">
			<view class="cu-dialog">
				<view class="bg-img" :style="[{ backgroundImage:'url(' + itemInfo.coverurl+ ')' }]" style="min-height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="downImg()">
							<text class="cuIcon-down " style="font-size:20px;"></text>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<simpleModel :isShow="modalName=='downModel'" @hideSimpleModel="hideModal" v-if="modalName=='downModel'">
			<block slot="content">下载成功</block>
		</simpleModel>
		
		<view class="cu-modal" :class="modalName=='download'?'show':''"  @click="hideModal()">
			<view class="cu-dialog">
				<view class="padding-xl">
					<view class="font-size-mini">下载文件......</view>
					<view class="cu-progress round margin-top xs">
						<view class="bg-green" :style="{width:loading}">{{loading}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import downloader from '../common/img-downloader.js'
	import imageModel from './image-model.vue'
	import simpleModel from './simple-model.vue'
	export default{
		computed:mapState(['userInfo','shoperObj','report']),
		name:'commone-title',
		props:{
			itemInfo: {
				type:Object,
				default:()=>{}
			},
			type:{
				type:String,
				default:''
			}
			
		},
		components:{imageModel,simpleModel},
		data(){
			return{
				modalName:'',
				loading:0,
				imgItem:''
			}
		},
		methods: {
			checkImage(item){
				this.modalName="imageModal";
				this.imgItem=item;
				console.log(this.imgItem)
			},
			downFiles(item){
				if(item.postfix){
					if(item.postfix.toLowerCase()=='jpg' || item.postfix.toLowerCase()=='png'){
						uni.getImageInfo({
							src:item.url,
							success:(res)=>{
								let promise=downloader.load(res.path,res.path);
								promise.then(([err, res])=>{
									if(res){
										let count=0;

										this.modalName='download';
										var timeout =setInterval(()=>{
											count+=30;
											if(count>=100){
												this.hideModal();
												uni.showToast({
													title:'下载成功',
													icon:'none'
												})
												clearInterval(timeout)
												this.loading=0;
												count=0;



											}else{
												this.loading=count+'%'
											}
										},500)
									}
								});
							}
						})
					}else{
						uni.downloadFile({
							url: item.url,
							success: (res) => {
								let count=0;

								this.modalName='download';
								var timeout =setInterval(()=>{
									count+=10;
									if(count>=100){
										this.hideModal();
										uni.openDocument({
											filePath: res.tempFilePath,
											success: (res)=> {
												clearInterval(timeout)
												this.loading=0;
												count=0;
											}
										});



									}else{
										this.loading=count+'%'
									}
								},500)

							}
						});
					}
				}

				

			},
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
			},
			downImg(){
				 uni.getImageInfo({
					 src:this.itemInfo.coverurl || this.imgItem.url,
					 success:(res)=>{
						let promise=downloader.load(res.path,res.path);
						promise.then(([err, res])=>{ 
							if(res){
								this.modalName='downModel';	
							}            // err 和 res 只会有一个存在，另一个为null  
						});
					 }
				 })
			},
			showImg(){
				this.modalName='imageModal'

			},
			

		},
		
	}
</script>

<style scoped>
	page{
			background:rgba(247,247,247,1);

		font-size:15px;
		font-weight: 500;
	}
	.padding-xl{
		padding:20px 17px;
	}
	.detail >>> div{
		margin-bottom:15px;
		
	}
	.container{
		padding:10px 13px 10px 14px;

	}
	.desc{
		padding:10px 0;
	}

	.title{
		font-size:20px;
		font-weight: 600;
		padding:10px 0;
	}
	.v_html{
		width:100%
	}
	.v_html >>> img{
        width: 100%;
		
		border-radius: 8px;
    }
	.v_html >>> pre {
		white-space: pre-wrap;
   }
   .v_html >>> strong{
	   font-size:20px !important;
   }
   .img{
	   width:50px;height:50px;border-radius: 50%;vertical-align: middle;margin-right:10px
   }
   .shop-name{
	   color:#00BFFF;font-weight: 600;font-size:17px;display: block;margin-bottom:6px;
   }
	.coverImg{
		width:100%;height:143px;background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border-radius:6px;
		margin-bottom:14px;
	}
</style>
