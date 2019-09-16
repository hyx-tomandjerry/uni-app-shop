<template>
    <view style="font-size:0;">

        <view class="express-container">
            <image src="../../../../../static/img/work/express/tab/banner.png" style="width:100%;height:120px;"></image>
            <view class="express-tab">
                <view class="flex justify-between borderBottom" >
                    <view class="flex justify-start align-center" style="width:50%;border-right:1px solid #EEEEED;padding:30px;" @click="expressTabClick('speed')">
                        <image src="../../../../../static/img/work/express/tab/speed_send.png" style="margin-right:9px;width:39px;height:38px;vertical-align: middle"></image>
                        <view class="font-size-normal">速递寄件</view>
                    </view>
                    <view class="flex justify-start align-center" style="width:50%;padding-left:30px;"  @click="expressTabClick('logistics')">
                        <image src="../../../../../static/img/work/express/tab/wuliu_send.png" style="margin-right:9px;width:39px;height:38px;vertical-align: middle"></image>
                        <view class="font-size-normal">物流寄件</view>
                    </view>
                </view>
                <view class="flex justify-between borderBottom" >
                    <!-- <view class="flex justify-start align-center" style="width:50%;border-right:1px solid #EEEEED;padding:37px;" @click="expressTabClick('local')">
                        <image src="../../../../../static/img/work/express/tab/local_email.png" style="margin-right:9px;width:38px;height:40px;vertical-align: middle"></image>
                        <view class="font-size-normal">同城寄件</view>
                    </view> -->
                    <view class="flex justify-start align-center" style="width:50%;border-right:1px solid #EEEEED;padding:37px;" @click="expressTabClick('distribute')">
                        <image src="../../../../../static/img/work/express/tab/distribute_goods.png" style="margin-right:6px;width:35px;height:35px;vertical-align: middle"></image>
                        <view class="font-size-normal">调拨下单</view>
                    </view>
                    <view class="flex justify-start align-center" style="width:50%;padding-left:40px;" @click="expressTabClick('distribute_work')">
                        <image src="../../../../../static/img/work/express/tab/replace_send.png" style="margin-right:9px;width:38px;height:38px;vertical-align: middle"></image>
                        <view class="font-size-normal">待发任务</view>
                    </view>
                </view>
                <view class="flex justify-between borderBottom" >
                    <view class="flex justify-start align-center" style="width:50%;padding:38px;" @click="expressTabClick('check')">
                        <image src="../../../../../static/img/work/express/tab/order_check.png" style="margin-right:9px;width:38px;height:36px;vertical-align: middle"></image>
                        <view class="font-size-normal">查快递</view>
                    </view>
                    <!-- <view class="flex justify-start align-center" style="width:50%;padding-left:40px;"  @click="expressTabClick('check')">
                        <image src="../../../../../static/img/work/express/tab/order_check.png" style="margin-right:9px;width:38px;height:38px;vertical-align: middle"></image>
                        <view class="font-size-normal">查快递</view>
                    </view> -->
                </view>
            </view>
        </view>
        <showModel :isShow="modalName=='showModal'" @hideModel="hideModal('cancel')" @confirmDel="hideModal('agree')" v-if="modalName=='showModal'">
            <block slot="content">没有身份证号不能寄快递，请填写个人信息!</block>
        </showModel>
    </view>
</template>
<script>
    import {mapState} from 'vuex'
    import showModel from '../../../../../components/show-model.vue'
    export default{
        computed:mapState(['userInfo']),
        data(){
            return{
                modalName:''

            }
        },
        components:{
            showModel
        },
        onLoad(){

        },
        methods:{
            hideModal(type){
                switch(type){
                    case 'cancel':
                        this.modalName=null;
                        break;
                    case 'agree':
                        uni.navigateTo({
                            url:'../../../mine-center/basic-setting/basic-setting'
                        })
                        this.modalName=null;
                        break;
                }

            },
            toShowList(){
                uni.navigateTo({
                    url:'../express-list/express-list'
                })
            },
            goBack(){
                uni.navigateBack({
                    delta:1
                })
            },
            expressTabClick(type){
                if(!this.userInfo.idnum){
                    this.modalName='showModal'
                }else{

                    switch(type){
                        case 'speed':
                            //速记寄件
                            uni.navigateTo({
                                url:"../create-express/create-express?type=speed"
                            })
                            //速记
                            break;
                        case 'logistics':
                            //物流
                            uni.navigateTo({
                                url:"../create-express/create-express?type=logistics"
                            })
                            break;
                        case 'local':
                            // 同城寄件
                            uni.navigateTo({
                                url:"../create-express/create-express?type=local"
                            })
                            break;
                        case 'distribute':
                            //调拨下单
                            uni.navigateTo({
                                url:"../distribute-work-list/distribute-work-list?type=distribute-order"
                            })

                            //调拨代发
                            break;
                        case 'distribute_work':
                            //调拨任务
                            uni.navigateTo({
                                url:"../distribute-work-list/distribute-work-list?type=distribute-work"
                            })
                            break;
                        case 'check':
                            //调拨任务
                            uni.navigateTo({
                                url:"../express-list/express-list"
                            })

                            break;

                    }
                }

            }

        }
    }
</script>
<style lang="less" scoped>
    page{
        background:rgba(247,247,247,1);
    }
    .express-container{
        background:#fff;
        .express-tab{
            .express-tab-item{
                padding:26px 40px 37px 39px;
            }
        }

    }

</style>