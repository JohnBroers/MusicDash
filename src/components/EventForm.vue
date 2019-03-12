<template>
    <form action="" class="form">
        <h1 class="title">{{ event.status.mode === 'update' ? 'Update' : 'Add' }} a concert</h1>
        <div class="form-group">
            <input type="text" v-validate="'required'" name="title" id="event_title" class="form-control" v-model="event.details.title" autocomplete="off" required>
            <label for="title" class="form-control-placeholder">Title</label>
        </div>

        <div class="form-group">
            <input type="text" name="support" id="event_support" class="form-control" v-model="event.details.support" autocomplete="off" required>
            <label for="support" class="form-control-placeholder">Support</label>
        </div>

        <div class="form-group">
            <input type="text" v-validate="'required'" name="location" id="event_location" class="form-control" v-model="event.details.location" autocomplete="off" required>
            <label for="location" class="form-control-placeholder">Location</label>
        </div>

        <div class="form-group">
            <input type="text" v-validate="{url: {require_protocol: true }}" data-vv-delay="1000" name="url" id="event_url" class="form-control" v-model="event.details.url" autocomplete="off" required>
            <label for="url" class="form-control-placeholder">URL</label>
        </div>

        <div class="form-group form-group--datepicker" :class="{'form-group--datepicker--filled' : isFilled}">
            <datepicker v-validate="'required'" v-model="concertDate" monday-first v-on:selected="isFilled = true" v-on:opened="isFilled = true" :input-class="['form-control', {'is-invalid': errors.has('date')}]" name="date" required></datepicker>
            <label class="form-control-placeholder" :class="{'is-invalid': errors.has('date')}">Date</label>
        </div>

        <div class="form-group form-group--inline">
            <div class="form-check">
                <input type="radio" name="event_status" value="going" id="going" class="form-check-input" v-model="event.details.status">
                <label for="going" class="form-check-label">Going</label>
            </div>

            <div class="form-check">
                <input type="radio" name="event_status" value="interested" id="interested" class="form-check-input" v-model="event.details.status">
                <label for="interested" class="form-check-label">Interested</label>
            </div>
        </div>

        <div class="form-group">
            <div class="form-check">
                <input type="checkbox" name="event_soldout" value="soldout" id="soldout" class="form-check-input" v-model="event.details.soldout">
                <label for="soldout" class="form-check-label">Sold out?</label>
            </div>
        </div>

        <transition name="fade">
          <div class="form-errors" v-if="errors.all().length > 0">
            <ul class="form-errors__list">
              <li v-for="error in errors.all()" :key="error.id" class="form-errors__list__item"><i class="fas fa-exclamation-triangle"></i> {{ error }}</li>
            </ul>
          </div>
        </transition>

        <div class="form-actions" :class="{'form-actions--edit' : event.status.mode === 'update'}">
            <button type="submit" class="btn btn-success" @click.prevent="submitEvent(event)">{{ event.status.mode === 'update' ? 'Update' : 'Add' }} concert</button>
            <button v-if="event.status.mode === 'update'" type="button" class="btn btn-danger" @click.prevent="deleteEvent(event)">Delete</button>
        </div>

    </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      isFilled: false
    }
  },
  components: {
    Datepicker
  },
  computed: {
    event: {
      get () {
        return this.$store.state.selectedConcert
      },
      set (val) {
        this.$store.commit('updateEvent', val)
      }
    },
    concertDate: {
      get () {
        const date = this.$store.state.selectedConcert.details.date
        if (date !== '') {
          // eslint-disable-next-line
					this.isFilled = true
        }
        return date
      },
      set (val) {
        const newDate = val.toDateString()
        this.$store.commit('updateDate', newDate)
      }
    }
  },
  methods: {
    ...mapActions([
      'addEvent',
      'updateEvent',
      'removeConcert',
      'clearForm',
      'hideModal'
    ]),
    submitEvent (event) {
      this.$validator.validate().then(valid => {
        if (valid) {
          if (event.status.mode === 'update') {
            this.updateEvent(event)
          } else {
            this.addEvent(event)
          }
          this.hideModal()
          this.clearForm()
        }
      })
    },
    deleteEvent (event) {
      this.removeConcert(event.status.concertKey)
      this.hideModal()
      this.clearForm()
    }
  }
}
</script>
