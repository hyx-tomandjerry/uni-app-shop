<template>
    <view>
        <searchInput
                @getSearchList="getResult($event)"

                :placeholder="'请输入运单号'"
                :searchImg="'../../../../../static/icon/icon-yanshou-sousuo@2x.png'"
                :searchClose="'../../../../../static/icon/icon-yanshou-guanbi@2x.png'"
        ></searchInput>

        <!-- search end -->
        <!-- nav start -->
        <view class="flex justify-around tab-container" style="height:87px;">
            <view v-for="(item,index ) in navTabList" :key="index" @click="selectTab(item)"
                  :style="[{backgroundImage:'url(' +item.img +')'}]"
                  class="nav-tab">
                <text class="nav-title">{{item.title}}</text>
            </view>

        </view>
        <!-- nav end -->
        <view class="status-nav-container flex justify-start position_relative">
            <view class="status-nav-item color-regular" v-for="(item,index) in navList" :key="index"
                  @click="tabSelect(item)"
                  :class="{'navActive':navTabCur==item.id}">{{item.name}}</view>
            <view class="position_absolute leftNormal"
                  :class="{
				'navActive':navTabCur==expressStatusZn.unSign,
				'leftActive':navTabCur==expressStatusZn.unSign}"
                  style="top:2px;" >2</view>
        </view>




        <view class="list-container">
            <view	@click="checkItem(item)" class="list-item bg-white" v-for="(item,index) in expressList" :key="index">
                <view class="list-title flex justify-between align-center">
                    <view style="width:75%">
                        <!-- 特惠送 -->
                        <image src="../../../../../static/img/work/express/other/tag-price.png" style="vertical-align: middle;width:20px;height:20px;margin-right:5px;"
                               v-if="item.catalog==expressCatalog.express && item.type==expressType.price"
                        ></image>
                        <!-- 特快送 -->
                        <image src="../../../../../static/img/work/express/other/tag-speed.png" style="vertical-align: middle;width:20px;height:20px;margin-right:5px;"
                               v-if="(item.catalog==expressCatalog.express && item.type==expressType.speed)||(item.catalog==expressCatalog.logistics && item.type==expressType.speed)"
                        ></image>
                        <!-- 特准送 -->
                        <image src="../../../../../static/img/work/express/other/tag-intime.png" style="vertical-align: middle;width:20px;height:20px;margin-right:5px;"
                               v-if="item.catalog==expressCatalog.logistics && item.type==expressType.intime "></image>
                        <text class="color-normal" style="margin-right:4px;">订单编号 : </text>{{item.seq}}
                    </view>
                    <view
                            :class="{
							'color-red':item.status==expressStatusZn.unSign,
							'color-blue':item.status==expressStatusZn.sign,
							'color-orange':item.status==expressStatusZn.finish
						}"
                    >{{item.status | expressStatusPipe}}</view>
                </view>
                <view class="express-info">
                    <view class="color-placeholder" style="margin-bottom:5px;">下单时间：{{item.senddate | formatTime('YMDHMS')}}</view>
                    <view class="flex justify-start">
                        <view class="color-normal font-size-normal text-center" style="width:45%">
                            {{item.fromshopName}}
                            <text class="color-placeholder font-size-mini" style="display: inline-block;padding-top:4px;padding-bottom:10px;">({{item.faddr || ''}})</text>
                        </view>
                        <view><image src="../../../../../static/img/work/express/other/arrow.png" style="height:16px;width:46px;"></image></view>
                        <view class="color-normal font-size-normal text-center" style="width:45%;margin-left:20px;">
                            {{item.toshopName || item.contactor}}
                            <text class="color-placeholder font-size-mini" style="display: inline-block;padding-top:4px;padding-bottom:10px;">({{item.taddr || ''}})</text>
                        </view>
                    </view>
                </view>
                <view class="flex justify-end borderTop" style="padding-top:10px;">
                    <view style="height:23px;
