<template>
	<view class="position_relative">
		<cu-custom>
			<block slot="left">
				<view class="cuIcon-back color-normal" style="font-size:20px;" @click="goBack()" ></view>
			</block>
			<block slot="content">
				<view class="color-normal font-size-big font-weight-bold">{{team.name}}</view>
			</block>
		</cu-custom>
		<view style="padding:20px 16px 14px;" class="bg-white">
			<view class="flex justify-between " style="padding-bottom:17px;">
				<view class="position_relative" style="width:88%;">
					<input type="text" placeholder="搜素姓名或者手机号" style="background:rgba(247,247,247,1);
					border-radius:17px;padding-left:52px;height:34px;">
								<image src="../../../../../static/icon/inner-search.png" style="width:17px;height:17px;vertical-align: middle;position: absolute;left:22px;bottom:12px;"></image>
								<image src="../../../../../static/icon/inner-close.png" style="width:17px;height:17px;vertical-align: middle;position: absolute;right:10px;bottom:12px;"></image>
				</view>
				
				<view class="font-size-big font-weight-normal color-placeholder" style="margin-left:6px;padding-top:6px;">搜索</view>
			</view>
			
			<view class="font-size-small font-weight-normal">
				<text style="color: #42B0ED;">内部组织</text>
				
				<text v-for="(item,index) in tabList" :key="index" @click="selectTab(item,index)">
				<text style="color: #898888;font-size:14px;margin:0 8px;" class="cuIcon-right"></text>
				{{item.name}}</text>
			</view>
		</view>
		<view style="height:13px;background:#EEEEED"></view>
		<view v-if="departmentList.length>0 || memberList.length>0">
			
			
			
			<view class="list-content  margin-bottom-normal">
				<view class="flex justify-between borderBottom" style="padding:20px 9px 13px 14px;" v-for="(item,index) in departmentList" :key="index" @click="checkDepartmentMember(item)">
					<view class="font-size-small font-weight-normal color-normal">{{item.name}}</view>
					<view class="cuIcon-right font-size-middle color-placeholder" ></view>
				</view>
			</view>
			<view style="height:13px;background:#EEEEED" v-if="memberList.length>0 && departmentList.length>0"></view>
			<view class="member-content ">
					<view class="flex justify-start member-item font-size-small font-weight-normal color-normal"  v-for="(item,index) in memberList" :key="index" @click="checkMemberInfo(item)">
						<image :src="item.headurl?item.headurl:'../../../../../static/img/default.png'" style="width:36px;height:36px;
						border-radius: 50%;"></image>
						<view class="flex justify-start borderBottom" style="width:100%;padding-bottom:18px;padding-top:7px;">
							<view style="margin-left:12px;margin-right:17px;">{{item.name}}</view>
							<view>{{item.mobile}}</view>
							<view class="item-status"
							:class="{
								'normal':item.status==userStatus.normal,
								'inviting':item.status==userStatus.inviting,
								'applying':item.status==userStatus.applying,
								'quit':item.status==userStatus.quit,
								'refuse':item.status==userStatus.refuse,
							}"
							>{{item.status | userStatusPipe}}</view>
						</view>
					</view>
				
			</view>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		
		
		<view class="flex font-size-small text-blue font-weight-middle" style="width:100%;background:#f1f1f1;padding:10px 0;position:fixed;bottom:0;">
			<view style="width:30%;text-align: center;" @click="operateMember('member')">添加成员</view>
			<view style="width:30%;text-align: center;border-left:1px solid #EEEEED;border-right:1px solid #eee"  @click="operateMember('midDepartment')">添加子部门</view>
			<view style="width:30%;text-align: center;"  @click="operateMember('department')">设置部门</view>
		</view>
	</view>
</template>

<script>
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['userInfo','userStatus','replacerObj']),
		data() {
			return {
				memberList:[],
				team:{
					id:'',
					name:''
				},
				page:1,
				title:'',
				tabList:[],
				departmentList:[]
			}
		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		methods: {
			checkMemberInfo(item){
				console.log(item)
				uni.navigateTo({
					url:'../personnel-member-info/personnel-member-info?id='+item.id+'&type=member'
				})
			},
			selectTab(item,index){
				console.log(item,index)
				this.tabList.splice(index+1);
				this.getMemberList(item.id)
				this.getDepartmentList(item.id)
			},
			checkDepartmentMember(item){
			
				this.team={
					id:item.id,
					name:item.name
				}
				this.tabList.push(this.team);
				this.getMemberList(this.team.id)
				this.getDepartmentList(this.team.id)
			},
				operateMember(type){
				switch(type){
					case 'member':
					uni.navigateTo({
						url:'../add-member/add-member?id='+this.team.id+'&name='+this.team.name
					})
					break;
					case 'midDepartment':
					uni.navigateTo({
						url:'../add-department/add-department?type=second&id='+this.team.id+'&name='+this.team.name
					})
					break;
					case 'department':
					uni.navigateTo({
						url:'../set-department/set-department?type=second&id='+this.team.id+'&name='+this.team.name
					})
					break;
				}
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getDepartmentList(id){
				this.$ajax('Departments',{
					type:this.replacerObj.type,
					parent:id
				},res=>{
					this.departmentList=res;
					
				})
			},
			getMemberList(id){
				this.$ajax('Users',{
					team:id,
					status:-1,
					offset:this.$utils.getOffset(this.page),
					type:1
				},res=>{
					this.memberList=res;
				})
				
			}
		},
		onLoad(options){
			
			
			if(options){
				this.team.id=options.id;
				this.team.name=options.name;
				console.log(options)
				
				this.tabList.push(this.team)
				console.log(this.tabList)
				this.getMemberList(options.id);
				this.getDepartmentList(options.id)
			}
		},
		onShow(){
			this.getMemberList(this.team.id)
			this.getDepartmentList(this.team.id)
		}
	}
</script>

<style lang="less">
	.member-content{
		.member-item{
			padding-top:16px;
			padding-bottom:15px;
			padding-left:17px;
			.item-status{
				margin-left:7px;
				font-size:10px;
				font-weight: 400;
				color:white;
				border-radius: 8px;
				padding:2px 6px;
			}
		}
	}
	page{
		background:rgba(247,247,247,1);
	}
	.normal{
		background:#13BB83
	}
	.inviting{
		
		background:rgba(254,147,62,1);
	}
	.applying{
		background:rgba(0,158,255,1);
	}
	.quit{
		background:rgba(229,229,229,1);
	}
	.refuse{
		background:red;
	}
</style>
