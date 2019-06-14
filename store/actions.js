export default {
   setImStore(context,imInfo){
       uni.setStorage({
           key: context.state.cache.im,
           data: imInfo,
           success: (res) => {
               console.log(res)
               context.commit(context.state.method.setImInfo,imInfo)
           }
       });
   }
}
