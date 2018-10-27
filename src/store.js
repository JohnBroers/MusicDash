import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase'
import { eventsRef } from './firebase'

Vue.use(Vuex, firebase)

const state = {
    selectedConcert: {
        details: {
            type: 'concert',
            title: '',
            support: '',
            location: '',
            url: '',
            date: '',
            status: 'going',
            soldout: false
        },
        status: {
            mode: 'new',
            concertKey: ''
        }
    },
    concerts: [],
    showModal: false,
    filterStatus: true,
    isLoggedIn: false
}

const getters = {
    allConcerts(state) { 
        return state.concerts.sort((a, b) => new Date(a.event.details.date) - new Date(b.event.details.date))
    },
    upcomingConcerts(state) {
        let list = state.concerts.filter(concert => {
            let date = new Date()
            date.setDate(date.getDate() - 1)
            return new Date(concert.event.details.date) > date
        }).sort((a, b) => new Date(a.event.details.date) - new Date(b.event.details.date))

        if(state.filterStatus) {
            return list.filter(concert => {
                return concert.event.details.status == "going"
            })
        } else {
            return list
        }
    },
    concertArchive() {
        let list = state.concerts.filter(concert => {
            let date = new Date()
            date.setDate(date.getDate() - 1)
            return new Date(concert.event.details.date) < date
        }).reverse();

        if(state.filterStatus) {
            return list.filter(concert => {
                return concert.event.details.status == "going"
            })
        } else {
            return list
        }
    }
}

const mutations = {
    updateEventInfo(state, event) {
        state.selectedConcert.details = {...event.event.details};
        state.selectedConcert.status = {
            mode: 'update',
            concertKey: event.key
        }
    },
    updateDate(state, payload) {
        state.selectedConcert.details.date = payload;
    },
    changeState(state, {target, value}) {
        state[target] = value;
    }
}

const actions = {
    addEvent(context, event) {
        eventsRef.push({event});
    },
    fetchEvents({commit}) {
        eventsRef.on('value', snapshot => {
            const concertList = [];
            snapshot.forEach(childSnapshot => {
                const concert = childSnapshot.val();
                concert.key = childSnapshot.key;
                concertList.push(concert);
            });
            commit('changeState', {
                target: 'concerts', 
                value: concertList
            });
        });
    },
    removeConcert(context, eventKey) {
        eventsRef.child(eventKey).remove();
    },
    setUpdatedConcert({commit}, event) {
        commit('updateEventInfo', event);
    },
    updateEvent(context, event) {
        eventsRef.child(event.status.concertKey).update({event});
    },
    clearForm({commit}) {
        const emptyForm = {
            details: {
                type: 'concert',
                title: '',
                support: '',
                location: '',
                url: '',
                date: '',
                status: 'going',
                soldout: false
            },
            status: {
                mode: 'new',
                concertKey: ''
            }
        };
        commit('changeState', {
            target: 'selectedConcert', 
            value: emptyForm
        })
    },
    displayModal({commit}) {
        commit('changeState', {
            target: 'showModal', 
            value: true
        })
    },
    hideModal({commit}) {
        commit('changeState', {
            target: 'showModal',
            value: false
        })
    },
    setLoginStatus({commit}, val) {
        commit('changeState', {
            target: 'isLoggedIn',
            value: val
        })
    }
}

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})