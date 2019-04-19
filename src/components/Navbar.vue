<template>
    <header>
        <div class="navbar">
            <div class="container">
                <div class="navbar-content">
                    <div class="logo">VUE-CLI</div>
                    <ul class="navbar-list">
                        <li class="navbar-item" v-for="link in links" :key="link.title">
                            <router-link :to="link.url" class="navbar-link">{{ link.title }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        links: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss">
    .navbar-link {
        &.router-link-exact-active {
            color: #5247e7;
        }
    }
</style>


