<template>
	<view >
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >我的门店</view></block>
		</cu-custom>
		<view v-if="shopList.length" class="borderTop">
			<block v-for="(item,index) in shopList" :key="index" >
				<shopListItem :item="item" :index='index' @checkShopDetail="checkShopDetail"></shopListItem>
			</block>
			<uni-load-more :contentText="content" :showIcon="true" v-if="shopList.length" :status="loading"></uni-load-more>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>

		<showModel :isShow="modalName=='noClick'" @hideModel="hideModal" @confirmDel="hideModal" v-if="modalName=='noClick'">
			<block slot="content">该门店没有营业，不可查看</block>
		</showModel>
	</view>
</template>

<script>
	import shopListItem from '../../../../components/shop-list-item.vue'
	import LxEmpty from '../../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	import showModel from '../../../../components/show-model.vue'
	export default {
		computed:mapState(['shopStatusZn']),
		data() {
			return {
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				modalName:'',
				shopList:[],//门店列表
				page:1,
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
		// onReachBottom(){
		// 	this.page++;
		// 	this.loading='loading';
		// 	setTimeout(()=>{
		// 		this.$ajax('MyShops',{address:'',offset:this.$utils.getOffset(this.page)},res=>{
		// 			if(res==''){
		// 				setTimeout(()=>{
		// 					this.loading='noMore'
		// 				},900)
		// 			}else{
		// 				res.forEach(item=>{
		// 					this.shopList=this.shopList.concat(item)
		// 				})
		// 				this.loading='loading';
		// 				setTimeout(()=>{
		// 					this.loading='noMore'
		// 				},900)
		// 			}
		// 		})
		// 	},1000)
		//
		// },
		components:{
			LxEmpty,
			uniLoadMore,
			showModel,
			shopListItem
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			hideModal(){
				if(this.modalName){
					this.modalName=null
				}
			},
			checkShopDetail(item){
				if(item.status!=this.shopStatusZn.businessing ){
					this.modalName='noClick'
				}else{
					switch(this.type){
						case 'shop':
						//查看门店人员列表
						uni.navigateTo({
							url:'../clerk-list/clerk-list?shopID='+item.id
						})
						break;
						case 'statistics':
						if(item.manager){
							uni.navigateTo({
								url:"../../work-center/statistics-center/shop-statistics-item/shop-statistics-item?id="+item.id+'&manager='+item.manager+"&zone="+item.zone
							})
						}else{
							uni.navigateTo({
								url:"../../work-center/statistics-center/shop-statistics-item/shop-statistics-item?id="+item.id+"&zone="+item.zone
							})
						}
						break;
					}

				}
			},
			//获得门店列表
			getShopList(){
				this.$ajax('MyShops',{address:''},res=>{
					this.shopList=res;
				})
			}
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
