<template>
  <el-container>
    <el-header style="height: 80px; border-bottom: 1px solid #eee; display: flex; align-items: center;">
      <div style="flex: 1;">
        <h1 style="margin: 0;">借阅管理</h1>
      </div>
      <div v-if="isManager" style="flex: 3; display: flex; align-items: center;">
        <el-input
          v-model="searchUserId"
          placeholder="输入用户ID搜索"
          @keyup.enter="searchRecordsByUser"
          style="width: 180px; margin-right: 10px;"
        ></el-input>
        <el-button type="primary" @click="searchRecordsByUser" style="margin-right: 10px;">搜索用户记录</el-button>
        <el-input
          v-model="searchBookId"
          placeholder="输入书本ID搜索"
          @keyup.enter="searchRecordsByBook"
          style="width: 180px; margin-right: 10px;"
        ></el-input>
        <el-button type="primary" @click="searchRecordsByBook" style="margin-right: 10px;">搜索书本记录</el-button>
        <el-button size="mini" type="primary" @click="addBorrowRecord">增加借阅记录</el-button>
      </div>
    </el-header>

    <el-main>
      <el-table :data="tableData" style="width: 100%" max-height="680px">
        <el-table-column prop="id" label="记录ID" min-width="12%"></el-table-column>
        <el-table-column prop="bookId" label="书本ID" min-width="12%"></el-table-column>
        <el-table-column prop="userId" label="用户ID" min-width="12%"></el-table-column>
        <el-table-column prop="borrowDate" label="借出日期" min-width="12%"></el-table-column>
        <el-table-column prop="returnDueDate" label="归还截至日期" min-width="12%"></el-table-column>
        <el-table-column prop="isReturned" label="是否已归还" min-width="12%">
          <template #default="{ row }">
            <span>{{ row.isReturned ? '已归还' : '未归还' }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="isManager" min-width="28%" align="center">
          <template #default="{ row }">            
            <el-button size="mini" type="info" @click="handleEdit(row)">查看编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
            <el-button size="mini" type="success" @click="handleReturn(row)">还书</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <AddBorrowRecord v-if="isManager" @onReload="getAllBorrowRecords" ref="addBorrowRecord"></AddBorrowRecord> 
    <EditBorrowRecord v-if="isManager" @onReload="getAllBorrowRecords" ref="editBorrowRecord"></EditBorrowRecord>
  </el-container>  
</template>

<script>
import AddBorrowRecord from './AddBorrowRecord.vue';
import EditBorrowRecord from './EditBorrowRecord.vue';

export default {
  name: 'BorrowManager',
  components: { AddBorrowRecord, EditBorrowRecord },
  data() {
    return {  
      loading: false,         
      searchUserId: '',
      searchBookId: '',
      tableData: [],
      isManager: false,
      userId: null,
      userType: null,
    };        
  },
  methods: { 
    getAllBorrowRecords() { 
      const requestData = {
        username: this.userName,
        usertype: this.userType
      };
      this.$api.post('borrow/getrecords', requestData).then((res) => {                        
        if (res.code === 200) {     
          this.tableData = res.data;
        } else {
          alert('获取借阅记录数据失败!');
        }
      });              
    },
    searchRecordsByUser() {
      if (!this.searchUserId.trim()) {
        this.$message({
          type: 'info',
          message: '请输入用户ID'
        });
        return;
      }
      this.$api.post('borrow/recordsbyuser', { userId: this.searchUserId }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data;
        } else {
          this.$message({
            type: 'info',
            message: '搜索用户记录失败'
          });
        }
      }).catch((error) => {
        console.error('API request error:', error);
        this.$message({
          type: 'error',
          message: '搜索用户记录失败，请稍后再试'
        });
      });
    },
    searchRecordsByBook() {
      if (!this.searchBookId.trim()) {
        this.$message({
          type: 'info',
          message: '请输入书本ID'
        });
        return;
      }
      this.$api.post('borrow/recordsbybook', { bookId: this.searchBookId }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data;
        } else {
          this.$message({
            type: 'info',
            message: '搜索书本记录失败'
          });
        }
      }).catch((error) => {
        console.error('API request error:', error);
        this.$message({
          type: 'error',
          message: '搜索书本记录失败，请稍后再试'
        });
      });
    },
    addBorrowRecord() {
      this.$refs.addBorrowRecord.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.$refs.editBorrowRecord.dialogFormVisible = true;
      this.$refs.editBorrowRecord.form = { ...row };
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该借阅记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '确认删除!',
        });
        this.$api.post('borrow/delete', row).then((res) => { 
          if (res.code === 200) {                           
            this.getAllBorrowRecords();                   
          }                
        });              
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });            
      }); 
    },
    handleReturn(row) {
      this.$api.post('borrow/return', { borrowRecordId: row.id }).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '还书成功!'
          });
          this.getAllBorrowRecords();
        } else {
          this.$message({
            type: 'info',
            message: '还书失败'
          });
        }
      }).catch((error) => {
        console.error('API request error:', error);
        this.$message({
          type: 'error',
          message: '还书失败，请稍后再试'
        });
      });
    }
  },
  mounted() {
    this.userName = sessionStorage.getItem("username");
    this.userType = sessionStorage.getItem("usertype");
    this.isManager = this.userType === "manager";
    this.getAllBorrowRecords();
  }
};
</script>

<style scoped>
/* 样式代码 */
</style>
