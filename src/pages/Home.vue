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
            <div class="preloader__wrapper" v-if="loading">
              <preloader :width="60" :height="60" />
            </div>

            <template v-else>
              <!-- item -->
              <div class="repos-item" v-for="repo in reposSort" :key="repo.id">
                <div class="repos-info">
                  <a class="link" :href="repo.html_url" target="_blank">{{ repo.name }}</a>
                  <span>{{ repo.stargazers_count }} ⭐</span>
                </div>
              </div>

              <div class="repos__footer">
                <!-- page-counter -->
                <p class="repos__page-counter">
                  {{ page.current }} / {{ pageCount }}
                </p>
                <!-- button-paginate -->
                <div class="button-list">
                  <button
                    class="btn btnPrimary"
                    @click="prevPage"
                    :disabled="firstPage"
                    :class="{btnDisabled: firstPage}"
                  > &#8592; </button>
                  <button
                    class="btn btnPrimary"
                    @click="nextPage"
                    :disabled="lastPage"
                    :class="{btnDisabled: lastPage}"
                  > &#8594; </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import Search from '@/components/Search.vue'
// UI Components
import Preloader from '@/components/UI/Preloader.vue'

export default {
    name: 'Home',
    components: {
      Search,
      Preloader
    },
    data () {
      return {
        search: '',
        currentSort: 'name',
        currentSortDir: 'asc',
        loading: true,
        page: {
          current: 1,
          length: 3
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.repos.user,
        repos: state => state.repos.items,
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
        }).filter((row, index) => {
          let start = (this.page.current - 1) * this.page.length;
          let end = this.page.current * this.page.length;
          if (index >= start && index < end) return true;
        });
      },
      pageCount () {
        return Math.ceil(this.repos.length / this.page.length);
      },
      firstPage () {
        return this.page.current === 1;
      },
      lastPage () {
        return (this.page.current * this.page.length) >= this.repos.length;
      }
    },
    methods: {
      getRepos () {
        this.loading = true;
        this.$store.dispatch('repos/getUser', this.search)
          .then(() => this.$store.dispatch('repos/getItems', this.search))
          .then(() => {
            this.page.current = 1;
            this.loading = false
          });
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
      },
      prevPage () {
        if (this.page.current > 1) this.page.current -= 1;
      },
      nextPage () {
        if ((this.page.current * this.page.length) < this.repos.length) this.page.current += 1;
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
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
    }
  }
  .preloader__wrapper {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .button-list {
    width: 100%;
    text-align: center;
    .btn {
      margin: 0 20px;
      &.btnDisabled {
        background-color: #ccc;
        border-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
</style>