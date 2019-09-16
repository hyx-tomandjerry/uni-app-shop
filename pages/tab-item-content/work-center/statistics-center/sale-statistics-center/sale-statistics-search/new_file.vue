<template>
	<view class="content">
		<mix-tree :list="list" @treeItemClick="treeItemClick"></mix-tree>
	</view>
</template>

<script>
	import mixTree from '@/components/mix-tree/mix-tree';
	export default {
		components: {
			mixTree
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getAreaList()
		},
		methods: {
			//获得区域
			getAreaList(){
				this.$ajax('Departments',{
					type:4,
					parent:-1
				},res=>{
					this.list=this.getTree(res)
					
				})
			},
			//点击最后一级时触发该事件
			treeItemClick(item) {
				let {
					id,
					name,
					parentId
				} = item;
				uni.showModal({
					content: `点击了${parentId.length+1}级菜单, ${name}, id为${id}, 父id为${parentId.toString()}`
				})
				console.log(item)
			},
			getTree(data){
				//删除所有children ,防止多次调用
				data.forEach(item=>{
					delete item.children;
				})
				//将数据存储为id为key的map索引
				var map={};
				data.forEach(item=>{
					map[item.id]=item;
				})
				// console.log(map)
				var val=[];
				data.forEach(function(item){
					//以当前遍历项，的parent去map对象中找到索引的id;
					var parent=map[item.parent];
					//如果找到索引，那说明此项不在顶级中，需要把此项添加到对应的父级中
					if(parent){
						(parent.children || (parent.children=[])).push(item)
					}else{
						val.push(item);//顶级父级
					}
				})
				return val;
			}
		}
	}
</script>

<style>

</style>
