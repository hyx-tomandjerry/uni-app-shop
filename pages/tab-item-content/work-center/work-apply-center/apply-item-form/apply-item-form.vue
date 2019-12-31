<template>
	<view>
		<!-- form区域开始 -->
		<view class="form-container borderTop">
			<common-flex 
				leftContent="选择门店" 
				:rightContent="shop.name || ''"
				@operateItem="chooseShop"
				:type="shopCount!=1?'navigate':'normal'"
				></common-flex>
				
			<template v-if="type==approvalMode.absence">
				<view class="cu-form-group">
					<view class="title "><text class="color-red">*</text> 请假类型</view>
					<view class="flex justify-around vacation-type">
						<block v-for="(item,index) in vacationType" :key="index">
							<view @tap="chooseVacationType((item))">
								<image 
									:src="xType==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'"
									 mode="widthFix" class="xuanze-img"></image>
								<text>{{item.name}}</text>
							</view>
						</block>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title "><text class="color-red">*</text> 开始时间</view>
					<view class="flex justify-start align-center">
						<dyDateTime @getData="getDataStart"
									:class="{
										'color-normal':this.start,
										'color-regular':!this.start
									}"
									 :placeholder="start?start:'选择开始时间'"></dyDateTime>
						<text class="cuIcon-right font-size-big color-regular"></text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title "><text class="color-red">*</text> 结束时间</view>
					<view class="flex justify-start align-center">
						<dyDateTime @getData="getDataEnd"
									:class="{
										'color-normal':this.end,
										'color-regular':!this.end
									}"
									:placeholder="end?end:'选择结束时间'"></dyDateTime>
						<text class="cuIcon-right font-size-big color-regular"></text>
					</view>
				</view>
				<view class="cu-form-group borderBottom">
					<view class="title "><text class="color-red">*</text> 请假时长</view>
					<view>
						<text v-if="time.days">{{time.days}}天</text>
						<text v-if="time.hours">{{time.hours}}小时</text>
						<text v-if="time.minutes">{{time.minutes}}分钟</text>
						<text v-if="time.seconds">{{time.seconds}}秒</text>
					</view>
				</view>
				
			</template>
			<template v-if="type==approvalMode.common">
				<view class="cu-form-group borderBottom">
					<view class="title"><text class="color-red">*</text> 申请名称</view>
					<view>
						<input type="text" class="uni-input"  placeholder="申请名称" v-model="applyName" />
					</view>
				</view>
			</template>
			<!-- 请假原因 start-->
			<template v-if="type==approvalMode.absence ||type==approvalMode.common ">
				<view class="text-area">
					<view class="font-size-normal color-normal"><text class="color-red">*</text>申请事由</view>
					<textarea  placeholder="请输入申请事由" v-model="reason"/>
				</view>
			</template>
			<!-- 请假原因end -->
			<!-- 报销申请start -->
			<template v-if="type==approvalMode.expense">
				<repayForm 
				v-for="(item,index) in items" :key="index"
				:item="item"
				@deleteIndex="delIndex"
				@onChooseExpenseItem="onChooseExpenseItem"
				:index="index" ></repayForm>

				<view class="flex-all bg-white text-center repay-btn" @click="addTemp">
					增加报销
				</view>
			</template>
			<file-upload
				:isRed="true"
				@upload="uploadSuccess"
				:inImgList="imgList"
				:inFiles="files"
				src="../../../../../static/img/work/camera.png" 
				:xType="fileType" 
				xTarget="0"></file-upload>
			<!-- 上传附件end-->

			<!-- 审批流程start -->
			<common-flex 
					v-if="newOrEdit=='create'"
					type="navigate"
					@operateItem="chooseWorkFlow"
					leftContent="审批流程" 
					:rightContent="workflow.name || ''"></common-flex>
			<view class="workflow-contaienr bg-white" v-show="workflow['steps'] ">
				<view>
					<view></view>
					<view class="font-size-normal font-weight-bold color-normal">审批步骤</view>
				</view>
				<view style="padding:20upx 0;">
					<block v-for="(item,index) in workflow.steps" :key="index">
						<workflowItem :workflow="item" :index="index"></workflowItem>
					</block>
				</view>

			</view>
			<!-- 审批流程end -->
		</view>
		<view style="height:200upx;"></view>
		<!-- form区域结束 -->
		<common-btn-one
			type="primary" 
			:disabled="disabled" 
			content="提交申请"
			@operateBtn="submitApply" :isPos="true"></common-btn-one>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import fileUpload from '../../../../../components/common/file-upload.vue'
	import repayForm from '../../../../../components/work-apply/repay-form.vue'
	import dyDateTime from '../../../../../components/lanxiujuan-dyDateTime/lanxiujuan-dyDateTime.vue'
	import workflowItem from '../../../../../components/common/workflow-item.vue'
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import commonFlex from '../../../../../components/common/common-flex.vue'
	import {ChainShopApi} from '../../../../../api/shop_api.js'
	import {NewRoutineAppApi,ApplyExpenseApi,NewCommonFormApi,ExpenseApi,CommonFormApi,RoutineAppApi} from '../../../../../api/apply_api.js'
	const getDate =(type)=> {
			 const date = new Date();
			 let year = date.getFullYear();
			 let month = date.getMonth() + 1;
			 let day = date.getDate();
			 			
			 if (type === 'start') {
			     year = year - 60;
			 } else if (type === 'end') {
			     year = year + 2;
			 }
			 month = month > 9 ? month : '0' + month;;
			 day = day > 9 ? day : '0' + day;
			 return `${year}-${month}-${day}`;           
	}
	const defaultFormItem = {
		detail:'',
		xType:'',
		occdate: getDate({
			    format: true
			}),
		amount:'',
		xTypeName:''
	}
	export default {
		computed:{
			...mapState(['userInfo','shopCount','shopOnlyObj']),
			approvalMode(){return this.config.approvalMode}
		},
		components:{repayForm,dyDateTime,workflowItem,commonBtnOne,commonFlex,fileUpload},
		data() {
			return {
					type:'',//请假类型
					title:'',//标题内容
					fileType:'',//上传附件类
					items:[defaultFormItem],
					shop:'',
					//请假类型
					xType:1,
					vacationType:[
						{id:this.config.absenceType.affair,name:"事假"},
						{id:this.config.absenceType.sick,name:"病假"},
						{id:this.config.absenceType.change,name:"调休"},
					],
					picker: ['事假', '病假', '调休'],
					start:'',//开始时间
					end:'',//结束时间
					//相差时间
					time:{
						days:0,
						hours:0,
						minutes:0,
						seconds:0
					},
					reason:'',//请假事由
					workflow:'',//审批流程
					applyName:'',//申请名称
					newOrEdit:'',//判断是新建还是修改
					applyItem:'',//要修改的内容
					disabled:false,
					imgList:[],
					files:[],//附件
					token:''
			}
		},
		methods: {			
			uploadSuccess(event){
				this.files=event;
			},
			onChooseExpenseItem(event){
				const {item,index} = event	
				this.$set(this.items,index,item )
			},
			getDataStart(event){
				if(event){
					this.start=event;
					if(this.newOrEdit=='edit'){
						this.time=this.$timer.getTimeInfo(this.start,this.end)
					}


				}
			},
			getDataEnd(event){
				if(!this.start){
					
					this.$utils.showToast('请选择开始时间')
				}else if(event){
					this.time=this.$timer.getTimeInfo(this.start,event);
					this.end=event;
					
				}
			},
			uploadData(val){
				 let index = val.index
				 this.items[index] = val.data
			},
			//提交流程
			async submitApply(){
				switch(Number(this.type)){
					case this.approvalMode.absence:

						// 请假
						if(!this.shop.id){
							
							this.$utils.showToast('请选择门店')
						}else if(!this.start){
							
							this.$utils.showToast('请选择开始时间')
						}else if(!this.end){
							
							this.$utils.showToast('请选择结束时间')
						}else if(!this.reason){
							
							this.$utils.showToast('请选择请假类型')
						}else if(this.newOrEdit=='create'&&!this.workflow.id){
							
							this.$utils.showToast('请选择审批流程')
						}else{
							this.disabled=true;
							let value={
								shop:this.shop.id,//门店ID
								xtype:this.xType,//请假类型
								bgn:this.newOrEdit=='edit'?this.start:this.$moment(new Date(this.start)).format('YYYY-MM-DD HH:ss:mm'),//开始时间
								due:this.newOrEdit=='edit'?this.end:this.$moment(new Date(this.end)).format('YYYY-MM-DD HH:ss:mm'),//结束时间
								detail:this.reason,//请假事由
								files:this.files?this.files.join(','):'',
								workflow:this.newOrEdit=='edit'?this.applyItem.workflow:this.workflow.id,//流程名称,
								id:this.newOrEdit=='edit'?this.applyItem.id:''
							}
							
							if(await NewRoutineAppApi(value)){
								this.$utils.showToast('请假申请成功');
								setTimeout(()=>{
									uni.navigateBack({
										delta:this.newOrEdit=='edit'?2:1
									});
								},800)
							}
						};

						break;
					case  this.approvalMode.expense:
						// 报销
						if(!this.shop.id){
							
							this.$utils.showToast('请选择门店')
							this.disabled=false;
						}else{
							
							let arr=[];
							this.items.forEach(item=>{
								if(item.amount && item.xType && item.detail){
									arr.push(`${Number(item.xType)},${item.detail},${item.amount},${item.occdate}`)
								}
								
							})
							let flag=false;
							this.items.forEach(item=>{
								if(!item.detail  || !item.amount  || !item.xType){
									flag=true;
								}
							})
							if(flag){
								
								this.$utils.showToast('请添加报销明细')
								this.disabled=false;
							}else if(this.newOrEdit=='create'&&!this.workflow.id){
								
								this.$utils.showToast('请选择审批流程')
								this.disabled=false;
							}else{
								let value1={
									shop:this.shop.id,
									files:this.files?this.files.join(','):'',
									workflow:this.newOrEdit=='edit'?this.applyItem.workflow:this.workflow.id,//流程名称,
									details:arr.join('/'),
									id:this.newOrEdit=='edit'?this.applyItem.id:''
								}
								if(await ApplyExpenseApi(value1)){
									this.$utils.showToast('报销申请成功');
									setTimeout(()=>{
										uni.navigateBack({
											delta:this.newOrEdit=='edit'?2:1
										});
									},800)
								}

							}
						}


						break;
					case this.approvalMode.common:
						this.disabled=true;
						let value2={
							shop:this.shop.id,//门店名称
							name:this.applyName,//申请名称
							summary:this.reason,//请假事由
							files:this.files?this.files.join(','):'',
							workflow:this.newOrEdit=='edit'?this.applyItem.workflow:this.workflow.id,//流程名称,
							id:this.newOrEdit=='edit'?this.applyItem.id:''
						}
						if(await NewCommonFormApi(value2)){
							this.$utils.showToast('通用申请成功');
							setTimeout(()=>{
								uni.navigateBack({
									delta: this.newOrEdit=='edit'?2:1
								});
							},800)
						}

						// 通用
						break;
				}

			},
			//选择流程
			chooseWorkFlow(){
				uni.navigateTo({
					url: '../../../shop-center/work-flow/work-flow?type='+this.type
				});
			},
			//上传附件
			successUpload(event){
				this.files=event;
			},
			
			chooseVacationType(item){
				this.xType=item.id;
			},
			//获得门店信息
			async getShopInfo(id){
				this.shop =await ChainShopApi(id)
			},
			// 选择门店
			chooseShop(){
				if(this.shopCount==1) return;
				uni.navigateTo({
					url: '../../../shop-center/near-shop-list/near-shop-list?cat=apply'
				});
			},
			//添加模板
			addTemp(){
				this.items.push(defaultFormItem)
			},
			delIndex(index){
				 if (index !== 0) {
				    this.items.splice(index, 1)
				}
			},
			//获得申请内容
			
			async getApplyItemInfo(id,type){
				let result ={}
				switch(Number(type)){
						//报销
					
					case this.approvalMode.expense:
						result = await ExpenseApi(id);
						if(result.files &&  result.files.length){
							this.imgList=this.$utils.getFiles(result.files).img;
							this.files=this.$utils.getFiles(result.files).file;
						}
						this.shop={id:result.shop,name:result['shopName']};
						if(result.details){
							let arr=[];
							result.details.forEach((item)=>{
								arr = [...arr,{
									detail:item.detail,
									xType:item.subject,
									occdate:this.$moment(item.occdate).format('YYYY-MM-DD'),
									amount:item.amount,
									xTypeName:item.subjectName,
								}]
							})
							this.items = arr;
						}
													
						this.applyItem=result;

						break;
						//通用
					case this.approvalMode.common:
						 result = await CommonFormApi(id);
						if(result.files &&  result.files.length){
							this.imgList=this.$utils.getFiles(result.files).img;
							this.files=this.$utils.getFiles(result.files).file;
						}
						this.shop={
							id:result.shop,
							name:result['shopName']
						}
						this.applyName=result.name;
						this.reason=result.summary?result.summary:''
						this.applyItem=result;
						

						break;
						//请假
					case this.approvalMode.absence:
						 result = await RoutineAppApi(id);
						 if(result.files &&  result.files.length){
							 
						 	this.imgList=this.$utils.getFiles(result.files).img;
						 	this.files=this.$utils.getFiles(result.files).file;
						 }
						 //门店
						 this.shop={
						 	id:result.shop,
						 	name:result['shopName']
						 }
						 //请假类型
						 this.xType=result.xtype;
						 this.start=this.$moment(result.bgndate).format('YYYY/MM/DD hh:mm')
						 this.end=this.$moment(result.duedate).format('YYYY/MM/DD hh:mm')
						 this.time=this.$timer.getTimeInfo(this.start,this.end)
						 this.reason=result.detail?result.detail:''
						 this.applyItem=result;

						break;
				}
			}
		},
		onShow(){
			this.$fire.on('workFlow',result=>{
				if(result){
					this.workflow=result;
				}
			})
			this.$fire.on('createOrderShopID',result=>{
				if(result){
					this.getShopInfo(result)
				}
			
			})
		},
		onLoad(options){
			if(this.shopCount==1){
				this.shop=this.shopOnlyObj
			}
			this.newOrEdit=options.cat;
			switch(Number(options.type)){
				case this.approvalMode.absence:
					this.type=this.approvalMode['absence'];
					this.title='请假申请';
					this.fileType=this.config.doc['routineApp']
					break;
				case this.approvalMode.expense:
					this.type=this.approvalMode['expense']
					this.title='报销申请';
					this.fileType=this.config.doc['expense']
					break;
				case this.approvalMode.common:
					this.type=this.approvalMode['common']
					this.title='通用申请';
					this.fileType=this.config.doc['commonForm']
					break;
			}
			uni.setNavigationBarTitle({
				title: this.title
			});
			if(options.cat=='edit'){
				this.getApplyItemInfo(options.id,options.type)
			}
		}
	}
