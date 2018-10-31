<template>
    <div class="toolbar">
        <div class="toolbar__filters">
            <toggle v-model="filterStatus">
                Show only confirmed concerts
            </toggle>
        </div>
        <div class="toolbar__actions">
            <button v-if="isLoggedIn" type="button" class="btn btn-primary" @click.prevent="addConcert()"><i class="fas fa-plus"></i> Add concert</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Toggle from './ui/Toggle'

export default {
	components: {
		Toggle
	},
	computed: {
		...mapState(['isLoggedIn']),
		filterStatus: {
			get() {
				return this.$store.state.filterStatus
			},
			set(val) {
				this.$store.commit('changeState', {
					target: 'filterStatus',
					value: val
				})
			}
		}
	},
	methods: {
		...mapActions(['displayModal']),
		addConcert() {
			this.displayModal()
		}
	}
}
</script>
