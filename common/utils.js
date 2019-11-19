// import store from '../store/index'
import config from './config.js'
export default {
    //获取分页数据
    getOffset(i) {
        if (i) {
            return config.pageCount * (i - 1);
        } else {
            return 0;
        }
    },
	onNet(){
		uni.getNetworkType({
			success: (res) => {
				if(res.networkType==='none'){
					uni.showToast({
						title:'已断开网络连接',
						icon:'none'
					})
					return;
				}
			}
		})
		uni.onNetworkStatusChange((res)=>{
			if(!res.isConnected){
				uni.showToast({
					title:'目前处于断网状态',
					icon:'none'
				})
			}
		})
	}

}
