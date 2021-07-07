<template>
  <div id="app">
    <!--    <NavBar></NavBar>-->
    <!--    <Header></Header>-->
    <!--    <router-view></router-view>-->
    <!--    <Footer></Footer>-->
    <!--    <Loader></Loader>-->
    <!--    <transition name="fade" mode="out-in">-->
    <!--      <router-view name="project"></router-view>-->
    <!--    </transition>-->

    <nav ref="navbar" id="navbar">
      <div class="navbar__logo">
        <h1 ref="logo" id="logo" v-on:click="onLogoClick">J.W.</h1>
      </div>
      <div class="navbar__menu">
        <span v-on:click="onMenuClick" data-link-to="about_me">About me</span>
        <span v-on:click="onMenuClick" data-link-to="experiences">Experiences</span>
        <span v-on:click="openCV" data-link-to="curriculum_vitae">Curriculum Vitae</span>
        <span v-on:click="onMenuClick" data-link-to="contact">Contact</span>
      </div>
      <div class="navbar__mobile" v-on:click="onMenuButtonClick()"><h1>☰</h1></div>
    </nav>

    <header id="cover">
      <div class="cover__title">
        <h1>Jan-Willem van Bremen</h1>
        <h2>Software developer Skateboarder Model</h2>
      </div>
      <video class="cover__video" id="vid" autoplay muted loop playsinline>
        <source src="img/VID-20210228-161035292.webm" type="video/webm">
        <source src="img/VID-20210228-161035292.mp4" type="video/mp4">
      </video>
    </header>

    <main id="content">
      <section id="about_me">
        <div class="container">
          <h1>About me!</h1>
          <div class="wrapper">
            <div class="col" data-name="portrait">
              <div class="img"></div>
              <h3>Who I am</h3>
              <p></p>
            </div>
            <div class="col" data-name="professional">
              <div class="img"></div>
              <h3>What I do professionally</h3>
              <p></p>
            </div>
            <div class="col" data-name="fun">
              <div class="img"></div>
              <h3>What I do for fun</h3>
              <p></p>
            </div>
          </div>
        </div>
      </section>

      <section id="experiences">
        <div class="container">
          <h1>Experiences</h1>
          <div class="wrapper">
            <router-link v-for="experience in this.experiences" :to="{ name: 'Project', params: { project_name: experience.name } }" class="col clickable" v-on:click="onProjectClick"
                 v-bind:key="experience.name" :data-name="experience.name" :data-team="experience.discipline">
              <img class="img" :src="require(`../src/assets/projects/${experience.name}/${experience.name}.webp`)">
              <h3>{{experience.fullName}}</h3>
            </router-link>
          </div>
        </div>
      </section>

      <section id="contact">
        <div class="container">
          <h1>Contact me!</h1>
          <div class="wrapper">
            <div class="col">
              <h3>Send me a message directly!</h3>

              <form class="contact_form" name="contact" method="POST" data-netlify="true" data-netlify-recaptcha="true">
                <div class="contact_form__left">
                  <input type="text" placeholder="Name" name="name" required/>
                  <input type="email" placeholder="E-mail" name="email" required/>
                </div>
                <div class="contact_form__right">
                  <textarea rows="5" type="text" placeholder="Message" name="message" required></textarea>
                </div>
                <div class="contact_form__bottom">
                  <button type="submit">Send</button>
                  <div data-netlify-recaptcha="true"></div>
                </div>
              </form>
            </div>
            <div class="col">
              <h3>Or, E-mail me directly! @ <a href="mailto:janwillemvanbremen@live.nl">janwillemvanbremen@live.nl</a>
              </h3>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer id="footer">
      <span class="footer__author">Jan-Willem van Bremen</span>
      <div class="footer__social-media">
        <a href="https://www.facebook.com/janwillem.van.bremen.9/">Facebook</a>
        <a href="https://www.instagram.com/jan_willem.van.bremen/">Instagram</a>
        <a href="mailto:janwillemvanbremen@live.nl">Email</a>
        <a href="tel:+31657118462">Phone</a>
      </div>
    </footer>

    <div id="loader">
      <div></div>
    </div>

    <transition name="fade" mode="out-in">
      <router-view name="project"></router-view>
    </transition>

  </div>
</template>

<script>
// import NavBar from "./components/NavBar";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Loader from "./components/Loader";

import hljs from 'highlight.js/lib/core'// require only the core library
// import marked from 'marked'
import 'highlight.js/styles/xcode.css';
// import Accordion from './js/accordion';
import experiences from './assets/experiences.json'

// Init
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript')); // separately require languages
hljs.registerLanguage('kotlin', require('highlight.js/lib/languages/kotlin')); // separately require languages

// Variables
const topOffsetBig = 80;
const topOffsetSmall = 48;
const smallWidth = 480;
const mediumWidth = 768;
const largeWidth = 900;

