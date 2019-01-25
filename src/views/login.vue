<template>
  <div class="login_main">
    <div class="logo_box">
      <h3>欢迎你</h3>
      <Form ref="form" :model="form" :rules="rules">
        <FormItem prop="loginName">
          <Input v-model="form.loginName" placeholder="请输入登录名">
            <Icon type="ios-contact" slot="prefix" :size="30"/>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input v-model="form.password" type="password" placeholder="请输入密码">
            <Icon type="md-lock" slot="prefix" :size="30"/>
          </Input>
        </FormItem>
        <FormItem style="margin-bottom: 8px">
          <Button type="primary" shape="circle"
                  @click="login" :loading="submitting"
                  long
                  style="font-size: 15px;">登录</Button>
        </FormItem>
        <FormItem>
          <Checkbox v-model="remember">记住密码</Checkbox>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import LoginApi from '../apis/login';
import '../css/login.css';

export default {
  name: 'login',
  data() {
    return {
      form: {
        loginName: '',
        password: '',
      },
      rules: {
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      remember: false,
      submitting: false,
    };
  },
  methods: {
    ...mapMutations([
      'setToken'
    ]),
    ...mapMutations('user', [
      'setUser'
    ]),
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitting = true;
          LoginApi.login({
            loginName: this.form.loginName,
            password: this.form.password
          }, (responseData) => {
            this.submitting = false;

            console.log(responseData);
            this.setToken(responseData.token);
            this.setUser(responseData.user);

            this.$router.replace('/index');
          }, () => {
            this.submitting = false;
          });
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
