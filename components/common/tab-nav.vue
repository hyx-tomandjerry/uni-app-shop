<template>
	<view class="cu-item  font-size-normal font-weight-normal" style="padding:10px;"
			:class="item.id==TabCur?' cur  borderBottomRed color-red':''"
			@tap="tabSelect" >
		{{item.name}}
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number,
			TabCur:[Number,String]
		},
		methods:{
			tabSelect(event){
				this.$emit('tabSelect',this.item)
			}
		}
	}
</script>

<style>
</style>
