<template>
    <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <search 
            :value="search"
            placeholder="Type username"
          />
        </div>
      </section>
    </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
    name: 'SearchPage',
    components: {
      Search
    },
    data () {
      return {
        search: '',
      }
    }
}
</script>

