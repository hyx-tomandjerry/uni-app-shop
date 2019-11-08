<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><view class="cuIcon-back"  @click="goBack()"></view></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >{{title}}</view></block>
		</cu-custom>
		<!-- form区域开始 -->
		<view class="form-container borderTop">
			<view class="cu-form-group" @tap="chooseShop">
				<view class="title "><text class="color-red">*</text> 选择门店</view>
				<view :class="{'color-normal':shop.name,'color-regular':!shop.name}">
					{{shop.name || '选择门店'}}
					<text class="cuIcon-right font-size-big color-regular margin-l" ></text>
				</view>

			</view>
			<template v-if="type==approvalMode.absence">
				<view class="cu-form-group">
					<view class="title "><text class="color-red">*</text> 请假类型</view>
					<picker @change="PickerChange" :value="xType" :range="picker">
							<view class="picker" :class="{'color-normal':picker[xType],'color-regular':!picker[xType]}">
								{{xType>-1?picker[xType]:'请假类型'}}
							</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title "><text class="color-red">*</text> 开始时间</view>
					<view class="flex justify-start align-center">
						<dyDateTime @getData="getDataStart"
									:class="{
										'color-normal':this.start,
										'color-regular':!this.start
									}"
									:placeholder="start?start:'选择开始时间'" ></dyDateTime>
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
						<text class="cuIcon-right font-size-big color-regular"></text>
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
					<view class="font-size-normal color-normal"><text class="color-red">*</text>请假事由</view>
					<textarea  placeholder="请输入请假事由" v-model="reason"/>
				</view>
			</template>
			<!-- 请假原因end -->
			<!-- 报销申请start -->
			<template v-if="type==approvalMode.expense">
				<block  v-for="(item,index) in items" :key="index">
					<repayForm
					:items="items"
					@deleteIndex="delIndex" 
					@uploadData="uploadData"
					:index="index" ></repayForm>
				</block>
				
				<view class="flex-all bg-white text-center repay-btn" @click="addTemp">
					增加报销
				</view>
			</template>
			<view class="cu-bar bg-white " >
				<view class="title font-size-normal font-weight-normal" style="font-size:13px;padding-left:10px;"><text class="text-red" style="margin-right:4rpx;">*</text>上传附件</view>
			</view>

			<view class="cu-form-group margin-bottom-normal">
				<view class="grid col-4 grid-square flex-sub">
					<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
						  :key="index" @tap="ViewImage(index) " :data-url="imgList[index]">
						<view class="cu-tag bg-red" @tap.stop="DelImg(index)" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="padding-xs solids" v-if="imgList.length<4">
						<image src='../../../../../static/img/work/camera.png' mode="" @tap="ChooseImageEvent()"  style="width:78px;height:78px;"></image>
					</view>

				</view>
			</view>
			<!-- 上传附件end-->

			<!-- 审批流程start -->
			<view class="cu-form-group borderBottom" @tap="chooseWorkFlow" v-show="newOrEdit=='create'">
				<view class="title "><text class="color-red">*</text>审批流程</view>
				<view>
					<text>{{workflow.name || ''}}</text>
					<text class="cuIcon-right font-size-big color-regular"></text>
				</view>

			</view>
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
		<bottomBtnOne  content='确定' @showModal="submitApply" ></bottomBtnOne>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import repayForm from '../../../../../components/repay-form.vue'
	import uploadImg from '../../../../../components/upload-img.vue'
	import dyDateTime from '../../../../../components/lanxiujuan-dyDateTime/lanxiujuan-dyDateTime.vue'
	import workflowItem from '../../../../../components/workflow-item.vue'
	import bottomBtnOne from '../../../../../components/common/bottom-btn-one.vue'
	export default {
		computed:mapState(['constants','approvalMode','doc','userInfo']),
		components:{uploadImg,repayForm,dyDateTime,workflowItem,bottomBtnOne},
		data() {
			return {
					type:'',//请假类型
					title:'',//标题内容
					fileType:'',//上传附件类
					items:[{}],
					shop:'',
					//请假类型
					xType:0,
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
					files:[],//附件
					applyName:'',//申请名称
					newOrEdit:'',//判断是新建还是修改
					applyItem:'',//要修改的内容
					imgList:[],
					isSplice:false,
			}
		},
		methods: {
			changeSplice(){
				
				this.isSplice=false;
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			//获得上传图片的token
			getUploadToken(){
				this.$ajax('UploadToken',{},res=>{
					this.token=res
				})
			},
			ChooseImageEvent(){
				uni.chooseImage({
					count:9,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'],
					success: (res) => {
						const tempFilePaths=res.tempFilePaths;
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}

						for(var i=0;i<res.tempFilePaths.length;i++){
							let  uploadTask=uni.uploadFile({
								url:this.$store.state.uploadHostUrl+this.token,
								filePath:tempFilePaths[i],
								name:'file',
								formData:{
									'x:type':this.fileType,
									'x:owner': this.userInfo.owner,
									'x:creator': this.userInfo.id,
									"x:target":0
								},
								success: (uploadFileRes) => {
									let res=JSON.parse(uploadFileRes.data);
									this.files.push(res.data);
								},

							});
							uploadTask.onProgressUpdate((res)=>{
								if(res.progress==100){
									uni.showToast({
										title:'上传成功',
										icon:'none'
									})
								}
							},(error)=>{
								uni.showToast({
									title:'上传失败',
									icon:'none'
								})
							})

						}




					}
				})

			},
			ViewImage(event){
				uni.previewImage({
					urls: this.imgList,
					current: event
				});
			},
			DelImg(event){
				uni.showModal({
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(event, 1);
							this.$ajax('RemoveFiles',{
								files:this.files[event],
							},res=>{
								this.files.splice(event,1)
								uni.showToast({
									title:'删除成功',
									icon:'none'
								})
							})

						}
					}
				})
			},
			getDataStart(event){
				if(event){
					this.start=event;
					if(this.newOrEdit=='edit'){
						this.getTimeInfo(this.start,this.end)
					}
					

				}
			},
			getDataEnd(event){
				if(!this.start){
					uni.showToast({
						title: '请选择开始时间',
						icon:'none'
					});
				}else if(event){
					this.end=event;
					this.getTimeInfo(this.start,this.end)
				}
			},
			uploadData(val){
				 let index = val.index
				 this.items[index] = val.data
			},
			//提交流程
			submitApply(){
				switch(Number(this.type)){
					case this.approvalMode.absence:
						
						// 请假
						if(!this.shop.id){
							uni.showToast({
								title: '请选择门店',
								icon:'none'
							});
						}else if(!this.start){
							uni.showToast({
								title: '请选择开始时间',
								icon:'none'
							});
						}else if(!this.end){
							uni.showToast({
								title: '请选择结束时间',
								icon:'none'
							});
						}else if(!this.reason){
							uni.showToast({
								title: '请选择请假类型',
								icon:'none'
							});
						}
						else if(this.newOrEdit=='create'&&!this.workflow.id){
							uni.showToast({
								title: '请选择审批流程',
								icon:'none'
							});
						}else{
						
							let value={
								shop:this.shop.id,//门店ID
								xtype:this.newOrEdit=='edit'?Number(this.xType):(Number(this.xType)?Number(this.xType)+1:1),//请假类型
								bgn:this.newOrEdit=='edit'?this.start:this.$moment(new Date(this.start)).format('YYYY-MM-DD HH:ss:mm'),//开始时间
								due:this.newOrEdit=='edit'?this.end:this.$moment(new Date(this.end)).format('YYYY-MM-DD HH:ss:mm'),//结束时间
								detail:this.reason,//请假事由
								files:this.files?this.files.join(','):'',
								workflow:this.newOrEdit=='edit'?this.applyItem.workflow:this.workflow.id,//流程名称,
								id:this.newOrEdit=='edit'?this.applyItem.id:''
							}
							this.$ajax('NewRoutineApp',value,res=>{
								uni.showToast({
									title: '请假申请成功',
									icon:'none',
									success: () => {
										setTimeout(()=>{
											uni.redirectTo({
												url: '../my-apply-list/my-apply-list?type=apply'
											});
										},800)
									}
								});

							})

						};

						break;
					case  this.approvalMode.expense:
						// 报销
						if(!this.shop.id){
							uni.showToast({
								title: '请选择门店',
								icon:'none'
							});
						}else{
							let str='';
							console.log(this.items)
							this.items.forEach(item=>{
								str+=`${Number(item.xType)},${item.detail},${item.amount},${item.occdate}/`
							})
							let flag=false;
							this.items.forEach(item=>{
								if(!item.detail  || !item.amount || !item.occdate || !item.xType){
									flag=true;
								}
							})
							if(flag){
								uni.showToast({
									title: '请添加报销明细',
									icon:'none'
								});
							}else if(this.newOrEdit=='create'&&!this.workflow.id){
								uni.showToast({
									title: '请选择审批流程',
									icon:'none'
								});
							}else{
								let value1={
									shop:this.shop.id,
									files:this.files?this.files.join(','):'',
									workflow:this.newOrEdit=='edit'?this.applyItem.workflow:this.workflow.id,//流程名称,
									details:str,
									id:this.newOrEdit=='edit'?this.applyItem.id:''
								}
								this.$ajax('ApplyExpense',value1,res=>{
									uni.showToast({
										title: '报销申请成功',
										icon:'none',
										success: () => {
											setTimeout(()=>{
												uni.redirectTo({
													url: '../my-apply-list/my-apply-list?type=apply'

												});
											},800)
										}
									});
								})
							}
						}


						break;
					case this.approvalMode.common:
						let value2={
							shop:this.shop.id,//门店名称
							name:this.applyName,//申请名称
							summary:this.reason,//请假事由
							files:this.files?this.files.join(','):'',
							workflow:this.newOrEdit=='edit'?this.applyItem.workflow:this.workflow.id,//流程名称,
							id:this.newOrEdit=='edit'?this.applyItem.id:''
						}
						this.$ajax('NewCommonForm',value2,res=>{
							uni.showToast({
								title: '通用申请成功',
								icon:'none',
								success: () => {
									setTimeout(()=>{
										uni.redirectTo({
											url: '../my-apply-list/my-apply-list?type=apply'
										});
									},800)
								}
							});

						})
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
			//获得时间差
			getTimeInfo(start,end){
				//计算相差的天数
				let date=new Date(end).getTime()-new Date(start).getTime()
				let days=Math.floor(date/(24*3600*1000));
				// 计算小时
				let leave1=date%(24*3600*1000);//计算天数后的毫秒数
				var hours=Math.floor(leave1/(3600*1000))
				//计算分钟数
				let leave2=leave1%(3600*1000);
				let minutes=Math.floor(leave2/(60*1000));

				//计算秒数
				let leave3=leave2%(60*1000);
				let second=Math.floor(leave3/1000);
				this.time={
					days:days,
					hours:hours,
					minutes:minutes,
					seconds:second
				}
			},
			//选择请假类型
			PickerChange(e) {
				this.xType = e.detail.value
			},
			//获得门店信息
			getShopInfo(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shop=res;
				})
			},
			// 选择门店
			chooseShop(){
				uni.navigateTo({
					url: '../../../shop-center/near-shop-list/near-shop-list?cat=apply'
				});
			},
			//添加模板
			addTemp(){
				this.items.push({
						detail:'',
						xType:'',
						occdate:'',
						amount:'',
						xTypeName:''
				})
			},
			delIndex(index){
				 if (index !== 0) {
				    this.items.splice(index, 1)
				}
			},
			//获得申请内容
			getApplyItemInfo(id,type){
				switch(Number(type)){
						//报销
					case this.approvalMode.expense:
						this.$ajax('Expense',{
							id:id,
							step:1
						},res=>{
							if(res.files && res.files.length){
								res.files.forEach(item=>{
									this.imgList.push(item.url);
									this.files.push(item.id)
								})
							}
							this.shop={id:res.shop,name:res['shopName']};
							if(res.details){
								res.details.forEach(item=>{
									item.occdate=this.$moment(item.occdate).format('YYYY-MM-DD')
									item.xType=item.subject;
									item.xTypeName=item.subjectName
								})
								this.items=res.details;
								setTimeout(()=> {
									this.items.push({
											detail:'',
											xType:'',
											occdate:'',
											amount:'',
											xTypeName:''
									})
								}, 10);
							}
							
							this.applyItem=res;
							
						})
						break;
						//通用
					case this.approvalMode.common:
						this.$ajax('CommonForm',{
							id:id,
							step:1
						},res=>{
							if(res.files && res.files.length){
								res.files.forEach(item=>{
									this.imgList.push(item.url);
									this.files.push(item.id)
								})
							}
							this.shop={
								id:res.shop,
								name:res['shopName']
							}
							this.applyName=res.name;
							this.reason=res.summary?res.summary:''
							this.applyItem=res;
						})
						break;
						//请假
					case this.approvalMode.absence:
						this.$ajax('RoutineApp',{id:id,step:1},res=>{
							this.files=[];
							this.filesID=[]
							if(res.files && res.files.length){
								res.files.forEach(item=>{
									this.imgList.push(item.url);
									this.files.push(item.id)
								})
							}
							//门店
							this.shop={
								id:res.shop,
								name:res['shopName']
							}
							//请假类型
							this.xType=res.xtype;
							this.start=this.$moment(res.bgndate).format('YYYY/MM/DD hh:mm')
							this.end=this.$moment(res.duedate).format('YYYY/MM/DD hh:mm')
							this.getTimeInfo(this.start,this.end)
							this.reason=res.detail?res.detail:''
							this.applyItem=res;
						})
						break;
				}
			}
		},
		onLoad(options){
			this.newOrEdit=options.cat;
			switch(Number(options.type)){
				case this.approvalMode.absence:
					this.type=this.approvalMode['absence'];
					this.title='请假申请';
					this.fileType=this.doc['routineApp']
					break;
				case this.approvalMode.expense:
					this.type=this.approvalMode['expense']
					this.title='报销申请';
					this.fileType=this.doc['expense']
					break;
				case this.approvalMode.common:
					this.type=this.approvalMode['common']
					this.title='通用申请';
					this.fileType=this.doc['commonForm']
					break;
			}
			// uni.setNavigationBarTitle({
			// 	title: this.title
			// });
			this.getUploadToken()
			if(options.cat=='edit'){
				this.getApplyItemInfo(options.id,options.type)
			}
			this.$fire.on('createOrderShopID',result=>{
				if(result){
					this.getShopInfo(result)
				}

			})
			this.$fire.on('workFlow',result=>{
				if(result){
					this.workflow=result;
				}

			})
		}
	}
</script>

<style scoped>
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