border-radius:12px;
border:1px solid rgba(66,176,237,1);padding:0 4px;" class="color-blue"
                          @click.stop="packageTracking()">运单条码</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import {mapState} from 'vuex';
    import searchInput from '../../../../../components/search-input.vue'
    export default{
        computed:mapState(['expressStatusZn','userInfo','expressCatalog','expressType']),
        data(){
            return{
                navTabCur:this.$store.state.expressStatusZn.unSign,
                navList:[
                    {name:'待取件',id:this.$store.state.expressStatusZn.unSign},
                    {name:'已签收',id:this.$store.state.expressStatusZn.finish},
                    {name:'已取件',id:this.$store.state.expressStatusZn.sign},
                    // {name:'已取消',id:4}
                ],
                navTabList:[
                    {id:1,img:'../../../../../static/img/work/express/other/scan.png',title:'扫一扫',value:'scan'},
                    {id:2,img:'../../../../../static/img/work/express/other/mySend.png',title:'我的寄件',value:'send'},
                    {id:3,img:'../../../../../static/img/work/express/other/myReceive.png',title:'我的收件',value:'receive'}
                ],
                page:1,
                expressList:[],
                inputKey:''
            }
        },
        components: {
            searchInput
        },
        onPullDownRefresh(){
            this.page=1;
            this.getExpressList();
        },
        onLoad(){
            this.getExpressList()
        },
        onShow(){
            this.getExpressList()
        },
        methods:{

            /*
                选择tab

            */
            selectTab(item){
                console.log(item)
                switch(item.value){
                    case 'scan':
                        // 允许从相机和相册扫码
                        uni.scanCode({
                            success: function (res) {
                                console.log('条码类型：' + res.scanType);
                                console.log('条码内容：' + res.result);
                            }
                        });
                        break;
                    case 'send':
                        uni.navigateTo({
                            url:"../my-express-list/my-express-list?type=send"
                        })
                        break;
                    case 'receive':
                        uni.navigateTo({
                            url:"../my-express-list/my-express-list?type=receive"
                        })
                        break;
                }
            },
            /*
                获得关键字
            */
            getResult(event){
                console.log(event)
                this.inputKey=event;
                this.getExpressList()
            },
            goBack(){
                uni.navigateBack({
                    delta:1
                })
            },
            checkItem(item){
                uni.navigateTo({
                    url:'../express-item/express-item?id='+item.id
                })
            },
            tabSelect(item){
                this.navTabCur=item.id;
                this.page=1;
                this.getExpressList()
            },
            getExpressList(){
                this.$ajax('ShopExpresses',{
                    // way:1,区分快递和调拨
                    user:this.userInfo.id,//传user呢，就是按照自己的所有门店快递查的，不传呢，就是这个公司下面的所有快递
                    offset:this.$utils.getOffset(this.page),
                    status:this.navTabCur,
                    eseq:this.inputKey?this.inputKey:''
                },res=>{
                    this.expressList=res;
                })
            }
        }
    }
</script>
<style lang="less">
    page{
        background:#fff;
    }
    .nav-container{
        padding:14px 17px 11px 15px;
        display:flex;
        justify-content: space-around;
        .nav-item{
            padding:2px 22px;
            border:1px solid #EEEEED;
            border-radius:14px;
        }
        .navActive{
            background:rgba(66,176,237,1);
            color:white;
        }
    }
    .list-container{
        padding-top:13px;
        padding-right:12px;
        padding-left:14px;
        .list-item{
            padding:13px 15px 13px 16px;
            box-shadow:0px 1px 5px 1px rgba(231,231,231,0.5);
            margin-bottom:13px;
            .list-title{
                padding-bottom:11px;
                border-bottom:1px solid #EEEEED;
            }
            .express-info{
                padding-top:8px;
            }
        }
    }

    // .------------------
    .search-container{
        padding-right:12px;
        padding-left:15px;
        .search-img{
            width:17px;
            height:17px;
            position:absolute;
            left:10px;
            top:10px;
        }
        .inputStyle{
            padding-left: 40px;height:34px;line-height:34px;background:rgba(247,247,247,1);width:100%;
            border-radius:17px;
        }
    }
    .tab-container{
        background:#fff;
        padding-top:8px;
        margin-bottom:38px;
        .nav-tab{
            width:33%;
            background-size: cover;
            position:relative;
            height:87px;
        }
        .nav-title{
            position:absolute;
            bottom:10px;
            left:45px;
            color:#fff;
            font-size:15px;
        }
    }
    .navActive{
        font-size:18px;
        font-weight: 600;
        color:rgba(42,42,42,1);
    }
    .status-nav-container{
        padding-left:26px;
        margin-bottom:17px;
        .status-nav-item{
            margin-right:30px;
        }
    }
    .leftActive{
        left:84px !important;
    }
    .leftNormal{
        left:74px;
    }
    .margin-big{
        margin-right:48px !important;
    }
</style>