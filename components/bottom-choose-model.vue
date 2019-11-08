<template>
	<view class="cu-modal bottom-modal" :class="show?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-blue" @tap="hideModel">取消</view>
				<view class="action text-green" @click="hideModel">确定</view>
			</view>
			<view >
				<block  v-for="(item,index) in list" :key="index" >
					<scroll-view scroll-y="true" >
						<view class="brand-list-item align-center" @tap="chooseItem" hover-class="bg-color-normal">
							<view>{{item.name}}</view>
							<image  :src="selectItem.id==item.id?chooseImg:noChooseImg" mode="" class="icon-choose"></image>
							
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
			show:Boolean,
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
		}
	}
</script>

<style>

</style>
