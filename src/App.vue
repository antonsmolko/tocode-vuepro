<template>
  <div>
    <!-- header -->
    <navbar :links="links" />

    <router-view></router-view>


  </div>
</template>

<script>
import { scrypt } from 'crypto';

export default {
  name: 'App',
  data () {
    return {
      links: []
    }
  },
  created () {
    this.links = [
      { title: 'Search', url: '/'},
      { title: 'Example', url: '/example'}
    ]
  }
}
</script>
