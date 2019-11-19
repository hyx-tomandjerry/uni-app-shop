<template>
	<view class="title">
		<view class="font-size-supper font-weight-super" style="margin-bottom:6px;">
			{{name}}
		</view>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	 export default{
		 props:{name:String}
	 }
</script>

<style>
</style>
