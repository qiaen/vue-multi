<template>
	<section>
		<headers :title="title"></headers>
		
		<ul class="pad12">
			<img src="../../assets/logo.png" alt="" width="20">
			<li>
				<a href="/">Index</a>
			</li>
			<li>
				<a href="/search">search</a>
			</li>
			<li>
				<a href="/about">about</a>
			</li>
		</ul>
	</section>
</template>
<script>
export default {
	data() {
		return {
			title: '关于页面'
		}
	}
}
</script>
<style lang="less">
</style>