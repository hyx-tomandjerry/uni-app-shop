<template>
	<view>
		<view class="color-normal font-size-normal  title bg-white"><text class="text-red" v-show="isRed">*</text>上传附件</view>
		<view class="cu-form-group margin-bottom-normal">
			<view class="grid col-4 grid-square flex-sub">
					<view class="padding-xs bg-img" 
							:style="[{backgroundImage:'url(' + imgList[index] +')'}]" 
							v-for="(item,index) in imgList"
							:key="index" @tap="ViewImage(index) " 
							:data-url="imgList[index]">
						<view class="cu-tag bg-red" 
							@tap.stop="DelImg(index)" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="padding-xs solids" v-if="imgList.length<4">
						<image :src="src" mode="" @tap="ChooseImageEvent()"  style="width:78px;height:78px;"></image>
					</view>
						
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {UploadTokenApi,RemoveFilesApi} from '../../api/common_api.js'
	export default{
		computed:mapState(['userInfo']),
		data(){
			return{
				imgList: [],
				files: [],
				token:''
			}
		},
		props:{
			src:String,
			xType:[Number,String],
			xTarget:[Number,String],
			fileObj:Object,
			inImgList:Array,
			inFiles:Array,
			isRed:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			ChooseImageEvent(){
				uni.chooseImage({
					count:9,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'],
					success: (res) => {
						const tempFilePaths=res.tempFilePaths;
						console.log(res.tempFilePaths)
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						let length=res.tempFilePaths.length;
						for(var i=0;i<res.tempFilePaths.length;i++){
							let  uploadTask=uni.uploadFile({
								url:this.config.uploadHostUrl+this.token,
								filePath:tempFilePaths[i],
								name:'file',
								formData:{
									'x:type':this.xType,
									'x:owner': this.userInfo.owner,
									'x:creator': this.userInfo.id,
									"x:target":this.xTarget?this.xTarget:''
								},
								success: (uploadFileRes) => {
									let res=JSON.parse(uploadFileRes.data);
									this.files=[...this.files,res.data];
									uni.showLoading({
										title:'正在上传...',
										mask:true
									})
									if(this.files.length==length){
										this.$utils.showToast('上传成功')
										uni.hideLoading()
									}
									this.$emit('upload',this.files)
								},
						
							});
							
						}	
					}
				})
						
			},
			async getUploadToken(){
				this.token = await UploadTokenApi();

			},
			ViewImage(event){
				uni.previewImage({
					urls: this.imgList,
					current: event
				});
			},
			 DelImg(event){
				uni.showModal({
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(event, 1);
							let result =  RemoveFilesApi(this.files[event]);
							if(result){
								this.files.splice(event,1)
								this.$utils.showToast('删除成功')
								this.$emit('upload',this.files)
							}

						
						}
					}
				})
			},
		},
		mounted(){
			if(this.inImgList && this.inImgList.length){
				this.imgList=this.inImgList
			}
			if(this.inFiles && this.inFiles.length){
				this.files=this.inFiles
			}
		},
		created(){
			this.getUploadToken()
			
		}
	}
</script>

<style scoped>
	.title{
		padding:20upx 30upx;
	}

</style>
