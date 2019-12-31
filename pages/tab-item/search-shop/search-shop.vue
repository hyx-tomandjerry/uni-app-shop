<template>
	<view>
		<view class="borderTop search-container">
			<view class="search-item flex justify-between align-center borderBottom" @tap="searchShop('brand')">
				<view>品牌名称</view>
				<view class="flex justify-start">
					<view>{{searchObj.brandName || ''}}</view>
					<view class="cuIcon-right font-size-middle color-regular"></view>
				</view>
			</view>
			<view class="search-item flex justify-between align-center " @tap="searchShop('area')">
				<view>门店区域</view>
				<view class="flex justify-start">
					<view>{{searchObj.zoneName || ''}}</view>
					<view class="cuIcon-right font-size-middle color-regular"></view>
				</view>
			</view>
		</view>


		<!-- 区域弹出框 -->
		<bottom-area-model
			:isShow="modalName=='areaBottomModal'"
			@hideModel="hideModel"
			@treeItemClick="treeItemClick"
			:companyID="Number(companyID)"
		></bottom-area-model>
		
		
		<bottom-show-model 
			:isShow="modalName=='brandBottomModal'"
			:list="brandList"
			chooseImg="../../../static/icon/icon-xuanzhong.png"
			noChooseImg="../../../static/icon/icon-weixuanzhong.png"
			@hideModel="hideModel"
			@chooseItem="chooseTab"
		 ></bottom-show-model>
		 
		<common-btn-one 
			content="确定"
			type="primary"
			@operateBtn="confirmSearch" :isPos="true"></common-btn-one>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import commonBtnOne from '../../../components/common/common-btn-one.vue'
	import bottomShowModel from '../../../components/common/bottom-show-model.vue'
	import bottomAreaModel from '../../../components/common/bottom-area-model.vue'
	import {MyBrandsApi} from '../../../api/common_api.js'
	export default {
		computed:mapState(['constants']),
		data() {
			return {
				searchObj:{
					brandName:'',
					brandID:'',
					zoneName:'',
					zoneID:''
				},
				modalName:'',
				areaList:[],
				brandList:[],
				companyID:''
			}
		},
		components:{commonBtnOne,bottomShowModel,bottomAreaModel},
		methods: {
			chooseTab(item){
				this.searchObj.brandID=item.id;
				this.searchObj.brandName=item.val;
			},
			searchShop(type){
				switch(type){
					case 'brand':
						this.modalName='brandBottomModal';
						this.getBrandList()
						break;
					case 'area':
						this.modalName='areaBottomModal';
						break;
				}
			},
			hideModel(){
				if(this.modalName){
					this.modalName=null;
				}
			},
			confirmSearch(){
				uni.navigateBack({
					delta:1,
					success:()=>{
						this.$fire.fire('seach',this.searchObj)
					}
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1,
					success:()=>{
						this.$fire.fire('seach',this.searchObj)
					}
				})
			},
			//点击最后一级时触发该事件
			treeItemClick(item) {
				this.searchObj.zoneID=item.id;
				this.searchObj.zoneName=item.name;
			},
			async getBrandList(){
				this.brandList = await MyBrandsApi(this.companyID)

			}
		},
		onLoad(options){
			if(options.id){
				this.companyID=options.id;
			}
		}
	}
</script>

<style scoped>
	page{
		background: rgba(247,247,247,1);
	}
	.search-container{
		background-color: #fff;
	}
	.search-item{
		padding:0 20upx;
		height:106upx;
		line-height:106upx;
	
	}

</style>
