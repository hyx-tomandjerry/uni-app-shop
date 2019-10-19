<template>
	<view class="position_relative">
		<!-- 门店目标分解 -->
		<cu-custom :isBack="true" bgColor="bg-color-perform">
			<block slot="left">
				<view class="font-size-back font-weight-bold cuIcon-back text-white" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold text-white ">{{shopSaleResolve.name || ''}}绩效分解</view>
			</block>
			<block slot="right">
				<view class="switch-btn flex justify-around">
					<view class="text-white switch-btn-item" :class="{'switch-active':switchTab=='month'}" @click="switchSelect('month')">月</view>
					<view class="text-white switch-btn-item" :class="{'switch-active':switchTab=='day'}" @click="switchSelect('day')">日</view>
				</view>
			</block>
		</cu-custom>
		<!--门店目标 start-->
		<view class="shop-aim-container">
			<view v-if="switchTab=='month'">
				<view class="text-center text-white">{{new Date().getFullYear()}} 年门店年目标</view>
				<view class="shop-aim">¥{{shopSaleResolve.expect || 0}}</view>
				<view class="shop-intro flex justify-start">
					<view class="intro-l flex justify-start flex-1">
						<image src="../../../../../static/icon/icon-time@2x.png" class="intro-i"></image>
						<view>
							<view class="shop-date" v-if="shopSaleResolve.shopBgndate">{{shopSaleResolve.shopBgndate | formatTime('YMD')}}</view>
							<view class="shop-date" v-else>时间未知</view>
							<view class="font-size-mini" style="color:#7C81A3">开业日期</view>
						</view>
					</view>
					<view class="intro-r flex justify-start flex-1">
						<image src="../../../../../static/icon/icon-time@2x.png" class="intro-i"></image>
						<view>

							<view class="shop-date" >{{year}}-12-31</view>
							<view class="font-size-mini" style="color:#7C81A3">截止日期</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="switchTab=='day'">
				<view class="text-center text-white" @click="selectMonth"><text class="cuIcon-back">
					</text>{{new Date().getFullYear()}}年{{month}}月目标<text class="cuIcon-right"></text>
				</view>
				<view class="shop-aim">¥ {{shopSaleResolve.expect || 0}}</view>
				<view class="shop-intro flex justify-between align-center">
					<view class="text-white" style="width:55%;">{{month}}月占全年比重</view>
					<view class="cu-progress round sm striped active" style="margin:0 5px;">

						<view class="bg-color-purple"  :style="[{ width:`${monthPre}%`}]"></view>
					</view>
					<view class="font-family-num font-size-middle  font-weight-bold color-purple">{{monthPre}}%</view>
				</view>
			</view>
		</view>
		<!--门店目标 end-->
		<!--月销售额趋势 start-->
		<!-- <scroll-view scroll-x="true" class="trend-container margin-bottom-normal" v-if="switchTab=='month'">
			<view >
				<view class="font-size-big font-weight-bold color-normal" style="margin-bottom:15px;">月销售额趋势</view>
				<text class="color-regular font-size-mini" style="margin-left:8px;">(单位:元)</text>
				<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix" @touchend="touchEndMix"></canvas>
			</view>

		</scroll-view> -->
		<!-- 分解方法 start -->
		<view class="bg-white margin-bottom-normal resolveWay flex justify-between align-center" v-if="isShowResolveWay && switchTab=='day'">
			<view>分解方式</view>
			<view class="flex justify-between align-center">
				<view v-for="(item,index) in radioTabList" style="margin-left:15px;" :key="index" @click="selectResolveWay(item)">
					<image :src="radio==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:18px;height:18px;vertical-align: middle;margin-right:5px;"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 分解方式 end -->
		<!--月销售额趋势 end-->
		<!--月份列表 start-->
		<view class="month-list-container" v-if="switchTab=='month'">
			<view >
				<view
					  v-for="(item,index) in numList" :key="index" @click="editAim(item)">
					  <view v-if="item.id==12" class="month-list-item flex justify-between">
						  <view class="mon-t" >{{item.name}}</view>
						  <view class="mon-n">
						  	<view class="flex justify-between">
						  		<view>月占比{{item.pre}}%</view>
						  		<view class="font-size-number number-color font-weight-bold">
						  			<text style="margin-right:8px;">¥{{item.mon}}</text>
						  			<!-- 12月份不显示图标，小于开业日期不显示图标 -->

						  		</view>
						  	</view>
						  	<view class="cu-progress round sm striped active" >
						  		<view class="bg-color-red" :style="[{'width':`${item.pre}%`}]" ></view>
						  	</view>
						  </view>
					  </view>
					  <view v-else class="month-list-item flex justify-between">
						  <view class="mon-t" >{{item.name}}</view>
						  <view class="mon-n">
						  	<view class="flex justify-between">
						  		<view>月占比{{item.pre}}%</view>
						  		<view class="font-size-number number-color font-weight-bold">
						  			<text style="margin-right:8px;">¥{{item.mon}}</text>
						  			<!-- 12月份不显示图标，小于开业日期不显示图标 -->
						  			<text class="cuIcon-write" style="color:#7C81A3;" v-if="(year==shopBgnYear && item.id>=shopBgndate) || year>shopBgnYear"></text>
						  		</view>
						  	</view>
						  	<view class="cu-progress round sm striped active" >
						  		<view class="bg-color-red" :style="[{'width':`${item.pre}%`}]" ></view>
						  	</view>
						  </view>
					  </view>

				</view>
			</view>
		</view>

		<view v-if="switchTab=='day'" class="calendar">
			<view class="week-list flex justify-around ">
				<view class="week-item font-size-big font-weight-bold color-regular" v-for="(item,index) in weekList" :key="index">{{item}}</view>
			</view>
			<view class="flex days-list">
				<view class="day lm" v-for="(item,index) in lastMonthDaysList" :key="item.day"><text>{{item.day}}</text></view>
				<block v-for="(item,index2) in currentMonthDaysList" :key="item.day" >
					<view class="day position_relative" @click="editAim(item)" :class="{'day-active':dayTabID==item.day}">
						<view>{{item.day}}</view>
						<view style="position:absolute;bottom:4px;color:#898888;font-size:12px;"
							:class="{'noHas-active':item.num==0}"

						>￥{{item.num}}</view>
					</view>
				</block>
				<view class="day nm" v-for="(item,index3) in nextMonthDaysList" :key="item.day">{{item.day}}</view>
			</view>
		</view>
		<!--月份列表 end-->


		<!--弹出框-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class=" bg-white justify-end" >
					<view class="content" style="padding:25px 23px 19px 23px;text-align:left;" v-if="switchTab=='month'">{{monthTabCur.name}}目标金额</view>
				</view>

				<view class=" bg-white borderBottom " >
					<view class="flex justify-between" style="padding: 3px 23px 14px 24px;">
						<view class="flex justify-start align-center">
							<view style="width:30%;font-size:15px;color:#2A2A2A">金额 <text class="number-color font-weight-bold">￥</text></view>
							<input type="number" placeholder="请输入金额" style="text-align:left;"
								   :class="{
								   	'number-color':num,
								   	'color-regular':!num,
								   	'font-size-normal':!num,
								   	'font-size-big':num,
								   	'font-weight-bold':num
								   	}" v-model="num">
						</view>
						<image src="../../../../../static/icon/icon-bianji.png" style="width:16px;height:19px;"></image>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="flex:1" @click="hideModal()">取消</view>
						<view style="flex:1" @click="setShopAim" class="color-blue">确定</view>
					</view>
				</view>
			</view>
		</view>
		<!--按钮区域 start-->

		<view class="btn-container" v-if="switchTab=='month'">
			<view class="submit-btn" @click="confirmShopAim" >确定</view>
		</view>
		<view v-if="switchTab=='day' && isShowEditDay" class="bg-white flex justify-start align-center" style="padding:11px 14px 3px;width:100%;bottom:0;position:fixed;height:50px;">
			<image src="../../../../../static/icon/icon-bianji.png" style="width:16px;height:19px;margin-right:8px;"></image>
			<input type="text" placeholder="请输入要修改的金额" v-model="num" style="border-bottom:1px solid #ccc;height:31px;width:70%;">
			<view class="editBtn" @click="setShopAim">确定</view>
		</view>
		<!--按钮区域 end-->

		<!--日期选择框 start-->

		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="selectMonthModal">取消</view>
					<view class="action text-blue" @tap="selectMonthModal">确定</view>
				</view>
				<view>
					<view class="grid col-4 padding-sm">
						<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
							<button class="cu-btn border-normal xs block"
								:class="{'month-active':month==item.value,'border-red':year < shopBgnYear || (year == shopBgnYear && item.value<shopBgndate) }"
							 @tap="ChooseCheckbox(item)" :data-value="item.value"> {{item.name}}
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--日期选择框 end-->

		<view class="resolveModal" style="width:100%;min-height:800px;background:rgba(0,0,0,0.2);position:absolute;z-index:9999;top:0;left:0;" v-if="isShowRadio">

			<view  style="width:263px;height:219px;background:#fff;border:1px solid #ccc;position:absolute;transform: translate(-50%,-50%);left:50%;top:50%;transition: all 1s;padding-bottom:5px;">
				<image src='../../../../../static/icon/close.png'style="width:24px;height:24px;margin-top:-10px;position:absolute;right:-10px;" @click="cancelRadio"></image>
				<view style="text-align:center;">
					<image :src="radio==resolveWayZn.day?'../../../../../static/img/work/statistics/resolve-day.png':'../../../../../static/img/work/statistics/resolve-week.png'" style="width:137px;height:90px;margin-top:-40px;margin-left:6px;"></image>
				</view>
				<view class="resolve-content" style="padding-top:4px;padding-left:20px;margin-bottom:17px;">
					<view class="font-size-big color-normal" style="margin-bottom:10px;">{{year}}年{{month}}月</view>
					<view style="margin-bottom:5px;">月目标 :	<text style="color:#14B45D;margin-left:8px;">{{shopSaleResolve.expect || 0}}元</text></view>
					<view v-show="radio==resolveWayZn.day">
						<view style="margin-bottom:5px;">分解方式 :	<text style="color:#14B45D;margin-left:8px;">按天平摊({{monthDay}}天)</text></view>
					</view>
					<view v-show="radio==resolveWayZn.week">
						<view style="margin-bottom:5px;">周末天数 :	<text style="color:#14B45D;margin-left:8px;">{{countWeek}}天</text></view>
						<view style="margin-bottom:5px;">普通天数 :	<text style="color:#14B45D;margin-left:8px;">{{monthDay-countWeek}}天</text></view>
					</view>
				</view>
				<view style="height:30px;line-height:30px;text-align: center;background: url('../../../../../static/img/work/statistics/btn-bg.png') no-repeat center;margin:0 13px;color:#fff;" @click="radioSelect()">确定</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	import {mapState} from 'vuex'
	var canvaMix=null;
	export default{
		computed:mapState(['resolveWayZn']),
		data(){

			return{
				shopBgndate:'',//门店开始时间
				shopBgnYear:'',
				switchTab:'month',//判断年/日
				//曲线图
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				chartData: {
					"categories": ["1月", "2月", "3月", "4月", "5月", "6月","7月","8月","9月", "10月","11月","12月"],
					"series": []
				},
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
				monthTabCur:'',
				monthTabID:'',
				num:'',
				dayTabCur:'',//选择那一天
				dayTabID:'',

				shopID:'',//门店id
				shopSaleResolve:{},
				maxNum:'',//最大值
				radio:'',//单选
				isShowRadio:false,
				radioTabList:[
					{id:1,name:'按天平摊'},
					{id:2,name:'周末加倍'}
				],
				radioTabCur:'',//选择按天平摊，还是周末加倍
				isShowEditDay:false,//是否显示修改金额
				isShowResolveWay:false,//是否显示分解方法
				/*日分解*/
				weekList:['日','一','二','三','四','五','六'],
				// itemIndex:10,
				monthList:[],//月份范围
				yearList:[],//年份范围
				lastMonthDaysList:[],//上个月的总天数
				currentMonthDaysList:[],//当前月总天数
				nextMonthDaysList:[],//下个月总天
				month:new Date().getMonth()+1,
				value:[new Date().getFullYear()-1980,8],
				year:new Date().getFullYear(),
				// monthAim:'',//每个月的月目标
				// yearAim:'',//年目标
				monthPre:'',//月份所占比重
				monthDay:'',//本月有多少天
				countWeek:'',//本月有几个周末
				editItem:'',//要要修改的日期
				checkbox: [
					{value: 1,name: '1月'},
					{value: 2,name: '2月'},
					{value: 3,name: '3月'},
					{value: 4,name: '4月'},
					{value: 5,name: '5月'},
					{value: 6,name: '6月'},
					{value: 7,name: '7月'},
					{value: 8,name: '8月'},
					{value: 9,name: '9月'},
					{value: 10,name: '10月'},
					{value: 11,name: '11月'},
					{value: 12,name: '12月'},
					],

			}
		},
		components:{

		},
		methods:{
			ChooseCheckbox(item) {
				if(new Date().getFullYear()<this.shopBgnYear || (new Date().getFullYear()==this.shopBgnYear && item.value<this.shopBgndate)){
					//如果当前年小于开业日期
					uni.showToast({
						title:'月份在门店未开业之前，不可设置',
						icon:'none'
					})
					return;
				}
				this.month=item.value;

			},
			getWeek(){
				var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1));
				var firstWeekDate = 1;// 默认第一周是本月1号 为了模拟本月1号是否为本月第1周的判断
				if (date.getDay() === 1) { // 判断1号是周一
					firstWeekDatek = 1;
				} else if (date.getDay() === 0) { // 判断1号是周日
					firstWeekDate = 8 - 7 + 1;
				} else { // 判断1号是周二至周六之间
					firstWeekDate = 8 - date.getDay() + 1;
				}
				date.setMonth(date.getMonth()+1);
				date.setDate(0);
				var monthHasDays = date.getDate();// 本月天数
				monthHasDays = date.getDate() - firstWeekDate + 1;
				var hasWeek = Math.ceil(monthHasDays/7); //
				this.countWeek=hasWeek*2;
			},
			/*取消选择分解方法*/
			cancelRadio(){
				this.isShowRadio=false;
				this.radio=''
			},
			/*按周末加倍,或者按天平摊渲染数据*/
			renderByWay(id){
				this.$ajax('NewShopDailyPerformance',{
					date:`${this.year}-${this.month>=10?this.month:'0'+this.month}-${new Date().getDate()>=10?new Date().getDate():'0'+new Date().getDate()}`,
					target:this.shopID,
					doubled:id==2?1:''//传1就是加倍 不穿就是均摊
				},res=>{
					this.isShowResolveWay=false;
					this.getShopAim(this.shopID);

				})
			},
			/*单选选中*/
			selectResolveWay(item){
				this.radio=item.id;
				this.isShowRadio=true
				this.getWeek();//获得有几个周末
			},
			radioSelect() {
				this.renderByWay(this.radio);
				this.isShowRadio=false;
				this.radio='';

			},
			selectMonthModal(){
				if(this.modalName){
					this.modalName=null;
				}
				this.isShowEditDay=false;
				this.dayTabID=''
				this.getCalendar(this.year,this.month);
				this.getShopAimByMonth(this.shopID,this.year,this.month)
			},
			//选择月份显示该月份的天数
			selectMonth(){
				this.modalName='bottomModal';
			},
			chooseMonth(event){
				let val=event.detail.value;
				this.year=this.yearList[val[0]];
				this.month=this.monthList[val[1]];

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
							id:`day${lastMonthDay-startWeek+1+i}`,
							day:lastMonthDay-startWeek+1+i,
							num:0
						});
					}else if(i<(startWeek+fullDay)){
						//当月天数
						this.currentMonthDaysList.push({
							id:`day${i + 1 - startWeek}`,
							day:i + 1 - startWeek,
							num:0
						});
					}else {
						this.nextMonthDaysList.push({
							id:`day${(i + 1 - (startWeek + fullDay))}`,
							day:(i + 1 - (startWeek + fullDay)),
							num:0
						});
					}
				}
				let tmonth=month+1;
			},
			/*确认门店绩效*/
			confirmShopAim(){
				switch (this.switchTab) {
					case 'month':
						if(this.numList[this.numList.length-1].mon<0){
							uni.showToast({
								title:'12月份绩效目标为负值，请重新修改',
								icon:'none'
							})
							return;
						}
						let totalMax=this.numList.reduce((pre,next)=>{return Number(pre)+Number(next.mon)},0);
						if(totalMax!=this.shopSaleResolve.expect){
							uni.showToast({
								title:'年计划与月绩效之和不相符',
								icon:'none'
							})
							return;
						}

						this.$ajax('NewShopMonthlyPerformance',{
							// year:new Date().getFullYear(),
							month1:this.numList[0].mon,
							month2:this.numList[1].mon,
							month3:this.numList[2].mon,
							month4:this.numList[3].mon,
							month5:this.numList[4].mon,
							month6:this.numList[5].mon,
							month7:this.numList[6].mon,
							month8:this.numList[7].mon,
							month9:this.numList[8].mon,
							month10:this.numList[9].mon,
							month11:this.numList[10].mon,
							month12:this.numList[11].mon,
							id:this.shopSaleResolve.id,
							// type:3,
							// target:this.shopID,
							// expect:this.shopSaleResolve.expect
						},res=>{
							uni.showToast({
								title:'设置门店绩效成功!',
								icon:'none',
								success: () => {
									this.getShopAim(this.shopID)
								}
							})

						})
						break;
					case 'day':

						this.$ajax('SetShopDailyPerformance',{
							shop:this.shopID,
							date:`${this.year}-${this.month>=10?this.month:'0'+this.month}-${this.dayTabCur.day>=10?this.dayTabCur.day:'0'+this.dayTabCur.day}`,
							expect:this.dayTabCur.num
						},res=>{
							uni.showToast({
								title:'设置门店绩效成功!',
								icon:'none'
							})
							this.isShowEditDay=false;
							this.getShopAim(this.shopID)
						})

						break;
				}

			},
			/*获得门店绩效数据*/
			getShopAim(id){
				switch(this.switchTab){
					case 'month':
						this.$ajax('ShopMonthlyPerformance',{
							shop:id,
							year:this.year,
						},res=>{
							if(res){
								this.shopSaleResolve=res;
								this.shopBgndate=new Date(res.shopBgndate).getMonth()+1;
								this.shopBgnYear=new Date(res.shopBgndate).getFullYear()
								this.numList.forEach(item=>{

									//如果当前年大于开业日期的年分
									if(new Date().getFullYear()>this.shopBgnYear){
										item.mon=res[`${item.value}`];
										item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
									}else if(new Date().getFullYear()==this.shopBgnYear){
										//如果12月份有值，就不管
										if(item.id!=12){
											if(item.id<this.shopBgndate){
												item.mon=0;
												item.pre=0
											}else{
												item.mon=res[`${item.value}`];
												item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
											}

										}else if(item.id==12){
											if(res['month1']||res['month2']||res['month3']||res['month4']||res['month5']||res['month6']||res['month7']||res['month8']
													||res['month9']||res['month10']||res['month11']||res['month12']){
												item.mon=res[`${item.value}`];
												item.pre=res.expect?Number(item.mon/res.expect*100).toFixed(2):0
											}else{
												item.mon=this.shopSaleResolve.expect;
												item.pre=item.mon/this.shopSaleResolve.expect*100
											}

										}
									}

								})
							}

						})
						break;
					case 'day':
					this.getShopAimByMonth(this.shopID,this.year,this.month)

					break;
				}

			},
			/*根据月份获得绩效*/
			getShopAimByMonth(shopID,year,month){
				//上半部分目标绩效内容
				this.$ajax('ShopMonthlyPerformance',{
					shop:shopID,
					year:year
				},res=>{
					if(res){
						this.shopSaleResolve.id=res.id;
						this.shopSaleResolve.expect=res[`month${month}`];
						this.monthPre=res['expect']?Number(res[`month${month}`]/res['expect']*100).toFixed(2):0
						// let sum=0;
						// this.currentMonthDaysList.forEach(item=>{
						// 	for(let k in  res){
						// 		if(item.id==k){
						// 			item.num=res[k].toFixed(2);
						// 			sum+=Number(item.num);
						// 		}
						// 	}
						// })
						// if(sum==0){
						// 	this.isShowResolveWay=true;
						// }
					}

				})
				this.$ajax('ShopMonthlyPerformance',{
					shop:shopID,
					date:`${year}-${month>=10?month:'0'+month}-${new Date().getDate()>=10?new Date().getDate():'0'+new Date().getDate()}`
				},res=>{
					if(res){
						let sum=0;
						this.currentMonthDaysList.forEach(item=>{
							for(let k in  res){
								if(item.id==k){
									item.num=res[k].toFixed(2);
									sum+=Number(item.num);
								}
							}
						})
						if(sum==0){
							this.isShowResolveWay=true;
						}
					}
				})
			},
			/*设置或者修改金额*/
			setShopAim(){
				switch(this.switchTab){
					case 'month':
						let min=(this.monthTabCur.mon-this.num).toFixed(2);
						this.numList[this.numList.length-1].mon=Number(this.numList[this.numList.length-1].mon)+Number(min);
						this.numList.forEach(item=>{
							if(item.id==this.monthTabCur.id){
								item.mon=this.num;
							}
							this.hideModal()
						})
						break;
						case 'day':
							let dayMin=(Number(this.dayTabCur.num)-Number(this.num)).toFixed(2);
							let len=this.currentMonthDaysList.length-1;
							this.currentMonthDaysList[len].num=(Number(this.currentMonthDaysList[len].num)+Number(dayMin)).toFixed(2);
							this.currentMonthDaysList.forEach((item=>{
									if(item.day==this.dayTabCur.day){
										item.num=this.num
									}
							}))
							this.confirmShopAim()
							break;
				}

			},
			/*
				选择周
			*/
			selectWeek(item){
				this.weekTabCur=item.id;
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
				switch(this.switchTab){
					case 'month':
						if(item.id==12){
							return
						}
						//如果当前时间在开业日期之后
						let stringTime=`${new Date().getFullYear()}-${item.id}-1`;
						//如果当前时间在开业日期之前
						console.log(this.shopBgndate);
						if(this.year==this.shopBgnYear){
							//如果当前年份相等
							console.log('如果当前年份相等');
							if(item.id<this.shopBgndate){
								uni.showToast({
									title:'门店还未开业，无绩效可修改',
									icon:'none'
								})
							}else{
								this.monthTabCur=item;
								this.monthTabID=item.id;
								this.num=this.monthTabCur.mon
								setTimeout(()=>{
									this.modalName='Modal';
								},600)
							}
						}else if(this.year>this.shopBgnYear){
							this.monthTabCur=item;
							this.monthTabID=item.id;
							this.num=this.monthTabCur.mon
							setTimeout(()=>{
								this.modalName='Modal';
							},600)
						}


						break;
					case 'day':
						this.dayTabCur=item;
						this.dayTabID=item.day;
						this.num=item.num;
						this.isShowEditDay=true;
						break;
				}

			},
			/*返回上一页*/
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			/*选择年日*/
			switchSelect(type){
				this.switchTab=type;
				this.getShopAim(this.shopID)

			},
			/*获得曲线的数据*/
			getServerData(){
				this.showMix('canvasMix',this.chartData)
			},
			showMix(canvasId,chartData){
				canvaMix = new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'mix',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:1,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid:false,
						type:'grid',
						gridType:'dash',
						itemCount:4,
						scrollShow:true,
						scrollAlign:'left',
					},
					yAxis: {
						gridType:'dash',
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: this.cWidth,
					height: this.cHeight,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						tooltip:{
							bgColor:'#000000',
							bgOpacity:0.7,
							gridType:'dash',
							dashLength:8,
							gridColor:'#1890ff',
							fontColor:'#FFFFFF',
							horizentalLine:true,
							xAxisLabel:true,
							yAxisLabel:true,
							labelBgColor:'#DFE8FF',
							labelBgOpacity:0.95,
							labelAlign:'left',
							labelFontColor:'#666666'
						}
					},
				})
			},
			touchMix(e){
				canvaMix.scrollStart(e);
			},
			moveMix(e) {
				canvaMix.scroll(e);
			},
			touchEndMix(e) {
				canvaMix.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaMix.showToolTip(e, {
					format:(item, category)=> {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		},
		onLoad(params){
			this.getCalendar(this.year,this.month);
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			if(params.id){
				this.shopID=params.id;
				this.getShopAim(params.id)
			}


		},
		onShow(){

			// this.getShopAim(this.shopID)
		}
	}
</script>
<style lang="less" scoped>
	.switch-btn{
		width:60px;
		height: 24px;
		line-height:13px;
		background:rgba(66,74,119,1);
		border-radius:12px;
		padding:2px 4px;
		margin-right:10px;
		/*background-color: pink;*/
		.switch-btn-item{
			padding: 3px 6px;
			transition:all 1s;
			color: #2a2a2a;
		}
	}
	.switch-active{
		background:rgba(58,66,107,1);
		border-radius:11px;
		color:white !important;
		font-weight:600;

	}

	/*门店目标 start*/
	.shop-aim-container{
		// height: 170px;
		background:url("../../../../../static/img/work/statistics/bg.png") no-repeat;
		padding:20px  15px 30px 20px;
		.shop-aim{
			text-align:center;
			font-size:36px;
			font-weight: bold;
			font-family:DINAlternate-Bold;
			color:rgba(120,246,178,1);
			margin:3px 0 10px;
		}
		.shop-intro{

			.intro-l{


			}
			.intro-r{
				padding-left:15px;
				border-left:1px solid #525A85;
			}
			.intro-i{
				width: 16px;
				height: 16px;
				vertical-align: middle;
				margin-right:6px;
				margin-top:4px;
			}
			.shop-date{
				font-size:16px;
				font-family:DINAlternate-Bold;
				font-weight:bold;
				color:rgba(255,255,255,1);
			}
		}
	}
	/*门店目标 end*/

	/*销售额趋势 start*/
	.trend-container{
		padding:23px 15px 27px;
		background:#fff;
	}
	/*销售额趋势 end*/
	/*月份列表 start*/
	.month-list-container{
		padding:29px 0 1px 0 ;
		background-color: #fff;
		.month-list-item{
			padding: 4px 17px 4px 15px;
			margin-bottom:32px;

			.mon-t{
				width: 38px;
				height: 38px;
				border-radius:50%;
				line-height:38px;
				text-align: center;
				color:#fff;
				background:rgba(66,176,237,1);
			}
			.mon-n{
				flex:1;
				margin-left:15px;
			}
		}
	}
	/*月份列表 end*/
	.edit-active{
		/*transform:translateY(-20px);*/
		box-shadow:0 15px 30px rgba(0,0,0,0.5)
	}
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.cu-dialog{
		width: 263px;
	}
	.week-active{
		border-bottom:3px solid rgba(66,176,237,1);
	}
	.btn-container{
		width:100%;
		padding:0 15px;
		margin-top: 10px;
		.submit-btn{
			text-align: center;
			height:40px;
			line-height:40px;
			color:#fff;
			background:rgba(66,176,237,1);
			border-radius:5px;
			font-size:17px;
		}

	}
	.calendar{overflow-x:hidden;padding-bottom:50px;background:#fff;}

	.calendar .week-list{line-height: 40px;height:40px;}
	.calendar .week-list .week-itm{flex:1;text-align: center;font-size:24px;color:#fff;}
	.calendar .days-list{-webkit-flex-wrap: wrap;flex-wrap: wrap;width:99.995%;}
	.calendar .days-list .day{width: 14.285%;height:50px;font-size:15px;color:#2A2A2A;
		position: relative;text-align: center;padding-top:10px;}
	.calendar .days-list .lm,.calendar .days-list .nm{color:#b6b6b6;}
	.calendar .day .ep{color:#333;}
	.btn-item{
		height:41px;line-height:41px;border:1px solid rgba(66,176,237,1);border-radius:5px;
		text-align: center;
	}
	.btn-item-month{
		color:rgba(66,176,237,1);width:45%;margin-right:20px;
	}
	.btn-item-week{
		background:rgba(66,176,237,1);color:#fff;flex:1;text-align: center;
	}
	.day-active{
		background:#42B0ED;
		color:#fff !important;
		border-radius:6px;
	}

	.noHas-active{
		left:18px;
	}
	.editBtn{
		background:rgba(66,176,237,1);
		border-radius:13px;height:21px;line-height:21px;padding: 0px 8px;color:#fff;margin-left:10px;
	}
	.resolveWay{
		height:53px;
		line-height:53px;
		align-content: sub;
		padding: 0 13px;
		font-size:15px;
		color:#2A2A2A
	}
	.month-active{
		background:#42B0ED;
		color:#fff;
	}
</style>
