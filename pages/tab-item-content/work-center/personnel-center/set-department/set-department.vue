<template>
	<view>
		<view style="min-height:520px;">
			<view class="flex justify-between department-item bg-white align-center borderBottom">
				<view class="explain-color"><text class="text-red" style="margin-top:4px;">*</text>部门名称</view>
				<input type="text" placeholder="请输入部门名称" v-model="department.name" style="text-align: right;">
			</view>

			<view class="flex justify-between department-item bg-white align-center borderBottom" @click="toManagerList()">
				<view class="explain-color">负责人</view>
				<view style="margin-right:8px;">{{department.manager}}</view>
				<text class="cuIcon-right position_absolute font-size-big" style="right:10px;"></text>
			</view>
		</view>

		
		<view class="submit-area bg-white" >
			<view class="submit-btn text-white" @click="setDepartment()">保存</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['replacerObj']),
		data() {
			return {
				department:{
					name:'',
					id:'',
					manager:'',
					managerID:''
				}
			}
		},
		methods: {
			setDepartment(){
				this.$ajax('SetDepartment',{
					id:this.department.id,
					name:this.department.name,
					manager:this.department.managerID?this.department.managerID:0,
					type:this.replacerObj.type
				},res=>{
					uni.showToast({
						title:'设置部门成功',
						icon:'none'
					})
					uni.navigateBack({
						delta:2
					})
				})
			},
			toManagerList(){
				uni.navigateTo({
					url:'../manager-list/manager-list'
				})
			}
		},
		onShow(){
			this.$fire.on('manager',result=>{
				this.department.manager=result.name;
				this.department.managerID=result.id;
			})
			console.log(this.department)
		},
		onLoad(options){
			if(options){
				this.department.id=options.id;
				this.department.name=options.name;
				
			}
			
		}
	}
</script>

<style lang="less">
	.department-item{
		padding:17px 19px 15px 17px;
	}
	.submit-area{

		width:100%;
		padding:17px 15px;
		.submit-btn{
			text-align: center;
			width:100%;background:rgba(66,176,237,1);
			border-radius:5px;padding-top:8px;padding-bottom:8px;
		}
	}
	
</style>
