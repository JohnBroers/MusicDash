<template>
    <div class="container agenda">
        <filter-bar></filter-bar>
        <transition-group tag="div" class="agenda__wrapper--animation" name="list">
            <agenda-item v-for="event in upcomingConcerts" :event="event" :key="event.key"></agenda-item>
        </transition-group>
      <button type="button" class="btn btn-primary btn--copy" @click.prevent="copyToClipboard()">Get text version</button>
      <textarea type="hidden" id="formatted-agenda" v-model="formatted" />
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
    ...mapGetters(['upcomingConcerts', 'formatted'])
  },
  methods: {
    copyToClipboard () {
      let testingCodeToCopy = document.querySelector('#formatted-agenda')
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()
      document.execCommand('copy')
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn--copy {
  margin-bottom: 1em;
  float: right;
}
[type='hidden'] {
  display: none;
}
</style>
