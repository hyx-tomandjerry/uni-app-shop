<template>
	<view class="position_relative">
		<!-- 门店目标分解 -->
		<cu-custom :isBack="true" bgColor="bg-color-perform">
			<block slot="left">
				<view class="cuIcon-back text-white" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold text-white ">{{shopSaleResolve.name || ''}}绩效分解</view>
			</block>
		</cu-custom>
		<!--门店目标 start-->
		<view class="shop-aim-container">
			<resolve-title
			:shopSaleResolve="shopSaleResolve"
			type="year"
			></resolve-title>
		</view>
		<!--门店目标 end-->
		<!--月份列表 start-->
		<view class="month-list-content" >
			<block v-for="(item,index) in numList" :key="index">
				<resolveMonthItem 
				 :item="item" 
				 :index="index"
				 @editAim="editAim"
				 @checkItem="checkItem"
				></resolveMonthItem>
			</block>
			
		</view>
		
		
		<!--弹出框-->
		<statistics-edit-model 
			:isShow="modalName=='Modal'"
			:monthTabCur="monthTabCur"
			@hideModal="hideModal"
			@setShopAim="setShopAim"
		></statistics-edit-model>
		
		
		
		<simpleModel :isShow="isShow" @hideSimpleModel="hideSecondModal()" v-if="isShow">
			<block slot="content">
				<view>12月份绩效目标为负值，请重新修改</view>
			</block>
		</simpleModel>
	</view>
