<template>
    <div>
        <a href="" @click.prevent="displayModal()">
            <i class="fas fa-plus"></i>
        </a>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions([
            'displayModal'
        ])
    }    
}
</script>
