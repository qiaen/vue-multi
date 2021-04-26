<template>
	<header class="header flex center fcfff">
		{{title}}
	</header>
</template>
<script>
export default {
	props: {
		title: {
			default: ''
		}
	},
	data() {
		return {
			// 是否展示所有的搜索项
			showall: false
		}
	}
}

</script>
<style lang="less">
@import url("../assets/css/var.less");
.header{
	background: @main;
	height: 46px;
}
</style>
