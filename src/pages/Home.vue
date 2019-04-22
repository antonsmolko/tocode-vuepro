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
              <div class="user__name-block">
                <span class="user__name">{{ user.name }}</span>
                <span class="user__login">{{ user.login }}</span>
              </div>
              <span class="user__repos-count">{{ user.public_repos }}</span>
            </div>
          </div>
          <!-- repos-wrapper -->
          <div class="repos__wrapper" v-if="repos.length">
            <!-- repos-header -->
            <div class="repos__header">
              <div
                class="repos__header-title"
                @click="sort('name')"
                :class="[currentSort === 'name' ? currentSortDir : '']"
              >Title</div>
              <div
                class="repos__header-stars"
                @click="sort('stargazers_count')"
                :class="[currentSort === 'stargazers_count' ? currentSortDir : '']"
              >Stars</div>
            </div>

            <!-- preloader -->
            <!-- <preloader v-if="loading" :width="90" :height="90" /> -->

            <!-- item -->
            <div class="repos-item" v-for="repo in reposSort" :key="repo.id">
              <div class="repos-info">
                <a class="link" :href="repo.html_url" target="_blank">{{ repo.name }}</a>
                <span>{{ repo.stargazers_count }} ⭐</span>
              </div>
            </div>

            <div class="repos__footer">
              <!-- button-more -->
              <button
                v-if="!maxLength"
                class="btn btnPrimary"
                @click="showMore"
              >LOAD MORE!</button>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import Search from '@/components/Search.vue'

export default {
    name: 'Home',
    components: {
      Search
    },
    data () {
      return {
        search: '',
        currentSort: 'name',
        currentSortDir: 'asc',
        loading: true
      }
    },
    computed: {
      ...mapState({
        user: state => state.repos.user,
        repos: state => state.repos.items,
        reposCount: state => state.repos.itemsCount,
        error: state => state.error,
      }),
      reposSort () {
        return this.repos.sort((a,b) => {
          let mod = 1;
          if (this.currentSortDir === 'desc') mod = -1;
          if (a[this.currentSort] < b[this.currentSort]) {
            return -1 * mod;
          } else if (a[this.currentSort] > b[this.currentSort]) {
            return 1 * mod;
          }
          return 0;
        }).slice(0, this.reposCount);
      },
      maxLength () {
        return this.$store.getters['repos/maxLength'];
      }
    },
    methods: {
      getRepos () {
        this.$store.dispatch('repos/getUser', this.search)
          .then(() => this.$store.dispatch('repos/getItems', this.search));
      },
      sort (e) {
        if (e === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        } else {
          this.currentSort = e;
        }
      },
      showMore () {
        this.$store.dispatch('repos/addItemsCount');
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
          display: block;
          color: #aaa;
          font-size: .85em;
        }
        &__login {
          font-weight: bold;
        }
        &__repos-count {
          flex: none;
          min-width: 40px;
          margin: 0 20px 0 auto;
          padding: 0 10px;
          line-height: 40px;
          border-radius: 20px;
          background-color: #ccc;
          text-align: center;
          color: #fff;
          font-size: .85em;
          font-weight: 500;
        }
      }
    }
  }
  .repos {
    &__header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 20px;
      &-title, &-stars {
        cursor: pointer;
        &.desc {
          &::after {
            content: '\2191'
          }
        }
        &.asc {
          &::after {
            content: '\2193'
          }
        }
      }
    }
    &__footer {
      display: flex;
      justify-content: center;
    }
  }
</style>