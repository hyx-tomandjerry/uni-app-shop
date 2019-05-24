import store from '../store/index'
export default {
    // changeCity (state, city) {
    //     state.city = city
    //     try {
    //         localStorage.city = city
    //     } catch (e) {}
    // }
    //获取分页数据
    getOffset(i) {
        if (i) {
            return store.state.pageCount * (i - 1);
        } else {
            return 0;
        }
    }

}
