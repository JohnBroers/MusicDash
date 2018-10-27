<template>
    <div class="toolbar">
        <div class="toolbar__filters">
            <input type="checkbox" name="statusFilter" id="statusFilter" v-model="filterStatus">
            <label for="statusFilter">Show only confirmed concerts</label>
        </div>
        <div class="toolbar__actions">
            <button v-if="isLoggedIn" type="button" class="btn btn-primary" @click.prevent="addConcert()"><i class="fas fa-plus"></i> Add concert</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState([
            'isLoggedIn'
        ]),
        filterStatus: {
            get() {
                return this.$store.state.filterStatus;
            },
            set(val) {
                this.$store.commit('changeState', {
                    target: 'filterStatus',
                    value: val
                });
            }
        }
    },
    methods: {
        ...mapActions([
            'displayModal'
        ]),
        addConcert() {
            this.displayModal();
        }
    }
}
</script>