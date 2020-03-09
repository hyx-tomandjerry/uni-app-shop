<template>
	<view class="cu-form-group flex justify-between align-center borderBottom">
		<view class=" font-size-normal font-weight-normal color-regular">
			<text class="text-red" v-if="showRequired">*</text>{{intro}}
		</view>
		<view class="flex justify-start align-center">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			intro:String,
			showRequired:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style>
</style>
