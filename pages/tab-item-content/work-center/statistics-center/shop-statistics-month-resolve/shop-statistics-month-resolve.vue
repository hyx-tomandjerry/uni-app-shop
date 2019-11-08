<template>
	<view>
		<!-- 头部 -->
		<cu-custom :isBack="true" bgColor="bg-color-perform">
			<block slot="left">
				<view class="cuIcon-back text-white" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-normal  text-white ">{{shopMonthAim.name || ''}}{{monthItem.name}}绩效分解</view>
			</block>
		</cu-custom>
		<!-- 标题 -->
		<view class="shop-aim-container">
			<resolve-title type="month"
			:shopSaleResolve="shopMonthAim" 
			:month="monthItem.name"></resolve-title>
		</view>
		
		
		
		<!-- 分解方法 -->
		<solve-way :radio="radio" :isShow="isShowResolveWay" @selectResolveWay="selectResolveWay"></solve-way>
		<!-- 分解方法弹出框 -->
		<solve-way-model
			:isShowRadio="isShowRadio"
			:radio="radio"
			:shopMonthAim="shopMonthAim"
			:monthDay="monthDay"
			:countWeek="countWeek"
			:year="year"
			:month="monthItem.id"
			@cancelRadio="cancelRadio"
			@radioSelect="radioSelect"
		></solve-way-model>
		<!-- 单日列表 -->
		<!-- 单日列表 -->
		<calendar-list 
		:currentMonthDaysList="currentMonthDaysList"
		:nextMonthDaysList="nextMonthDaysList"
		:dayTabID="dayTabID"
		:weekList="weekList"
		@editAim="editAim"
		:lastMonthDaysList="lastMonthDaysList"></calendar-list>
		<!-- 显示修改框 -->
		<view v-if="isShowEditDay" class="bg-white edit-day-content animated bounceInUp" >
			<view class="color-normal font-size-big ">
				{{new Date().getFullYear()}}-{{monthItem.id>=10?monthItem.id:'0'+monthItem.id}}-{{editDayItem.day>=10?editDayItem.day:'0'+editDayItem.day}}
			</view>
			<view class="flex  align-center ">
				<image src="../../../../../static/icon/icon-bianji.png"></image>
				<input type="text" 
				
				placeholder="请输入要修改的金额" v-model="num" >
				<view  @click="setShopAim">确定</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import resolveTitle from '../../../../../components/statistics/resolve-title.vue'
	import solveWay from '../../../../../components/statistics/solve-way.vue'
	import solveWayModel from '../../../../../components/statistics/solve-way-model.vue'
	import calendarList from '../../../../../components/statistics/calendar-list.vue'
	export default {
		components:{resolveTitle,solveWay,solveWayModel,calendarList},
		data() {
			return {
				dayTabID:'',
				shopMonthAim:{},
				monthItem:{},
				lastMonthDaysList:[],//上个月的总天数
				currentMonthDaysList:[],//当前月总天数
				nextMonthDaysList:[],//下个月总天
				isShowResolveWay:false,
				shopID:'',
				/*日分解*/
				weekList:['日','一','二','三','四','五','六'],
				month:new Date().getMonth()+1,
				year:new Date().getFullYear(),
				radio:0,//单选
				monthDay:0,//本月有多少天
				countWeek:0,//本月有几个周末
				isShowRadio:false,//显示分解方法弹出框
				isShowEditDay:false,//是否显示修改每天的弹出框
				editDayItem:''
			}
		},
		methods: {
			setShopAim(){
				let dayMin=(Number(this.dayTabCur.num)-Number(this.num)).toFixed(2);//两者之间的差
				
				let last=(Number(this.currentMonthDaysList[this.currentMonthDaysList.length-1].num)+Number(dayMin)).toFixed(2);//最后一个值
				if(last<0){
					uni.showToast({
						title:'最后一天的绩效目标为负值，请重新输入',
						icon:'none'
					})
					return;
				}
				this.currentMonthDaysList[this.currentMonthDaysList.length-1].num=last;
				this.currentMonthDaysList.forEach((item=>{
						if(item.day==this.dayTabCur.day){
							item.num=this.num
						}
				}))
				this.confirmShopAim()
			},
			confirmShopAim(){
				this.$ajax('SetShopDailyPerformance',{
					shop:this.shopID,
					date:`${this.year}-${this.monthItem.id>=10?this.monthItem.id:'0'+this.monthItem.id}-${this.dayTabCur.day>=10?this.dayTabCur.day:'0'+this.dayTabCur.day}`,
					expect:this.dayTabCur.num
				},res=>{
					uni.showToast({
						title:'设置门店绩效成功!',
						icon:'none'
					})
					this.isShowEditDay=false;
					this.getShopAimByMonth(this.shopID);
					this.getCalendar(this.year,this.monthItem.id);
				})
				
			},
			//修改一天
			editAim(item){
				this.editDayItem=item;
				let sum=0;
				this.currentMonthDaysList.forEach(item=>{
					sum+=Number(item.num).toFixed(0);
				})
				if(sum==0){
					uni.showToast({
						title:'绩效目标还未分解,分解之后才可以修改',
						icon:'none'
					})
					this.isShowEditDay=false;
				}else{
					if(this.currentMonthDaysList[this.currentMonthDaysList.length-1].day==item.day){
						uni.showToast({
							title:'最后一天不可修改',
							icon:'none'
						})
						this.isShowEditDay=false;
				
					}else{
						this.dayTabCur=item;
						this.dayTabID=item.day;
						this.num=item.num;
						this.isShowEditDay=true;
					}
				
				}
			},
			/*取消选择分解方法*/
			cancelRadio(){
				this.isShowRadio=false;
				this.radio=0
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
			/*单选选中*/
			selectResolveWay(item){
				this.radio=item.id;
				this.isShowRadio=true
				this.getWeek();//获得有几个周末
			},
			//周末加备或者平坦选定
			radioSelect() {
				this.renderByWay(this.radio);
				this.isShowRadio=false;
				this.radio=0;
			
			},
			/*按周末加倍,或者按天平摊渲染数据*/
			renderByWay(id){
				this.$ajax('NewShopDailyPerformance',{
					date:`${this.year}-${this.monthItem.id>=10?this.monthItem.id:'0'+this.monthItem.id}-01`,
					target:this.shopID,
					doubled:id==2?1:''//传1就是加倍 不穿就是均摊
				},res=>{
					this.isShowResolveWay=false;
					this.getShopAimByMonth(this.shopID)
			
				})
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
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			getShopAimByMonth(shopID){
				
				//上半部分目标绩效内容
				this.$ajax('ShopMonthlyPerformance',{
					shop:shopID,
					year:new Date().getFullYear()
				},res=>{
					if(res){
						res.monthAim=res[`month${this.monthItem.id}`];
						res.monthPre=res['expect']?Number(res[`month${this.monthItem.id}`]/res['expect']*100).toFixed(0):0;
						this.shopMonthAim=res;
					}
			
				})
				this.$ajax('ShopMonthlyPerformance',{
					shop:shopID,
					date:`${new Date().getFullYear()}-${this.monthItem.id>=10?this.monthItem.id:'0'+this.monthItem.id}-01`
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
		},
		onLoad(options){
			if(options.item){
				this.monthItem=JSON.parse(options.item)
			}
			if(options.shopID){
				
				this.shopID=options.shopID
			}
			this.getShopAimByMonth(this.shopID);
			this.getCalendar(this.year,this.monthItem.id);
		}
	}
</script>

<style scoped>
	.shop-aim-container{
		background:url("../../../../../static/img/work/statistics/bg.png") no-repeat;
		padding:20px  15px 30px 72upx;
	}
	.edit-day-content>view:first-child{
		padding:10upx 0;
		margin-bottom:30upx;
	}
	.edit-day-content>view:last-child>image{
		width:40upx;height:40upx;margin-right:8px;flex-shrink: 0;
	}
	.edit-day-content{
		padding:20upx 30upx 30upx;
		position:absolute;
		bottom:0;
		right:0;
		left:0;
	}
	.edit-day-content>view:last-child>input{
		flex:1;
		border-bottom:1px solid #ccc;
		padding-bottom:10upx;
	}
	.edit-day-content>view:last-child>view{
		width:100upx;
		padding:8upx 0;
		text-align: center;
		background:rgba(66,176,237,1);
		border-radius:30upx;
		color:#FFFFFF;
		
	}
</style>
