export default {
   setImStore(context,imInfo){
       try {
           uni.setStorage({
               key: this.state.cache.im,
               data: imInfo,
               success: (res) => {
                   context.commit(this.$store.method.setImInfo,imInfo)
               }
           });
       } catch (e) {

       }
   }
}
