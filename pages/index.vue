<template>
  <b-container id="container" fluid>
    <b-row id="header" class="align-bottom">
      <b-col>
        <b-button variant="success" @click="pingServer">PING_API</b-button>
        <br />
        <div>
          <h5>RESPONSE_DATA</h5>
          <b-list-group>
            <b-list-group-item v-for="(pong, index) in pongs" :key="index">
              <code>{{ index }}: {{ pong }}</code>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col class="text-left">
        <h4>USERS_ENDPOINT</h4>
        <h5>RESPONSE_DATA</h5>
        <b-list-group>
          <b-list-group-item v-for="user in users" :key="user._id">
            <code>{ id: {{ user._id }}, email: {{ user.contact.email }} }</code>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <Logo />
        <h1 id="title">IWITNESS_SERVER</h1>
        <NuxtLink to="/user">CREATE_ACCOUNT</NuxtLink>
        <br />
      </b-col>
    </b-row>

    <b-row class="text-center">
      <b-col>
        <h2>TODO</h2>
        <p>* centre content should float above ping & user responses</p>
        <p>* fix styling on pages home & user by starting fresh/</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $http }) {
    const users = $http.$get('http://192.168.178.31:3000/api/users')
    return { users: await users }
  },
  data() {
    return { pongs: [] }
  },
  methods: {
    async pingServer() {
      console.debug('pingServer()')
      await this.$http
        .$get('http://192.168.178.31:3000/api/ping')
        .then((res: any) => {
          this.pongs.push(res)
        })
        .catch((err) => {
          console.error(`$get('http://192.168.178.31:3000/api/ping')`, err)
        })
    },
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
