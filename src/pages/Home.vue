<template>
    <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <!-- errors -->
          <div class="error" v-if="error">
            <p>{{ error }}</p>
          </div>

          <!-- search -->
          <search 
            :value="search"
            placeholder="Type username..."
            @search="search = $event"
          />

          <!-- search-button -->
          <button v-if="!repos" class="btn btnPrimary" @click="getRepos">Search!</button>
          <button v-else class="btn btnPrimary" @click="getRepos">Search Again!</button>


          <!-- repos-wrapper -->
          <div class="repos__wrapper" v-if="repos">
            <!-- item -->
            <div class="repos-item" v-for="repo in repos" :key="repo.id">
              <div class="repos-info">
                <a class="link" :href="repo.html_url" target="_blank">{{ repo.name }}</a>
                <span>{{ repo.stargazers_count }} ⭐</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import axios from 'axios'
import Search from '@/components/Search.vue'

export default {
    name: 'Home',
    components: {
      Search
    },
    data () {
      return {
        search: '',
        error: null,
        repos: null
      }
    },
    methods: {
      getRepos () {
        axios
          .get(`https://api.github.com/users/${this.search}/repos`)
          .then(res => {
            this.repos = res.data
            this.error = null;
          })
          .catch(err => {
            this.repos = null;
            this.error = 'Can`t find this user!'
          });
      }
    }
}
</script>

<style lang="scss">
  .wrapper-content {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .btn {
      margin-top: 40px;
    }
    .repos__wrapper {
      width: 400px;
      margin: 30px 0;
    }
    .repos-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #dbdbdb;
    }
  }
</style>