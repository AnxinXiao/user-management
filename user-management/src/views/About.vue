<template>
    <div class="about container">
        <h1 class="page-header">使用说明</h1>
        <p>通过此系统来熟悉 vue 以及 vue router 的使用</p>
        <p>联系方式</p>
        <!-- 这里就可以再次 router-link 以及 vue router 的使用 -->
        <router-link class="navigation" :to="'/about/email'">邮箱</router-link>
        <router-link class="navigation" :to="'/about/phone'">电话</router-link>
        <router-view />
    </div>
</template>

<script setup>

</script>

<style scoped></style>