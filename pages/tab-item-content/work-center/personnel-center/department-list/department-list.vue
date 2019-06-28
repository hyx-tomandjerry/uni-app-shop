<template>
	<view>
		<view class="department-content">
			<view class="department-item" v-for="(item,index) in departmentList" :key="index" @click="chooseDepartment(item)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['replacerObj']),
		data() {
			return {
				departmentList:[]
			}
		},
		methods: {
			chooseDepartment(item){
				console.log(item)
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('department',{
							id:item.id,
							name:item.name
						})
					}
				})
			},
			getDepartmentList(){
				uni.request({
					url:this.$store.state.url+'Departments',
					data:{
						userId:1,
						session:'912de4cee63742a6a47cf093728ebcbf',
						owner:16,
						type:this.replacerObj.type,
						parent:-1
					},
					success: (res) => {
						console.log(res)
						this.departmentList=res.data.data;
					}
				})
			}
		},
		onLoad(){
			this.getDepartmentList()
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.department-content{
		padding:10px 15px;
		.department-item{
			padding:10px 5px;
			border-bottom:1px solid #EEEEED;
		}
	}
</style>
