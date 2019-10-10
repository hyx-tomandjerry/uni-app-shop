<template>
	<view >

	<view class="flex text-center bg-white justify-around">
		<view class="cu-item  font-size-big  " :class="item.id==TabCur?'cur  borderBottomRed color-red':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect(item)" :data-id="index" style="padding:9px  0;">
			{{item.name}}
		</view>
	</view>
		<view>
			<view v-if="TabCur==1">
				<view class="work-item" @click="itemDetail(item)" v-for="(item,index) in list" :key="index" style="margin-bottom:13px" >
					<view class="user flex justify-start align-center">
						<image :src="item.headurl?item.headurl:'../../../../static/img/default.png'" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;border-radius: 50%;"></image>

						<view class="user-info flex-1">
							<view  style="margin-bottom:4px;">
								<text class="user-name">{{item.reporterName}}</text>
							</view>
							<view class="flex justify-between work-date">
								<view >{{item.rptdate | formatTime('YMD')}}</view>
								<view style="margin-left:20px;">
									<text >发送</text>
									<text style="margin:0 10px;"> {{item.shopName}}</text>
								</view>
							</view>

						</view>
					</view>
					<view class="work-content">
						<view>
							<view style="font-size:15px;color:#2D6097">#{{item.name || ''}}#</view>
							<view class="user-name ellipsis-2 font-size-normal font-weight-normal color-normal">{{item.summary}}</view>
						</view>
						<view v-if="item.files">
							<view class="bg-white " style="padding:16px 0;">
					<view class="grid col-4 grid-square">
						<view class="bg-img" v-for="(img,index) in item.files" :key="index" :style="[{ backgroundImage:'url(' + img.url + ')' }]"></view>
					</view>
				</view>
						</view>
					</view>

				</view>
			</view>
			<view v-if="TabCur==2">
				<view class="sale_item bg-white margin-bottom-normal"  v-for="(item,index) in saleList" :key="index" @click="checkItem(item)">
					<view class="user_info flex justify-start">
						<image :src="item.img" mode="" class="user_avatar"></image>
						<!-- <image src="../../../../static/img/cute.jpg" mode=""></image> -->
						<view>
							<view class="color-normal font-size-big" style="margin-bottom:7px;">{{item.name}}</view>
							<view class="font-size-litter color-regular">{{item.date}}</view>
						</view>
					</view>
					<view class="log_content flex justify-between">
						<view class="sale_info flex-1">
							<view class="flex justify-start align-center sale_info_item">
								<view class="blue-dot"></view>
								<view>{{item.project}}</view>
							</view>
							<view class="flex justify-star align-center sale_info_item">
								<view class="blue-dot"></view>
								<view class="color-regular">今日目标:<text style="color:#13B27A" class="font-weight-bold">{{item.aim}}</text></view>
							</view>
							<view class="flex justify-star align-center sale_info_item">
								<view class="blue-dot"></view>
								<view class="color-regular">今日销售额:<text style="color:#FE2763" class="font-weight-bold">{{item.fact}}</text></view>
							</view>
						</view>
						<view class="sale_chart flex-sm">
							<canvas :canvas-id="`canvasArcbar${index+1}`" :id="`canvasArcbar${index+1}`" class="charts3" ></canvas>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view v-else>
			<LxEmpty></LxEmpty>
		</view> -->
		<!-- <image src="../../../../static/img/add.png"
				style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createWork()" v-if="TabCur==2 && userInfo.type==shoperObj.type "></image> -->
				<uni-load-more :contentText="content" :status="loading" :showIcon="true" ></uni-load-more>
	</view>
</template>

