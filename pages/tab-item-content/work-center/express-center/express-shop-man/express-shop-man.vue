<template>
	<view>
		<view class="shop-man-container borderTop bg-white" v-if="userList">
			<block  v-for="(item,index) in userList" :key="index">
				<express-shop-man-item :item="item" :index="index" :TabCur="TabCur" @chooseman="chooseman"></express-shop-man-item>
			</block>
			
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import expressShopManItem from '../../../../../components/express/express-shop-man-item.vue'
	import {ChainShopApi,ShopSalesmenApi} from '../../../../../api/shop_api.js'
	export default {
		computed:mapState(['userInfo']),
		components:{expressShopManItem},
		data() {
			return {
				userList:[],
				TabCur:0,
				selectman:{},
				type:'express',
				shopItem:{}
			}
		},
		
		onNavigationBarButtonTap(event){
			if(event.index==0){
				this.confirmMan()
			}
		},
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
				
				if(this.type=='sale'){
					//如果是店长或者是自己
					if(this.shopItem.manager == this.userInfo.id || item.id==this.userInfo.id){
						this.TabCur=item.id;
						this.selectman=item;
					}else{
						this.$utils.showToast('不能对其他店员进行退货处理')
					}
				}else{
					this.TabCur=item.id;
					this.selectman=item;
				}
				
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			async getShopSalesman(id){
				this.shopItem = await ChainShopApi(id);
				this.userList = await ShopSalesmenApi(id);

			}
		},
		onLoad(options){
			if(options.type){
				this.type=options.type;
			}
			uni.setNavigationBarTitle({
			    title:this.type=='sale'?'店员信息':'收件人信息'
			});
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
