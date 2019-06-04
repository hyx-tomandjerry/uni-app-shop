<template>
	<view>

		<view  class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub font-size-normal font-weight-normal" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in TabList" :key="index" 
					  @click="tabSelect(index)"
					  :data-id="index">
					{{item}}
				</view>
			</view>
			
			<view class="express-list-content">
				
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				TabCur:0,
				TabList:['寄件记录','调拨记录','代发记录']
			}
		},
		components:{

		},
		methods:{
            tabSelect(index){
				console.log(index)
                this.TabCur=index;
			}
		},
		onLoad(){

		},
	}
</script>
<style lang="less">
	.express-list-content{
		
	}
</style>
