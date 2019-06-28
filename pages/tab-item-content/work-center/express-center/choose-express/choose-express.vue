<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back" style="font-size:20px;"></text></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="express-list">
			<view class="flex justify-around" style="width:100%;flex-wrap: wrap;">
				<view v-for="(item,index) in expressList" :key="index"  class="express-item"  @click="chooseExpressItem(item)">
					<view style="margin-bottom:10px;"><image :src="item.img" style="width:50px;height:50px;"></image></view>
					<view>{{item.name}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				
				expressList:[]
			}
		},
		methods: {
			chooseExpressItem(item){
				console.log(item)
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('express',item)
					}
				})
			}
		},
		onLoad(options){
			console.log(options)
			if(options){
				if(options.name=='logistics-order'){
					this.title='物流公司'
					this.expressList=[
						{name:'顺丰速运',id:1,img:'../../../../../static/img/work/express/shunfeng.png'},
						{name:'圆通速递',id:2,img:'../../../../../static/img/work/express/yuantong.png'},
						{name:'远成物流',id:3,img:'../../../../../static/img/work/express/yuancheng.png'},
						{name:'申通快递',id:4,img:'../../../../../static/img/work/express/shentong.png'},
					]
				}else if(options.name=='express-order'){
					this.title='快速公司';
					this.expressList=[
						{name:'申通快递',id:1,img:'../../../../../static/img/work/express/shentong.png'},
						{name:'圆通快递',id:2,img:'../../../../../static/img/work/express/yuantong.png'},
						{name:'中通快递',id:3,img:'../../../../../static/img/work/express/zhongtong.png'},
						{name:'韵达快递',id:4,img:'../../../../../static/img/work/express/yunda.png'},
						{name:'天天快递',id:5,img:'../../../../../static/img/work/express/tiantian.png'},
						{name:'汇通快递',id:6,img:'../../../../../static/img/work/express/huitong.png'},
						{name:'德邦快递',id:7,img:'../../../../../static/img/work/express/debang.png'},
						{name:'顺丰',id:8,img:'../../../../../static/img/work/express/shunfeng.png'},
					]
				}
			}
		}
	}
</script>

<style lang="less" >
	page{
		background:rgba(247,247,247,1);
	}
	.express-list{
		padding:30px 15px;
		.express-item{
			width:30%;margin-bottom:20px;border:1px solid #EEEEED;text-align:center;padding:5px;box-shadow:lightgray 5px 5px 5px 2px;
		}
		.express-item:hover{
			box-shadow: 3px 3px 2px lightgray,
							-3px -3px 2px lightgray;
		}
	}
</style>
