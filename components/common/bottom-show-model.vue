<template>
	<!-- 选择品牌列表弹框 -->
	<view class="cu-modal bottom-modal" :class="isShow?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-blue" @tap="hideModel">取消</view>
				<view class="action text-green" @click="hideModel">确定</view>
			</view>
			<view>
				<block  v-for="(item,index) in list" :key="index" >
					<scroll-view scroll-y="true" >
						<view class="tab-item flex justify-between align-center " @tap="chooseItem(item)" hover-class="bg-color-normal">
							<view>{{item.val || item.name}}</view>
							<image  :src="selectItem.id==item.id?chooseImg:noChooseImg" mode="widthFix" class="choose-img"></image>
						</view>
					</scroll-view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectItem:''
			};
		},
		props:{
			isShow:Boolean,
			list:Array,
			chooseImg:String,
			noChooseImg:String
		},
		methods:{
			hideModel(){
				this.$emit('hideModel')
			},
			chooseItem(item){
				this.selectItem=item;
				this.$emit('chooseItem',item)
			}
		},
	}
</script>

<style scoped>
	.tab-item{
		height:88upx;
		line-height:88upx;
		padding:0 30upx;
		text-align: left;
	}
	.choose-img{
		width:40upx;
		height:40upx !important;
	}
</style>
