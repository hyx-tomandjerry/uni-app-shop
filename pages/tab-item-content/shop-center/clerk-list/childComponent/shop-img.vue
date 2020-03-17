<template>
	<view>
		<image
			:src="shopItem.coverurl?shopItem.coverurl:'../../../../../static/img/default.png'"
			class="shop-img"  mode="widthFix" lazy-load></image>
		
	</view>
</template>

<script>
	export default{
		props:{
			shopItem:Object
		}
	}
</script>

<style scoped>
	.shop-img{
		width:100%;
		height:400upx !important;
	}
</style>