</template>
<script>
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	import {mapState} from 'vuex'
	import resolveTitle from '../../../../../components/statistics/resolve-title.vue'
	import resolveMonthItem from '../../../../../components/statistics/resolve-month-item.vue'
	import simpleModel from '../../../../../components/simple-model.vue'
	import statisticsEditModel from '../../../../../components/statistics/statistics-edit-model.vue'
	export default{
		data(){
			return{
				isShow:false,//显示提示
				shopBgndate:'',//门店开始时间
				shopBgnYear:'',
				numList:[
					{name:'1月',mon:0,id:1,value:"month1",pre:0},
					{name:'2月',mon:0,id:2,value:"month2",pre:0},
					{name:'3月',mon:0,id:3,value:"month3",pre:0},
					{name:'4月',mon:0,id:4,value:"month4",pre:0},
					{name:'5月',mon:0,id:5,value:"month5",pre:0},
					{name:'6月',mon:0,id:6,value:"month6",pre:0},
					{name:'7月',mon:0,id:7,value:"month7",pre:0},
					{name:'8月',mon:0,id:8,value:"month8",pre:0},
					{name:'9月',mon:0,id:9,value:"month9",pre:0},
					{name:'10月',mon:0,id:10,value:"month10",pre:0},
					{name:'11月',mon:0,id:11,value:"month11",pre:0},
					{name:'12月',mon:0,id:12,value:"month12",pre:0},
				],
				modalName:'',
				monthTabCur:{},
				monthTabID:'',
				shopID:'',//门店id
				shopSaleResolve:{},
			}
		},
		components:{
			resolveTitle,
			resolveMonthItem,
			simpleModel,
			statisticsEditModel
		},
		methods:{
			hideSecondModal(){
				this.isShow=false;
			},
			setShopAim(num){
				let min=(this.monthTabCur.mon-Number(num)).toFixed(0);//获得当前月份值和输入的值的差
				let x=Number(this.numList[this.numList.length-1].mon)+Number(min);
				if(x<0){
					this.isShow=true;
					return;
				}
				this.numList[this.numList.length-1].mon=x;
				this.numList.forEach(item=>{
					if(item.id==this.monthTabCur.id){
						item.mon=Number(num);
					}
				})
				this.confirmShopAim()						
			},
			checkItem(item){
				if(!Number(item.mon)){
					uni.showToast({
						title:'绩效目标还未分解',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url: '../shop-statistics-month-resolve/shop-statistics-month-resolve?item='+JSON.stringify(item)+"&shopID="+this.shopID
					});
				}
				
			},
			/*确认门店绩效*/
			confirmShopAim(){
				let arr=[]
				this.numList.forEach(item=>{
					arr.push(item.mon)
				})
				this.$ajax('BreakDownYearlySalesPlan',{
					year:new Date().getFullYear(),
					shop:this.shopID,
					amount:this.shopSaleResolve.expect,
					months:arr.join(',')
				},res=>{
					uni.showToast({
						title:'设置门店绩效成功!',
						icon:'none'
					})
					this.getShopAim(this.shopID);
					this.hideModal()
				
				})

			},
			/*获得门店绩效数据*/
			getShopAim(id){
				this.$ajax('ShopYearlySalesPlan',{
					shop:id,
					year:new Date().getFullYear(),
					withActual: 1
				},res=>{
					if(res){
						this.shopSaleResolve=res;
						this.shopBgndate=new Date(res.bgndate).getMonth()+1;
						this.shopBgnYear=new Date(res.bgndate).getFullYear();
						this.numList.forEach(item=>{
							if(res['month1']||res['month2']||res['month3']||res['month4']||res['month5']||res['month6']||res['month7']||res['month8']
									||res['month9']||res['month10']||res['month11']||res['month12']){
										//如果一个有数据，就赋值
								item.mon=res[`${item.value}`];
								item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
							}else{
								if(item.id==12){
									item.mon=this.shopSaleResolve.expect;
									item.pre=this.shopSaleResolve.expect?Number(item.mon/this.shopSaleResolve.expect*100).toFixed(2):0
								}else{
									item.mon=res[`${item.value}`];
									item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
								}
							}
				// 			//如果当前年大于开业日期的年分
				// 			if(new Date().getFullYear()>this.shopBgnYear){
				// 				if(res['month1']||res['month2']||res['month3']||res['month4']||res['month5']||res['month6']||res['month7']||res['month8']
				// 						||res['month9']||res['month10']||res['month11']||res['month12']){
				// 							//如果一个有数据，就赋值
				// 					item.mon=res[`${item.value}`];
				// 					item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
				// 				}else{
				// 					if(item.id==12){
				// 						item.mon=this.shopSaleResolve.expect;
				// 						item.pre=item.mon/this.shopSaleResolve.expect*100
				// 					}else{
				// 						item.mon=res[`${item.value}`];
				// 						item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
				// 					}
				// 				}
				// 			}else if(new Date().getFullYear()==this.shopBgnYear){
				// 				//如果12月份有值，就不管
				// 				if(item.id!=12){
				// 					if(item.id<this.shopBgndate){
				// 						item.mon=0;
				// 						item.pre=0
				// 					}else{
				// 						item.mon=res[`${item.value}`];
				// 						item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
				// 					}
				
				// 				}else if(item.id==12){
				// 					if(res['month1']||res['month2']||res['month3']||res['month4']||res['month5']||res['month6']||res['month7']||res['month8']
				// 							||res['month9']||res['month10']||res['month11']||res['month12']){
				// 						item.mon=res[`${item.value}`];
				// 						item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
				// 					}else{
				// 						item.mon=this.shopSaleResolve.expect;
				// 						item.pre=item.mon/this.shopSaleResolve.expect*100
				// 					}
				
				// 				}
				// 			}
				
						})
					}
				
				})
			},
			/*关闭弹出框*/
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
				this.monthTabID=null;
			},
			/*编辑门店目标*/
			editAim(item){
				this.monthTabCur=item;
				this.monthTabID=item.id;
				this.num=this.monthTabCur.mon
				this.modalName='Modal';
			},
			/*返回上一页*/
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			
			
		},
		onLoad(params){
			if(params.id){
				this.shopID=params.id;
				this.getShopAim(params.id)
			}


		},
		onShow(){
			this.getShopAim(this.shopID)
		}
	}
</script>
<style lang="less" scoped>

	/*12个月*/
	.month-list-content{
		padding:20upx 26upx;
		background:rgba(247,247,247,1);
	}
	/*门店目标 start*/
	.shop-aim-container{
		background:url("../../../../../static/img/work/statistics/bg.png") no-repeat center center;
		background-size: cover;
		padding:20px  15px 30px 72upx;	
	}
	
	
	
	
	


	
</style>