export default {
  name: 'App',
  components: {
    // NavBar,
    // Header,
    // Footer,
    // Loader,
  },
  data() {
    return {
      experiences: {
        ...experiences
      }
    }
  },
  mounted() {
    document.getElementById('vid').playbackRate = .5;

    // window.onscroll = function () {
    //   this.onScroll()
    // };
    // window.onresize = function () {
    //   this.onResize()
    // };

    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);

    this.onScroll();
    this.onResize();

    document.onkeydown = this.escapeKeyListener;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    document.onkeydown = null;
  },
  methods: {
    onLogoClick() {
      // window.history.pushState(null, null, window.location.origin);
      this.$router.push({name: 'Home'})
      this.$refs.navbar.classList.remove('open');
      window.scrollTo({top: 0, behavior: 'smooth'});
    },
    onMenuClick(e) {
      const targetElem = document.getElementById(e.currentTarget.dataset.linkTo);
      window.scrollTo({top: targetElem.offsetTop - topOffsetSmall, behavior: 'smooth'});

      if (this.$refs.dialog.classList.contains('active')) {
        this.$router.back();
      }
    },
    openCV() {
      if (confirm("Open English version?")) {
        window.open('/Curriculum Vitae Jan-Willem van Bremen 500779265 - English.pdf');
      } else {
        if (confirm("Open Dutch version?")) {
          window.open('/Curriculum Vitae Jan-Willem van Bremen 500779265.pdf');
        }
      }
    },
    onScroll() {
      if (window.scrollY >= topOffsetBig) {
        if (!this.$refs.navbar.classList.contains('collapsed')) {
          this.collapseNavBar()
        }
      } else {
        if (this.$refs.navbar.classList.contains('collapsed')) {
          this.expandNavbar()
        }
      }
    },
    onResize() {
      if (window.innerWidth >= largeWidth) {
        this.$refs.logo.innerText = "Jan-Willem van Bremen";
      } else if (window.innerWidth >= mediumWidth) {
        this.$refs.logo.innerText = "J.W. van Bremen";
      } else if (window.innerWidth >= smallWidth) {
        this.$refs.logo.innerText = "J.W.";
      }
    },
    escapeKeyListener(evt) {
      if (this.$router.history.current.name !== 'Home') {
      evt = evt || window.event;
      let isEscape;
      if ("key" in evt) { isEscape = (evt.key === "Escape" || evt.key === "Esc"); }
      else { isEscape = (evt.keyCode === 27); }
      if (isEscape) { this.$router.push({ name: 'Home' }) } }
    },
    expandNavbar() {
      this.$refs.navbar.classList.remove('collapsed');
    },
    collapseNavBar() {
      if (window.scrollY === 0) { // When at the top of the page scroll down first
        window.scroll({top: topOffsetBig, behavior: 'smooth'});
      }
      this.$refs.navbar.classList.add('collapsed');
    },
    onProjectClick(e) {
      console.log(e.currentTarget.dataset.name);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@import "./css/normalize.css";

@import "./css/boilerplate.scss";

/* ==========================================================================
   Begin Author's custom styles
   ========================================================================== */

@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

// Mixins
@mixin logo {
  content: "";
  background-size: cover;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  top: 1.5em;
  position: absolute;
  transition: all $transition_out ease-in-out;
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, .2));
}

body {

  &.scroll_disabled {
    overflow: hidden;
  }
}

* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

// General styles
button, .button {
  background-color: $button_color;
  border: none;
  padding: 1em;
  cursor: pointer;
  transition: transform .35s, box-shadow .35s;

  &:hover {
    transform: translateY(-6px);
    transition: transform .1s, box-shadow .1s;
    box-shadow: black 0 6px;
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: black 0 2px;
    outline: none;
  }

  a {
    text-decoration: none;
    color: currentColor;
  }
}

#loader {
  transition: visibility .5s, opacity 0.5s;
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  visibility: hidden;
  opacity: 0;
  z-index: 4;

  &.active {
    visibility: visible;
    opacity: 1;

    div {
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 140px;
      height: 140px;
      animation: spin 2s linear infinite;
      position: relative;
      top: 40%;
      margin: 0 auto;
      box-shadow: 0 0 12px 8px rgba(0, 0, 0, .2), inset 0 0 12px 8px rgba(0, 0, 0, .2);
    }
  }
}

#navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  position: fixed;
  width: 100%;
  background-color: #222;
  color: whitesmoke;
  max-height: $navbar_height;
  top: 0;
  box-shadow: black 0 0 12px;
  transition: max-height $transition_out;
  z-index: 4;

  &.collapsed {
    max-height: $navbar_collapsed_height;
  }

  &.open {
    transition: max-height $transition_out;
    max-height: 500px;

    .navbar__menu {
      transition: opacity $transition_out, transform $transition_out;
      opacity: 1;
      transform: translateX(0px);
      pointer-events: all;
    }
  }

  .navbar__logo {
    cursor: pointer;
    transition: transform $transition_out;

    &:hover {
      transform: scale(1.05);
      transition: transform $transition_in;
    }
  }

  .navbar {

    &__menu {
      display: flex;
      max-width: 480px;
      flex-basis: 100%;
      width: 100%;
      justify-content: space-around;
      transition: opacity 1s;

      span, a {
        color: whitesmoke;
        cursor: pointer;
        text-decoration: underline solid transparent;
        transition: text-decoration-color $transition_out;
        white-space: nowrap;

        &:hover {
          text-decoration-color: whitesmoke;
          transition: text-decoration-color $transition_in;
        }
      }
    }

    &__mobile {
      display: none;
      cursor: pointer;
      transition: transform $transition_out;
      margin-left: 1em;

      &:hover {
        transform: scale(1.2);
        transition: transform $transition_in;
      }
    }
  }
}

