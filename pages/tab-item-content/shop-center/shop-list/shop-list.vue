<template>
	<view >
		<view v-if="shopList.length" class="borderTop">
			<block v-for="(item,index) in shopList" :key="index" >
				<shopListItem :item="item" :index='index' @checkShopDetail="checkShopDetail"></shopListItem>
			</block>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
	</view>
</template>

<script>
	import shopListItem from '../../../../components/shop/shop-list-item.vue'
	import LxEmpty from '../../../../lx_components/lx-empty.vue';
	import {mapMutations} from 'vuex'
	import {getShopList} from '../../../../api/common_api.js'
	export default {
		data() {
			return {
				modalName:'',
				shopList:[],//门店列表
				type:'',//shop是门店人员列表，statistics是绩效
			};
		},
		onPullDownRefresh(){
			//下拉刷新
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.getShopList()
			},800)

		},
		components:{
			LxEmpty,
			shopListItem
		},
		methods: {
			checkShopDetail(item){
				if(item.status!=this.config.shopStatus.businessing ){
					uni.showModal({
						content:"该门店没有营业，不可查看"
					})
					setTimeout(()=>{
						uni.hideToast()
					},600)
				}else{
					switch(this.type){
						case 'shop':
						//查看门店人员列表
						uni.navigateTo({
							url:'../clerk-list/clerk-list?shopID='+item.id
						})
						break;
						case 'statistics':
						uni.navigateTo({
							url:"../../work-center/statistics-center/shop-statistics-item/shop-statistics-item?id="+item.id
						})
						break;
						case 'repair':
						uni.navigateTo({
							url:"../shop-center?type=all&id="+item.id
						})
						break;
						case 'express':
						uni.navigateTo({
							url:"../../work-center/express-center/express-index/express-index?id="+item.id
						})
						break;
					}

				}
			},
			//获得门店列表
			async getShopList(){
				this.shopList = await getShopList();
				this.setShopCount(this.shopList.length);
				if(this.shopList.length==1){
					this.setShopOnlyObj(this.shopList[0])
				}


			},
			...mapMutations(['setShopCount','setShopOnlyObj'])
		},
		onShow(){
            this.getShopList()
		},
		onLoad(params){
			if(params){
				this.type=params.type;
			}
			 this.getShopList()
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}

	.cu-bar .search-form{
		margin-right:15px;
		margin-left:10px;
	}
	
</style>
