<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><view class="cuIcon-back"  @click="goBack()"></view></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >流程模板</view></block>
		</cu-custom>
		<view class="bg-white work-flow-container borderTop">
			<!-- -->
			<block v-for="(item,index) in workFlowList" :key="index" >
				<checkProgressItem :item="item" :index="index" @chooseItem="selectFlow"></checkProgressItem>
			</block>
			
		</view>
	</view>
	
</template>

<script>
	import {mapState} from 'vuex'
	import checkProgressItem from '../../../../components/check-progress-item.vue'
	export default {
		computed:mapState(['constants']),
		components:{checkProgressItem},
		data() {
			return {
				workFlowList:[],
				workFlowItem:{},
				type:''
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
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
			getWorkFlowList(type){
				this.$ajax('Workflows',{
					type:type
				},res=>{
					if(res){
						this.workFlowList=res;
					}
				})
			}
		},
		onLoad(options){
			this.type=options.type;
			this.getWorkFlowList(this.type)
		}
	}
</script>

<style lang="less">
	
</style>
