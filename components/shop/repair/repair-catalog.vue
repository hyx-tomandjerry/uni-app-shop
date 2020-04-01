<template>
	<view class="repair-catalog">
		<normal-detail-item leftIntro="子类别名称" :rightContent="subItem.name" width="30%"
			:marginBMini="true"
			:leftPadding="false" :marginBottom="false"></normal-detail-item>
		<normal-detail-item :marginBMini="true" leftIntro="子类别规格" :rightContent="subItem.size || ''" width="30%" :leftPadding="false" :marginBottom="false"></normal-detail-item>
		<normal-detail-item :marginBMini="true" leftIntro="子类别品牌" :rightContent="subItem.type || ''" width="30%" :leftPadding="false" :marginBottom="false"></normal-detail-item>
		<normal-detail-item :marginBMini="true" leftIntro="子类别型号" :rightContent="subItem.model || ''" width="30%" :leftPadding="false" :marginBottom="false"></normal-detail-item>
		<normal-detail-item :marginBMini="true" leftIntro="子类别备注" :rightContent="subItem.summary || ''" width="30%" :leftPadding="false" :marginBottom="false"></normal-detail-item>
		<view  class="color-regular  reapir-intro">附件:</view>
		<view class="file-container" v-if="subItem.files">
			<view class="file-item" v-for="(item,index) in subItem.files" :key="index">
				<div>
					<image :src="item.url" mode="widthFix" class="file-img" 
					v-if="item.postfix == 'jpeg' || item.postfix =='jpg' || item.postfix =='png' || item.postfix=='bmp' || item.postfix=='gif'"></image>
					<image :src="fileImg" mode="widthFix" class="file-img" v-else></image>
				</div>
				<div >
					<text v-if="item.postfix == 'jpeg' || item.postfix =='jpg' || item.postfix =='png' || item.postfix=='bmp' || item.postfix=='gif'">{{index+1}}.{{item.postfix}}</text>
					<text v-else>{{item.name}}</text>
				</div>
			</view>
		</view>
			<!-- <files-content :files="subItemImg" :isShowTitle="false"></files-content> -->
	</view>
</template>

<script>
	import normalDetailItem from '../../common/normal-detail-item.vue';
	export default{
		components:{normalDetailItem},
		props:{
			subItem:{
				type:Object,
				default(){return {}}
			},
			fileImg:String
		}
	}
</script>

<style scoped>
	.repair-catalog{
		background:#FFFFFF;
		height:300px;
		width:100%;
		overflow-y:scroll;
		padding:20upx 30upx;
	}
	.file-item{
		display: flex;
		align-items: center;
		padding:20upx 0;
		border-bottom:1px solid #EEEEED;
	}
	.file-img{
		width:100upx;
		height:100upx !important;
		margin-right:20upx;
	}
</style>
