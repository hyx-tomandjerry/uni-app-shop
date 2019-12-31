<template>
	<view class="flex text-center bg-white   justify-around" :class="{'borderBottom':isShowBorder}">
		<block  v-for="(item,index) in tabList" :key="index">
			<view class="cu-item  font-size-normal font-weight-normal" style="padding:10px;"
					:class="item.id==TabCur?' cur  borderBottomRed color-red':''"
					@tap="tabSelect(item)" >
				<text >{{item.name}}</text><text v-show="item.num" class="color-blue">({{item.num}})</text>
			</view>	
		</block>
	</view>
</template>

<script>
	export default{
		props:{
			tabList:Array,
			TabCur:Number,
			isShowBorder:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			tabSelect(item){
				this.$emit('tabSelect',item)
			}
		}
	}
</script>

<style>
</style>
