<template>  
  <el-container>
    <el-header style="height:60px; border-bottom: 1px solid #eee;">  
      <div style="float:left;width:240px;height:50px;font-size:36px;margin-top:5px">用户信息管理</div>
      <div style="float:right;width:80px;height:30px;text-align:bottom;margin-top:25px">
        <el-button size="mini" type="primary" @click="addUser">增加用户</el-button>
      </div>
    </el-header>
  
    <el-main>
      <el-table
        :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        max-height="680px"> 
        <el-table-column prop="id" label="ID" min-width="12%"></el-table-column>       
        <el-table-column prop="username" label="登录账号" min-width="12%"></el-table-column>
        <el-table-column prop="password" label="登录密码" min-width="12%"></el-table-column>
        <el-table-column prop="phone" label="电话" min-width="12%"></el-table-column>  
        <!-- 添加用户身份列 -->
        <el-table-column prop="usertype" label="用户身份" min-width="12%"></el-table-column>
  
        <el-table-column min-width="28%" align="center">
          <template #default="{ row }">            
            <el-button size="mini" type="info" @click="handleEdit(row)">查看编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <AddUser @onReload="getAllUsers" ref="addUser"></AddUser> 
    <EditUser @onReload="getAllUsers" ref="editUser"></EditUser>
  </el-container>  
</template>

<script>
import AddUser from './AddUser.vue';
import EditUser from './EditUser.vue';

export default {
  name: 'UserManager',
  components: { AddUser, EditUser },
  data() {
    return {  
      loading: false,         
      search: '',  
      tableData: [],               
    };        
  },
  methods: { 
    getAllUsers() { 
      this.$api.post('user/getusers', null).then((res) => {                        
        if (res.code === 200) {     
          this.tableData = res.data;
        } else {
          alert('获取用户数据失败!');
        }
      });              
    },
    addUser() {
      this.$refs.addUser.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.$refs.editUser.dialogFormVisible = true;
      this.$refs.editUser.form = { ...row };
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '确认删除!',
        });
        this.$api.post('user/deleteuser', row).then((res) => { 
          if (res.code === 200) {                           
            this.getAllUsers();                   
          }                
        });              
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });            
      }); 
    } 
  },
  mounted() {     
    this.getAllUsers();
  }
};
</script>
