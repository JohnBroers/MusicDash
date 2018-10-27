<template>
    <div class="row agenda__item" :class="{'agenda__item--interested': event.event.details.status === 'interested'}">
        <div class="col-2 agenda__item__date">
            <p>{{ concertDate(event.event.details.date) }}</p>
        </div>
        <a :href="event.event.details.url" target="_blank" class="col-6 agenda__item__title">
            <h1>{{ event.event.details.title }}</h1>
            <p v-if="event.event.details.support">+ {{event.event.details.support}}</p>
        </a>
        <div class="col-3 agenda__item__info">
            <div>
                <p class="agenda__item__label agenda__item__label--location"><i class="fas fa-map-marker-alt"></i> {{ event.event.details.location }}</p>
            </div>
            <div>
                <p class="agenda__item__label">
                    <i v-if="event.event.details.status === 'interested'" class="fas fa-question"></i>
                    <i v-else class="fas fa-calendar-check"></i>
                        {{ event.event.details.status }}</p>
                <p v-if="event.event.details.soldout" class="agenda__item__label agenda__item__label--soldout">{{ isSoldOut(event.event.details.soldout) }}</p>
            </div>
        </div>
        <div class="col-1 text-center agenda__item__actions">
            <p v-if="isLoggedIn" @click="editConcert(event);"><i class="fas fa-edit"></i></p>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ['event'],
    computed: {
        ...mapState([
            'isLoggedIn'
        ])
    },
    methods: {
        ...mapActions([
            'setUpdatedConcert',
            'displayModal'
        ]),
        concertDate(date) {
            const newDate = new Date(date);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return newDate.getDate() + ' ' + months[newDate.getMonth()];
        },
        isSoldOut(val) {
            if(val) return 'Sold out!';
        },
        editConcert(event) {
            this.setUpdatedConcert(event);
            this.displayModal();
        }
    }
}

</script>
