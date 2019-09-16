<template>
    <view class="borderTop">

        <view class="info-item flex justify-between  align-center  bg-white" @click="showModal($event)" data-target="assignTypeModal">
            <view class="font-size-normal color-normal"><text class="text-red">*</text>调拨类型</view>
            <view><text class="font-size-normal color-normal">{{assign.name}}</text><text class="cuIcon-right font-size-big color-placeholder"></text></view>
        </view>
        <view class="express-container borderTop margin-bottom-normal  bg-white">
            <view class="user-info border-top">
                <view class="flex justify-start position_relative send-info borderBottom align-center" >
                    <view class="send-tag" >需</view>
                    <view class="font-size-normal font-weight-normal shopInfo" >
                        <view v-if="applierShop && assignTypeValue=='toShop'">
                            <view class="font-size-normal color-normal font-weight-bold">{{applierShop.name || ''}}</view>
                            <view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">{{userInfo.name}}</text>{{userInfo.account}}</view>
                            <view style="font-size:12px;" class="color-placeholder">
                                {{applierShop.provinceName || ''}}
                                {{applierShop.cityName || ''}}
                                {{applierShop.districtName || ''}}
                                {{applierShop.address || ''}}</view>
                        </view>
                        <view v-else-if="applierShop && assignTypeValue=='replace'">
                            <view class="font-size-normal color-normal font-weight-bold">{{applierShop.shop.name||''}}</view>
                            <view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">
                                {{applierShop.man.name || ''}}</text>{{applierShop.man.mobile || ''}}
                            </view>
                            <view style="font-size:12px;" class="color-placeholder">
                                {{applierShop.shop.provinceName || ''}}
                                {{applierShop.shop.cityName || ''}}
                                {{applierShop.shop.districtName || ''}}
                                {{applierShop.shop.address || ''}}</view>
                        </view>
                        <view v-else>请填写/添加收件人信息</view>
                    </view>
                    <!--<text class=" position_absolute " style="right:21px;top:35px;color:#42B0ED" @click="chooseShopItem('send')">选择</text>-->
                    <text class=" position_absolute " style="right:21px;top:35px;color:#42B0ED" @click="chooseApplierShop()">选择</text>
                </view>

            </view>
        </view>
        <view class="margin-bottom-normal ">
            <view class="flex justify-between bg-white info-item align-center " @click="showModal($event)" data-target="sendObjModal">
                <view>发件对象</view>
                <view>
                    <text class="font-size-normal">{{sendTarget.name}}</text>
                    <text class="cuIcon-right font-size-normal color-placeholder"></text>
                </view>
            </view>

            <view class="user-info  bg-white borderTop" >
                <view class="flex justify-start position_relative send-info  align-center" >
                    <view class="receive-tag" style="background:rgba(66,176,237,1);">发</view>
                    <view class="font-size-normal font-weight-normal shopInfo" >
                        <view v-if="supplierShop && assignTypeValue=='toShop'">
                            <view class="font-size-normal color-normal font-weight-bold">{{supplierShop.shop.name || ''}}</view>
                            <view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">
                                {{supplierShop.man.name || ''}}</text>{{supplierShop.man.mobile || ''}}</view>
                            <view style="font-size:12px;" class="color-placeholder">
                                {{supplierShop.shop.provinceName || ''}}
                                {{supplierShop.shop.cityName || ''}}
                                {{supplierShop.shop.districtName || ''}}
                                {{supplierShop.shop.address || ''}}</view>
                        </view>
                        <view v-else-if="supplierShop && assignTypeValue=='replace'">
                            <view class="font-size-normal color-normal font-weight-bold">{{supplierShop.name || ''}}</view>
                            <view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">
                                {{userInfo.name || ''}}</text>{{userInfo.mobile || ''}}</view>
                            <view style="font-size:12px;" class="color-placeholder">
                                {{supplierShop.provinceName || ''}}
                                {{supplierShop.cityName || ''}}
                                {{supplierShop.districtName || ''}}
                                {{supplierShop.address || ''}}</view>
                        </view>
                        <view v-else>请填写/添加发件人信息</view>
                    </view>
                    <!--<text class=" position_absolute  " @click="chooseShopItem('receiver')" style="right:21px;top:35px;color:#42B0ED">选择</text>-->
                    <text class=" position_absolute  " @click="chooseSupplierShop()" style="right:21px;top:35px;color:#42B0ED">选择</text>
                </view>
            </view>
            <view class="user-info  bg-white borderTop" v-if="assignTypeValue=='replace'">
                <view class="flex justify-start position_relative send-info  align-center" >
                    <view class="receive-tag" style="background:#8dc63f;">收</view>
                    <view class="font-size-normal font-weight-normal shopInfo" >
                        <view v-if="thirder.name">
                            <!--<view class="font-size-normal color-normal font-weight-bold">{{thirder.name}}</view>-->
                            <view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">{{thirder.name}}</text>{{thirder.telephone}}</view>
                            <view style="font-size:12px;" class="color-placeholder">{{thirder.address}}</view>
                        </view>
                        <view v-else>请填写/添加需求方信息</view>
                    </view>
                    <text class=" position_absolute  " @click="chooseShopItem('thirder')" style="right:21px;top:35px;color:#42B0ED">选择</text>
                </view>
            </view>
        </view>


        <view class="bg-white margin-bottom-normal">
            <view class="goods-item flex justify-between borderBottom" >
                <view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>商品名称</view>
                <input type="text" v-model="goods.name" placeholder="请输入商品名称" style="text-align: right;">
            </view>
            <view class="goods-item flex justify-between borderBottom" >
                <view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>数量</view>

                <view class="flex justify-start align-center">
                    <view class="cuIcon-move font-size-normal font-weight-bold" @click="operateGoods('minus')"></view>
                    <view class="cu-tag" style="padding:2px 20px;background:rgba(245,245,245,1);margin:0 11px;">{{goods.number}}</view>
                    <view class="cuIcon-add font-size-normal font-weight-bold" @click="operateGoods('add')"></view>
                </view>
            </view>
            <view class="goods-item flex justify-between borderBottom align-center" v-if="assignTypeValue=='replace'">
                <view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>是否到付</view>
                <view>
                    <view>
                        <image :src="ispay=='pay'?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"
                               @click="changePayment('pay')"></image>
                        <text style="margin-right:25px;">是</text>

                        <image :src="ispay=='nopay'?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"
                               @click="changePayment('nopay')"></image>
                        <text>否</text>
                    </view>

                </view>
            </view>
            <view class="goods-summary position_relative">
                <view style="margin-bottom:10px;">备注</view>
                <textarea v-model="goods.summary"
                          maxlength="100" cols="30" rows="10" placeholder="请输入"
                          class="summary-container"
                ></textarea>
                <view class="position_absolute" style="bottom:20px;right:24px;"><text class="text-blue">{{goods.summary.length}}</text>/100</view>
            </view>
        </view>

        <view class="submit-area bg-white">
            <view class="submit-btn" @click="NewRequisitionHandle">确定</view>
        </view>
        <view class="cu-modal" :class="modalName=='assignTypeModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end borderBottom">
                    <view class="content">选择调拨类型</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class=" bg-white text-left">
                    <view v-for="(item,index ) in assignTypeList" :key="index" @click="chooseItem(item,'assignType')" class="type-item flex justify-between align-center">
                        {{item.name}}
                        <image :src="assignTypeTabcur==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:20px;height:20px;"></image>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-modal" :class="modalName=='sendObjModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end borderBottom">
                    <view class="content">选择调拨类型</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class=" bg-white text-left">
                    <view v-for="(item,index ) in sendTargetList" :key="index" @click="chooseItem(item,'sendTarget')" class="type-item flex justify-between align-center">
                        {{item.name}}
                        <image :src="sendTargetTabcur==item.value?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong .png'" style="width:20px;height:20px;"></image>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-modal" :class="modalName=='emailTypeModal'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end borderBottom">
                    <view class="content">选择寄件类型</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class=" bg-white text-left">
                    <view v-for="(item,index ) in emailTypeList" :key="index" @click="chooseItem(item,'emailType')" class="type-item flex justify-between align-center">
                        {{item.name}}
                        <image :src="emailTypeTabcur==item.id?'../../../../../static/icon/icon-xuanzhong .png':'../../../../../static/icon/icon-weixuanzhong .png'" style="width:20px;height:20px;"></image>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import {mapState} from 'vuex'
    export default{
        computed:mapState(['userInfo']),
        data(){
            return{
                //调拨类型
                assign:{
                    name:'到店'
                },
                receiverShop:'',//收件
                sendShop:{
                    shop:'',
                    man:''
                },//发件
                sendTarget:{
                    name:'门店'
                },
                //寄件类型
                emailType:{
                    name:'',
                    value:''
                },
                modalName:'',
                assignTypeTabcur:1,//调拨类型
                assignTypeValue:'toShop',//调拨类型

                sendTargetTabcur:1,//调拨类型
                emailTypeTabcur:0,//寄件类型
                emailTypeValue:'',//寄件类型
                assignTypeList:[
                    {name:'到店',value:'toShop',id:1},
                    {name:'代发',value:'replace',id:2}
                ],
                sendTargetList:[
                    {name:'门店',value:1},
                    {name:'仓库',value:2}
                ],
                emailTypeList:[
                    {name:'速寄寄件',id:1,value:'speed'},
                    {name:'物流寄件',id:2,value:'logistics'},
                    {name:'同城寄件',id:3,value:'local'}
                ],
                emailTime:'',
                goods:{
                    name:'',
                    number:1,//数量
                    summary:'',//备注
                },
                thirder:{
                    name:'',
                    telephone:'',
                    address:''
                },

                //	----------------
                applierShop:'',//需求方门店信息
                supplierShop:'',//供应方门店信息
                ispay:'pay',//货到付款
            }
        },
        components:{

        },
        onLoad(){
            this.$fire.on('sendShop',result=>{
                this.receiverShop=result;
            })
            this.$fire.on('receiverShop',result=>{
                this.sendShop=result;
            })
            this.$fire.on('address',result=>{
                console.log('address',result)
                this.thirder={
                    name:result.shoper.name,
                    telephone:result.shoper.telephone,
                    address:`${result.shoper.provinceName}${result.shoper.cityName}${result.shoper.cityName}${result.shoper.address}`
                }
            })
            this.$fire.on('applierShop',result=>{
                this.applierShop=result;
                console.log('需求方',result)
            })
            this.$fire.on('supplierShop',result=>{
                this.supplierShop=result;
                console.log('收件方',result)
            })
        },
        methods:{

            /*是否到付*/
            changePayment(type){
                this.ispay=type;
                console.log(this.ispay)
            },
            /**
             新建调拨单
             */
            NewRequisitionHandle(){
                this.$ajax('NewRequisition',{
                    applyShop:this.assignTypeValue=='toShop'?this.applierShop.id:this.applierShop.shop.id,//需求方的门店id(如果是到店，则为我的门店的id,如果是代发，则为别的门店的id)
                    supplier:this.assignTypeValue=='toShop'?this.supplierShop.man.id:this.userInfo.id,//供应方(如果是到店，则为别的门店店员的ID，如果是代发，则为我的id
                    supplyShop:this.assignTypeValue=='toShop'?this.supplierShop.shop.id:this.supplierShop.id,//供应方门店的id(如果是到店，则为别的门店ID，如果是代发，则为我的门店id)
                    summary:this.goods.summary || '',//备注
                    recverName:this.thirder.name,//第三方的姓名
                    recverMobile:this.thirder.telephone,//第三方的电话
                    qty:this.goods.number,//数量
                    name:this.goods.name,//商品名称
                    address:this.thirder.address || '',
                    destpay:this.ispay=='pay'?1:0,//是否到付
                },res=>{
                    uni.showToast({
                        title:'新建调拨单成功',
                        icon:'none',
                        success:()=>{
                            setTimeout(()=>{
                                uni.navigateBack({
                                    delta:1
                                })
                            },600)
                        }
                    })

                })
            },
            /**
             选择需求方门店
             如果是到店，需求方是我所在的门店，
             如果是代发，需求方式让我代发的门店
             */
            chooseApplierShop(){
                uni.navigateTo({
                    url:'../express-shop-list/express-shop-list?type=applier&assignTypeValue='+this.assignTypeValue
                })
            },

            /**
             * 选择收件方
             * 如果是到店，收件方是让我发件的门店
             * 如果是代发，收件方式消费者
             */
            chooseSupplierShop(){
                uni.navigateTo({
                    url:'../express-shop-list/express-shop-list?type=supplier&assignTypeValue='+this.assignTypeValue
                })
            },
            operateGoods(type){
                switch(type){
                    case 'minus':
                        if(this.goods.number>1){
                            this.goods.number--;
                        }
                        break;
                    case 'add':
                        this.goods.number++;
                }
            },
            chooseEmailTime(type){
                this.emailTime=type;
            },
            showModal(event){
                this.modalName = event.currentTarget.dataset.target
            },
            chooseItem(item,type){
                switch (type) {
                    case 'assignType':
                        this.assignTypeTabcur=item.id;
                        this.assignTypeValue=item.value;
                        this.assign.name=item.name;
                        this.applierShop="";
                        this.hideModal()
                        break;
                    case 'sendTarget':
                        this.sendTargetTabcur=item.value;
                        this.sendTarget.name=item.name;
                        break;
                    case 'emailType':
                        this.emailTypeTabcur=item.id;
                        this.emailType.name=item.name;
                        this.emailType.value=item.value;
                        break;

                }
            },
            chooseShopItem(type){
                switch(type){
                    case 'thirder':
                        uni.navigateTo({
                            url:'../create-address/create-address'
                        })
                        break;
                    default:
                        uni.navigateTo({
                            url:'../express-shop-list/express-shop-list?type='+type
                        })
                        break;
                }

            },
            hideModal(){
                if(this.modalName){
                    this.modalName=null;
                }
            }
        }
    }