#cover {
  .cover {

    &__title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: whitesmoke;
      width: 80%;

      h1 {
        font-size: 4em;
      }
    }

    &__video {
      margin: $navbar_height auto auto;
      width: 100%;
      height: calc(100vh - #{$navbar_height});
      object-fit: cover;
      box-shadow: $main_color 0px -32px 0px 0px, rgba(0, 0, 0, .2) 0 0 6px;
      pointer-events: none;
    }
  }
}

#content {
  margin: auto;

  section {
    .container {
      padding: 1em;
      max-width: $full_page_width;
      margin: auto;

      .wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .col {
          position: relative;
          padding: 1em;
          flex-grow: 1;
          flex-basis: 250px;
          max-width: 450px;

          &.clickable {
            transition: transform $transition_in ease-in-out;

            &:hover {
              transition: transform $transition_in ease-in-out;
              transform: scale(1.05);
              cursor: pointer;

              h3 {
                transition: text-decoration-color $transition_in;
                text-decoration-color: currentColor;
              }
            }

            &:active {
              transition: transform $transition_in;
              transform: scale(.99);
            }
          }

          @import "./css/image_bindings";

          .img {
            box-shadow: rgba(0, 0, 0, .2) 0 0 12px;
            border-radius: 1em;
            width: 100%;
            aspect-ratio: 1/1;

            //&:before {
            //  display: block;
            //  content: "";
            //  width: 100%;
            //  padding-top: (1 / 1) * 100%;
            //  background-size: cover;
            //  background-repeat: no-repeat;
            //  background-position: center;
            //  box-shadow: rgba(0, 0, 0, .2) 0 0 12px;
            //  border-radius: 1em;
            //  background-image: url('assets/tile.webp');
            //}
          }

          h3 {
            text-decoration: underline solid transparent;
            transition: text-decoration-color $transition_out;
          }
        }
      }
    }
  }

  #about_me {
    .container {
      .wrapper {
        .col {
          max-width: none;
        }
      }
    }
  }

  #experiences {
    .col {
      h3 {
        text-align: center;
      }
    }

    @import './css/icon_bindings';
  }

  #contact {
    .container {
      max-width: $container_max_width;

      .wrapper {
        display: block;

        .col {
          max-width: none;
        }

        .contact_form {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin: -1em;

          &__left {
            flex-grow: 1;
            padding: 1em;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            & input {
              display: block;
              width: 100%;
              border: none;
              box-shadow: rgba(0, 0, 0, .5) 0 0 6px;
              border-radius: 2px;
              padding: .5em;

              &:first-of-type {
                margin-bottom: 1em;
              }
            }
          }

          &__right {
            flex-grow: 1;
            padding: 1em;

            & textarea {
              display: inline-block;
              width: 100%;
              height: 100%;
              border: none;
              box-shadow: rgba(0, 0, 0, .5) 0 0 6px;
              border-radius: 2px;
              padding: .5em;
            }
          }

          &__bottom {
            flex-basis: 100%;

            button {
              margin: 0 auto;
              display: block;
            }

            .g-recaptcha {
              margin-top: 1em;

              div {
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
  }
}

#footer {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background-color: $main_color;
  color: whitesmoke;
  width: 100%;

  .footer {

    &__author {
      padding: 0 .5em;
    }

    &__social-media {
      display: inline-block;

      a {
        color: whitesmoke;
        cursor: pointer;
        text-decoration: underline solid transparent;
        transition: text-decoration-color $transition_out;
        white-space: nowrap;
        padding: 0 .5em;

        &:hover {
          text-decoration-color: whitesmoke;
          transition: text-decoration-color $transition_in;
        }
      }
    }
  }
}

@media screen and (max-width: $small) { // Mobile query
  #navbar {
    .navbar {

      &__menu {
        transition: opacity $transition_in, transform $transition_in;;
        opacity: 0;
        transform: translateX(50px);
        pointer-events: none;
        width: auto;
        flex-direction: column;
        align-items: flex-end;
      }

      &__mobile {
        display: block;
      }
    }
  }

  #content {

    section {
      .container {
        padding: .2em;

        .wrapper {
          .col {
            &.clickable {
              &:hover {
                transform: scale(1.01);
              }
            }
          }
        }
      }
    }

    h1 {
      text-align: center;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* ==========================================================================
   End Author's custom styles
   ========================================================================== */

@import "./css/helpers.scss";

</style>