<script>
	import LxEmpty from '../../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	import uCharts from '../../../../components/u-charts/u-charts.js'
	var canvaArcbar1;
	export default {
		computed:mapState(['userInfo','shoperObj']),
        data() {
			return {
				page:0,
				list:[],
				isLoading:false,
				tabList:[{id:1,name:'工作回执'},{id:2,name:'销售周报'}],
				TabCur:2,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				chartData: {
					series: [{
						name: '正确率',
						data: 0.29,
						color: '#2fc25b'
					}]
				},
				saleList:[
					{img:'../../../../static/img/cute.jpg',name:'Mr Burp',date:'2019-08-22 15:23',project:'上海zara旗舰店时尚广场',aim:'¥53,2234.00',fact:'¥53,2234.00',chart:{series:[{name:'销售额',data:0.3,color:'#FEA536'}]}},
					{img:'../../../../static/img/cute.jpg',name:'Mr Burp',date:'2019-08-22 15:23',project:'上海zara旗舰店时尚广场',aim:'¥53,2234.00',fact:'¥53,2234.00',chart:{series:[{name:'销售额',data:0.4,color:'#FEA536'}]}},
					{img:'../../../../static/img/cute.jpg',name:'Mr Burp',date:'2019-08-22 15:23',project:'上海zara旗舰店时尚广场',aim:'¥53,2234.00',fact:'¥53,2234.00',chart:{series:[{name:'销售额',data:0.5,color:'#FEA536'}]}},
					{img:'../../../../static/img/cute.jpg',name:'Mr Burp',date:'2019-08-22 15:23',project:'上海zara旗舰店时尚广场',aim:'¥53,2234.00',fact:'¥53,2234.00',chart:{series:[{name:'销售额',data:0.6,color:'#FEA536'}]}},
					{img:'../../../../static/img/cute.jpg',name:'Mr Burp',date:'2019-08-22 15:23',project:'上海zara旗舰店时尚广场',aim:'¥53,2234.00',fact:'¥53,2234.00',chart:{series:[{name:'销售额',data:0.7,color:'#FEA536'}]}},
					{img:'../../../../static/img/cute.jpg',name:'Mr Burp',date:'2019-08-22 15:23',project:'上海zara旗舰店时尚广场',aim:'¥53,2234.00',fact:'¥53,2234.00',chart:{series:[{name:'销售额',data:0.8,color:'#FEA536'}]}},
					{img:'../../../../static/img/cute.jpg',name:'Mr Burp',date:'2019-08-22 15:23',project:'上海zara旗舰店时尚广场',aim:'¥53,2234.00',fact:'¥53,2234.00',chart:{series:[{name:'销售额',data:0.9,color:'#FEA536'}]}}
				]
				//isLike:0,点赞功能，现在删除
			}
		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.page=1;
				this.getList()
			},800)
		},
		onReachBottom(){
			this.page++;
			this.$ajax('WorkReportsByShop',{
				  type:2,
				 offset:this.$utils.getOffset(this.page)
			},res=>{
				if(res==''){
					setTimeout(()=>{
						this.loading='noMore'
					},900)

			    }else{
					res.forEach(item=>{
						this.list.concat(item);
					})
					this.loading='loading'
					setTimeout(()=>{
						this.loading='noMore'
					},900)


				}
			})

		},
        onLoad(){
			this.getList();
			this.cWidth3=uni.upx2px(200);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(200);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(20);
			this.saleList.forEach((item,index)=>{
		
				this.showArcbar(`canvasArcbar${index+1}`,item.chart);
			})
			let index=1
			this.showArcbar(`canvasArcbar${index}`,this.saleList[0].chart);
			this.showArcbar("canvasArcbar2",this.saleList[1].chart);
        },
		onShow(){
			this.page=1;
			this.getList();
		},
		methods: {
			/*查看任务详情*/
			checkItem(item){
				uni.navigateTo({
					url:"../work-log-item/work-log-item?id=2"
				})
			},
			showArcbar(canvasId,chartData){
				canvaArcbar1=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					series: chartData.series,
					animation: true,
					width: this.cWidth3*this.pixelRatio,
					height: this.cHeight3*this.pixelRatio,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
						color: chartData.series[0].color,
						fontSize: 18*this.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,//这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 15*this.pixelRatio
					},
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: this.arcbarWidth*this.pixelRatio,//圆弧的宽度
							startAngle:0.5//整圆类型只需配置起始角度即可
						}
					}
				});
				
			},
			/**
			 点赞，评论功能，已删除
			operateLog(item,type){
				switch(type){
					case 'comment':
					this.itemDetail(item)
					// uni.navigateTo({
					// 	url:`../log-detail/log-detail?id=${item.id}&type=article`
					// })
					break;
					case 'share':
					this.$ajax('ForwardWorkReportByShop',{id:item,id},res=>{
						uni.showToast({
							title:'分享成功',
							icon:'none'
						})
					})
					break;
					case 'praise':
					console.log(item)
					if(item.isLiker==1){
						uni.showToast({
							title:'不要重复点赞',
							icon:'none'
						})
					}else{
						item.likes+=1;
						this.$ajax('LikeWorkReportByShop',{
							id:item.id
						},res=>{
							uni.showToast({
								title:'点赞成功',
								icon:'none'
							})
							this.getList();
						})
					}


					break;
				}
			},

			//新建
			createWork(event){
				uni.navigateTo({
					url:'../create-log/create-log?type=log'
				})
			},
			*/
		   //选择nav
			tabSelect(item){
				this.TabCur=item.id;
				this.getList()

			},

			//查看详情
			itemDetail(event){
				uni.navigateTo({
					url:`../log-detail/log-detail?id=${event.article}&type=article&shop=${event.shop}`
				})
			},
			//获取列表数据
			getList(){
			    if(this.TabCur==1){
					this.$ajax('WorkReportsByShop',{
						 type:1,
						 offset:this.$utils.getOffset(this.page)
					},res=>{
						 this.list = res;
					})
				}
			},

		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.empty-middle{
		position: absolute;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		top: 50%;
		width: 100%;
	}
	.ellipsis-2{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.work-item{


		padding:18px 12px 13px 15px;
		background: #fff;
	}
	.user-info{
		margin-top:4px;
		margin-bottom:8px;
		.user-name{
			font-size:15px;

			font-weight:500;
			color:rgba(42,42,42,1);
		}
		.work-date{
			font-size:13px;

			font-weight:400;
			color:rgba(164,164,164,1);
		}
	}
	.work-content{
		margin-bottom:15px;
	}
	.tag-name{
		display: inline-block;
		font-size:10px;

		font-weight:400;
		color:rgba(42,42,42,1);
		padding:2px 8px;
		background:rgba(246,238,253,1);
		width: auto;
		max-width:100%;
	}
	.sale_item{
		padding:15px 0px 0px 17px;
		.user_info{
			margin-bottom: 7px;
			.user_avatar{
				width:47px;
				height:47px;
				border-radius: 50%;
				vertical-align: middle;
				margin-right:14px;
			}
		}
		.log_content{
			padding-left: 17px;
			.sale_info{
				.sale_info_item{
					margin-bottom: 7px;
				}
				.blue-dot{
					width: 6px;
					height: 6px;
					border-radius: 50%;
					margin-right: 8px;
					background:#42B0ED
				}
			}
			.sale_chart{
				width: 200upx;
				height: 200upx;
				background-color: #FFFFFF;
				position: relative;
			}
			.charts3 {
				position: absolute;
				width: 200upx;
				height: 200upx;
				background-color: #FFFFFF;
				right: 40px;
				top: -26px;
			}
		}
	}
</style>
