<template>
	<view>
		<!--销售明星筛选-->
		<view class="search-item borderTop" @click="selectModal('year')">
			<view class="font-size-normal color-normal">日期</view>
			<view class="color-regular" >
				<text v-if="searchObj.year && searchObj.month">{{searchObj.year}}年{{searchObj.month}}月</text>
				<text class="cuIcon-right font-size-big" style="margin-left:8px;"></text></view>
		</view>
		<view class="search-item borderTop" @click="selectModal('area')" >
			<view class="font-size-normal color-normal">区域</view>
			<view class="color-regular">
				<text>{{searchObj.areaName || ''}}</text>
				<text class="cuIcon-right font-size-big" style="margin-left:8px;"></text>
			</view>
		</view>
		<view class="search-item borderTop" @click="selectModal('brand')" >
			<view class="font-size-normal color-normal">品牌</view>
			<view class="color-regular">
				<text>{{searchObj.brandName || ''}}</text>
				<text class="cuIcon-right font-size-big" style="margin-left:8px;"></text>
			</view>
		</view>
		<!-- 年份弹出框 -->
		<year-month-model 
				:isShow="modalName=='yearBottomModal'" 
				:value="value" 
				@bindChange="bindChange"
				@hideModel="hideModel"></year-month-model>
		<!-- 区域弹出框 -->
		<bottom-area-model 
			:isShow="modalName=='areaBottomModal'"
			@hideModel="hideModel"
			@treeItemClick="treeItemClick"
		></bottom-area-model>
		 
		<!-- 品牌弹出框 -->
		<bottom-show-model 
					:isShow="modalName=='brandBottomModal'"
					:list="brandList"
					chooseImg="../../../../../../static/icon/icon-xuanzhong.png"
					noChooseImg="../../../../../../static/icon/icon-weixuanzhong.png"
					@hideModel="hideModel"
					@chooseItem="chooseBrand"
		 ></bottom-show-model>
		 
		 <common-btn-one
		 	content="确定"
		 	type="primary"
		 	@operateBtn="confirmSearch" :isPos="true"></common-btn-one>

	</view>
</template>

<script>
	import bottomAreaModel from '../../../../../../components/common/bottom-area-model.vue'
	import bottomShowModel from '../../../../../../components/common/bottom-show-model.vue'
	import yearMonthModel from '../../../../../../components/common/year-month-model.vue'
	import commonBtnOne from '../../../../../../components/common/common-btn-one.vue'
	import {MyBrandsApi} from '../../../../../../api/common_api.js'
	export default {
		data() {
			return {
				modalName:'',
				year:new Date().getFullYear(),
				month:new Date().getMonth()+1,
				value: [10,new Date().getMonth()],
				brandList:[],
				searchObj:{
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					areaID:'',
					areaName:'',
					brandID:'',
					brandName:''
				}
			}
		},
		methods: {
			confirmSearch(){
				this.$utils.goBack();
				this.$fire.fire('search',this.searchObj)
			},
			//点击最后一级时触发该事件
			treeItemClick(item) {			
				this.searchObj.areaID=item.id;
				this.searchObj.areaName=item.name
			},
			goBack(){
				this.$utils.goBack()
				this.$fire.fire('search',this.searchObj)
			},
			chooseBrand(item){
				this.searchObj.brandID=item.id,
				this.searchObj.brandName=item.val
			},
			
			bindChange(event) {
				if(event){
					this.searchObj.year=event.year;
					this.searchObj.month=event.month;
				}
			},
			/*选择开始时间*/
			selectModal(type){
				
				
				switch(type){
					case 'year':
					this.modalName='yearBottomModal';
					break;
					case 'area':
					this.modalName='areaBottomModal';
					break;
					case 'brand':
					this.modalName='brandBottomModal';
					this.getBrandList()
					break;
				}
			},
			hideModel(){
				this.modalName=null;
				uni.stopPullDownRefresh();
			},
			async getBrandList(){
				this.brandList= await MyBrandsApi();

			}
		},
		components:{
			bottomShowModel,
			yearMonthModel,
			bottomAreaModel,
			commonBtnOne
		},
	}
</script>

<style lang="less">
	.search-item{
		height:53px;
		line-height:53px;
		padding:0 12px;
		background-color: #fff;
		display:flex;
		justify-content: space-between;
		align-content: center;
	}
	.brand-list-item{
		height:55px;
		line-height:55px;
		padding:0 15px 0 21px;
		display: flex;
		justify-content: space-between;
		.icon-choose{
			width: 20px;
			height: 20px;
		}
	}
</style>
