<template>
  <el-container class="main-container">
    <el-header class="main-header">
      <div class="header-title">小型图书馆管理系统</div>     
      <span class="header-user">{{ name }}</span>
      <el-button type="primary" @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside class="main-aside">
        <SideMenu @indexSelect="listByItem" ref="sideMenu"></SideMenu>
      </el-aside>
      <el-main class="main-content">
        <MainArea class="main-area" ref="mainArea"></MainArea>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu.vue'
import MainArea from './Mainarea.vue'

export default {
  name: 'mainpage',
  components: { MainArea, SideMenu },
  data() {
    return {     
      token: window.sessionStorage.getItem('token'),
      name: window.sessionStorage.getItem('username')
    };
  },
  methods: {
    listByItem() {     
      var cid = this.$refs.sideMenu.cid  
      this.$refs.mainArea.cid = cid         
    },
    logout() {
      // 清除 sessionStorage 中的用户信息
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('username');
      window.sessionStorage.removeItem('userType');
      // 重定向到登录页面
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.main-container {
  height: 100vh;
  width: 100vw;
}

.main-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #5e9ef1;
  color: #fff;
  padding: 0 20px;
}

.header-title {
  font-size: 36px;
}

.header-user {
  font-size: 24px;
}

.main-aside {
  width: 200px;
  background-color: rgb(191, 191, 252);
}

.main-content {
  padding: 20px;
  background-color: #f9f9f9;
  flex-grow: 1;
}

.main-area {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
