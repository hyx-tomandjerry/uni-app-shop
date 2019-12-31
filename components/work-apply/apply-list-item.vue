<template>
	<view class="apply-item flex align-center bg-white  borderBottom animated slideInLeft "
	@tap="checkDetail" hover-class="bg-color-normal" >
		<image :src="item.img"
			mode="widthFix" lazy-load>
		</image>
		<view class="flex-1">
			<view class="flex justify-between align-center font-size-litter color-normal">
				<view>{{item.name}}</view>
				<view>{{item.shop || ''}}</view>
			</view>
			<view class="flex justify-between align-center">
				<view>
					<template v-if="type=='apply'">
						<view>申请人 : {{item.creatorName}}</view>
					</template>
					<template v-if="type=='check'">
						<view>申请人 : {{item.applierName}}</view>
					</template>
					<view>申请时间 : {{item.instdate | formatTime('YMDHMS')}}</view>
				</view>
				<view>
					<template v-if="item.formType==approvalMode.repair_service">
						<template v-if="item.approval==applyStatus.accepted">
							<image src="../../../../../static/img/work/apply/my-apply/pass_tag.png"
								mode="widthFix" lazy-load class="status-tag">
							</image>
						</template>
						<template v-if="item.approval==applyStatus.applied">
							<image src="../../../../../static/img/work/apply/my-apply/pending_tag.png"
								mode="widthFix" lazy-load class="status-tag">
							</image>
						</template>
						<template v-if="item.approval==applyStatus.wait">
							<image src="../../../../../static/img/work/apply/my-apply/waiting_tag.png"
								mode="widthFix" lazy-load class="status-tag">
							</image>
						</template>
						<template v-if="item.approval==applyStatus.rejected">
							<image src="../../../../../static/img/work/apply/my-apply/refuse_tag.png"
								mode="widthFix" lazy-load class="status-tag">
							</image>
						</template>
					</template>
					<template v-else>
						<template v-if="item.approval==applyStatus.accepted">
							<image src="../../../../../static/img/work/apply/my-apply/pass_tag.png"
								mode="widthFix" lazy-load class="status-tag">
							</image>
						</template>
						<template v-if="item.approval==applyStatus.applied">
							<image src="../../../../../static/img/work/apply/my-apply/pending_tag.png"
								mode="widthFix" lazy-load class="status-tag">
							</image>
						</template>
						<template v-if="item.approval==applyStatus.wait">
							<image src="../../../../../static/img/work/apply/my-apply/waiting_tag.png"
								mode="widthFix" lazy-load class="status-tag">
							</image>
						</template>
						<template v-if="item.approval==applyStatus.rejected">
							<image src="../../../../../static/img/work/apply/my-apply/refuse_tag.png"
								mode="widthFix" lazy-load class="status-tag">
							</image>
						</template>
					</template>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed:{
			applyStatus(){return this.config.applyStatus},
			approvalMode(){return this.config.approvalMode},
			repairStatus(){return this.config.repairStatus}
		},
		data() {
			return {

			};
		},
		props:{
			item:Object,
			index:Number,
			type:String
		},
		methods:{
			checkDetail(){
				this.$emit('checkDetail',this.item)

			}
		}
	}
</script>

<style scoped lang="less">
.apply-item{
		padding:22upx 40upx 24upx 50upx;
		background-color: #fff;
	}
	.apply-item>image{
		width:62upx;
		height:62upx !important;
		flex-shrink: 0;
		margin-right: 30upx;
	}
	.apply-item>view:first-of-type{
		flex:1;
	}
	.apply-item>view:first-of-type{
		font-size:20upx;
		color:#898888;
	}
	.apply-item>view:first-of-type>view:first-child{
		margin-bottom: 20upx;
	}
	.apply-item>view:first-of-type>view:last-child>view:first-child view{
		margin-bottom: 4upx;
	}
	.status-tag{
		width:104upx;
		height:40upx !important;
		flex-shrink: 0;
	}
</style>
