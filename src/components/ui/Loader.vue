<template>
    <div class="lds-dual-ring" :class="'lds-dual-ring--' + mode"></div>
</template>

<script>
export default {
  props: ['mode'],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
$white-green: #def9d9;
$black: #000;

.lds-dual-ring {
    display: inline-block;
    width: 64px;
	height: 64px;
	margin-left: 50%;
	transform: translateX(-50%);
	&:after {
		content: ' ';
		display: block;
		width: 46px;
		height: 46px;
		margin: 1px;
		border-radius: 50%;
		border: 5px solid $white-green;
		border-color: $white-green transparent $white-green transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	&--dark {
		&:after {
			border: 5px solid $black;
			border-color: $black transparent $black transparent;
		}
	}
}

@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
