<template>
    <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <h1 class="title">Error 404. Page not found!</h1>
          <router-link class="link" :to="{ name: 'home' }">Go to Home</router-link>
        </div>
      </section>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

