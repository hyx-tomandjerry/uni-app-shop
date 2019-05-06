<template>
	<view>
		<view class="log-content">
			<view v-if="shop"></view>
			<view v-else>
				<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus($event)" :adjust-position="false" type="text" placeholder="输入门店名称进行搜索" confirm-type="search"></input>
				</view>
				<view >
					<button class="cu-btn round" style="background:#fff;">全部</button>
				</view>
			</view>
			</view>
			<view class="cu-form-group">
				<view class="log-title"><text class="text-red">*</text>标题</view>
				<input placeholder="请输入日志标题" v-model="log.title"   style="padding-left:10px;padding-top:4px;"></input>
			</view>
			
			<view class="cu-form-group" style="position:relative">
				<textarea  v-model="log.content" maxlength="1000"   placeholder="请输入工作日志.." style="min-height:137px;"></textarea>
				<text class="num">1000以内</text>
			</view>
		</view>
		
		<view class="img-content margin-top-13">
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					上传附件
				</view>
				<view class="action">
					
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
					 :key="index" @tap="ViewImage()" :data-url="imgList[index]">
						<view class="cu-tag bg-red" @tap.stop="DelImg()" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="padding-xs solids" @tap="ChooseImage()" v-if="imgList.length<4">
						<image src="../../../../static/img/work/camera.png" style="width:78px;height:78px;"></image>
					</view>
				</view>
			</view>
			
			<view class="cu-form-group  margin-top">
				<view class="title"><text class="text-red">*</text>抄送人</view>
				<view><text class="cuIcon-right" @click="goChoseCopy()"></text></view>
				<!-- <picker @change="PickerChange($event)" :value="index" :range="copyList">
					<view class="picker">
						{{index>-1?copyList[index]:'请选择'}}
					</view>
				</picker> -->
			</view>
		</view>
		
		<view  >
						<button type="default"  
						style="width:94%;bottom:31px;position:absolute;background:rgba(66,176,237,1);
		border-radius:5px;color:#fff;left:15px;">提交</button>
					</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop:'',
				log:{
					title:'',//标题
					content:'',//内容
				},
				imgList: [],
				copyList: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				index:-1
			}
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			InputFocus(event){
				console.log('InputFocus')
			},
			
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					content: '确定要删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			PickerChange(event) {
				this.index = event.detail.value;
			},
			//选择抄送人
			goChoseCopy(){
				uni.navigateTo({
					url:'../chose-copy/chose-copy'
				})
			}
			
		}
	}
</script>

<style lang="less">
	.cu-form-group uni-input{
		text-align: right;
	}
	.num{
		font-size:13px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(137,136,136,1);
		position:absolute;
		bottom:13px;
		right:12px;
	}
	.log-title{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:#2A2A2A
	}
	.img-content{
		background:#fff;
	}
	.grid.grid-square>uni-view{
		margin-bottom:24px;
		border-bottom:1px solid #EEEEED
	}
	.cu-bar .search-form{
		margin:0;
	}
	.log-content .cu-bar{
		padding-left:13px;
	}
</style>
