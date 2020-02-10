<template>
	<view v-if="isShow" >
		<view class="mask" @tap="hideModal"></view>
		<view class="service-type text-right">
			<view class="flex align-center justify-end" v-for="(item,index) in cameraList" :key="index" @tap="chooseServiceItem(item)">
				<view class="font-size-big color-normal">{{item.name}}</view>
				<image :src="item.img" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				cameraList:[
					{id:1,name:'摄像头',value:'camera',img:'../../../../static/img/shop/service/camera.png'},
					{id:2,name:'CPE',value:'cpe',img:'../../../../static/img/shop/service/router.png'}
				],
				cameraTab:'',
			}
		},
		props:{
			isShow:Boolean//
		},
		methods:{
			hideModal(){
				this.$emit('hideModal')
			},
			chooseServiceItem(item){
				this.cameraTab=item.value;
				this.$emit('chooseServiceItem',this.cameraTab)
				setTimeout(()=> {
					this.cameraTab=null
				}, 10000);
			}
		}
	}
</script>

<style scoped>
	.mask{
		background:rgba(247,247,247,0.6);
		position:fixed;
		top:0;
		left:0;
		bottom:0;
		right:0;
	}
	.service-type{
		position:absolute;
		z-index:10;
		bottom:40upx;
		right:40upx;
	}
	.service-type image{
		width:140upx;
		height:140upx !important;
		flex-shrink: 0;
		margin-left: 25upx;
	}
	.service-type>view{
		margin-bottom:20upx;
	}
</style>
