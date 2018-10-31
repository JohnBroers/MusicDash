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
import {  mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'hideModal',
      'clearForm'
    ])
  }
}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .75);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 750px;
  width: 90%;
  margin: 0px auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  color: #000;
  font-weight: normal;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-close-icon {
  color: #c7c7c7;
  position: absolute;
  font-size: 30px;
  right: 0;
  top: -15px;
  &:hover {
    color: #5a6268 !important;
    cursor: pointer;
  }
}
</style>
