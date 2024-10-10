<template>
    <div>
        <Alert v-if="alert" v-bind="alert" @close="closeAlert"></Alert>
        <h1>用户列表</h1>
        <!-- 搜索框 -->
        <input type="text" class="form-control" placeholder="搜索内容" v-model="searchItem" @input="changeHandle">
        <!-- 表格：显示用户信息 -->
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>联系方式</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.phone }}</td>
                    <td>
                        <router-link :to="`/detail/${item.id}`">
                            详情
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import Alert from '@/components/Alert.vue';
import { onMounted, ref, computed } from 'vue';
import { getUserListApi } from '@/api/userApi';
import { useRoute } from 'vue-router';

const userList = ref([]);
const searchItem = ref('');
const searchList = ref([]); // 搜索后的数据

const alert = ref(null)

// 当前路由对象
const route = useRoute();

onMounted(() => {
    // 获取用户的数据
    getUserListApi()
        .then((data) => {
            userList.value = data;
        })
        .catch(error => {
            console.error('用户列表获取失败:', error);
        });
    if (route.query && route.query.alert) {
        alert.value = route.query
    }
})

function changeHandle() {
    // 根据搜索内容过滤数据
    searchList.value = userList.value.filter(item => item.name.includes(searchItem.value))
}

function closeAlert() {
    alert.value = null
}

const list = computed(() => {
    return searchItem.value ? searchList.value : userList.value
})
</script>

<style scoped></style>