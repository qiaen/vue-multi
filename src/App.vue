<template>
	<div>
		<headers title="Home"></headers>
		<section>
			<van-button @click="toast" type="primary" size="small">主要按钮</van-button>
			<a href="/about">about</a>
		</section>
	</div>
</template>
<script>
import { Toast } from 'vant'
export default {
	name: 'App',
	methods: {
		toast() {
			Toast('提示内容')
		}
	}
}
</script>
<style>
</style>