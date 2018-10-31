<template>
    <div class="container agenda">
        <filter-bar></filter-bar>
        <transition-group tag="div" class="agenda__wrapper--animation" name="list">
            <agenda-item v-for="event in concertArchive" :event="event" :key="event.key"></agenda-item>
        </transition-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AgendaItem from './AgendaItem'
import FilterBar from './../FilterBar'

export default {
	components: {
		AgendaItem,
		FilterBar
	},
	computed: {
		...mapGetters(['concertArchive'])
	}
}
</script>

