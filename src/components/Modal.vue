<template>
    <transition name="modal">
        <div class="modal-mask" @click.prevent="hideModal(); clearForm()">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop>
                    <div class="modal-body">
                        <i class="fas fa-times modal-close-icon" @click.prevent="hideModal(); clearForm()"></i>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	methods: {
		...mapActions(['hideModal', 'clearForm'])
	}
}
</script>