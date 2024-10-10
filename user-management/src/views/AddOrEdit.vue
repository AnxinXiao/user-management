<template>
    <div class="container">
        <h1 class="page-header">{{ id ? '修改用户' : '添加用户' }}</h1>
        <form id="my-form" @submit.prevent="submitUserInfo">
            <div class="well">
                <!-- 里面就是每一项表单控件 -->
                <div class="form-group">
                    <label>用户名</label>
                    <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="user.name" />

                </div>
                <div class="form-group">
                    <label>年龄</label>
                    <input type="text" class="form-control" placeholder="请填写用户年龄" v-model.trim="user.age" />
                </div>
                <div class="form-group">
                    <label>电话</label>
                    <input type="text" class="form-control" placeholder="请填写用户电话号码" v-model.trim="user.phone" />
                </div>
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="text" class="form-control" placeholder="请填写用户邮箱地址" v-model.trim="user.email" />
                </div>
                <div class="form-group">
                    <label>学历</label>
                    <select class="form-control" v-model="user.education">
                        <option>小学</option>
                        <option>初中或职中</option>
                        <option>高中或职高</option>
                        <option>专科</option>
                        <option>本科</option>
                        <option>硕士</option>
                        <option>博士</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>毕业学校</label>
                    <input type="text" class="form-control" placeholder="请填写用户毕业院校"
                        v-model.trim="user.graduationSchool" />
                </div>
                <div class="form-group">
                    <label>职业</label>
                    <input type="text" class="form-control" placeholder="请填写用户从事的相关职业" v-model.trim="user.profession" />
                </div>
                <div class="form-group">
                    <label>个人介绍</label>
                    <textarea class="form-control" rows="10" placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..."
                        v-model.trim="user.profile" />
                </div>
                <button class="btn btn-primary">{{ id ? '确认修改' : "确认新增" }}</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { addUserApi, getUserByIdApi, editUserByIdApi } from '@/api/userApi';
import { useRouter, useRoute } from 'vue-router';
const user = reactive({
    name: '',
    age: '',
    phone: '',
    email: '',
    education: '本科',
    graduationSchool: '',
    profession: '',
    'profile': ''
});

// 得到 router 实例对象
const router = useRouter();
const route = useRoute();
const id = route.params.id;

onMounted(() => {
    // 跳转过来两种情况 编辑还是添加
    if (id) {
        // 跳转过来是编辑
        getUserByIdApi(id).then((data) => {
            Object.assign(user, data);
        })
    }
})

function submitUserInfo() {
    // 提交表单
    for (let key in user) {
        if (user[key] === '') {
            alert('请填写完整信息');
            return;
        }
    }
    if (id) {

        // 新增用户
        editUserByIdApi(id, user).then(() => {
            router.push({
                path: '/home',
                query: {
                    alert: '修改用户成功!',
                    type: 'success'
                }
            })
        })
    } else {
        // 修改用户
        addUserApi(user).then(() => {
            router.push({
                path: '/home',
                query: {
                    alert: '新增用户成功!',
                    type: 'success'
                }
            })
        });
    }


}

</script>

<style scoped></style>