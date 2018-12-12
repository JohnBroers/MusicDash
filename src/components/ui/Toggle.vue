<template>
    <label
        :for="'jb_toggleCheckbox_' + id"
        class="toggleCheckbox">
        <input
            type="checkbox"
            :name="'jb_toggleCheckbox_' + id"
            class="toggleCheckbox__input"
            :id="'jb_toggleCheckbox_' + id"
            :checked="value"
            @change="$emit('input', $event.target.checked)"
        />
        <span class="toggleCheckbox__label"></span>
        <p><slot></slot></p>
    </label>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      id: null
    }
  },
  mounted () {
    this.id = this._uid
  }
}
</script>

<style lang="scss" scoped>
$offBackgroundColor: gray;
$onBackgroundColor: #00386f;
$circleColor: #fff;

.toggleCheckbox {
	display: flex;
	align-items: center;
	font-weight: 600;
	&__label {
		display: inline-block;
		width: 4em;
		height: 2em;
		padding: 2px;
		background-color: $offBackgroundColor;
		border-radius: 2em;
		transition: all ease-in-out 0.5s;
		margin-right: 0.75em;
		&:after {
			content: '';
			position: relative;
			display: block;
			width: 50%;
			height: 100%;
			left: 0;
			background-color: $circleColor;
			border-radius: 100%;
			transition: all ease-in-out 0.5s;
		}
	}
	&__input {
		display: none;
		&:hover {
			cursor: pointer;
		}
		&:checked {
			+ .toggleCheckbox__label {
				background-color: $onBackgroundColor;
				&:after {
					left: 50%;
				}
			}
		}
	}
	&:hover {
		cursor: pointer;
	}
}
</style>
