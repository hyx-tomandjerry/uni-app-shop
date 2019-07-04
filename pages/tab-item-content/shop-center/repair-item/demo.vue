<template>
    <view>
        <view class="flex justify-start">
            <view style="width:30%" class="left-nav">
                <view class="tab-left-nav font-size-big color-normal"
                      v-for="(item,index) in repairTypeArray"
                      @click="leftNavSelect(item)"
                      :class="{'leftNavActive':leftNavTabCur==item.id}"
                      :key="index">{{item.name}}</view>
            </view>
            <view class="flex justify-start flex-wrap" style="flex: 1;padding-left:20px;padding-top:17px;">
                <uni-tag class="nav-right-item"
                         style="text-align:center;width:55%;line-height:17px;"
                         @click="rightNavSelect(item)"
                         :text="item.name"
                         v-for="(item,index) in rightNavList" :key="index">{{item.name}}</uni-tag>
            </view>
        </view>
    </view>
</template>
<script>
    import uniTag from '../../../../components/uni/uni-tag/uni-tag.vue'
    import {mapState} from 'vuex'
    export default{
        computed:mapState(['repairTypeZn','repairTypeArray','repairType']),
        data(){
            return{
                leftNavTabCur:2,
                rightNavList:[],
                leftNavItem:''
            }
        },
        components:{
            uniTag
        },
        methods:{
            rightNavSelect(item){
                uni.navigateBack({
                    delta:1,
                    success:(res)=>{
                        this.$fire.fire('repair',{
                            bigID:this.leftNavItem.id?this.leftNavItem.id:this.repairTypeArray[0].id,
                            bigName:this.leftNavItem.name?this.leftNavItem.name:this.repairTypeArray[0].name,
                            subID:item.id,
                            subName:item.name
                        })
                    }
                })
            },
            leftNavSelect(item){
                this.leftNavTabCur=item.id;
                this.leftNavItem=item;
                this.getRepairList(item.id)
            },
            getRepairList(id){
                this.rightNavList=[];
                this.$ajax('ServiceCatalogs',{},res=>{
                    if(res){
                        res.forEach(item=>{
                            if(item.catalog==id){
                                this.rightNavList.push(item);
                            }
                        })

                    }
                })
            }
        },
        onLoad(){
            this.getRepairList(this.leftNavTabCur);
        },
    }
</script>
<style lang="less">
    page{
        background:#fff;
    }
    .tab-left-nav{
        padding:19px 0;background:rgba(247,247,247,1);text-align: center;
    }
    .leftNavActive{
        background:#fff;
        color:#42B0ED;
        font-weight:600;
    }
    .nav-right-item {
        width: 100%;
        float: left;
        margin: 10px;
        text-align: left;
        padding: 7px;
        font-size:13px;
        border-radius: 14px !important;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(42,42,42,1);
    }
</style>