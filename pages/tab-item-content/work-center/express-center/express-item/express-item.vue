<template>
	<view class="borderTop ">
	

		<!--寄件信息-->
		<view class="express-container bg-white margin-bottom-normal">
			<view class="express-container-name">
				寄件信息
			</view>
			<view class="express-container-list position_relative">
				<view class="express-container-sender">
					<view class="send-tag bg-white tag-name">寄</view>
					<view>
						<view class="font-size-normal color-normal font-weight-bold">{{expressDetail.depname || ''}}</view>
						<view class=" color-normal font-size-normal">
							<text style="margin-right:10px;">{{expressDetail.senderName || ''}}</text>
							<text>{{expressDetail.senderMobile || ''}}</text>
						</view>
						<view class="font-size-litter color-regular">{{expressDetail.depaddr || ''}}</view>
					</view>
				</view>
				<image src="../../../../../static/img/work/express/other/track-img.png" class="track-img" style="top:60px;"></image>
				<view class="express-container-receive">
					<view class="receive-tag bg-white tag-name">收</view>
					<view>
						<view v-if="expressDetail.destype==expressItem.shop" class="font-size-normal color-normal font-weight-bold">{{expressDetail['desname'] || ''}}</view>
						<view class=" color-normal">
							<text style="margin-right:10px;">{{expressDetail['recverName'] || ''}}</text>
							<text>{{expressDetail['recverMobile'] || ''}}</text>
						</view>
						<view class="font-size-small color-regular">{{expressDetail['desaddr'] || ''}}</view>
					</view>
				</view>

			</view>
		</view>

		<!--订单信息-->
		<view class="order-container bg-white margin-bottom-normal">
			<view class="express-container-name" style="margin-bottom:12px;">
				寄件信息
			</view>
			<view class="order-info-container flex justify-between">
				<view>
					<view class="margin-litter">
						<text class="color-regular order-intro">寄件类型</text>
						<text class="color-normal" >
							{{expressDetail.type==1?'特快送':'特惠送'}}
						</text>
					</view>
					<view class="margin-litter">
						<text class="color-regular order-intro">总计费用</text>
						<text class="color-red font-weight-bold">￥{{expressDetail['inscharge'] || 0}}</text>
					</view>
					<view class="margin-litter">
						<text class="color-regular order-intro">物品体积</text>
						<text class="color-normal">{{expressDetail.volume}}(m³)</text>
					</view>

				</view>

				<view>
					<view class="margin-litter">
						<text class="color-regular order-intro">订单状态</text>
						<text class="status-tag"
							  :class="{
								'status-unsign':expressDetail.status==expressStatusZn.unSign,
								'status-pick':expressDetail.status==expressStatusZn.pick,
								'status-travel':expressDetail.status==expressStatusZn.travel,
								'status-arrive':expressDetail.status==expressStatusZn.arrive,
								'status-sign':expressDetail.status==expressStatusZn.sign,
							}"
						>{{expressDetail.status | expressStatusPipe}}</text>
					</view>
					<view class="margin-litter">
						<text class="color-regular order-intro">报价费用</text>
						<text class="color-red font-weight-bold">￥{{expressDetail['insamount']}}</text>
					</view>
					<view class="margin-litter">
						<text class="color-regular order-intro">物品重量</text>
						<text class="color-normal">{{expressDetail.weight}}kg</text>
					</view>
				</view>
			</view>
			<view>
				<text class="order-other-intro color-regular " style="margin-right:9px;">物品类型</text>
				<text class="color-normal ">
					{{expressDetail.catalog || '未说明'}}
				</text>
			</view>
			<view class="summary">
				<text class="order-other-intro color-regular " style="margin-right:9px;">包裹备注</text>
				<text class="color-normal ">
					{{expressDetail.summary || '未说明'}}
				</text>
			</view>
			<view class="order-info-other">
				<view class="order-info-other-item">
					<text class="order-other-intro color-regular">运单号</text>
					<text class="color-blue">{{expressDetail.seq || '暂无'}}</text>
				</view>
				<view class="order-info-other-item" style="padding-bottom:10px;">
					<text class="order-other-intro color-regular">下单时间</text>
					<text class="color-blue">{{expressDetail.orderdate | formatTime('YMDHMS')}}</text>
				</view>

			</view>
		</view>

		<!--按钮-->
		<view class="btn-container position_absolute flex justify-between" v-if="expressDetail.status==expressStatusZn.unSign && itemType=='send'">
			<view class="again-btn " 	@click="operateItem('again')">取消订单</view>
			<!--<view class="track-btn" 	@click="operateItem('track')">物流追踪</view>-->
		</view>
		
		<showModel :isShow="modalName=='cancel'" @hideModel="hideModal" @confirmDel="confirmDel" v-if="modalName=='cancel'">
					<block slot="content">确认取消订单?</block>
		</showModel>
	</view>
