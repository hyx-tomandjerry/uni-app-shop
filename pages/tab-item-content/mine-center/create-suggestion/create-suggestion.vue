<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left"><text @click="goBack()" class="cuIcon-back"></text></block>
			<block slot="content">反馈建议</block>
			<block slot="right" class="submit" >
				<text @click="createSuggestion()">提交</text>
			</block>
		</cu-custom>
		<view class="suggestion-content">
			<view class="suggestion-content-title" style="padding-top:10px;"><text class="text-red">*</text>内容描述:</view>
			<view>
				<textarea  
				style="max-height:142px;width:100%;padding-top:17px;padding-left:11px;background:rgba(247,247,247,1);
border-radius:4px;margin-bottom:23px;"
				placeholder="告诉我们您遇到的问题，我们会第一时间处理" v-model="suggestion"/>
			</view> 
			<view class="suggestion-content-title" style="margin-bottom:19px;">截图(选填):</view>
			<view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
							  :key="index" @tap="ViewImage(item,'file')" :data-url="imgList[index]">
							<view class="cu-tag bg-red" @tap.stop="DelImg(index,'file')" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="padding-xs solids" @tap="chooseImageEvent()" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import headTab from '../../../../components/head-tab.vue'
	export default {
		data() {
			return {
				imgList:[],
				suggestion:'',
				files:[],
			}
		},
		components:{
			headTab
		},
			
		methods: {
			createSuggestion(){
				if(!this.suggestion){
					uni.showToast({
						title:'请填写反馈建议',
						icon:'none'
					})
				}else{
					
				}
			},
			ViewImage(e,type) {
				uni.previewImage({
					urls: this.imgList,
					current: e
				});
			
			},
			DelImg(event,type) {
					uni.showModal({
						content: '确定删除？',
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							this.imgList.splice(event, 1);
							this.$ajax('RemoveFiles',{
								id:this.files[event],
							},res=>{
								this.files.splice(event,1)
								uni.showToast({
									title:'删除成功',
									icon:'none'
								})
							})
			
							}
					})
				},
				//获得上传图片的token
				getUploadToken(){
					this.$ajax('UploadToken',{},res=>{
						this.token=res;
					})
					
				},
				chooseImageEvent(){
						uni.chooseImage({
							count:9,
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: (res) => {
								const tempFilePaths=res.tempFilePaths;
								if (this.imgList.length != 0) {
									this.imgList = this.imgList.concat(res.tempFilePaths)
								} else {
										this.imgList = res.tempFilePaths
								}
								uni.getStorage({
									key:'userInfo',
									success: (info) => {
										for(var i=0;i<res.tempFilePaths.length;i++){
											var  uploadTask=uni.uploadFile({
												url:this.$store.state.uploadHostUrl+this.token,
												filePath:tempFilePaths[i],
												name:'file',
												formData:{
													'x:type':26,
													'x:owner': info.data.owner,
													'x:creator': info.data.id,
												},
												success: (uploadFileRes) => {
													let res=JSON.parse(uploadFileRes.data);
													this.files.push(res.data);
												}
											});
											uploadTask.onProgressUpdate((res)=>{
												if(res.progress==100){
													uni.showToast({
														title:'上传成功',
														icon:'none'
													})
												}
											},(error)=>{
												uni.showToast({
													title:'上传失败',
													icon:'none'
												})
											})
										}
									}
								})
								
				
				
							}
						})
				
				},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.inputactive{
		color:rgba(66,176,237,1)
	}
	.suggestion-content{
		padding-top:18px;
		padding-right:11px;
		padding-left:14px;
		.suggestion-content-title{
			font-size:18px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
			margin-bottom:12px;
		}
	}
</style>
