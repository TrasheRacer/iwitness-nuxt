<template>
  <b-container id="container" fluid>
    <b-row id="header" class="align-bottom">
      <b-col class="text-center">
        <NuxtLink to="/">HOME_PAGE</NuxtLink>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <Logo />
        <h1 id="title">IWITNESS_SERVER</h1>
        <h2>CREATE_ACCOUNT</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form v-if="show" @submit="onSubmit" @reset="onReset">
          <b-form-group
            label="EMAIL_ADDRESS"
            label-for="input-email"
            description="PRIVATE_(SECRET)"
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              placeholder="ENTER_VALID_EMAIL_ADDRESS"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="PHONE_NUMBER_(OPTIONAL)"
            label-for="input-phone"
            description="PRIVATE_(SECRET)"
          >
            <b-form-input
              id="input-phone"
              v-model="form.phone"
              type="tel"
              placeholder="ENTER_VALID_PHONE_NUMBER"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="USER_IDENTIFIER"
            label-for="input-id"
            description="PUBLIC_(SHARED)"
          >
            <b-form-input
              id="input-id"
              v-model="form.id"
              placeholder="ENTER_VALID_USER_ID"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-checkbox
            v-model="form.agreeTermsOfUse"
            name="agree-terms-of-use"
            required
          >
            AGREE_TERMS_OF_USE
          </b-form-checkbox>

          <b-form-checkbox
            v-model="form.agreeNewsletter"
            name="agree-email-newsletter"
          >
            AGREE_EMAIL_NEWSLETTER_(NO_MORE_FREQUENT_THAN_ONCE_PER_WEEK)
          </b-form-checkbox>

          <br />
          <b-button type="submit" variant="primary">FORM_SUBMIT</b-button>
          <b-button type="reset" variant="danger">FORM_RESET</b-button>
        </b-form>
      </b-col>
      <b-col>
        <b-card class="mt-3" header="FORM_DATA">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <br />
    </b-row>
    <b-row
      ><b-col>
        <h4>TODO</h4>
        <pre>suggest random slug as user ID</pre>
        <pre>validate slug for lowercase letters and dashes only</pre>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormModel } from './FormModel'

const FORM_DEFAULTS: FormModel = {
  email: '',
  phone: '',
  id: '',
  agreeTermsOfUse: false,
  agreeNewsletter: false,
}

export default Vue.extend({
  data() {
    const defaults: FormModel = {
      email: '',
      phone: '',
      id: '',
      agreeTermsOfUse: false,
      agreeNewsletter: false,
    }
    return {
      form: defaults,
      show: true,
    }
  },
  methods: {
    onSubmit(event) {
      console.debug(`onSubmit(${event})`)
      event.preventDefault()

      const id = this.form.id
      const url = `http://192.168.178.31:3000/api/user/${id}`
      this.$http
        .$put(url, this.form)
        .then((res: any) => {
          console.debug(`$http.$put('${url}')`, res)
          const msg = `
            CREATED_USER:
            ${id}
          `
          alert(msg)
        })
        .catch((error) => {
          if (error.statusCode === 400) {
            alert('USER_ID_MUST_BE_UNIQUE')
          } else console.error(`$http.$put('${url}')`, error)
        })
    },
    onReset(event) {
      console.debug(`onReset(${event})`)
      event.preventDefault()

      // Reset our form values.
      this.form = FORM_DEFAULTS

      // Trick to reset native browser form validation state.
      this.show = false
      this.$nextTick(() => {
        this.show = true
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
