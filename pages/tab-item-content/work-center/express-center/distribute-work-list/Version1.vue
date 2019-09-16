<template>
    <view>
        <view v-if="distributeWorkList && assignType=='distribute-order'" class="distribute-work-container ">
            <view class="distribute-work-item" >
                <view class="flex justify-between borderBottom align-center" style="padding-bottom:6px;">
                    <view class="color-placeholder">下单人:自己名称</view>
                    <view>已签收</view>
                </view>
                <view style="padding-top:9px;" class="flex justify-between align-center">
                    <view>
                        <view class="font-size-normal color-normal font-weight-bold" style="margin-bottom:4px;">
                            A就职于门店的名称
                            <text class="cu-tag " style="background:#188FFF;color:#fff;margin-left:4px;border-radius:10px;">到店</text>
                        </view>
                        <view style="margin-top:4px;">创建时间</view>
                    </view>
                    <view class="check-tag" @click="checkDistributeItem('toShop')">查看详情</view>
                </view>
            </view>

            <view class="distribute-work-item" >
                <view class="flex justify-between borderBottom align-center" style="padding-bottom:6px;">
                    <view class="color-placeholder">下单人:自己名称</view>
                    <view>已签收</view>
                </view>
                <view style="padding-top:9px;" class="flex justify-between align-center">
                    <view>
                        <view class="font-size-normal color-normal font-weight-bold" style="margin-bottom:4px;">A就职于门店的名称</view>
                        <view style="margin-top:4px;">创建时间</view>
                    </view>
                    <view class="check-tag" @click="checkDistributeItem('replace')">查看详情</view>
                </view>
            </view>
        </view>
        <view v-if="distributeWorkList && assignType=='distribute-work'" class="distribute-work-container borderTop">
            <view class="distribute-work-item" >
                <view class="flex justify-between borderBottom align-center" style="padding-bottom:6px;">
                    <view class="color-placeholder">下单人:其他人名称</view>
                    <view>已签收</view>
                </view>
                <view style="padding-top:9px;" class="flex justify-between align-center">
                    <view>
                        <view class="font-size-normal color-normal font-weight-bold" style="margin-bottom:4px;">A就职于门店的名称</view>
                        <view style="margin-top:4px;">创建时间</view>
                    </view>
                    <view class="check-tag" @click="checkDistributeItem('toShop')">查看详情</view>
                </view>
            </view>

            <view class="distribute-work-item" >
                <view class="flex justify-between borderBottom align-center" style="padding-bottom:6px;">
                    <view class="color-placeholder">下单人:自己名称</view>
                    <view>已签收</view>
                </view>
                <view style="padding-top:9px;" class="flex justify-between align-center">
                    <view>
                        <view class="font-size-normal color-normal font-weight-bold" style="margin-bottom:4px;">A就职于门店的名称</view>
                        <view style="margin-top:4px;">创建时间</view>
                    </view>
                    <view class="check-tag" @click="checkDistributeItem('replace')">查看详情</view>
                </view>
            </view>
        </view>
        <view v-else>
            <LxEmpty></LxEmpty>
        </view>
        <image src="../../../../../static/img/add.png" v-if="assignType=='distribute-order'"
               style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createDistributeWork()"></image>
        <uni-load-more :contentText="content" :showIcon="true" :status="loading" color="rgb(39, 134, 245)"></uni-load-more>
    </view>
</template>

<script>
    import LxEmpty from '../../../../../lx_components/lx-empty.vue'
    import uniLoadMore from '../../../../../components/uni-load-more.vue'
    export default {
        data() {
            return {
                distributeWorkList:[
                    {name:'欧尼酱',shop:'解忧花语门店',time:'2019-7-1',type:'到店'},
                    {name:'欧尼酱',shop:'解忧花语门店',time:'2019-7-1',type:'代发'},
                    {name:'欧尼酱',shop:'解忧花语门店',time:'2019-7-1',type:'到店'},
                    {name:'欧尼酱',shop:'解忧花语门店',time:'2019-7-1',type:'代发'},
                    {name:'欧尼酱',shop:'解忧花语门店',time:'2019-7-1',type:'到店'},
                    {name:'欧尼酱',shop:'解忧花语门店',time:'2019-7-1',type:'代发'},


                ],
                page:1,
                content:{
                    contentdown: "",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多数据了"
                },
                loading:'more',
                assignType:'',//用于区分是调拨记录还是调拨任务
            }
        },
        methods: {
            //查看调拨单详情
            checkDistributeItem(type){

                uni.navigateTo({
                    url:'../distribute-order-item/distribute-order-item?type='+type

                })
            },
            createDistributeWork(){
                uni.navigateTo({
                    url:"../create-distribute/create-distribute"
                })
            }
        },
        onReachBottom(){
            this.page++;
            this.loading='loading';
        },
        components:{
            LxEmpty,
            uniLoadMore
        },
        onLoad(options){
            console.log(options)
            if(options){
                this.assignType=options.type;
            }
        }
    }
</script>

<style lang="less">
    page{
        background:rgba(247,247,247,1)
    }

    .distribute-work-container{
        padding-top:13px;
        padding-right:12px;
        padding-left:14px;
        .distribute-work-item{
            background:rgba(255,255,255,1);
            border-radius:6px;
            padding:9px 16px 13px 15px;
            margin-bottom:13px;
        }
        .check-tag{
            padding:3px 10px;border:1px solid rgba(177,177,177,1);border-radius:4px;color:rgba(177,177,177,1)
        }
    }
    .cu-tag{
        height:16px;
        font-size:10px;
        line-height:16px;
        border-radius: 8px;
    }
    .bg-toShop{
        background:#FFB633;
        color:#fff;

    }
    .bg-replace{
        background:#188FFF;
        color:#fff;
    }
</style>
