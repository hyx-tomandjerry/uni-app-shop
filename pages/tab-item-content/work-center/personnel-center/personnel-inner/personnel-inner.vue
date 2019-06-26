<template>
	<view>
		<cu-custom>
			<block slot="left">
				<view class="cuIcon-back color-normal" style="font-size:20px;" @click="goBack()"></view>
			</block>
			<block slot="content">
				<view class="color-normal font-size-big font-weight-bold">{{title}}</view>
			</block>
		</cu-custom>
		
		<view style="padding:20px 16px 17px;" class="bg-white margin-bottom-normal">
			<view class="flex justify-between" >
				<view class="position_relative" style="width:88%;">
					<input type="text" placeholder="搜素姓名或者手机号" style="background:rgba(247,247,247,1);
					border-radius:17px;padding-bottom:4px;padding-left:52px;height:34px;padding-top:4px;">
								<image src="../../../../../static/icon/inner-search.png" style="width:17px;height:17px;vertical-align: middle;position: absolute;left:22px;bottom:7px;"></image>
								<image src="../../../../../static/icon/inner-close.png" style="width:17px;height:17px;vertical-align: middle;position: absolute;right:10px;bottom:7px;"></image>
				</view>
				<view class="font-size-small font-weight-normal color-placeholder" style="margin-left:6px;padding-top:6px;">搜索</view>
			</view>
			<view style="padding-top:10px;padding-left:4px;">
				{{title}}
			</view>
			
			
		</view>
		
		<view class="list-content bg-white margin-bottom-normal">
			<view class="flex justify-between borderBottom" style="padding:20px 9px 13px 14px;" v-for="(item,index) in departmentList" :key="index" @click="checkDepartmentMember(item)">
				<view class="font-size-small font-weight-normal color-normal">{{item.name}}</view>
				<view class="cuIcon-right font-size-middle color-placeholder" ></view>
			</view>
		</view>
		
		<view class="member-list bg-white" >
			<view class="member-list-item flex justify-start align-center" v-for="(item,index) in userList" :key="index" @click="checkMemberInfo(item)">
				<image :src="item.headurl?item.headurl:'../../../../../static/img/default.png'" style="width:35px;height:35px;vertical-align: middle;border-radius: 50%;margin-right:11px;"></image>
				
				<view class="font-size-small color-normal borderBottom" style="padding:15px 10px;width:100%"><text style="margin-right:17px;">{{item.name}}</text><text>{{item.mobile}}</text></view>
			</view>
		</view>
		<view class="flex font-size-small text-blue font-weight-middle" style="width:100%;background:#e7ebed;padding:10px 0;position:fixed;bottom:0;">
			<view style="width:45%;text-align: center;" @click="operateMember('member')">添加成员</view>
			<view style="width:45%;text-align: center;border-left:1px solid #EEEEED;border-right:1px solid #eee"  @click="operateMember('midDepartment')">添加子部门</view>
			<!-- <view style="width:30%;text-align: center;"  @click="operateMember('department')">设置部门</view> -->
		</view>
	</view>
</template>

<script>
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['replacerObj','url']),
		data() {
			return {
				departmentList:[],
				title:'内部组织',
				userList:[]
			
			}
		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		methods: {
			checkMemberInfo(item){
				uni.navigateTo({
					url:'../personnel-member-info/personnel-member-info?id='+item.id
				})
			},
			operateMember(type){
				switch(type){
					case 'member':
					uni.navigateTo({
						url:'../add-member/add-member?id=0&name=内部组织'
					})
					break;
					case 'midDepartment':
					uni.navigateTo({
						url:'../add-department/add-department?type=first'
					})
					break;
					case 'department':
					break;
				}
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			checkDepartmentMember(item){
				uni.navigateTo({
					url:'../personnel-member-list/personnel-member-list?id='+item.id+'&name='+item.name
				})
			},
			getDepartmentList(){
				this.$ajax('Departments',{
					type:this.replacerObj.type
				},res=>{
					this.departmentList=res;
				})
			
				
			},
			getUserInfo(){
				this.$ajax('Users',{
					team:-1,
					status:-1,
					type:1
				},res=>{
					this.userList=res;
				})
			}
		},
		// onLoad(options){
		// 	console.log(options)
		// 	this.getDepartmentList()
		// },
		onShow(){
			this.getDepartmentList();
			this.getUserInfo()
		}
	}
</script>

<style lang="less">
	.member-list-item{
		padding-top:13px;
		padding-left:16px;
		padding-bottom:14px;
	}
</style>
