<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left">
				<view class="cuIcon-back" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-weight-bold font-size-big color-normal">
					筛选
				</view>
			</block>
		</cu-custom>
		<!--销售明星筛选-->
		<view class="search-item borderTop" @click="selectModal('year')">
			<view class="font-size-normal color-normal">日期</view>
			<view class="color-regular" >
				<text v-if="year && month">{{year}}年{{month}}月</text>
				<text class="cuIcon-right font-size-big" style="margin-left:8px;"></text></view>
		</view>
		<!--<view class="search-item borderTop" @click="selectModal('month')">-->
			<!--<view class="font-size-normal color-normal">月</view>-->
			<!--<view class="color-regular">-->
			<!--<text v-if="month">{{month}}月</text>-->

			<!--<text class="cuIcon-right font-size-big" style="margin-left:8px;"></text></view>-->
		<!--</view>-->
		<view class="search-item borderTop" @click="selectModal('area')" >
			<view class="font-size-normal color-normal">区域</view>
			<view class="color-regular">
				<text>{{areaItem.name || ''}}</text>
				<text class="cuIcon-right font-size-big" style="margin-left:8px;"></text>
			</view>
		</view>
		<view class="search-item borderTop" @click="selectModal('brand')" >
			<view class="font-size-normal color-normal">品牌</view>
			<view class="color-regular">
				<text>{{brandItem.name || ''}}</text>
				<text class="cuIcon-right font-size-big" style="margin-left:8px;"></text>
			</view>
		</view>
		<!-- 年份弹出框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='yearBottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModel">取消</view>
					<view class="action text-green" @click="hideModel">确定</view>
				</view>
				<view >
					<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="height:400px;">
						<picker-view-column style="line-height:55px;">
							<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
						</picker-view-column>
						<picker-view-column style="line-height:55px;">
							<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>
		<!-- 月份弹出框 -->
		<!-- <view class="cu-modal bottom-modal" :class="modalName=='MonthBottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModel">取消</view>
					<view class="action text-green" @click="hideModel">确定</view>
				</view>
				<view >
					<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="height:400px;">
						<picker-view-column style="line-height:55px;">
							<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view> -->
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
		
		<!-- 品牌弹出框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='brandBottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModel">取消</view>
					<view class="action text-green" @click="hideModel">确定</view>
				</view>
				<view >
					<view class="brand-list-item align-center" v-for="(item,index) in brandList" :key="index" @click="chooseBrand(item)">
						<view>{{item.name}}</view>
						<image  :src="brandItem.id==item.id?'../../../../../../static/icon/icon-xuanzhong.png':'../../../../../../static/icon/icon-weixuanzhong.png'" mode="" class="icon-choose"></image>
						
					</view>
				</view>
			</view>
		</view>
		

	</view>
</template>

<script>
	import mixTree from '../../../../../../components/mix-tree/mix-tree.vue'
	export default {
		data() {
			const date = new Date()
			const years = []
			const months = []
			for (let i = date.getFullYear()-10; i <= date.getFullYear()+10; i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}

			return {
				provinceList:[],
				timeType:'',//判断是开始时间还是结束时间
				modalName:'',
				title: '',
				years,
				year:'',
				months,
				month:'',
				value: [],
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				type:'',//用于区分门店，区域，公司
				shopID:'',
				areaList:[],
				areaItem:{},
				brandItem:{},
				brandList:[]
			}
		},
		methods: {
			//点击最后一级时触发该事件
			treeItemClick(item) {
				let {
					id,
					name,
					parentId
				} = item;
				this.areaItem=item;

			},
			goBack(){
				
				uni.navigateBack({
					delta:1,
					success:()=>{
						
						this.$fire.fire('search',{
							year:this.year?this.year:new Date().getFullYear(),
							month:this.month,
							target:this.areaItem?this.areaItem.id:'',
							brand:this.brandItem?this.brandItem.id:''
						})
					}
				})
			},
			chooseBrand(item){
				this.brandItem=item;
			},
			//获得区域
			getAreaList(){
				this.$ajax('Departments',{
					type:4,
					parent:-1
				},res=>{
					this.getTree(res)
				})
			},
			bindChange(e) {
				const val = e.detail.value;
				this.year=this.years[val[0]];
				this.month=this.months[val[1]]?this.months[val[1]]:'1'
			},
			/*选择开始时间*/
			selectModal(type){
				this.timeType=type;
				switch(type){
					case 'year':
					this.modalName='yearBottomModal';
					break;
					case 'month':
					this.modalName='MonthBottomModal';
					break;
					case 'area':
					this.modalName='areaBottomModal';
					this.getAreaList()
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
			getBrandList(){
				this.$ajax('MyBrands',{},res=>{
					if(res){
						this.brandList=res;
					}
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
			}


		},
		components:{
			mixTree
		},
		onLoad(params){
			if(params.type){
				this.type=params.type;
			}
			if(params.id){
				this.shopID=params.id;
			}


		}
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
