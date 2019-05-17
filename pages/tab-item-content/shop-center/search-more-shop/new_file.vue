<template>
	<view>
		<view class="shop-content flex  justify-start">
			<view class="category-left">
				<scroll-view scroll-y style="height:100%;padding:0 5px;">
					<view v-for="(item,index) in brandList" :key="index" @click="showShopList(item,index)">
						<view class="cu-tag"
						:class="{'bg-blue':tabIndex==index}"
						 style="width:100%;margin:5px;">{{item.val}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="shop-list">
				<scroll-view scroll-y="true" style="height:600px;padding-left:8px;">
					<view v-for="(item,index) in shopList" :key="index" style="padding:5px 10px;border:1px solid #EEEEED;border-radius: 10px;margin-bottom:10px;" @click="chooseShop(item,index)" :class="{'bg-gray':shopIndex==item.id}">
						<view style="font-size:14px;color:#00BFFF;margin-bottom:5px;" class="flex justify-between">
							{{item.name}}
							<text class="cu-tag round" 
							:class="{
								'bg-pink':item.status==shopStatus.ready,
								'bg-blue':item.status==shopStatus.processing,
								'bg-green':item.status==shopStatus.businessing,
								'bg-red':item.status==shopStatus.canceled,
								'bg-orange':item.status==shopStatus.renovated,
								'bg-purple':item.status==shopStatus.moved,
								}"
							>{{item.status | shopStatus}}</text>
						</view>
						<view style="font-size:12px;color:gray;margin-bottom:5px;" v-if="item.contactor && item.telephone">
							{{item.contactor}} <text style="margin:0 5px;">|</text>{{item.telephone}}
						</view>
						<view style="font-size:12px;color:lightgray">{{item.provinceName||''}}{{item.cityName||''}}{{item.districtName||''}}{{item.address||''}}</view>
					</view>
				</scroll-view>
				
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				brandList:[],
				shopList:[],
				tabIndex:-1,
				shopIndex:-1,
				shopStatus:this.$store.state.shopStatusZn
			}
		},
		components:{
			
		},
		methods: {
			chooseShop(item,index){
				this.shopIndex=item.id;
				uni.navigateBack({
					delta: 2,
					success:(res)=>{
						this.$fire.fire('shop',item)
					}
				});
			},
			showShopList(item,index){
				this.tabIndex=index;
				this.$ajax('ProprietorShops',{
					brand:item.id,
					offset:0,
					zone:-1
				},res=>{
					res.forEach(item=>{
						item.isChecked=false;
					})
					this.shopList=res;
				})
				
			},
			getBrandList() {
				this.$ajax('Constants',{
					type:this.$store.state.constants.brand_type,
					parent:0,
					objects:1
				},res=>{
					this.brandList=res;
				})
			}
		},
		onLoad(){
			this.getBrandList()
		},
	}
</script>
<style lang="less">
	page{
		background:#fff;
	}
	.shop-content{
		padding:10px 15px 10px 4px;
		.category-left{
			width:30%;
			border-right:1px solid #EEEEED;
			font-size:13px;
		}
		.shop-list{
			
		}
	}	
</style>