<template>
	<view>
		<view class="flex text-center bg-white nav">
			<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect($event)" :data-id="index">
				{{item.text}}
			</view>
		</view>
		<scroll-view scroll-x class="bg-white">
			<view v-if="TabCur==0">全部</view>
			<view v-if="TabCur==1">待揽件</view>
			<view v-if="TabCur==2">已取件</view>
			<view v-if="TabCur==3">已签收</view>
		</scroll-view>
		<image src="../../../../../static/icon/add.png"
				style="position:fixed;right:12px;bottom:45px;width:68px;height:68px;z-index:100;"
				 @click.stop="createExpress()"></image>
				 
		<view v-show="showExpress" 
		style="position:absolute;right:98px;
		
		bottom:12px;z-index:100;">
				<view v-for="(item,index) in expressList" :key="index" @click="choseExpress(item)" >
					<view class="cu-tag round " 
					:class="{'bg-green':chose==item.id}"
					style="margin-bottom:10px;font-size:15px;padding:5px 6px">{{item.name}}</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio:'radio1',
				TabCur: 0,
				scrollLeft: 0,
				showExpress:false,
				chose:-1,
				
				tabList:[
					{text:'全部'},
					{text:'待揽件'},
					{text:'已取件'},
					{text:'已签收'},
				],
				expressList:[
					{name:'速递订单',id:0},
					{name:'物流订单',id:1},
					{name:'调拨订单',id:2},
				],
			};
		},
		methods: {
			choseExpress(event){
				this.chose=event.id;
				uni.navigateTo({
					url:'../create-express/create-express?express='+this.chose
				})
			},
			RadioChange(event){
				console.log(event)
			},
			//新建快递
			createExpress(){
				this.showExpress=true;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				console.log(this.TabCur)
			}
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
</style>
