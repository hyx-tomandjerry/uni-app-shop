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
			<block  v-for="(item,index) in userList" :key="index">
				<express-shop-man-item :item="item" :index="index" :TabCur="TabCur" @chooseman="chooseman"></express-shop-man-item>
			</block>
			
		</view>
	</view>
</template>

<script>
	import expressShopManItem from '../../../../../components/express/express-shop-man-item.vue'
	export default {
		data() {
			return {
				userList:[],
				TabCur:0,
				selectman:{},
				type:''
			}
		},
		components:{expressShopManItem},
		methods: {
			confirmMan(){
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
					this.userList=res.filter(item=>item.motto!='manager');
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
		
	}
</style>
