<template>
    <view>
        <view class="sender-info">

            <view style="border-bottom:1px solid #EEEEED;padding-bottom:8px;margin-bottom:9px;" class="flex justify-start">
                <view class="sender-tag bg-blue">寄</view>
                <view>
                    <view>{{expressItem.fromshopName}}</view>
                    <view class="text-gray" style="font-size:12px;margin-top:4px;">{{expressItem.faddr}}</view>
                </view>
            </view>
            <view style="padding-bottom:8px;" class="flex justify-start">
                <view class="sender-tag bg-orange">收</view>
                <view>
                    <view class="flex justify-start">
                        <view style="margin-right:6px;">{{expressItem.toshopName}}</view>
                        <view style="font-size:12px;color:gray" v-if="expressItem.receiverName &&expressItem.receiverMobile ">(<text>{{expressItem.receiverName}}</text> | <text>{{expressItem.receiverMobile}}</text>)</view>
                    </view>
                    <view class="text-gray" style="font-size:12px;margin-top:4px;">{{expressItem.taddr}}</view>
                </view>
            </view>
        </view>

        <view class="goods-info">
            <view class="goods-name">商品信息</view>
            <view class="goods-item flex justify-start">
                <text class="goods-item-tag">商品名称</text>:<text class="goods-item-content">{{expressItem.name}}</text>
            </view>
            <view class="goods-item flex justify-start" v-if="type=='express'">
                <text class="goods-item-tag">商品重量</text>:<text class="goods-item-content">{{expressItem.weight}}kg</text>
            </view>
            <view class="goods-item flex justify-start">
                <text class="goods-item-tag">商品数量</text>:<text  class="goods-item-content">{{expressItem.quantity}}件</text>
            </view>
            <view class="goods-item flex justify-start" v-if="expressItem.insprice && type=='express'" >
                <text class="goods-item-tag">保价金额</text>:<text class="text-red goods-item-content" >{{expressItem.insprice}}元</text>
            </view>
        </view>

        <view class="goods-info">
            <view class="goods-name">订单信息</view>
            <view class="goods-item flex justify-start"  v-if="type=='express'">
                <text class="goods-item-tag">预约上门时间</text>:<text class="goods-item-content text-red " style="font-weight: 600;">{{expressItem.appointdate}}</text>
            </view>
            <view class="goods-item flex justify-start">
                <text class="goods-item-tag">下单时间</text>:<text class="goods-item-content">{{expressItem.senddate | formatTime('YMDHMS')}}</text>
            </view>
            <view class="goods-item flex justify-start"  v-if="type=='express'">
                <text class="goods-item-tag">订单状态</text>:<text class=" goods-item-content"  style="padding:2px 3px;"
                                                               :class="{
					'bg-orange' :expressItem.status==expressStatusColor.unSign,
					'bg-blue' :expressItem.status==expressStatusColor.sign,
					'bg-green' :expressItem.status==expressStatusColor.finish,
				}">{{expressItem.status | expressStatusPipe}}</text>
            </view>
            <view class="goods-item flex justify-start" v-if="type=='distribute'">
                <text class="goods-item-tag">订单状态</text>:<text class=" goods-item-content"  style="padding:2px 3px;"
                                                               :class="{
					'bg-orange' :expressItem.status==distributeStatusColor.unDeal,
					'bg-green' :expressItem.status==distributeStatusColor.finish,
				}">{{expressItem.status | distributeStatusPipe}}</text>
            </view>
            <view class="goods-item flex justify-start" v-if="expressItem.summary">
                <text class="goods-item-tag">订单备注</text>:<text  class="goods-item-content">{{expressItem.summary || ''}}</text>
            </view>

        </view>
        <view class="btn-area" v-if="type=='distribute'">
            <text class="cu-tag line-blue" @click="transForExpress(expressItem.id)">转为速递订单</text>
            <text class="cu-tag line-blue" @click="transForLogistic(expressItem.id)">转为物流订单</text>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                expressItem:'',
                expressStatusColor:this.$store.state.expressStatusZn,
                distributeStatusColor:this.$store.state.distributeStatusZn,
                type:''
            }
        },
        methods: {
            transForLogistic(id){
                //转为物流订单
                uni.navigateTo({
                    url:'../create-express/create-express?type=2&&expressID='+id
                })
            },
            transForExpress(id){
                //转为速递订单
                uni.navigateTo({
                    url:'../create-express/create-express?type=1&&expressID='+id
                })
            },
            getExpressItemInfo(id,type){
                if(type=='express'){
                    this.$ajax('Express',{id:id,way:1},res=>{
                        this.expressItem=res;
                        console.log(this.expressItem)
                    })
                }else{
                    this.$ajax('Express',{id:id},res=>{
                        this.expressItem=res;
                        console.log(this.expressItem)
                    })
                }

            }
        },
        onLoad(options){
            console.log(options)
            //express(快递记录)，distribute(调拨记录),replace(代发记录)
            if(options.id){
                this.type=options.type
                this.getExpressItemInfo(options.id,options.type)
            }
        }
    }
</script>

<style lang="less" >
    page{
        background:rgba(247,247,247,1);
    }
    .sender-info,.goods-info{
        margin:10px;
        padding:10px;
        border:1px solid #EEEEED;
        border-radius: 10px;

        .sender-tag{
            width:20px;
            height:20px;
            line-height:20px;
            text-align: center;
            color:#ffff;
            border-radius: 50%;
            margin-right:10px;
            margin-top:10px;
        }
    }
    .goods-info{
        .goods-name{
            font-size:14px;
            font-weight:600;
            border-bottom:1px solid #EEEEED;
            padding:5px 0;
        }
        .goods-item{
            padding:8px 0;
            .goods-item-tag{
                font-size:13px;
                margin-right:5px;
                color:gray;
            }
            .goods-item-content{
                font-size:14px;
                margin-left:5px;
            }
        }
    }
    .btn-area{
        width:100%;
        text-align: right;
        padding:10px;
    }
</style>