</script>

<style scoped>
	.vacation-type>view{
		margin:0 8upx;
	}
	.xuanze-img{
		margin-right:6upx;
	}
	/* 报销start */
	.repay-btn{
			height:80upx;line-height:80upx;background:#42B0ED;color:#fff;
	}
	/* 报销end */
	/* 按钮 */
	/* .btn-container{
		margin:28upx;
		width:95%;
		background:rgba(66,176,237,1);
		border-radius:5px;
		height:80upx;
		font-size:32upx;
		color:#fff;
		line-height:80upx;
		text-align: center;
	} */
	/* 流程内容 */
	.workflow-contaienr{
		padding-top:26upx;
		padding-left:28upx;
	}
	.workflow-contaienr>view:first-child{
		display: flex;
		align-items: center;
	}
	.workflow-contaienr>view:first-child>view:first-child{
		width:12upx;
		height:40upx;
		border-right: 6upx;
		background-color: #42B0EF;
		margin-right:20upx;
	}
	/* .workflow-p{
		padding-left:32upx;
	}
	.workflow-p>view{
		padding:10upx ;
	}
	.workflow-p>view>view:first-child{
		width:40upx;
		height:40upx;
		background:rgba(255,153,0,1);
		line-height:40upx;
		text-align: center;
		font-size:26upx;
		color:#fff;
		border-radius:100%;
		margin-right:30upx;
	}
	.workflow-p>view>view:last-child{
		flex:1;
		padding: 10px;
		background: rgba(247,247,247,1);
		border-radius: 10px;
	} */
	/* 流程内容 */
	.cu-form-group input{
		flex:1;
		text-align: right;
		font-size:28upx;
	}
	.text-area{
		padding-top:36upx;
		padding-left:24upx;
		background-color: #fff;
		padding-bottom:40upx;
	}
	.text-area>view:first-child{
		margin-bottom:24upx;
	}
	.text-area textarea{
		width:95%;
		background:rgba(247,247,247,1);
		border-radius:4px;
		padding-top:20upx;
		padding-left:30upx;
		max-height:180upx;
	}
	.img-content{
		background-color: #fff;
		padding-bottom:40upx;
		padding-top: 40upx;

	}
	.img-content>view:first-of-type{
		padding-left:24upx;
		padding-bottom:30upx;
	}

	.margin-l{
		margin-left:10upx;
	}
</style>
