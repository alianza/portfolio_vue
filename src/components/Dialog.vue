<template>
  <div ref="dialog" id="dialog">
    <div class="dialog__backdrop" v-on:click="closeDialog"></div>
    <div class="dialog__content-wrapper">
      <div v-on:click="closeDialog" class="dialog__close-button">✖</div>
      <div class="dialog__container">
        <div class="dialog__content" ref="dialogContent" id="dialog-content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import hljs from "highlight.js/lib/core";
import Accordion from "@/js/accordion";

// Init
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript')); // separately require languages
hljs.registerLanguage('kotlin', require('highlight.js/lib/languages/kotlin')); // separately require languages

export default {
  name: "Dialog",
  data() {
    return {
      projectName: {

      },
      markdown: {

      }
    }
  },
  async mounted() {
    document.body.classList.add('scroll_disabled');
    this.projectName = this.$router.currentRoute.params.project_name;
    console.log(this.projectName);
    // console.log(require(`@/assets/markdown/${this.projectName}.md`));
    this.markdown = await import(`@/assets/markdown/${this.projectName}.md`);
    console.log(this.markdown.default);
    //
    const doc = document.createRange().createContextualFragment(this.markdown.default); // Create HTML fragment from HTML string
    doc.querySelectorAll('[alt]:not([alt=""])').forEach(e => { e.classList.add(e.getAttribute('alt').split(' ')[0]); }); // set classnames from first alt attribute value
    doc.querySelectorAll('img.flex').forEach( e => { e.parentElement.classList.add('flex'); }); // Set flex attribute for flex images parent
    doc.querySelectorAll('details').forEach((e) => { new Accordion(e); }); // Set Accordion animation for all details tags
    // this.$refs.dialogContent.innerHTML = ''; // Clear dialog
    this.$refs.dialogContent.appendChild(doc);// Fill dialog with data
    document.querySelector('.dialog__content-wrapper').scrollTop = 0; // Scroll dialog to top
    hljs.highlightAll(); // Highlight code blocks with Highlight.js
    // collapseNavBar(); // Force navBar to collapse (if at top of page scroll down first)
    // openDialog();

  },
  beforeDestroy() {
    document.body.classList.remove('scroll_disabled');
  },
  methods: {
    closeDialog() {
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style lang="css" src='highlight.js/styles/xcode.css'>

/* global styles */
</style>

<style lang="scss">
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

@media only screen and (max-width: $medium) { // Tablet query
  #dialog .dialog {
    &__content-wrapper {
      width: 90%;

      h1, h2, h3, h4, h5, h6, summary, #screens {
        text-align: center;
      }

      p a:not(:last-of-type) button {
        margin-bottom: 1em;
      }

      // Per paragraph all buttons except last get margin-bottom

      button {
        width: 100%;
      }
    }
  }
}
</style>
