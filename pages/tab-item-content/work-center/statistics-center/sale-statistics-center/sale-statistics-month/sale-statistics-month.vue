<template>
	<view>
		<cu-custom :is-back="true" bg-color="bg-color-perform">
			<block slot="left"><text class="cuIcon-back font-size-back text-white"  @click.stop="goBack()"></text></block>
			<block slot="content"><view class="font-size-big text-white font-weight-bold">{{shopItem.name}}{{timeObj.month}}月绩效统计</view></block>
		</cu-custom>
		<view class="month-sale-container bg-white margin-bottom-normal">
			<view class="date font-size-supper text-white font-weight-bold">{{timeObj.year}}.{{timeObj.month}}</view>
			<view class="month-count flex justify-between">
				<view>
					<view class="text-white">门店目标(元)</view>
					<view class="aimCount">¥ {{shopAimPerform}}</view>
				</view>
				<view>
					<view class="text-white">门店销售额(元)</view>
					<view class="factCount">¥ {{shopfactPerform}}</view>
				</view>
			</view>
			<view class="sale-progress flex justify-between align-center">
				<view class="flex-xs text-white">{{timeObj.month}}月占比</view>
				<view class="cu-progress round flex-1 striped active" >
					<view class="bg-color-purple" style="width:60%"></view>
				</view>
				<view class="pre color-purple font-size-middle font-weight-bold flex-xs">{{shopPre}}%</view>
			</view>
		</view>
		<view class="sale-count-container  bg-white">
			<view class="sale-count-title flex justify-between">
				<view class="text-center">
					<view class="font-size-big font-weight-bold">{{timeObj.year}}年{{timeObj.month}}月绩效统计数据</view>
					<text class="font-size-mini color-regular" v-if="tabCurVal=='sale'">(点击可查看单日详情)</text>
				</view>
				<view class="chart-tab flex justify-start">
					<view  class="chart-tab-item font-size-mini" v-for="(tab,index) in tabList" :key="index"
						   @click="selectTabCur(tab)"
						   :class="{'active-bg':tabCurVal==tab.value}">{{tab.name}}</view>
				</view>
			</view>
			<view class="sale-count-content">
				<view  class="calendar" v-if="tabCurVal=='sale'">
					<view class="week-list flex justify-around ">
						<view class="week-item font-size-big font-weight-bold color-regular" v-for="(item,index) in weekList" :key="index">{{item}}</view>
					</view>
					<view class="flex days-list">
						<view class="day lm" v-for="(item,index) in lastMonthDaysList" :key="item.day"><text>{{item.day}}</text></view>
						<block v-for="(item,index2) in currentMonthDaysList" :key="item.day" >
							<view class="day position_relative" @click="checkDay(item)" :class="{'day-active':dayTabID==item.day}">
								<view>{{item.day}}</view>
								<view style="position:absolute;bottom:4px;color:#898888;font-size:12px;"
									  :class="{'noHas-active':item.num==0}"

								>￥{{item.num}}</view>
							</view>
						</block>
						<view class="day nm" v-for="(item,index3) in nextMonthDaysList" :key="item.day">{{item.day}}</view>
					</view>
				</view>
				<view v-if="tabCurVal=='man'" class="sale-man-list">
					<view  style="padding-top:20px;">
						<view class="sale-man-item flex justify-between align-center" v-for="(item,index) in salemanList" :key="index">
							<image :src="item.headurl?item.headurl:'../../../../../../static/img/default.png'" mode="" class="sale-avatar"></image>
							<view class="flex-1">
								<view class="sale-info flex justify-between">
									<view style="margin-bottom:7px;">
										<text>{{item.name || ''}}</text>
										<text style="margin-left:20px;">{{item.pre}}%</text>
									</view>
									<view class="font-weight-bold font-size-big text-yellow"
										  :class="{
											'text-blue':(index+1)%2==0,
											'text-orange':(index+1)%3==0,
											'text-red':(index+1)%5==0,
											'text-purple':(index+1)%7==0
											}"
									>￥{{item.value || 0}}</view>
								</view>
								<view class="cu-progress round sm striped active" >
									<view
											:class="{
											'bg-yellow':(index+1)%1==0,
											'bg-blue':(index+1)%2==0,
											'bg-orange':(index+1)%3==0,
											'bg-red':(index+1)%5==0,
											'bg-purple':(index+1)%7==0
										}"
											:style="[{'width':item.pre+'%'}]"></view>
									<!-- <view class="bg-color-purple" style="width:60%"></view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--每日详情-->
		<view class="cu-modal" :class="modalName=='dayModal'?'show':''">
			<view class="cu-dialog">
				<!--<view class="cu-bar bg-white justify-end">-->
					<!--<view class="content">Modal标题</view>-->
					<!--<view class="action" @tap="hideModal">-->
						<!--<text class="cuIcon-close text-red"></text>-->
					<!--</view>-->
				<!--</view>-->
				<view class="padding-xl bg-white borderBottom">
					<view class="font-size-big color-normal day-t" >{{timeObj.year}}年{{timeObj.month}}月{{selectDayItem.day}}日</view>
					<view class="text-left color-normal day-c" >
						<view>日目标：<text  class="font-weight-bold day-item">¥{{selectDayItem.aimnum}}</text></view>
						<view>销售额：<text  class="font-weight-bold day-item">¥{{selectDayItem.num}}</text></view>
						<view>完成度：<text  class="font-weight-bold color-normal day-pre">{{selectDayPre}}%</text></view>
					</view>
				</view>
				<view class="bg-white day-b">
					<view class="font-size-normal color-blue" @click="hideModal">关闭</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopItem:'',
				timeObj:{
					month:new Date().getMonth()+1,
					year:new Date().getFullYear()
				},
				tabList:[
					{name:'销售额',value:'sale'},
					{name:'店员',value:'man'},
				],
				tabCurVal:'sale',
				lastMonthDaysList:[],//上个月的总天数
				currentMonthDaysList:[],//当前月总天数
				nextMonthDaysList:[],//下个月总天
				/*日分解*/
				weekList:['日','一','二','三','四','五','六'],
				dayTabID:'',
				salemanList:[],
				shopfactPerform:'',//门店实际绩效
				shopAimPerform:'',//门店目标绩效
				shopPre:'',
				selectDayItem:'',
				selectDayPre:'',
				modalName:''
			}
		},
		methods: {
			hideModal(){
				if(this.modalName){
					this.modalName=null;
					this.dayTabID=''
				}
			},
			//查看单日详情
			checkDay(item){
				this.dayTabID=item.day;
				this.selectDayItem=this.currentMonthDaysList.find(month=>month.day==item.day)
				this.selectDayPre=this.selectDayItem.aimnum?Number(this.selectDayItem.num/this.selectDayItem.aimnum*100).toFixed(0):0
				this.modalName='dayModal'
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//查看门店详情
			getShopInfo(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shopItem=res;

				})
			},
		//	选择销售额还是店员
			selectTabCur(item){
				this.tabCurVal=item.value;
			},
			/*根据年月获得该月份的天数*/
			getCalendar(year,month){
				//获得该月份总天数
				let fullDay=parseInt(new Date(year,month,0).getDate());
				this.monthDay=fullDay;

				//获得该月第一天是周几
				let startWeek=parseInt(new Date(year,month-1,1).getDay());

				//获得上个月的天数
				let lastMonthDay=parseInt(new Date(year,month,0).getDate());

				let totalDay = (fullDay + startWeek) % 7 == 0 ?
						(fullDay + startWeek) :
						fullDay + startWeek + (7 - (fullDay + startWeek) % 7);//元素总个数

				//年份范围
				let curYear=new Date().getFullYear();
				//年份范围2009-2029
				this.monthList=[];
				this.yearList=[];
				for(var i=1990;i<=curYear+10;i++){
					this.yearList.push(i)
				}
				//月份范围1-12
				for(var i=1;i<=12;i++){
					this.monthList.push(i);
				}

				//遍历日历
				this.currentMonthDaysList=[];
				this.lastMonthDaysList=[];
				this.nextMonthDaysList=[];
				for(let i=0;i<totalDay;i++){
					if(i<startWeek){
						//如果第一天不是周日的情况下，就渲染上个月的数据
						this.lastMonthDaysList.push({
							id:`aday${lastMonthDay-startWeek+1+i}`,
							aimid:`day${lastMonthDay-startWeek+1+i}`,
							day:lastMonthDay-startWeek+1+i,
							num:0.00,
							aimnum:0.00
						});
					}else if(i<(startWeek+fullDay)){
						//当月天数
						this.currentMonthDaysList.push({
							id:`aday${i + 1 - startWeek}`,
							aimid:`day${i + 1 - startWeek}`,
							day:i + 1 - startWeek,
							num:0.00,
							aimnum:0.00
						});
					}else {
						this.nextMonthDaysList.push({
							id:`aday${(i + 1 - (startWeek + fullDay))}`,
							aimid:`day${(i + 1 - (startWeek + fullDay))}`,
							day:(i + 1 - (startWeek + fullDay)),
							num:0.00,
							aimnum:0.00
						});
					}
				}
				let tmonth=month+1;
			},
			//获得月份绩效
			// getShopMonthPerformance(id,year){
			// 	this.$ajax('ShopMonthlyPerformance',{
			// 		shop:id,
			// 		year:year
			// 	},res=>{
			// 		if(res){
			// 			this.shopfactPerform=res[`amonth${this.timeObj.month}`]?res[`amonth${this.timeObj.month}`]:0;
			// 			this.shopAimPerform=res[`month${this.timeObj.month}`]?res[`month${this.timeObj.month}`]:0
			// 			this.shopPre=this.shopAimPerform && this.shopfactPerform?Number(this.shopfactPerform/this.shopAimPerform*100).toFixed(2):0
			// 		}
			//
			// 	})
			// },
			//根据月份获得天数
			getShopDayilyPerformance(id,timeObj){
				this.$ajax('ShopMonthlyPerformance',{
					shop:id,
					date:`${timeObj.year}-${timeObj.month}-01`
				},res=>{
					this.shopfactPerform=res['actual']?res['actual']:0;
					this.shopAimPerform=res['expect']?res['expect']:0;
					this.shopPre=res['expect']?Number(res['actual']/res['expect']*100).toFixed(2):0;
					this.getCalendar(timeObj.year,timeObj.month);
					this.currentMonthDaysList.forEach(day=>{
						Object.keys(res).forEach(item=>{
							if(item==day.id){
								day.num=Number(res[item]).toFixed(2)
							}
							if(item==day.aimid){
								day.aimnum=Number(res[item]).toFixed(2)
							}
						})
					})


					if(res.salesmen && res.salesmen.length){
						res.salesmen.forEach(sale=>{
							sale.pre=res['expect']?Number(sale.value/res['expect']*100).toFixed(0):0
						})
						this.salemanList=res.salesmen
					}
				})
			}
		},
		onLoad(options){
			if(options){
				this.getShopInfo(options.shopID);
				this.timeObj={
					year:options.year,
					month:options.month
				}
			}
			this.getShopDayilyPerformance(options.shopID,this.timeObj)
			// this.getCalendar(this.timeObj.year,this.timeObj.month);
			// this.getShopMonthPerformance(options.shopID,this.timeObj.year)


		}
	}
