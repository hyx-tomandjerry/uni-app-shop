<template>
	<!-- 树形图 -->
	<view class="cu-modal bottom-modal" :class="isShow?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-blue" @tap="hideModel">取消</view>
				<view class="action text-green" @tap="hideModel">确定</view>
			</view>
			<view >
				<mix-tree :list="areaList" @treeItemClick="treeItemClick"></mix-tree>
			</view>
		</view>
	</view>
</template>

<script>
	import mixTree from '../mix-tree/mix-tree.vue'
	import {DepartmentsApi} from '../../api/common_api.js'
	export default{
		data(){
			return{
				areaList:[]
			}
		},
		components:{mixTree},
		props:{
			isShow:Boolean,
			companyID:Number
		},
		methods:{
			hideModel(){
				this.$emit('hideModel')
			},
			//获得区域
			async getAreaList(){
				if(this.companyID){
					//如果传入公司ID
					let result=await DepartmentsApi({owner:this.companyID})
					this.getTree(result)
				}else{
					let result=await DepartmentsApi()
					this.getTree(result)

				}
				
			},
			getTree(data){
				//删除所有children ,防止多次调用
				data.forEach(item=>{
					delete item.children;
				})
				//将数据存储为id为key的map索引
				let map={};
				data.forEach(item=>{
					map[item.id]=item;
				})
			
				let val=[];
				data.forEach((item)=>{
					//以当前遍历项，的parent去map对象中找到索引的id;
					let parent=map[item.parent];
					//如果找到索引，那说明此项不在顶级中，需要把此项添加到对应的父级中
					if(parent){
						(parent.children || (parent.children=[])).push(item)
					}else{
						val.push(item);//顶级父级
					}
				})
				this.areaList = val
			},
			//点击最后一级时触发该事件
			treeItemClick(item) {
				let {
					id,
					name,
					parentId
				} = item;
				this.$emit('treeItemClick',item)
			
			},
		},
		mounted(){
			this.getAreaList()
		}
	}
</script>

<style>
</style>
