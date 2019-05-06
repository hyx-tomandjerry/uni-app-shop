<template>
	<view class="cu-modal" :class="isShow?'show':''">
		<view class="cu-dialog">
			<view class="padding-xl">
				<slot name="content">
					
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isShow: {
				type: [Boolean, String],
				default: false
			},
		},
		name:'pop-modal',
		data() {
			return {
				
			};
		},
	}
</script>

<style>

</style>
