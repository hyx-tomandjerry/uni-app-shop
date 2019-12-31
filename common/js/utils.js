import store from '../../store/index.js'
import {config} from '../config.js'
const errorMsg =require('../errorText.json') ;
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
	},
	
	getFiles(fileArray=[]){
		let arr1=[],arr2=[]
		for(let key of fileArray){
			arr1.push(key.url);
			arr2.push(key.id)
		}
		let obj={};
		obj.img=arr1;
		obj.file=arr2;
		return obj;
	},
	getErrorMsg(val){
		const errorText = errorMsg.codeMessage[val]
		if(errorText){
			uni.showToast({
				title:errorText,
				icon:'none'
			})
			return  false
		}
		return true;
	},
	showToast(msg){
		uni.showToast({
			title:msg,
			icon:'none'
		})
	},
	goBack(){
		setTimeout(()=>{
			uni.navigateBack({
				delta:1
			})
		},900)
	},
	hide(){
		setTimeout(()=>{
			uni.hideToast()
		},1000)
	}
}
