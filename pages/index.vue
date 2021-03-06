<template>
  <b-container id="container" fluid>
    <b-row id="header" class="align-bottom">
      <b-col>
        <div>
          <strong>Endpoint connection status:</strong>
          <b-button :variant="ping.class">{{ ping.response }}</b-button>
        </div>
        <div>Uses <code>GET</code> request to <code>/ping</code> endpoint</div>
      </b-col>
      <b-col></b-col>
      <b-col class="text-right">
        <div>
          <strong>Registered user count: {{ users.length }}</strong>
        </div>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <Logo />
        <h1 id="title">iWitness server</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $axios }) {
    const ping = $axios
      .$get('api/ping')
      .then((res) => {
        if (res === 'pong') return { response: 'ALIVE', class: 'success' }
        else return { response: 'UNKNOWN', class: 'warning' }
      })
      .catch(() => {
        return { response: 'ERROR', class: 'danger' }
      })
    const users = $axios.$get('api/users').then((res) => {
      return res.map((u) => u._id)
    })
    return { ping: await ping, users: await users }
  },
})
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