</script>

<style lang="less" scoped>
	.month-sale-container{
		background: url('../../../../../../static/img/work/statistics/bg.png') no-repeat;
		background-size:cover;
		padding-top:10px;
		padding-left: 26px;
		padding-bottom: 30px;
		.date{
			margin-top: 15px;
		}
		.month-count{
			padding-right: 40px;
			margin-bottom: 16px;
			.aimCount{
				margin-top: 5px;
				font-size:24px;
				font-weight:bold;
				color:rgba(120,246,178,1);
			}
			.factCount{
				margin-top: 5px;
				font-size:24px;
				font-weight:bold;
				color:#FF7A91;
			}
		}
		.sale-progress{
			padding-right: 20px;
			.pre{
				padding-left: 10px;
			}
		}
	}
	.sale-count-container{
		padding:20px 9px  15px 14px;
		.sale-count-title{
			margin-bottom: 10px;
		}
		.chart-tab{
			width:25%;
			height:22px;
			line-height:21px;
			border-radius:10px;
			border:1px solid rgba(66,176,237,1);
			.chart-tab-item{
				flex:1;
				text-align: center;

			}
			.chart-tab-item:first-child{
				border-radius:5px 0 0 5px;
			}
			.chart-tab-item:nth-child(2){
				border-radius:0px 5px  5px 0;
			}
		}
	}
	.active-bg{
		background:rgba(66,176,237,1);
		color:#fff;
	}
	.calendar{overflow-x:hidden;padding-bottom:50px;background:#fff;}

	.calendar .week-list{line-height: 40px;height:40px;}
	.calendar .week-list .week-itm{flex:1;text-align: center;font-size:24px;color:#fff;}
	.calendar .days-list{-webkit-flex-wrap: wrap;flex-wrap: wrap;width:99.995%;}
	.calendar .days-list .day{width: 14.285%;height:50px;font-size:15px;color:#2A2A2A;
		position: relative;text-align: center;padding-top:10px;}
	.calendar .days-list .lm,.calendar .days-list .nm{color:#b6b6b6;}
	.calendar .day .ep{color:#333;}
	.day-active{
		background:#42B0ED;
		color:#fff !important;
		border-radius:6px;
	}

	.noHas-active{
		left:15px;
	}
	.sale-man-list{
		padding-top: 20px;

	}
	.sale-man-item{
		margin-bottom: 18px;
		.sale-avatar{
			width: 50px;
			height: 50px;
			border-radius:50%;
			margin-right:8px;
			vertical-align: middle;
		}
	}
	.day-active{
		background:#42B0ED;
		color:#fff !important;
		border-radius:6px;
	}
	.cu-dialog{
		width:270px;
	}
	.padding-xl{
		padding:27px 27px 10px 27px;
		.day-t{
			margin-bottom:12px;
		}
		.day-c{
			padding-bottom:10px;
		}
		.day-item{
			font-size:18px;color:#FF4867;margin-bottom:6px;
		}
		.day-pre{
			font-size:18px;margin-bottom:6px;
		}
	}
	.day-b{
		padding-top:11px;padding-bottom:11px;text-align: center;
	}
</style>
