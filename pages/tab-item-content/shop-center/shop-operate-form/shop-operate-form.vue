<template>
	<view class="borderTop">
		<common-flex
			leftContent="门店名称"
			:rightContent="shopItem.name"
			 :isLeftCb="true"></common-flex>		
		<template v-if="fromType=='record'">
			<!-- 录入店员 -->
			<view class="cu-form-group bg-white ">
				<view>店员姓名</view>
				<view>
					<input type="text" placeholder="姓名" class="text-right" v-model="name"/>
				</view>
			</view>	
			<view class="cu-form-group bg-white ">
				<view>店员联系方式</view>
				<view>
					<input type="number" 
					maxlength="11"
					placeholder="联系方式" class="text-right" v-model="telephone"/>
				</view>
			</view>
		</template>
		<template v-else-if="fromType=='area'">
			<view class="cu-form-group">
				<view class="title color-regular"><text class="text-red">*</text>门店面积</view>
				<input class="text-right color-regular " v-model="shopItem.area" ></input>
			</view>
		</template>
		<template v-else-if="fromType=='seq'">
			<view class="cu-form-group">
				<view class="title color-regular"><text class="text-red">*</text>门店编号</view>
				<input class="text-right color-regular " v-model="shopItem.seq" ></input>
			</view>
		</template>
		<common-btn-one
					type="primary" 
					:disabled="disabled" 
					content="确定"
					@operateBtn="submitForm" :isPos="true"></common-btn-one>
		
	</view>
</template>

<script>
	import commonFlex from '../../../../components/common/common-flex.vue'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import cityModel from '../../../../components/common/city-model.vue'
	import {ChainShopApi,SetShopAreaApi,SetShopSeqApi} from '../../../../api/shop_api.js'
	import {SignupApi} from '../../../../api/login_api.js'
	export default {
		components:{commonFlex,commonBtnOne},
		watch:{
			name(){this.change()},
			telephone(){this.change()}
		},
		data() {
			return {
				fromType:'area' |'record',
				disabled:false,
				shopID:'',
				shopItem:{},
				name:'',
				telephone:'',
			}
		},
		methods: {
			async getShopInfo(id){
				this.shopItem = await ChainShopApi(id);
			},
			check(){
				if(this.fromType=='record'){
					if(!this.name){
						this.$utils.showToast('请输入店员姓名')
						return false;
					}
					if(!this.telephone){
						
						this.$utils.showToast('请输入店员联系方式')
						return false;
					}
					if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.telephone))){
						
						this.$utils.showToast('电话号码不存在')
						return false;
					}
					return true;
				}
			},
			change(){
				if(this.fromType=='record'){
					if(this.name && this.name !="" && this.telephone && this.telephone!=""){
						this.disabled=false;
						return 
					}
					this.disabled=true;
				}
			},
			submitForm(){
				switch(this.fromType){
					case 'record':
					this.addClerk()
					break;
					case 'area':
					this.editArea()
					break;
					case 'seq':
					this.editSeq()
					break
				}
			},
			async editSeq(){
				this.disabled=true;
				if(await SetShopSeqApi(this.shopItem.id,this.shopItem.seq)){
					this.$utils.showToast('门店编号修改成功！')
					this.$utils.goBack()
				}else{
					this.disabled=false;
				}
			},
			async editArea(){
				this.disabled=true;
				if(await SetShopAreaApi(this.shopItem.id,this.shopItem.area)){
					this.$utils.showToast('门店面积修改成功！')
					this.$utils.goBack()
				}else{
					this.disabled=false;
				}
				
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			async addClerk(){
				if(this.check()){
					this.disabled=true;
					let result=await SignupApi({name:this.name,mobile:this.telephone,type:this.config.shoperObj.type,team:this.shopID,})
					if(result){
						
						this.$utils.showToast('录入店员成功')
						setTimeout(()=>{
							this.goBack()
						},900)
					}

				}
			}
		},
		onLoad(options){
			
			if(options){
				this.shopName=options.name;
				this.shopID=options.id;
				this.getShopInfo(options.id)
				let title=""
				switch(options.type){
					case 'area':
					title="修改门店面积"
					break;
					case 'record':
					title="录入店员"
					break;
					case 'seq':
					title='修改门店编号'
					break;
				}
				this.fromType=options.type;
				uni.setNavigationBarTitle({
					title:title
				})
			}
		}
	}
</script>

<style scoped>
.cu-form-group .title{
		color:rgba(185,185,185,1);
	}
</style>
