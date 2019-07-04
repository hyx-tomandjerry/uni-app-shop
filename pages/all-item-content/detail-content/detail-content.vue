<template>
	<view >
		<cu-custom :isBack="true">
			<block slot="left">
				<text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text>
			</block>
			<block slot="content">
				<view class=" font-weight-bold" style="font-size:18px;margin-bottom:14px;">详情内容</view>
			</block>
			<block slot="right">
				<text class="text-blue font-size-small font-weight-normal"  @click="writeLog()"
					  v-if="userInfo.type==shoperObj.type && itemInfo.report==report"
				>编写回执</text>
			</block>
		</cu-custom>
		<view class="container borderTop bg-white margin-bottom-normal">
			<view class="font-size-big color-normal font-weight-bold" >{{itemInfo.name}}</view>
			<view class="desc flex justify-between  font-weight-normal" style="margin:14px 0 18px 0;">
				<view class="font-size-normal font-weight-normal color-normal">
					<text class="font-size-small font-weight-normal" style="color:rgba(24,111,148,1);margin-right:15px;">{{itemInfo.applierName}}</text>
					<text style="color:rgba(137,136,136,1);" class="font-size-small font-weight-normal">{{itemInfo.applyDate | formatTime('YMDHMS')}}</text>
				</view>
			</view>
			<view >
				<!--<image :src="itemInfo.coverurl" style="width:100%;max-height:170px;margin-bottom:10px;border-radius: 8px;" @click="showImg()"></image>-->
				<div class="coverImg" :style="[{ backgroundImage:'url(' + itemInfo.coverurl+ ')' }]" @click="showImg()">

				</div>
			</view>
			<view class="detail"  >
				<view class="v_html" v-html="itemInfo.content"  @click="cliclHtml()" ></view>

			</view>
			
		</view>

		<view class="files-container bg-white" v-if="itemInfo.files" style="padding:10px 15px;">
			<view class="flex justify-between" >
				<view style="padding:5px 15px;" class="font-weight-bold color-normal">附件</view>
				<view class="cuIcon-down color-placeholder" style="font-size:20px;padding-right:10px;" @click="downFiles()"></view>
			</view>
			<view v-for="(item,index) in itemInfo.files" :key="index" >
				<view v-if="item.postfix.toLowerCase()=='jpg' || item.postfix.toLowerCase()=='png'"
					  @click="chooseFiles(item)"
					  style="padding:10px 15px;" class="position_relative borderBottom flex justify-start align-center">
					<image :src="item.url" style="width:50px;height:50px;margin-right:10px;"></image>
					<view>
						<view style="margin-bottom:6px;">{{item.name}}</view>
						<view class="flex justify-start">
							<view style="margin-right:20px;"><text style="margin-right:10px;">创建人:</text>{{itemInfo.applierName}}</view>
							<view>{{itemInfo.applyDate |  formatTime('YMDHMS')}}</view>
						</view>
					</view>
					<text class=" color-placeholder position_absolute"
						  :class="item.isChecked?'cuIcon-squarecheck':'cuIcon-square'"
						  style="font-size:18px;right:10px;top:20px;" ></text>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='imageModal'?'show':''" @click="hideModal()">
			<view class="cu-dialog">
				<view class="bg-img" :style="[{ backgroundImage:'url(' + itemInfo.coverurl+ ')' }]" style="min-height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="downImg()">
							<text class="cuIcon-down " style="font-size:20px;"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='download'?'show':''"  @click="hideModal()">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content" style="font-size:12px;">下载成功</view>
				</view>
		
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import downloader from '../../../common/img-downloader.js'
	export default{
		computed:mapState(['userInfo','shoperObj','report']),
		data(){
			return{
				itemInfo:{},
				shopInfo:'',
				type:'',
				modalName:'',
				fileList:[]
				
			}
		},
		methods: {
			downFiles(){

				this.itemInfo.files.forEach(item=>{
					if(item.isChecked){
						this.fileList.push(item)
					}
				})
				this.fileList.forEach(file=>{
					uni.getImageInfo({
						src:file.url,
						success:(res)=>{
							let promise=downloader.load(res.path,res.path);
							promise.then(([err, res])=>{
								if(res){
									uni.showToast({
										title:'下载成功',
										icon:'none'
									})
									this.itemInfo.files.forEach(item=>{
										item.isChecked=false;
									})
								}
							});
						}
					})
				})
			},
			chooseFiles(item){
				item.isChecked=!item.isChecked;
			},
			cliclHtml(e){
				e = e||window.event; //兼容IE8
				let target = e.target||e.srcElement;  //判断目标事件
				if(target.tagName.toLowerCase()=="img"){
					console.log(target.src)
					this.itemInfo.coverurl=target.src;
					this.modalName='imageModal'
				}

			},
			htmlDown(event){
				console.log(event)
			},
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
			},
			downImg(){
				 uni.getImageInfo({
					 src:this.itemInfo.coverurl,
					 success:(res)=>{
						let promise=downloader.load(res.path,res.path);
						promise.then(([err, res])=>{ 
							console.log(res)
							console.log(res.statusCode)//下载结果 
							if(res){
								console.log('下载成功')
								this.modalName='download';
								
							}            // err 和 res 只会有一个存在，另一个为null  
						});
					 }
				 })
			},
			showImg(){
				this.modalName='imageModal'

			},
			writeLog(){
				uni.navigateTo({
					url:"../../tab-item-content/work-center/create-log/create-log?id="+this.itemInfo.id+'&type=article'
				})
			},
			getItemInfo(id) {
				this.$ajax('Article',{id:id},res=>{
					if(res.files){
						res.files.forEach(item=>{
							item.isChecked=false;
						})
					}
					this.itemInfo=res;

				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(option){
			if(option){
				this.getItemInfo(option.id)
				this.type=option.type;
			}
		}
	}
</script>

<style scoped>
	page{
			background:rgba(247,247,247,1);

		font-size:15px;
		font-weight: 500;
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
