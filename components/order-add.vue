<template>
	<view>
		<view style="padding:8px 12px 6px 0px;" class="flex justify-between">
			<text class=" text-blue margin-right-xs" style="font-size:13px;color:rgba(137,136,136,1);margin-top:9px;padding-left:14px;">维修明细({{num}})</text>
			<text class="del" @click="delRepairItem()">删除</text>
		</view>
		
		<view>
			<view class="cu-item " style="margin-top:6px;">
				<view class="content padding-tb-sm">
					
					<view style="display: flex;justify-content: space-between;">
						
						
					</view>
					<view class="text-gray text-sm">
						<view class="cu-form-group ">
							<view class="title text-black" style="font-size:24rpx;"><text class="text-red" style="margin-right:4rpx;">*</text>维修类别</view>
							<text style="margin-left:100rpx;">{{cityLobal ||''}}</text>
							<text class="cuIcon-right" @click="showRepairItem"></text>
						</view>
						<view class="cu-form-group" style="border-bottom:1px solid rgba(238,238,237,1);">
							<view class="title text-black" style="font-size:14px;"><text class="text-red" style="margin-right:4rpx;">*</text>维修项</view>
							<text style="margin-left:100rpx;">{{cityLobal ||''}}</text>
							<text class="cuIcon-right" @click="showRepairItem()"></text>
						</view>
						
						<view style="background:#fff;padding-top:18px;">
							<view class="title text-black" style="font-size:14px;margin-left:12px;"><text class="text-red" style="margin-right:4rpx;">*</text>报修描述</view>
							<view>
								<view class="cu-form-group">
										<textarea maxlength="-1"  @input="textareaAInput()" placeholder="报修描述" style="font-size:14px;"></textarea>
									</view>
								</view>
						</view>
						
						<view class="cu-bar bg-white" style="border-top:1px solid rgba(238,238,237,1);">
							
							<view class="title text-black" style="font-size:24rpx;margin-left: 14px;;"><text class="text-red" style="margin-right:4rpx;">*</text>上传附件</view>
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
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import uniIcon from './uni/uni-icon/uni-icon.vue';
	export default{
		components:{
			uniIcon
		},
		props:{
			num:{type:Number,required:true}
		},
		data(){
			return{
				 imgList: [],
				textareaAValue:'',
				 cityLobal:'',
			}
		},
		onLoad(){
			console.log(this.$props)
			
		},
		methods:{
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
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			delRepairItem(){
				//删除组件
				this.$emit('delComponent',this.index)
			}
		}
	}
</script>

<style lang="less">
	.cu-form-group uni-textarea{
		background:rgba(247,247,247,1);
		padding-top:8px;
		padding-left:11px;
	}
	.padding-tb-sm{
		padding-top:0;
		padding-bottom:0;
	}
	.del{
		font-size:13px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(66,176,237,1);
	}
</style>
