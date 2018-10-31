<template>
    <form action="" class="form">
        <h1 class="title">Add a concert</h1>
        <div class="form-group" :class="{ 'form-group--error' : emptyTitle }">
            <input type="text" name="event_title" id="event_title" class="form-control" v-model="event.details.title" autocomplete="off" required>
            <label for="event_title" class="form-control-placeholder">Title</label>
        </div>

        <div class="form-group">
            <input type="text" name="event_support" id="event_support" class="form-control" v-model="event.details.support" autocomplete="off" required>
            <label for="event_support" class="form-control-placeholder">Support</label>
        </div>

        <div class="form-group">
            <input type="text" name="event_location" id="event_location" class="form-control" v-model="event.details.location" autocomplete="off" required>
            <label for="event_location" class="form-control-placeholder">Location</label>
        </div>

        <div class="form-group">
            <input type="text" name="event_url" id="event_url" class="form-control" v-model="event.details.url" autocomplete="off" required>
            <label for="event_url" class="form-control-placeholder">URL</label>
        </div>

        <div class="form-group form-group--datepicker" :class="{'form-group--datepicker--filled' : isFilled}">
            <datepicker v-model="concertDate" monday-first v-on:selected="isFilled = true" v-on:opened="isFilled = true" input-class="form-control" required></datepicker>
            <label class="form-control-placeholder">Date</label>
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

        <div class="form-errors" v-if="errorMessage" >
            <div class="form-errors__icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="form-errors__message">
                <p>{{ errorMessage }}</p>
            </div>
        </div>

        <div class="form-actions" :class="{'form-actions--edit' : event.status.mode === 'update'}">
            <button v-if="event.status.mode === 'update'" type="submit" class="btn btn-success" @click.prevent="updateSubmitEvent(event)">Update concert</button>
            <button v-else type="submit" class="btn btn-success" @click.prevent="submitEvent(event)">Add concert</button>
            <button v-if="event.status.mode === 'update'" type="button" class="btn btn-danger" @click.prevent="deleteEvent(event)">Delete</button>
        </div>

    </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			isFilled: false,
			errorMessage: '',
			emptyTitle: false
		}
	},
	components: {
		Datepicker
	},
	computed: {
		...mapState(['isLoggedIn']),
		event: {
			get() {
				return this.$store.state.selectedConcert
			},
			set(val) {
				this.$store.commit('updateEvent', val)
			}
		},
		concertDate: {
			get() {
				const date = this.$store.state.selectedConcert.details.date
				if (date != '') {
					this.isFilled = true
				}
				return date
			},
			set(val) {
				const newDate = val.toDateString()
				this.$store.commit('updateDate', newDate)
			}
		}
	},
	methods: {
		...mapActions(['addEvent', 'updateEvent', 'removeConcert', 'clearForm', 'hideModal']),
		updateSubmitEvent(event) {
			if (this.validate(event)) {
				this.emptyTitle = false
				this.errorMessage = ''
				this.updateEvent(event)
				this.hideModal()
				this.clearForm()
			} else {
				this.emptyTitle = true
				this.errorMessage = 'Event can not be updated.'
			}
		},
		submitEvent(event) {
			if (this.validate(event.details.title)) {
				this.emptyTitle = false
				this.errorMessage = ''
				this.addEvent(event)
				this.hideModal()
				this.clearForm()
			} else {
				this.emptyTitle = true
				this.errorMessage = 'Fill in a title.'
			}
		},
		deleteEvent(event) {
			if (this.validate(event.status.concertKey)) {
				this.emptyTitle = false
				this.errorMessage = ''
				this.removeConcert(event.status.concertKey)
				this.hideModal()
				this.clearForm()
			} else {
				this.emptyTitle = true
				this.errorMessage = 'Event can not be deleted.'
			}
		},
		validate(value) {
			if (this.isLoggedIn && value != '') {
				return true
			} else {
				return false
			}
		}
	}
}
</script>
