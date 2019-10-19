<template>
	<view class="bg-white work-flow-container borderTop">
		<view class="work-flow-item flex justify-between align-center " v-for="(item,index) in workFlowList" :key="index">
			<view>{{item.name}}</view>
			<view @click="selectFlow(item)">
				
				<image src="../../../../static/icon/icon-xuanzhong.png" mode="" class="choose-img" v-if="workFlowItem.id==item.id"></image>
				<image src="../../../../static/icon/icon-weixuanzhong.png" mode="" class="choose-img" v-else></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['constants']),
		data() {
			return {
				workFlowList:[],
				workFlowItem:{}
			}
		},
		methods: {
			selectFlow(item){
				this.workFlowItem=item;
				
				setTimeout(()=>{
					uni.navigateBack({
						delta:1,
						success:(res)=>{
							this.$fire.fire('workFlow',this.workFlowItem)
						}
					})
				},800)
			},
			getWorkFlowList(){
				this.$ajax('Workflows',{
					type:this.constants.work_flow
				},res=>{
					if(res){
						this.workFlowList=res;
					}
				})
			}
		},
		onLoad(){
			this.getWorkFlowList()
		}
	}
</script>

<style lang="less">
	.work-flow-container{
		padding:10px 20px;
		.work-flow-item{
			height:66px;
			line-height:66px;
			border-bottom:1px solid #EEEEED;
			.choose-img{
				width: 20px;
				height: 20px;
			}
		}
	}
	
</style>
