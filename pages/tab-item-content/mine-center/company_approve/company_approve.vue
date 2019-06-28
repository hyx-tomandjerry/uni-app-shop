<template>
	<view>
		
		<view class="company_container">
			<view class="intro-title font-size-normal color-normal ">上传营业执照</view>
			<view class="approve_img position_relative" @click="uploadLicence()">
				<image :src="companyInfo.license?companyInfo.license:'../../../../static/img/mine/approve.png'" style="width:64%;height:160px;"></image>
				<image src="../../../../static/img/mine/cerame.png" style="width:70px;height:70px;position: absolute;left:50%;top:50%;transform: translate(-50%, -50%);"></image>
			</view>
			<view class="area-btn text-center">
				<view class="font-size-big text-white " style="width:100%;background:rgba(66,176,237,1);
border-radius:5px;padding:8px 0;">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				token:'',
				licenceID:'',
				companyInfo:''
			}
		},
		methods: {
			uploadLicence(){
				uni.chooseImage({
					count:1,
					sizeType:['original','compressed'],
					sourceType:['album'],
					success: (res) => {
						const tempFilePaths=res.tempFilePaths;
						const uploadTask=uni.uploadFile({
							url:this.$store.state.uploadHostUrl+this.token,
							filePath:tempFilePaths[0],
							name:'file',
							formData:{
								 'x:type':this.$store.state.constants.licenseCover,
								'x:owner': this.userInfo.owner,
								'x:creator': this.userInfo.id,
								'x:target':this.userInfo.owner
							},
							success: (uploadFileRes) => {
								let FileRes=JSON.parse(uploadFileRes.data);
								this.licenceID=FileRes.data;
								this.getAvatar(this.licenceID)
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
				})
			},
			getAvatar(id){
				this.$ajax('File',{id:id},res=>{
					console.log(res)
					this.companyInfo.license=res.resurl
				})
			},
			getUploadToken(){
				this.$ajax('UploadToken',{},res=>{
					this.token=res;
					console.log(res)
				})
			},
				//获得公司信息
			getCompanyInfo(){
				this.$ajax('Customer',{
					id:this.userInfo.owner
				},res=>{
					this.companyInfo=res;
				})
			}
		},
		onLoad(){
			this.getUploadToken();
			this.getCompanyInfo();
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.company_container{
		
		.intro-title{
			padding-top:24px;
			padding-left:14px;
			padding-bottom:39px;
		}
		.approve_img{
			text-align: center;
			margin-bottom:58px;
		}
		.area-btn{
			padding: 0 13px;
		}
	}
</style>
