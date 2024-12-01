<template>
  <el-container>
    <el-header style="height:60px; border-bottom: 1px solid #eee;">  
      <div style="float:left;width:240px;height:50px;font-size:36px;margin-top:5px">图书信息管理</div>
      <div style="float:right;width:80px;height:30px;text-align:bottom;margin-top:25px">
        <el-button size="mini" type="primary" @click="addBook">增加图书</el-button>
      </div>
    </el-header>

    <el-main>
      <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        max-height="680px"> 
        <el-table-column prop="id" label="ID" min-width="12%"></el-table-column>       
        <el-table-column prop="title" label="书名" min-width="12%"></el-table-column>
        <el-table-column prop="author" label="作者" min-width="12%"></el-table-column>
        <el-table-column prop="bookId" label="图书ID" min-width="12%"></el-table-column>
        <el-table-column prop="categoryId" label="图书类型ID" min-width="12%"></el-table-column>
        <el-table-column prop="inStock" label="在库情况" min-width="12%">
          <template #default="{ row }">
            <span>{{ row.inStock ? '在库' : '借出' }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="28%" align="center">
          <template #default="{ row }">            
            <el-button size="mini" type="info" @click="handleEdit(row)">查看编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <AddBook @onReload="getAllBooks" ref="addBook"></AddBook> 
    <EditBook @onReload="getAllBooks" ref="editBook"></EditBook>
  </el-container>  
</template>

<script>
import AddBook from './AddBook.vue';
import EditBook from './EditBook.vue';

export default {
  name: 'BookManager',
  components: { AddBook, EditBook },
  data() {
    return {  
      loading: false,         
      search: '',  
      tableData: [],               
    };        
  },
  methods: { 
    getAllBooks() { 
      this.$api.post('book/getbooks', null).then((res) => {                        
        if (res.code === 200) {     
          this.tableData = res.data;
        } else {
          alert('获取图书数据失败!');
        }
      });              
    },
    addBook() {
      this.$refs.addBook.openDialog();
    },
    handleEdit(row) {
      this.$refs.editBook.dialogFormVisible = true;
      this.$refs.editBook.form = { ...row };
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '确认删除!',
        });
        this.$api.post('book/delete', row).then((res) => { 
          if (res.code === 200) {                           
            this.getAllBooks();                   
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
    this.getAllBooks();
  }
};
</script>

<style scoped>
/* 样式代码 */
</style>
