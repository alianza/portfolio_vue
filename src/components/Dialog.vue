<template>
  <div ref="dialog" id="dialog">
    <div class="dialog__backdrop" v-on:click="closeDialog"></div>
    <div class="dialog__content-wrapper">
      <div v-on:click="closeDialog" class="dialog__close-button">✖</div>
      <div class="dialog__container">
        <div class="dialog__content" id="dialog-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  mounted() {
    console.log('faka');
  },
  methods: {
    closeDialog() {
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style lang="scss" scoped>
#dialog {
  //opacity: 0;
  transition: opacity $transition_out;
  //pointer-events: none;
  position: relative;

  &.active {
    opacity: 1;
    pointer-events: all;
  }

  .dialog {

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .65);
      z-index: 1;
      cursor: pointer;
    }

    &__close-button {
      padding: 1em;
      margin: -1em;
      cursor: pointer;
      transition: transform .1s;
      position: absolute;
      top: 1em;
      right: 1em;

      &:hover {
        transform: scale(1.2);
      }

      &:active {
        transform: scale(.98);
      }
    }

    &__content-wrapper {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #f5f5f5;
      width: 75%;
      height: auto;
      border-radius: .5em;
      box-shadow: 0 0 12px rgba(0, 0, 0, .5);
      z-index: 3;
      max-height: 85%;
      overflow: auto;
      overflow-x: hidden;
      max-width: 1200px;

      p.flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
      }

      img, video {
        box-shadow: rgba(0, 0, 0, .2) 0 0 12px;
        width: 100%;
        border-radius: 1em;

        &:not(.icon) {
          display: block;
          margin: 0 auto;
          max-width: fit-content;

          &.flex {
            min-width: 250px;
            margin: 1em;
            flex-basis: 0;
            flex-grow: 1;
            max-width: 350px;
          }
        }

        &.icon {
          width: auto;
          height: 32px;
          box-shadow: none;
          margin-left: .2em;
          border-radius: 0;
          cursor: pointer;
          transition: transform $transition_out, filter $transition_out;

          &:hover {
            transform: scale(1.1);
            filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, .2));
            transition: transform $transition_in, filter $transition_in;
          }
        }
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 0 .5em .5em 0;
      }
    }

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1em;

    }

    &__content {
      width: 100%;
    }
  }
}
</style>
