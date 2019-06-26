<template>
	<view class="position_relative">
		<view class="borderTop bg-white member-info font-size-small font-weight-normal margin-bottom-normal">
			<view class="member-info-item flex justify-between borderBottom">
				<view class="explain-color font-size-small "><text class="text-red">*</text>姓名</view>
				<input type="text" placeholder="请输入"  class="color-placeholder text-right" v-model="member.name">
			</view>
			<view class="member-info-item flex justify-between borderBottom">
				<view class="explain-color font-size-small "><text class="text-red">*</text>手机号</view>
				<input type="text" placeholder="请输入" class="color-placeholder text-right" v-model="member.mobile" @blur="checkTelEvent(member.mobile)">
			</view>
			<view class="member-info-item flex justify-between borderBottom" @click="chooseDepartment()">
				<view class="explain-color font-size-small ">部门</view>
				<view>
					<text>{{department.name || ''}}</text>
					<text class="cuIcon-right" style="font-size:14px;"></text>
				</view>
			</view>
			<view class="member-info-item flex justify-between borderBottom">
				<view class="explain-color font-size-small "><text class="text-red"></text>职位</view>
				<input type="text" placeholder="请输入" v-model="member.job" class="color-placeholder text-right">
			</view>
		</view>
		
		<view class="bg-white member-info font-size-small font-weight-normal">
			<view class="member-info-item flex justify-between borderBottom position_relative" style="padding-bottom:10px;">
				<view class="explain-color font-size-small ">性别</view>
				<text class="cuIcon-right  text-gray position_absolute" style="font-size:18px;right:10px;top:12px;" ></text>
				<view class="uni-list-cell-db" style="margin-top:-3px;margin-right:17px;">
				    <picker @change="bindPickerChange($event)" :value="radio" :range="sexList">
				        <view class="uni-input">{{sexList[radio]}}</view>
				    </picker>
				</view>
			</view>
			<view class="member-info-item flex justify-between borderBottom">
				<view class="explain-color font-size-small ">身份证号</view>
				<input type="text" placeholder="请输入" class="color-placeholder text-right" v-model="member.idCard" @blur="checkTelEvent(member.mobile)">
			</view>
			<view class="member-info-item flex justify-between borderBottom position_relative" 
			  style="padding-bottom:10px;"
			  @click="onShowDatePicker('date','birthday')">
				<view class="explain-color font-size-small ">出生日期</view>
				<view  style="margin-top:-3px;margin-right:17px;">
					{{member.birthday || '' }}
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;"  ></text>
			</view>
			<view class="member-info-item flex justify-between borderBottom position_relative" 
			 style="padding-bottom:10px;"
			 @click="onShowDatePicker('date','time')">
				<view class="explain-color font-size-small ">入职时间</view>
				<view  style="margin-top:-3px;margin-right:17px;">
					{{member.joinTime || '' }}
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;"  ></text>
			</view>
		</view>
		 <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" @confirm="onSelected($event)" @cancel="onSelected($event)"  />
		 <view style="position:fixed;bottom:10px;padding:0 15px;width:100%;text-align: center;">
			<button class="cu-btn block bg-blue  lg" @click="addMember()" :disabled="loading">确定</button>
		 </view>
	</view>
</template>

<script>
	import MxDatePicker from '../../../../../components/uni/mx-datepicker/mx-datepicker.vue';
	import {mapState} from "vuex"
	export default {
		computed:mapState(['userInfo','replacerObj']),
		components:{
			MxDatePicker
		},
		data() {
			return {
				member:{
					name:'',
					mobile:'',
					job:'',
					sex:'',
					idCard:'',
					birthday:'',
					joinTime:''
					
				},
				radio:0,
				sexList:['女','男'],
				department:{
					id:'',
					name:''
				},
				type: 'rangetime',
				showPicker:false,
				value: '',
				valueType:'',
				loading:false
			}
		},
		methods: {
			addMember(){
				if(!this.member.name || !this.member.mobile){
					uni.showToast({
						title:'请填写姓名或联系方式',
						icon:'none'
					})
				}else{
					this.$ajax('Signup',{
						name:this.member.name?this.member.name:'',
						mobile:this.member.mobile?this.member.mobile:'',
						gender:this.radio==0?2:1,
						team:this.department.id?this.department.id:0,
						type:this.replacerObj.type,
						birthday:this.member.birthday?this.member.birthday:'',
						bgndate:this.member.joinTime?this.member.joinTime:'',
						idnum:this.member.idCard?this.member.idCard:'',
						title:this.member.job?this.member.job:''
						
					},res=>{
						this.loading=true;
						uni.showToast({
							title:'添加员工成功',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},800)
					})
				}
			},
			checkTelEvent(event){
				console.log(event)
				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
					return;
				}
			},
				onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this.isShow=false;
					this[this.type] = e.value;
					if(this.valueType=='birthday'){
						this.member.birthday=e.value.replace(/\//g,'-');
					}else if(this.valueType=='time'){
						this.member.joinTime=e.value.replace(/\//g,'-');
					}
					
					this.showBir=true;
				}
			
			},
			 onShowDatePicker(type,sys){//显示
			  this.type = type;
			  this.showPicker = true;
			  this.value = this[type];
			  this.valueType=sys;
			},
			bindPickerChange(event){
				
				this.radio=event.detail.value;
				console.log(this.radio)
				
			},
			chooseDepartment(){
				uni.navigateTo({
					url:'../department-list/department-list'
				})
			}
		},
		onLoad(options){
			console.log(options)
			if(options){
				this.department={
					id:options.id,
					name:options.name
				}
			}
			this.$fire.on('department',result=>{
				this.department={
					id:result.id,
					name:result.name
				}
			})
		}
	}
</script>

<style lang="less">
	.member-info{
		.member-info-item{
			padding:15px 12px 7px 16px;
			align-content: center;
		}
	}
</style>