</script>
<style lang="less">
    page{
        background:rgba(247,247,247,1);
    }
    .info-item{
        padding:17px 12px 13px 15px;
    }
    .user-info{
        .send-info{
            padding:23px 9px 22px 18px;

        }
        /*.inputStyle{*/
        /*font-size:15px;height:45px;line-height: 45px;*/
        /*}*/
        /*.right-icon{*/
        /*font-size:20px;*/
        /*right:13px;top:30px;*/
        /*color:#898888;*/
        /*}*/
        .send-tag{
            width:13%;
            height:45px;
            border-radius: 50%;
            color:#fff;
            margin-right:14px;
            text-align:center;
            line-height:45px;
            font-size:20px;
            background:rgba(32,32,32,1);
        }
        .receive-tag{
            width:13%;
            height:45px;
            border-radius: 50%;
            color:#fff;
            text-align:center;
            line-height:45px;
            font-size:20px;
            margin-right:14px;

        }
        .shopInfo{
            width:60%;
            border-right:1px solid #EEEEED;
        }

    }
    .type-item{
        padding:15px 25px;
        font-size:15px;
        border-bottom:1px solid #EEEEED;
    }
    .goods-item{
        padding:15px 11px 13px 15px;
    }
    .goods-summary{
        padding:17px 11px 13px 14px;
        background:#fff;
        .summary-container{
            padding-top:18px;padding-left:12px;min-height:100px;background:rgba(247,247,247,1);width:100%;border-radius:8px;
        }
    }
    .submit-area{
        padding:12px 13px 11px 14px;
        text-align: center;
        color:#fff;
        font-size:17px;
        .submit-btn{
            background:rgba(66,176,237,1);
            border-radius:5px;
            padding-top:8px;
            padding-bottom:8px;
            width:100%;
        }

    }
</style>