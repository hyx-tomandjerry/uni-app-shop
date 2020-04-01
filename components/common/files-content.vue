<template>
	<view>
		<normal-detail-title :title="title" v-if="isShowTitle" :isTag="isTag" :borderBottom="borderBottom"></normal-detail-title>
		<view class="  margin-bottom-normal " >
			<view class="file-container" :class="{'bg-white':isWhite}">
				<view class="grid col-4 grid-square">
					<view class="bg-img " @tap="checkImg(index)"
						v-for="(item,index) in files" 
						:key="index" 
						:style="[{ backgroundImage:'url(' + files[index] + ')' }]"></view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import normalDetailTitle from './normal-detail-title.vue'
	import downloader from '../../common/img-downloader.js'
	export default {
		components:{normalDetailTitle},
		data() {
			return {
				
			};
		},
		props:{
			isWhite:{
				type:Boolean,
				default:true
			},
			files:Array,
			isShowTitle:{
				type:Boolean,
				default:true
			},
			isTag:Boolean,
			title:{
				type:String,
				default:'上传附件'
			},
			borderBottom:Boolean
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
												this.$utils.showToast('已保存到相册')		
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
	padding:20upx 30upx;
}
.file-title{
	padding:34upx 0 32upx;
}
</style>
