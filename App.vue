<script>

	export default {
		data(){
			return{
				
			}
		},
		onLoad(){
			
		},
		methods:{
			
		},
		filters:{
			repairStatus(value){
				return this.$store.state.repairStatusZn[value]
			},
			repairStatusColor(value){
				return this.$store.state.repairStatusColor[value]
			}
		}
	}
</script>

<style>
	@import "colorui/main.css";
    @import "colorui/icon.css";
	.img20{
		width:20px;
		height:20px;
	}
	.img18{
		width:18px;
		height:18px;
	}
	.borderBottom{
		border-bottom:1px solid rgba(238, 238, 237, 1);
	}
	.submitBtn{
		background:rgba(66,176,237,1);
		border-radius:5px;
		margin-right:12px;
		margin-left:15px;
		font-size:16px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.tabTitle{
		
	}
	
</style>
