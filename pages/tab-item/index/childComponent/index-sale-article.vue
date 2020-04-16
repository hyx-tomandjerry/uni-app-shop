<template>
	<view class="notice_container">
		<view style="margin-bottom:10px;">
			<view>
				<view class="cu-bar bg-white ">
					<view class="action">
						<text class="card-title">销售公告</text>
					</view>
					<view class="action" @click="showMoreInfo">
						<text  >更多<text class="cuIcon-right" ></text></text>
					</view>
				</view>
	
				<template v-if="list.length">
					<block v-for="(item,index) in list" :key="index">
						<article-skill :item="item" :index="index"  @checkItemInfo="detailContent"></article-skill>
					</block>
				</template>
				<template v-else>
					<view  style="text-align: center;padding:42px 0 68px;">
						<image :src="srcimg" style="width:125px;height:92px;"></image>
						<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">暂无数据哦~</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import {getArticleList} from '../../../../api/index_api.js'
	import articleSkill from '../../../../components/article/article-skill.vue'
	export default{
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			srcimg:String
		},
		data(){
			return{
				saleNoticeList:[]
			}
		},
		components:{articleSkill},
		methods:{
			/*文章列表*/
			showMoreInfo(){
				this.$emit('showMoreInfo','skill')
			},
			detailContent(event){
				this.$emit('detailContent',event)
			}
		},
	}
</script>

<style scoped>
	.card-title{
		font-size:18px;
		font-weight:800;
		color:rgba(42,42,42,1);
	}
	.notice_container{
		margin-top:26upx;
		background:#fff;
	
		padding-right:28upx;
		padding-left:36upx;
	
	}
</style>
