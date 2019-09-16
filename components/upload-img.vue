<template>
	<view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
					  :key="index" @tap="ViewImage(index)" :data-url="imgList[index]">
					<view class="cu-tag bg-red" @tap.stop="DelImg(index)" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="padding-xs solids" @tap="chooseImageEvent()" v-if="imgList.length<4">
					<image src="../../../../static/img/work/camera.png" style="width:78px;height:78px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				token:'',
				imgList:[],
				files:[]
			};
		},
		props:{

			xType:{
				type:Number,
				default:''
			}
		},
		methods:{
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e
				});

			},
			//获得上传token
			getUploadToken(){
				this.$ajax('UploadToken',{},res=>{
					this.token=res
				})
			},
			DelImg(event) {
				uni.showModal({
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(event, 1);
							this.$ajax('RemoveFiles', {
								files: this.files[event],
							}, res => {
								this.files.splice(event, 1)
								uni.showToast({
									title: '删除成功',
									icon: 'none'
								})
							})
						}
					}
				})
			},
			chooseImageEvent() {
				this.getUploadToken();
				console.log(this.xType)
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							var uploadTask = uni.uploadFile({
								url: this.$store.state.uploadHostUrl + this.token,
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'x:type': this.xType,
									'x:owner': this.userInfo.owner,
									'x:creator': this.userInfo.id,
								},
								success: (uploadFileRes) => {
									console.log(uploadFileRes.data);
									let res = JSON.parse(uploadFileRes.data);
									this.files.push(res.data);
									this.$emit('success',this.files)
								}
							});
							uploadTask.onProgressUpdate((res) => {
								console.log(this.files)
								if (res.progress == 100) {
									uni.showToast({
										title: '上传成功',
										icon: 'none'
									})

								}
							}, (error) => {
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								})
							})
						}


					}
				})

			},
		}
	}
</script>

<style>

</style>
