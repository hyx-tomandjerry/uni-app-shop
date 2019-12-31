<template>
	<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
		<swiper-item v-for="(item,index) in shopList" :key="index">
			<image :src="item.url" mode="aspectFill" style="border-radius:8px;"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default{
		data(){
			return{
				shopList:[
					{id:0,url:"https://i04piccdn.sogoucdn.com/41da27612e577928"},
					{id:1,url:"https://i02piccdn.sogoucdn.com/f19f1950d032e713"},
					{id:2,url:"https://i03piccdn.sogoucdn.com/e5ab27310ecbc5f8"},
					{id:3,url:"https://i02piccdn.sogoucdn.com/c382398752cc1021"},
					{id:4,url:"https://i02piccdn.sogoucdn.com/3e8b9bc55bc0a4d1"},
					{id:5,url:"https://i01piccdn.sogoucdn.com/50a1d0976d455b0d"}
				]
			}
		}
	}
</script>

<style scoped>
	.screen-swiper{
		min-height:240upx;
		margin-top:20upx;
	}
	.uni-swiper .uni-swiper-wrapper{
		min-height:240upx;
	}
	.uni-swiper .uni-swiper-dots-horizontal{
		bottom:76upx;
	}
	
	.tower-swiper .tower-item {
			transform: scale(calc(0.5 + var(--index) / 10));
			margin-left: calc(var(--left) * 100upx - 150upx);
			z-index: var(--index);
	}
	.card-swiper .uni-swiper-item{
		padding:0;
	}
</style>
