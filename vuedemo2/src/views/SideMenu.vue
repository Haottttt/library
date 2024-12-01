<template>
  <el-menu
    class="manageritems"
    default-active="0"
    @select="handleSelect"
    active-text-color="#4CAF50"
    background-color="#2c3e50"
    text-color="#fff">
    
    <el-menu-item
      v-if="isManager || isReader"
      index="0">
      <i class="fas fa-book-reader"></i>
      <span slot="title">图书借还管理</span>
    </el-menu-item>
    
    <el-menu-item
      v-if="isManager || isReader"
      index="4">
      <i class="fas fa-search"></i>
      <span slot="title">图书检索</span>
    </el-menu-item>
    
    <el-menu-item
      v-if="isManager"
      index="3">
      <i class="fas fa-user-cog"></i>
      <span slot="title">用户信息管理</span>
    </el-menu-item>
    
    <el-menu-item
      v-if="isManager"
      index="1">
      <i class="fas fa-layer-group"></i>
      <span slot="title">图书类型管理</span>
    </el-menu-item>
    
    <el-menu-item
      v-if="isManager"
      index="2">
      <i class="fas fa-book"></i>
      <span slot="title">图书信息管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      cid: '',
      userType: '',
      isManager: false,
      isReader: false
    }
  },
  methods: {
    handleSelect(key) {
      this.cid = key
      this.$emit('indexSelect', key)
    }
  },
  mounted() {
    this.userType = sessionStorage.getItem('usertype');
    this.isManager = this.userType === 'manager';
    this.isReader = this.userType === 'reader';
  }
}
</script>

<style scoped>
.manageritems {
  position: relative;
  margin-left: 0px;
  left: 0px;
  top: 0px;
  width: 99%;
  background-color: #2c3e50;
  padding: 10px;
  border-radius: 10px;
}

.el-menu-item {
  margin: 10px 0;
}

.el-menu-item i {
  margin-right: 10px;
}

.el-menu-item:hover {
  background-color: #34495e !important;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
</style>
