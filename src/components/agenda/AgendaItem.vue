<template>
    <article class="agenda-item__wrapper">
        <div class="agenda-item" :class="{'agenda-item--interested': event.event.details.status === 'interested'}">
            <div class="agenda-item__date">
                <p class="agenda-item__date__day">{{ concertDate(event.event.details.date).day }}</p>
                <p class="agenda-item__date__month">{{ concertDate(event.event.details.date).month }}</p>
            </div>
            <a :href="event.event.details.url" target="_blank" class="agenda-item__title" rel="noopener">
                <h1>{{ event.event.details.title }}</h1>
                <p class="agenda-item__info--location">{{ event.event.details.location }}</p>
            </a>
        </div>
        <div class="agenda-item__status">
            <i v-if="event.event.details.status === 'interested'" class="fas fa-question"></i>
            <i v-else class="fas fa-calendar-check"></i>
        </div>
        <div class="agenda-item__actions">
            <i class="fas fa-edit" v-if="isLoggedIn" @click="editConcert(event);"></i>
        </div>
    </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['event'],
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['setUpdatedConcert', 'displayModal']),
    concertDate (date) {
      const newDate = new Date(date)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return {
        day: ('0' + newDate.getDate()).slice(-2),
        month: months[newDate.getMonth()]
      }
    },
    isSoldOut (val) {
      if (val) return 'Sold out!'
    },
    editConcert (event) {
      this.setUpdatedConcert(event)
      this.displayModal()
    }
  }
}
</script>
