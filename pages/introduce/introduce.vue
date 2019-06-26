<template>
	<view>
		<view v-if="!hasLogin">
			<login></login>
		</view>
		<view v-else>
			<index></index>
		</view>
	</view>
</template>

<script>
	import Login from '../login-design/login/login.vue';
	import index from '../tab-item/index/index.vue'
	import {mapState,mapMutations} from 'vuex';
	export default {
		computed: mapState(['hasLogin','userInfo']),
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['logout'])
		},
		components: {
			Login,
			index
		},
	}
</script>

<style>

</style>
