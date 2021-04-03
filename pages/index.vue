<template>
  <b-container id="container" fluid>
    <b-row id="header" class="align-bottom">
      <b-col>
        <b-button variant="success" @click="pingServer">PING_API</b-button>
        <br />
        <br />
        <p>RESPONSE_DATA</p>
        {{ pongs }}
      </b-col>
      <b-col>
        <NuxtLink to="/user">CREATE_ACCOUNT</NuxtLink>
      </b-col>
      <b-col class="text-left">
        <strong><p>USERS_ENDPOINT</p></strong>
        <p>RESPONSE_DATA</p>
        <div>
          <pre>
            <code>
            { users:
             { count: {{ users.length }}
               users: [
                {{ users[0]._id }}: {{ users[0].email }},
                {{ users[1]._id }}: {{ users[1].email }},
                ..
                ]
             }
            }
            </code>
          </pre>
        </div>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <Logo />
        <h1 id="title">IWITNESS_SERVER</h1>
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
