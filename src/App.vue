<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light" >
      <div class="container-fluid" style="background-color: #00244f">
        <a class="navbar-brand" href="#"><img width="25%" src="https://uploads-ssl.webflow.com/63fe616735554518dac85bca/64949069d5c08ba3a38cb889_tcv%20blanco.png" alt=""></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" href="#">
              <router-link to="/units">Unidades</router-link>
            </a>
            <a class="nav-link" href="#">
              <router-link to="/events">Eventos</router-link>
            </a>
            <a class="nav-link" href="#">
              <router-link to="/report">Reportes</router-link>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  margin-top: -10px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
    text-decoration: none;

}

nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: none;
}
</style>

<script lang="ts">
import Vue from "vue";
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default defineComponent({
  setup() {},
});
</script>