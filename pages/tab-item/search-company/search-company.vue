<template>
	<view class="borderTop bg-white" :style="{height:screenHeight+'px'}">
		<view class="search-container">
			<view class="serch-intro">
				<view class="title">加入你的团队</view>
				<view class="color-regular">你可以通过以下方式，加入你的团队。</view>
			</view>
			<view class="input-container flex justify-between align-center" @tap="searchCompany">
				<view class="flex justify-start align-center">
					<image src="../../../static/img/sousuo.png" class="search-img"></image>
					<view class="font-size-big">搜索团队号EID加入</view>
				</view>
				<view >
					<image src="../../../static/icon/search-right.png" class="search-icon" ></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default{
		data(){
			return{
				screenHeight:500
			}
		},
		
		onLoad(){
			this.getSystemInfo()
		},
		onNavigationBarButtonTap(event){
			if(event.index ==0){
				this.logout();
				setTimeout(()=>{
					uni.redirectTo({
						url:'../../login-design/login/login'
					})
				},900)
			}
		},
		methods:{
			...mapMutations(['logout']),
			searchCompany(){
				uni.navigateTo({
					url:"../search-company-next/search-company-next"
				})

			},
			getSystemInfo(){
				uni.getSystemInfo({
					success:(res)=>{
						this.screenHeight=res.windowHeight;
					}
				})
			}
		}
	}
</script>
<style scoped>
@import url("./search-company.css");			
</style>