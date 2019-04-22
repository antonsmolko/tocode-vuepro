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

          <!-- user-info -->
          <div class="info__wrapper" v-if="user">
            <div class="info__content">
              <div class="user__avatar">
                <img :src="user.avatar_url" :alt="user.login">
              </div>
              <span class="user__name">{{ user.login }}</span>
              <span class="user__repos-count">{{ user.public_repos }}</span>
            </div>
          </div>
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
        repos: null,
        user: null
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

        axios
        .get(`https://api.github.com/users/${this.search}`)
        .then(res => {
          this.user = res.data;
          console.log(res.data);
        })
        .catch(() => this.user = null);
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
  .info {
    &__wrapper {
      width: 400px;
      margin-top: 80px;
    }
    &__content {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 10px;
      border-radius: 50px;
      .user {
        &__avatar {
          flex: none;
          width: 80px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 3px 5px rgba(#000, .2);
          margin-right: 20px;
          img {
            display: block;
            width: 100%;
            height: auto;
          }
        }
        &__name {
          font-weight: bold;
        }
        &__repos-count {
          margin: 0 20px 0 auto;
        }
      }
    }
  }
  
</style>