<template>
  <b-container id="container" fluid>
    <b-row id="header" class="align-bottom">
      <b-col class="text-center">
        <NuxtLink to="/">Home page</NuxtLink>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <Logo />
        <h1 id="title">iWitness server</h1>
        <h2>Create a new user account</h2>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
#header {
  margin-top: 15px;
  margin-bottom: 15px;
}

strong {
  font-size: x-large;
}

#title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
