<template>
	<view>
		<view class="margin-top-13 department-content bg-white font-size-small font-weight-normal">
			<view class="department-item flex justify-between borderBottom">
				<view class="explain-color font-size-small "><text class="text-red">*</text>部门名称</view>
				<input type="text" placeholder="请输入"  class="color-normal text-right" v-model="departmentObj.name">
			</view>
			<view class="department-item flex justify-between borderBottom" >
				<view class="explain-color font-size-small "><text class="text-red">*</text>上级部门</view>
				<view>
					<text v-if="type=='first'">内部组织</text>
					<text v-else>{{departmentObj.topName || ''}}</text>
					<text class="cuIcon-right" style="font-size:18px;" ></text>
				</view>
			</view>
			<view class="department-item flex justify-between borderBottom" @click="chooseOperate('manager')">
				<view class="explain-color font-size-small ">负责人</view>
				<view>
					<text v-if="departmentObj.manager">{{departmentObj.manager }}</text>
					<text v-else class="color-placeholder">请选择部门负责人(选填)</text>
					<text class="cuIcon-right" style="font-size:18px;"></text>
				</view>
			</view>
		</view>
		<view style="position:fixed;bottom:10px;padding:0 15px;width:100%;text-align: center;">
			<button class="cu-btn block bg-blue  lg" @click="addDepartment()" :disabled="loading">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				departmentObj:{
					name:'',
					topName:'',
					topID:'',
					manager:'',
					managerID:''
				},
				loading:false,
				type:'',
				
			}
		},
		methods: {
			addDepartment(){
				if(!this.departmentObj.name){
					uni.showToast({
						title:'输入信息不完整',
						icon:'none'
					})
				}else {
					this.loading=true;
					this.$ajax('NewDepartment',{
						name:this.departmentObj.name,
						parent:this.type=='first'?'':this.departmentObj.topID,
						manager:this.departmentObj.managerID,
						type:1,
					},res=>{
						uni.showToast({
							title:'设置子部门成功',
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
			chooseOperate(type){
				switch(type){
					case 'department':
					if(this.type=='first'){
						return
					}
					uni.navigateTo({
						url:'../department-list/department-list'
					});
					break;
					case 'manager':
					uni.navigateTo({
						url:'../manager-list/manager-list'
					});
					break;
				}
			}
			
		},
		onLoad(options){
			console.log(options)
			if(options.type){
				this.type=options.type;
			}
			if(options.id && options.name){
				this.departmentObj.topID=options.id;
				this.departmentObj.topName=options.name
			}
			this.$fire.on('department',result=>{
				this.departmentObj.topID=result.id;
				this.departmentObj.topName=result.name;
			})
			this.$fire.on('manager',result=>{
				this.departmentObj.managerID=result.id;
				this.departmentObj.manager=result.name;
				
			})
		}
	}
</script>

<style>
	.department-item{
		padding:15px 12px 7px 16px;
		align-content: center;
	}
</style>
