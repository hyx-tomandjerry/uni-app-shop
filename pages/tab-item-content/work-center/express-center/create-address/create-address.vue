<template>
	<view>
		<view class="container bg-white" >
			<view class="flex justify-between " style="padding:5px 10px;border-bottom:1px solid #EEEEED">
				<view style="border-right:1px solid #EEEEED;" >
					<input type="text" placeholder="姓名/门店名称(必填)" style="font-size:13px;">
				</view>
				<view>
					<input type="text" placeholder="手机号/固定电话(必填)" style="font-size:13px;">
				</view>
			</view>
			<view class="flex justify-between" style="padding: 8px 10px;border-bottom:1px solid #EEEEED">
				<view class="title" style="color:gray;font-size: 12px;" >选择所在城市</view>
				<addressed @changes="childClick($event)"></addressed>
			</view>
			
			<view style="padding: 8px 10px;border-bottom:1px solid #EEEEED">
				<input type="text" placeholder="详细地址(详细到门牌,街道)" style="font-size:13px;">
			</view>
			
			<view class="flex justify-end">	
				<view style="font-size:12px;padding: 8px 10px;color:lightgray;">
					<text class="cuIcon-delete" style="font-size:13px;color:orange;margin-right:10px;"></text>清空当前信息
				</view>
			</view>
		</view>
		
		
	<view style="width:100%;position:absolute;bottom:7px;left:0;padding:10px 15px;background:#fff;">
		<view class="cu-btn bg-blue" style="width:100%;border-radius: 8px;">保存</view>
	</view>
	</view>
</template>

<script>
	import addressed from '../../../../../components/jm-address/jm-address.vue'
	export default {
		data() {
			return {
				isShow:false,
				shop:{
					province:'',
					city:'',
					district:''
				}
			}
		},
		components: {
			addressed
		},
		methods: {
			childClick(e) {
			        console.log(e)
					this.shop.province=e.provinceID;
					this.shop.city=e.cityID;
					this.shop.district=e.districtID
			    },
			chooseCity(){
				this.isShow=true;
			}
		}
	}
</script>

<style lang="less">
	
</style>