</template>
<script>
	import {mapState} from 'vuex';
	import showModel from '../../../../../components/show-model.vue'
	export default{
		computed:mapState(['expressWay','expressCatalog','expressType','expressStatusZn','expressItem']),
		data(){
			return{
				expressDetail:'',
				modalName:'',
				itemType:''
			}
		},
		methods:{
			confirmDel(){
				this.hideModal()
				this.$ajax('CancelWaybill',{
					id:this.expressDetail.id
				},res=>{

					uni.showToast({
						title:'取消订单成功，可以重新下单',
						icon:'none'
					})
				})
			},
			/*重新下单或者物流跟踪*/
			operateItem(type){
				switch(type){
					case 'again':
						//重新下单
						this.modalName='cancel';
							
						break;
					case 'track':
						//物流追踪
						break;
				}
			},
			/*
			* 	获得单个快递信息
			* */
			getExpressItemInfo(id){
				this.$ajax('Waybill',{
					id:id
				},res=>{
					this.expressDetail=res;
				})
			},
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
			}
		},
		onLoad(params){
			
			if(params.id){
				this.getExpressItemInfo(params.id)
			}
			if(params.type){
				this.itemType=params.type;
			}
		},
		components:{showModel}
	}
</script>
<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.track-img{
		width: 10px;
		height: 35px;
		position:absolute;
		left:7px;
	}
	.email-container{

		padding:16px 34px 16px 28px;
		background:#fff;
		display: flex;
		justify-content: space-between;
		.email-container-left{
			.email-img{
				width:42px;
				height:42px;
				vertical-align: middle;
				margin-right:12px;
			}
			.email-name{
				margin-bottom:3px;
				display: block;
			}
		}
		.email-container-right{
			text-align: center;
			.call-img{
				width:26px;
				height:26px;
			}
		}
	}
	.express-container,.order-container{
		padding-top:12px;
		padding-left:19px;
		text-align: left;
		.express-container-name{
			font-size:16px;
			font-weight: bold;
		}
		.express-container-list{
			padding-top:16px;
			padding-left:3px;
			.tag-name{
				width:18px;
				height:18px;
				color:#fff;
				font-size:12px;
				border-radius:50%;
				margin-top:14px;
				margin-right:13px;
			}
			.express-container-sender{
				display: flex;
				justify-content: flex-start;
				.send-tag{

					line-height:18px;
					text-align: center;
					background:rgba(32,32,32,1);
				}


			}
			.express-container-receive{
				padding-top:40px;
				padding-bottom:8px;
				display: flex;
				justify-content: flex-start;
				.receive-tag{
					line-height:18px;
					text-align: center;
					background:rgba(66,176,237,1);
				}
			}
		}
		.order-info-container{
			padding-right:28px;
			.order-intro{
				margin-right:13px;
			}
			.status-tag{
				height:18px;line-height:18px;

				border-radius:11px;
				font-size:12px;color:#fff;padding:0 8px;
			}

		}
		.order-info-other{
			padding-top:13px;
			.order-info-other-item{
				margin-bottom:10px;
				.order-other-intro{
					margin-right:31px;
				}
			}
		}
	}
	.margin-litter{
		margin-bottom:8px;


	}
	.summary{
		word-wrap: break-word;padding:5px 15px 17px 0px;
		border-bottom:1px solid #EEEEED;
	}
	//代取件
	.status-unsign{
		color:#fff;
		background:#FF5C4D;
	}
	//已取件
	.status-pick{
		color:#fff;
		background-color: #FE992B;
	}
	//已发运
	.status-travel{
		color:#fff;
		background-color: #188FFF;
	}
	//已到达
	.status-arrive{
		color:#fff;
		background:#B82BFE;
	}
	//已签收
	.status-sign{
		background:#13BB83
	}
	.btn-container{
		width: 100%;
		background-color: #fff;
		padding:14px 13px 10px 14px;
		display: flex;
		bottom:0px;
		.again-btn{
			height:40px;
			flex:1;
			border-radius:5px;
			background:rgba(66,176,237,1);
			line-height:40px;
			text-align: center;
			color:#fff;
			font-size:16px;

		}
		.track-btn{
			width: 212px;
			margin-left: 12px;
			height:40px;
			background:rgba(66,176,237,1);
			border-radius:5px;
			line-height:40px;
			text-align: center;
			color:#fff;
			font-size:16px;
		}

	}
</style>