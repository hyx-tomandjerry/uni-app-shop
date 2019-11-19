<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><view class="cuIcon-back"  @click="goBack()"></view></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >新建申请</view></block>
		</cu-custom>
		<view class="body  flex borderTop" :style="{height:height+'px'}">
			<block v-for="(item,index) in tabList" :key="index">
				<view @click="operateItem(item)">
					<image
					:src="item.img"
					mode="widthFix" lazy-load></image>
					<view>{{item.title}}</view>
				</view>
			</block>


		</view>
	</view>

</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['approvalMode']),
		data() {
			return {
				tabList:[
					{
						img:'../../../../../static/img/work/apply/my-apply/qingjia_icon.png',
						title:'请假申请',
						value:this.$store.state.approvalMode.absence

					},
					{
						img:'../../../../../static/img/work/apply/my-apply/baoxiao_icon.png',
						title:'报销申请',
						value:this.$store.state.approvalMode.expense
					},
					{
						img:'../../../../../static/img/work/apply/my-apply/common_icon.png',
						title:'通用申请',
						value:this.$store.state.approvalMode.common
					}
				],
				height:500
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			operateItem(item){
				uni.navigateTo({
					url: '../apply-item-form/apply-item-form?type='+item.value+"&cat=create"
				});
			}
		},
		onLoad(){
			console.log(this.tabList)
			uni.getSystemInfo({
				success: (res) => {
					this.height=res.screenHeight-uni.upx2px(100)
				}
			})
		}
	}
</script>

<style scoped>

	.body{
		height:700px;
		background-color: #fff;
		padding-top:60upx;
		padding-left:56upx;
	}
	.body>view{
		flex:1;

	}
	.body>view image{
		width:60upx;
		height:60upx !important;
		margin-left: 20upx;
		flex-shrink: 0;
		margin-bottom: 20upx;
	}
	.uni-page-wrapper{
		background-color: #fff;
	}
</style>
