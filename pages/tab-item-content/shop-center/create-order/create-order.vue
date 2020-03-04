<template>
	<view class="borderTop">
		<view >
			<common-flex leftContent="门店名称" :rightContent="shop.name"></common-flex>
			<common-flex leftContent="报修人" :rightContent="userInfo.name"></common-flex>
			<common-flex leftContent="联系方式" :rightContent="userInfo.account"></common-flex>
			<view class="repair-item"></view>
			<view class="repair-info">
				<common-flex 
					leftContent="维修类别" 
					:rightContent="repairObj.bigName" 
					type="navigate" 
					@operateItem="toRepairItem"></common-flex>
					
				<view class=" bg-white font-size-normal margin-bottom-normal" v-show="subItem.name" 
				style="padding:10px 15px;">
				<normal-detail-item leftIntro="子类别名称" :rightContent="subItem.name" width="30%" 
					:marginBMini="true"
					:leftPadding="false" :marginBottom="false"></normal-detail-item>
				<normal-detail-item :marginBMini="true" leftIntro="子类别规格" :rightContent="subItem.size || ''" width="30%" :leftPadding="false" :marginBottom="false"></normal-detail-item>
				<normal-detail-item :marginBMini="true" leftIntro="子类别品牌" :rightContent="subItem.type || ''" width="30%" :leftPadding="false" :marginBottom="false"></normal-detail-item>
				<normal-detail-item :marginBMini="true" leftIntro="子类别型号" :rightContent="subItem.model || ''" width="30%" :leftPadding="false" :marginBottom="false"></normal-detail-item>
				<normal-detail-item :marginBMini="true" leftIntro="子类别备注" :rightContent="subItem.summary || ''" width="30%" :leftPadding="false" :marginBottom="false"></normal-detail-item>
					<view  class="color-regular  reapir-intro" v-if="subItemImg.length">附件:</view>
					<files-content :files="subItemImg" :isShowTitle="false"></files-content>
				</view>

				<view>
					<view class=" font-size-normal font-weight-normal bg-white reapir-detail-container" ><text class="text-red" style="margin-right:4rpx;">*</text>报修描述</view>
					<view>
						<view class="cu-form-group">
							<textarea maxlength="200"
									  required
									  v-model="repairObj.summary" placeholder="报修描述输入..."
									  class="font-size-normal font-weight-normal repair-detail"
									  ></textarea>
						</view>
					</view>
				</view>
				<view style="height:13px;width:100%;background:rgba(247,247,247,1)"></view>
				<file-upload
					:isRed="true"
					@upload="uploadSuccess"
					:inImgList="imgList"
					:inFiles="files"
					src="../../../../static/img/work/camera.png" 
					:xType="constants.serviceorder_file" 
					xTarget="0"></file-upload>
				<common-flex 
					leftContent="审批流程" 
					:rightContent="workFlowItem.name || ''" 
					v-if="newOrEdit=='create'"
					type="navigate"
					 @operateItem="chooseWorkflow"></common-flex>
				<view class="workflow-contaienr bg-white" v-show="workFlowItem['steps']&&  newOrEdit=='create' ">
					<view>
						<view></view>
						<view class="font-size-normal font-weight-bold color-normal">审批步骤</view>
					</view>
					<view style="padding:20upx 0;">
						<block v-for="(item,index) in workFlowItem.steps" :key="index">
							<workflowItem :workflow="item" :index="index"></workflowItem>
						</block>
					</view>

				</view>
			</view>
		</view>
		<view style="height:200upx"></view>
		<common-btn-one
			:type="btnType" 
			:disabled="disabled" 
			:content="repaitItem.status==repairStatus.submit && repaitItem.approval==applyStatus.rejected?'重新提交':'提交订单'"
			@operateBtn="createOrder" :isPos="true"></common-btn-one>

		</view>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import normalDetailItem from '../../../../components/common/normal-detail-item.vue'
	import workflowItem from '../../../../components/common/workflow-item.vue'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import commonFlex from '../../../../components/common/common-flex.vue'
	import filesContent from '../../../../components/common/files-content.vue'
	import fileUpload from '../../../../components/common/file-upload.vue'
	
	import {NewServiceOrderApi,ChainShopApi,ServiceCatalogApi,ServiceOrderApi,SetServiceOrderApi} from '../../../../api/shop_api.js'
	export default{
	    computed:{
			...mapState(['userInfo','shopCount','shopOnlyObj']),
			constants(){return this.config.constants},
			repairStatus(){return this.config.repairStatus},
			applyStatus(){return this.config.applyStatus}
		},
		data(){
			return{
				shop:{
					id:'',
					name:''
				},
				shopList:[],
				repairObj:{
					bigName:'',
					bigID:'',
					subName:'',
					subID:'',
					summary:'',

				},
				subItem:{},//维修子类别
				subItemImg:[],
				files:[],
				imgList:[],
				token:'',
				repaitItem:{},//报修详情,
				workFlowItem:{},//审批详情
				disabled:false,
				// iconloading:false,
				newOrEdit:'create',
				btnType:'default'
			}
		},
		watch:{
			shop(val){this.change()},
			repairObj(val){this.change()},
			files(val){this.change()},
			workFlowItem(val){this.change()}
		},
		components:{
			workflowItem,
			commonBtnOne,
			normalDetailItem,
			commonFlex,
			filesContent,
			fileUpload
		},
		onLoad(options){
			this.newOrEdit=options.newOrEdit;
			
			if(this.newOrEdit=='create'){
				//如果只有一个门店
				if(this.shopCount==1){
					this.shop=this.shopOnlyObj
				}else{
					this.getShopInfo(options.id)
				}
			}

			if(options.id && this.newOrEdit=='edit'){
				this.getRepairInfo(options.id)
			}
		},
		onShow(){
			//审批流程
			this.$fire.on('workFlow',res=>{
				this.workFlowItem=res;
			})
			//报修类别
			this.$fire.on('repair',result=>{
				this.repairObj={
					bigID:result.bigID,
					bigName:result.bigName,
					subID:result.subID,
					subName:result.subName
				}
				if(result.subID){
					this.getSubCatagoryItem(result.subID)
					
				}
			
				if(this.repaitItem){
					this.repairObj.summary=this.repaitItem.summary;
				}
			})
			//门店
			this.$fire.on('createOrderShopID',result=>{
				if(result){
					this.getShopInfo(result)
				}
			
			})
		},
		methods:{
			//获得子类别详情
			async getSubCatagoryItem(id){
				let result = await ServiceCatalogApi(id)
				if(result.files){
					this.subItemImg = result.files.map(item=>item.url)
				}
				this.subItem=result;
			},
			uploadSuccess(event){
				this.files=event;
			},
			change(){
				if(this.newOrEdit=='create'){
					if(this.shop.id && this.repairObj.bigID && this.files.length!=0 && this.workFlowItem.id && this.repairObj.summary){
						this.disabled=false;
						this.btnType='primary'
						return;
					}
					this.disabled=true;
					this.btnType='default'
				}else{
					this.disabled=false;
					this.btnType='primary'
				}

			},

	    	//选择流程模板
			chooseWorkflow(){
				uni.navigateTo({
					url:'../work-flow/work-flow?type='+this.config.approvalMode.repair_service
				})
			},
			checkSubItemImg(event){
				uni.previewImage({
					urls: this.subItemImg,
					current: event
				});
			},
			//获得报修详情
			async getRepairInfo(id){
				this.repaitItem = await ServiceOrderApi(id)
				this.disabled=false;
				this.shop={id:this.repaitItem.shop,name:this.repaitItem.name};
				this.repairObj={
					bigName:this.repaitItem.type?this.config.repairTypeZn[this.repaitItem.type]:'',
					bigID:this.repaitItem.type?this.repaitItem.type:'',
					subName:this.repaitItem.catalogName,
					subID:this.repaitItem.catalog,
					summary:this.repaitItem.summary?this.repaitItem.summary:''
				};
				if(this.repaitItem.files){
					this.imgList = this.repaitItem.files.map(item=>item.url);
					this.files = this.repaitItem.files.map(item=>item.id);

				}
			},
			check(){
				if(!this.shop.name){
					this.$utils.showToast('请选择门店进行报修')
					return false;
				}
				if(!this.repairObj.bigID){
					this.$utils.showToast('请选择报修类别')
					return false;
				}
				if(!this.repairObj.summary){
				
					this.$utils.showToast('请输入报修描述')
					return false;
				}
				if(this.files.length===0){
					this.$utils.showToast('未上传图片，或者图片正上传，请稍等')
					return false;
				}
				if(!this.workFlowItem.id){
					this.$utils.showToast('请选择审批流程')
					return false;
				}
				return true;
			},
			//提交报修
			async createOrder(){
				// this.iconloading=true;
				console.log(this.files.length)
				this.disabled=true;
				if(this.newOrEdit=='edit'){
					let val={
						id:this.repaitItem.id,
						category:this.repairObj.subID?this.repairObj.subID:'',
						type:this.repairObj.bigID?this.repairObj.bigID:'',
						summary:this.repairObj.summary,
						files:this.files?this.files.join(','):'',
						workflow:this.repaitItem.workflow
					}
					if(await SetServiceOrderApi(val)){
						this.$utils.showToast('提交成功')
						this.$utils.goBack()
					}else{
						this.disabled=false;
					}
					

				}else if(this.newOrEdit=='create' && this.check()){
					let obj={
						category:this.repairObj.subID?this.repairObj.subID:'',
						type:this.repairObj.bigID?this.repairObj.bigID:'',
						creator:this.userInfo.id,
						shop:this.shop.id,
						summary:this.repairObj.summary,
						files:this.files?this.files.join(','):'',
						workflow:this.workFlowItem.id//流程模板
					}
					if(await NewServiceOrderApi(obj)){
						this.$utils.showToast('新增报修成功')
						this.$utils.goBack()
					}else{
						this.disabled=false;
					}
					

				}

			},
			//获得门店信息
			async getShopInfo(id){

				this.shop = await ChainShopApi(id);
			},
			toRepairItem(){

				uni.navigateTo({
					url:'../repair-item/repair-item'
				})
			},
			//显示最近的门店
			toNearShopList(){
				if(this.newOrEdit=='edit'){
					return;
				}
				uni.navigateTo({
					url:'../near-shop-list/near-shop-list?cat=createOrder'
				})
			},
		}
	}
</script>
<style lang="less">
	.dateStyle{
		font-size:15px;
		font-weight: 400;
	}
	.repair-item{
		height:13px;
		width:100%;
	}
	.title{
		color:rgba(42,42,42,1);
	}
	 .cu-form-group textarea{
		background:rgba(247,247,247,1);
		border-radius:4px;
		padding-top:5px;
		padding-left:10px;
	}
	.repair-detail-list-item{
		margin-bottom: 8px;
		.reapir-intro{
			margin-right: 21px;
		}
		.repair-summary{
			font-size:15px;
			word-wrap: break-word;
			word-break: break-all
		}
	}
	.reapir-detail-container{
		padding-left:12px;
		padding-top:10px;
		.repair-detail{
			background:rgba(247,247,247,1);
			padding:10px 15px;
			border-radius: 10px;
			min-height:100px;
		}

	}
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
</style>
