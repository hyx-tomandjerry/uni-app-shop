<template>
	<view>
		<view class="bg-white work-flow-container borderTop">
			<block v-for="(item,index) in workFlowList" :key="index" >
				<checkProgressItem :item="item" :index="index" @chooseItem="selectFlow"></checkProgressItem>
			</block>

		</view>
	</view>

</template>

<script>
	import checkProgressItem from '../../../../components/check-template/check-progress-item.vue'
	import {WorkflowsApi} from '../../../../api/common_api.js'
	export default {
		components:{checkProgressItem},
		data() {
			return {
				workFlowList:[],
				workFlowItem:{},
				type:''
			}
		},
		methods: {
			selectFlow(item){
				setTimeout(()=>{
					uni.navigateBack({
						delta:1,
						success:(res)=>{
							this.$fire.fire('workFlow',item)
						}
					})
				},800)
			},
			async getWorkFlowList(type){
				this.workFlowList = await WorkflowsApi(type)
			}
		},
		onLoad(options){
			this.type=options.type;
			this.getWorkFlowList(this.type)
		}
	}
</script>

<style>

</style>
