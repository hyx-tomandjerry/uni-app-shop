// import store from "./index";
import state from './state'
export default {
    url: state => {
		
        let define_Url;
		
        // if(state.production){
        //     define_Url = state.proUrl
        // }else{
        //     define_Url = state.devUrl
        // }
		
  //       if(state.hasLogin && state.userInfo.server){
  //           define_Url = state.userInfo.server;
  //       }else{
		// 	 define_Url = state.proUrl
		// }
		// 
		return state.proUrl;
        // return state.xiaoxiongUrl
    }
}
