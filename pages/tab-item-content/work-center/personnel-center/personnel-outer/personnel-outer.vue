<template>
	<view class="borderTop">
		<view style="padding:20px 16px 14px;" class="bg-white margin-bottom-normal">
			<view class="flex justify-between " style="padding-bottom:17px;">
				<view class="position_relative" style="width:88%;">
					<input type="text" placeholder="搜素姓名或者手机号" style="background:rgba(247,247,247,1);
					border-radius:17px;padding-left:52px;height:34px;">
					<image src="../../../../../static/icon/inner-search.png" style="width:17px;height:17px;vertical-align: middle;position: absolute;left:22px;bottom:8px;"></image>
					<image src="../../../../../static/icon/inner-close.png" style="width:17px;height:17px;vertical-align: middle;position: absolute;right:10px;bottom:8px;"></image>
				</view>
				<view class="font-size-big font-weight-normal color-placeholder" style="margin-left:6px;padding-top:6px;">搜索</view>
			</view>
		</view>
		<view class="company-container bg-white" >
			<view v-if="companyList.length>0">
				<view class="company-item flex justify-start align-center borderBottom"
					  v-for="(item,index) in companyList" :key="index"
					  @click="checkCompanyInfo(item)">

					<image :src="item.logourl?item.logourl:'../../../../../static/img/default.png'" style="width:40px;height:40px;border-radius: 50%;margin-right:23px;"></image>
					<view style="margin-right:8px;">{{item.name}}</view>
					<!--<view class="cu-tag bg-green" style="border-radius:20px;font-size:12px;height:22px;">-->
						<!--已通过-->
					<!--</view>-->
				</view>
			</view>
			<view v-else>
				<lxEmpty></lxEmpty>
			</view>
		</view>
	</view>
</template>
<script>
	import {mapState} from 'vuex';
	import uniLoadMore from '../../../../../components/uni-load-more.vue';
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	export default{
		computed:mapState(['companyObj']),
		data(){
			return{
				companyList:[],
				page:1
			}
		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		onShow(){
			this.getCompanyList();
		},
		methods:{
			checkCompanyInfo(item){
				uni.navigateTo({
					url:'../personnel-member-info/personnel-member-info?type=company&id='+item.id
				})
			},
			getCompanyList(){
				this.$ajax('Vendorships',{
					offset:this.$utils.getOffset(this.page),
					catalog:0,
				},res=>{
					this.companyList=res;
				})
			}
		}
	}
</script>
<style lang="less">
		page{
			background:rgba(247,247,247,1);
		}
		.company-container{

			.company-item{
				padding:19px 17px 9px 20px;
			}
		}
</style>