<template>
	<view>
		<normal-title content="上传附件" :isTag="true"></normal-title>
		<view class="file-container bg-white margin-bottom-normal">
			<view class="bg-white " style="padding:10upx;">
				<view class="grid col-4 grid-square">
					<view class="bg-img " @tap="checkImg(index)"
					v-for="(item,index) in files" :key="index" :style="[{ backgroundImage:'url(' + files[index] + ')' }]"></view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import normalTitle from './common/normal-title.vue'
	import downloader from '../common/img-downloader.js'
	export default {
		components:{normalTitle},
		data() {
			return {
				
			};
		},
		props:{
			files:Array
		},
		methods:{
			checkImg(index){
				uni.previewImage({
					count:index,
					urls:this.files,
					loop:true,
					indicator:'number',
					longPressActions:{
						itemList:['保存到相册'],
						success: (data) => {
							if(data.tapIndex+1==1){
								uni.getImageInfo({
									src:this.files[index],
									success: (res) => {
										let promise=downloader.load(res.path,res.path);
										promise.then(([err, res])=>{
											if(res){
												uni.showToast({
													title:'已保存到相册',
													icon:'none'
												})			
											} 
										});							
									}
								})
							}
							
						}
					}
				})	
			},
		}
	}
</script>

<style scoped>
.file-container{
	padding:0 30upx;
}
.file-title{
	padding:34upx 0 32upx;
}
</style>
