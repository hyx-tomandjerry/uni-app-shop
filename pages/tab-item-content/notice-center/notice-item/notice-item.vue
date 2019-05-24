<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back" style="font-size: 20px;" @click="goBack()"></text></block>
			<block slot="content">{{noticeItem.title}}</block>
		</cu-custom>
		<view class="flex justify-between" style="padding:10px 15px;">
			<view><text class="cuIcon-edit text-blue" style="font-size:18px;margin-right:10px;"></text>{{noticeItem.senderName}}</view>
			<view class="cu-tag round">{{noticeItem.pubdate | formatTime('YMDHMS')}}</view>
		</view>
		<view class="notice-container" style="white-space: pre-wrap;word-break: break-all;padding:10px 15px;">
			{{noticeItem.message}}
		</view>
		<view class="img-area flex justify-start" style="flex-wrap: wrap;padding:10px 15px;">
			<image :src="item.url" style="width:30%;height:100px;margin:5px;border-radius: 10px;" 
			@click="showModal(item)" 
			v-for="(item,index) in noticeItem.files" :key="index"></image>
			
		</view>
		
		<view class="cu-modal" :class="modalName=='Image'?'show':''" @click="hideModal()">
			<view class="cu-dialog">
				<view class="bg-img">
					<view class="cu-bar justify-end text-white">
						<image :src="file.url"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeItem:"",
				modalName:'',
				file:''
			}
		},
		methods: {
			goBack(){
				console.log('jjj')
				uni.navigateBack({
					delta:1
				})
			},
			hideModal(){
				this.modalName=null;
			},
			showModal(item){
				this.modalName='Image';
				this.file=item;
				console.log(this.file)
			},
			getNoticeItemInfo(id){
				this.$ajax('Message',{id:id},res=>{
					console.log(res.message)
					this.noticeItem=res;
				})
			}
		},
		onLoad(options){
			console.log(options)
			if(options.id){
				this.getNoticeItemInfo(options.id)
			}
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
</style>
