<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left">
				<view class="font-size-back color-regular cuIcon-back" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-weight-bold font-size-big color-normal">
					筛选
				</view>
			</block>
		</cu-custom>
		<view class="borderTop search-container">
			<view class="search-item flex justify-between align-center borderBottom" @click="searchShop('brand')">
				<view>品牌名称</view>
				<view class="flex justify-start">
					<view>{{searchObj.brandName || ''}}</view>
					<view class="cuIcon-right font-size-middle color-regular"></view>
				</view>
			</view>
			<view class="search-item flex justify-between align-center " @click="searchShop('area')">
				<view>门店区域</view>
				<view class="flex justify-start">
					<view>{{searchObj.zoneName || ''}}</view>
					<view class="cuIcon-right font-size-middle color-regular"></view>
				</view>
			</view>
		</view>


		<!-- 区域弹出框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='areaBottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModel">取消</view>
					<view class="action text-green" @click="hideModel">确定</view>
				</view>
				<view >
					<mix-tree :list="areaList" @treeItemClick="treeItemClick"></mix-tree>
				</view>
			</view>
		</view>
		<!--品牌弹出框-->
		<view class="cu-modal bottom-modal" :class="modalName=='brandBottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModel">取消</view>
					<view class="action text-green" @click="hideModel">确定</view>
				</view>
				<view >
					<view class="brand-item  flex justify-between" v-for="(item,index) in brandList" :key="index"
						  :class="{'color-blue':searchObj.brandID==item.id}"
						  @click="chooseItem(item,'brand')">{{item.val}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import mixTree from '../../../components/mix-tree/mix-tree.vue'
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
		components:{mixTree},
		methods: {
			chooseItem(item,type){
				switch(type){
					case 'brand':
						this.searchObj.brandID=item.id;
						this.searchObj.brandName=item.val
						break;
					case 'area':
						break;
				}
			},
			searchShop(type){
				switch(type){
					case 'brand':
						this.modalName='brandBottomModal';
						this.getBrandList()
						break;
					case 'area':
						this.modalName='areaBottomModal';
						this.getAreaList()
						break;
				}
			},
			hideModel(){
				if(this.modalName){
					this.modalName=null;
				}
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
				console.log(item);
				let {
					id,
					name,
					parentId
				} = item;
				this.searchObj.zoneID=item.id;
				this.searchObj.zoneName=item.name;


			},
			//获得区域
			getAreaList(){
				this.$ajax('Departments',{
					type:4,
					parent:-1,
					owner:this.companyID
				},res=>{
					this.getTree(res)
				})
			},
			//转为树形图数据
			getTree(data){
				//删除所有children ,防止多次调用
				data.forEach(item=>{
					delete item.children;
				})
				//将数据存储为id为key的map索引
				let map={};
				data.forEach(item=>{
					map[item.id]=item;
				})

				let val=[];
				data.forEach((item)=>{
					//以当前遍历项，的parent去map对象中找到索引的id;
					let parent=map[item.parent];
					//如果找到索引，那说明此项不在顶级中，需要把此项添加到对应的父级中
					if(parent){
						(parent.children || (parent.children=[])).push(item)
					}else{
						val.push(item);//顶级父级
					}
				})
				this.areaList = val
			},
			getBrandList(){
				this.$ajax('MyBrands',{
					owner:this.companyID
				},res=>{
					this.brandList=res;
				})
			}
		},
		onLoad(options){
			if(options.id){
				this.companyID=options.id;
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgba(247,247,247,1);
	}
	.search-container{
		background-color: #fff;
		.search-item{
			padding:0 20px 0 14px;
			height:53px;
			line-height:53px;

		}
	}
	.brand-item{
		height:44px;
		line-height:44px;
		padding-left:16px;

	}
</style>
