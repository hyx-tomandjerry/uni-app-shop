<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left">
				<view class="cuIcon-back font-size-middle color-placeholder" @click.stop="goBack()"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold color-normal">收件人信息</view>
			</block>
			<block slot="right">
				<view class="text-blue" @click="confirmMan" style="margin-right:15px;">确定</view>
			</block>
		</cu-custom>
		<view class="shop-man-container borderTop bg-white" v-if="userList">
			<view class="shop-man-item borderBottom flex justify-start align-center position_relative"
				  @click="chooseman(item)"
				  v-for="(item,index) in userList" :key="index">
				<view style="width:15%;">
					<image :src="item.headurl?item.headurl:'../../../../../static/img/default.png'"  	style="width:40px;height:40px;border-radius: 50%;vertical-align: middle;"></image>

				</view>
				<view style="margin-left:10px;margin-right:15px;">
					{{item.name}}/{{item.mobile || item.account}}
				</view>
				<view class=" position_absolute" style="right:10px;top:25px;" >
					<image 
					:src="TabCur==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:20px;height:20px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				userList:[],
				TabCur:0,
				selectman:''
			}
		},
		methods: {
			confirmMan(){
				console.log(this.selectman)
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('man',this.selectman)
					}
				})
			},
			chooseman(item){
				this.TabCur=item.id;
				this.selectman=item;
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getShopSalesman(id){
				this.$ajax('ShopSalesmen',{shop:id},res=>{
					res.forEach(item=>{
						item.isCheck=false;
					})
					this.userList=res;
				})
			}
		},
		onLoad(options){
			console.log(options)
			if(options){
				this.getShopSalesman(options.id)
			}
		}
	}
</script >

<style lang="less">
	.shop-man-container{
		padding:0px 13px 0px 23px;
		.shop-man-item{
			padding:18px 0 15px;
		}
	}
</style>
