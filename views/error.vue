<template>
  <main role="main" class="flex-shrink-0">
    <div class="container">
      <h1 class="mt-5">Something is wrong!</h1>
      <p class="lead">Contact to an administrator, please! ヽ ( ꒪д꒪ )ﾉ</p>
      <p v-if="message">{{ message }}</p>
    </div>
  </main>
</template>

<script>
module.exports = {
  name: 'Error',
  data: function () {
    return {
      message: ''
    }
  }
}
</script>

<style scoped>

</style>
