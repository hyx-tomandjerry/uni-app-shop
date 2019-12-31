<template>
	<view >
		<view class="borderTop">
			<view v-if="skillList.length">
				<view v-if="value=='skill'">
					<block v-for="(item,index) in skillList" :key="index">
						<article-skill :item="item" :index="index" @checkItemInfo="checkItemInfo"></article-skill>
					</block>
				</view>


				<view class="cu-card case example-content" v-show="value=='example'" >
					<block v-for="(item,index) in skillList" :key="index">
						<article-example :item="item" :index="index" @checkItemInfo="checkItemInfo"></article-example>
					</block>
					
				</view>
				
				<uni-load-more :contentText="content" :showIcon="true" :status="loading" v-if="skillList.length>4"></uni-load-more>
			</view>


			<view v-else>
				<LxEmpty></LxEmpty>
			</view>
		</view>



	</view>
</template>

<script>
	import LxEmpty from '../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../components/common/uni-load-more.vue'
	import articleSkill from '../../../components/article/article-skill.vue'
	import articleExample from '../../../components/article/article-example.vue'
	import {getArticleList} from '../../../api/index_api.js'
	export default{
		data(){
			return{
				exampleList:[],
				skillList:[],
				title:'',
				value:'',
				isLoading:false,
				isFinish:false,
				page:1,
				content:{
					contentdown: "下拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more'
			}
		},
		components:{
			LxEmpty,
			uniLoadMore,
			articleSkill,
			articleExample

		},
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},800)
			this.getArticleList()
		},
		async onReachBottom(){
			this.page++;
			let val={
				type:this.value=='skill'?1:2,
				offset:this.$utils.getOffset(this.page)
			}
			let result = await getArticleList(val)
			if(result.length == 0){
				setTimeout(()=>{
					this.loading='noMore'
				},900)
			}else{
				result.forEach(item=>{
					this.skillList=[...this.skillList,item]
				})
				this.loading='loading'
				setTimeout(()=>{
					this.loading='noMore'
				
				},900)
			}

		},
		methods:{
			checkItemInfo(item){
				uni.navigateTo({
					url:"../detail-content/detail-content?id="+item.id+"&type="+this.value
				})
			},
			//获得销售技巧列表
			async getArticleList(){
				uni.showLoading()
				let val={
					type:this.value=='skill'?1:2,
					offset:this.$utils.getOffset(this.page)
				}
				let result = await getArticleList(val);
				uni.hideLoading()
				result.forEach(item=>{
					if(!item.coverurl){
						item.coverurl="../../../static/img/default.png"
					}
				})
				this.skillList=result;

			}
		},
		onLoad(option){

			if(option.value=='skill'){
				this.title='销售技巧';
				this.value=option.value;

			}else if(option.value=='example'){
				this.title='陈述案例';
				this.value=option.value;

			}
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.getArticleList()

		}
	}
</script>

<style lang="less">
	@import url('../../../static/css/demo.less');
	page{
		background:#FFF;
	}
	.cu-card>.cu-item{
		.mixMargin(0,0,0,0);
	}
	.cu-card.article{
		.mixBorderBottom(1px;solid ;rgba(238, 238, 237, 1));
	}
	.cu-list.menu-avatar>.cu-item .content{
		left:10px;
		.mixWidth(calc(100%  - 30px - 10px))
	}

	.example-content{
		.mixMargin(7px;7px;7px;7px);
		.mixBorderRadius(10px);

	}
</style>

