<template>
    <div class="container agenda">
        <filter-bar></filter-bar>
        <agenda-item v-for="event in upcomingConcerts" :event="event" :key="event.key"></agenda-item>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import AgendaItem from './AgendaItem'
import FilterBar from './../FilterBar'

export default {
    components: {
    AgendaItem,
        FilterBar
    },
    computed: {
        ...mapGetters([
            'upcomingConcerts'
        ])
    }
}

</script>
