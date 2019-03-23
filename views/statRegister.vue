<template>

  <div>
    <span>
      <h1>Battle Result Registration</h1>
      <label>User ID</label><input type="text" v-model="userId" readonly>
      <label>Opponent ID</label><input type="text" v-model="opponentId" readonly>
      <textarea v-model="content"></textarea>
      <button v-on:click="sendRegisterRequest">Apply</button>
    </span>
  </div>

</template>

<script>
module.exports = {
  name: 'Sample',
  components: {},
  props: {},
  data: function () {
    return {
      userId: '',
      opponentId: '',
      content: ''
    }
  },
  methods: {
    sendRegisterRequest: function() {
      let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }

      let body = {
        userId: this.userId,
        opponentId: this.opponentId,
        content: this.content
      }
      
      console.log('Sending body params:', body)

      // fetch('/api/stat/register', {method: 'POST', headers: headers, body: JSON.stringify(body) })
      //   .then(res => res.json())
      //   .then(console.log)

      axios.post('/api/stat/register', body)
        .then(console.log)
        .catch(console.error)
    }
  }
}
</script>

<style scoped>

</style>
