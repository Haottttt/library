<template>
  <el-card class="login-form-layout">
    <el-form
      autocomplete="on"
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginForm"
      label-position="left"
    >
      <h2 class="login-title color-main">用户登录</h2>
      <el-form-item prop="username">
        <el-input
          prefix-icon="UserFilled"
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="Lock"
          name="password"
          type="password"
          v-model="loginForm.password"
          autocomplete="on"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="usertype">
        <el-radio-group v-model="loginForm.usertype">
          <el-radio-button value="reader">读者</el-radio-button>
          <el-radio-button value="manager">图书管理员</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="margin-bottom: 60px">
        <el-button
          :loading="loading"
          type="primary"
          class="login-button"
          @click="handleLogin"
        >
          登录
        </el-button>
        <el-button
          :loading="loading"
          type="primary"
          class="login-button"
          @click="register"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: window.localStorage.getItem("username") || "",
        password: "",
        usertype: "reader",
      },
      loginFormRules: {
        username: [{ required: true, message: "请填写用户名", trigger: "change" }],
        password: [{ required: true, message: "请填写密码", trigger: "change" }],
      },
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      const isValid = await this.$refs.loginForm.validate();
      if (!isValid) return;
      try {
        const res = await this.$api.post("auth/login", this.loginForm);
        if (res.code === 200 && res.data) {
          sessionStorage.setItem("token", res.data);
          sessionStorage.setItem("username", this.loginForm.username);
          sessionStorage.setItem("usertype", this.loginForm.usertype);
          window.localStorage.setItem("username", this.loginForm.username);
          window.localStorage.setItem(
            this.loginForm.username,
            this.loginForm.password
          );
          this.$router.push({ path: "/" });
        } else {
          sessionStorage.removeItem("token");
          alert("登录失败，请检查用户名、密码和用户类型");
        }
      } catch (error) {
        console.error("API request error:", error);
        alert("登录失败，请稍后再试");
      }
    },
    register() {
      alert("转入注册页面");
      this.$router.push({ path: "/register" });
    },
  },
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

.login-form-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login-form-layout .el-card {
  width: 360px;
  height: 300px;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-button {
  width: 45%;
}
</style>
