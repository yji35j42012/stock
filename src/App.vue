<template>
    <div class="menu">
        <ul class="menu_nav">
            <li class="menu_nav_li">
                <router-link to="/">
                    <span class="material-icons">home</span>首頁</router-link
                >
            </li>
            <li class="menu_nav_li">
                <router-link to="/stock_list">
                    <span class="material-icons">description</span>列表
                </router-link>
            </li>
        </ul>
    </div>
    <div class="container">
        <router-view />
    </div>

    <div class="loading" v-if="this.$store.state.loadingShow">
        loading
    </div>
</template>

<style lang="scss" src="./assets/scss/all.scss"></style>
<script>
export default {
    mounted() {
        this.$store.state.loadingShow = false;
    },
};
</script>
