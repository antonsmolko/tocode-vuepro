<template>
    <div class="wrapper">
        <!-- header -->
        <header>
            <div class="navbar">
                <div class="container">
                    <div class="navbar-content">
                        <div class="logo">VUE-CLI</div>
                        <ul class="navbar-list">
                            <li class="navbar-item" v-for="link in links" :key="link.title">
                                <router-link class="navbar-link" :title="link.title" :to="link.url">{{ link.title }}</router-link>
                            </li>

                            <!-- home-work-2+ -->
                            <li class="navbar-item">
                                <span class="navbar-link" @click="modalAuthorisation = true">Авторизация</span>
                            </li>
                            <li class="navbar-item">
                                <span class="navbar-link" @click="modalRegistration = true">Регистрация</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <!-- end-header -->

        <router-view></router-view>

        <!-- modals -->
        <modal-authorisation
            v-show="modalAuthorisation"
            @close="modalAuthorisation = false"
            @toReg="toReg"
        />
        
        <modal-registration
            v-show="modalRegistration"
            @close="modalRegistration = false"
            @toAuth="toAuth"
        />
        <!-- end-modals -->
    </div>
</template>

<script>

import ModalAuthorisation from '@/components/ModalAuthorisation.vue'
import ModalRegistration from '@/components/ModalRegistration.vue'

export default {
    name: 'App',
    components: {
        ModalAuthorisation,
        ModalRegistration
    },
    data () {
        return {
            links: [
                { title: 'Home', url: '/' },
                { title: 'HW-2', url: '/home-work-2' },
            ],
            modalAuthorisation: false,
            modalRegistration: false,
        }
    },
    methods: {
        toAuth () {
            this.modalRegistration = false;
            this.modalAuthorisation = true;
        },
        toReg () {
            this.modalRegistration = true;
            this.modalAuthorisation = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .navbar-link {
        &.router-link-exact-active {
            color: #5247e7;
        }
    }
</style>


