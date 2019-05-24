<template>
	<view>
		<view v-for="(item,index) in tabList" :key="index" 
		@click="expressTabClick(item)"
		class="express-tab-content">
			<view class="express-tab"
				:class="{
					'border-blue':item.id==1,
					'border-orange':item.id==2,
					'border-green':item.id==3,
					'border-red':item.id==4,
					'border-purple':item.id==5
				}"
			>{{item.name}}</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				tabList:[
					{name:'新建速递订单',id:1},
					{name:'新建物流订单',id:2},
					{name:'新建调拨订单',id:3},
					{name:'快递订单记录',id:4},
					{name:'调拨代发任务',id:5},
				],
				
			}
		},
		components:{
			
		},
		methods:{
			expressTabClick(event){
				switch(event.id){
					case 1:
					//新建速递订单
					uni.navigateTo({
						url:'../create-express/create-express?type='+event.id
					})
					break;
					case 2:
					//新建物流订单
					uni.navigateTo({
						url:'../create-express/create-express?type='+event.id
					})
					break;
					case 3:
					// 新建调拨订单
					uni.navigateTo({
						url:'../create-distribute/create-distribute'
					})
					break;
					case 4:
					// 快递订单记录
					uni.navigateTo({
						url:'../express-list/express-list'
					})
					break;
					case 5:
					// 调拨代发记录
					break;
				}
			}
		},
		onLoad(){
			
		},
	}
</script>
<style lang="less" >
		page{
			background:#fff;
		}
		.express-tab-content{
			padding:10px 15px;
			.express-tab{
				padding:30px 15px;
				font-size:17px;
				font-weight: 600;
				// border:1px solid #EEEEED;
				
				box-shadow:lightblue 5px 5px 5px 2px;
				margin-bottom:12px;
			}
			.express-tab:hover {
				box-shadow: 3px 3px 2px lightgray,
								-3px -3px 2px lightgray;
			}

		}
		.border-red{
			border-left:4px solid red;
		}
		.border-blue{
			border-left:4px solid deepskyblue;
		}
		.border-orange{
			border-left:4px solid orange;
		}
		.border-green{
			border-left:4px solid green;
		}
		.border-purple{
			border-left:4px solid purple;
		}
</style>