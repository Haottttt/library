<template>
    <el-container>
      <el-header style="height:60px; border-bottom: 1px solid #eee;">  
        <div style="float:left;width:240px;height:50px;font-size:36px;margin-top:5px">图书类型管理</div>
        <div style="float:right;width:80px;height:30px;text-align:bottom;margin-top:25px">
          <el-button size="mini" type="primary" @click="addCategory">增加类型</el-button>
        </div>
      </el-header>
  
      <el-main>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          max-height="680px"> 
          <el-table-column prop="id" label="ID" min-width="12%"></el-table-column>       
          <el-table-column prop="name" label="类别名" min-width="12%"></el-table-column>
          <el-table-column min-width="28%" align="center">
            <template #default="{ row }">            
              <el-button size="mini" type="info" @click="handleEdit(row)">查看编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <AddCategory @onReload="getAllCategories" ref="addCategory"></AddCategory> 
      <EditCategory @onReload="getAllCategories" ref="editCategory"></EditCategory>
    </el-container>  
  </template>
  
  <script>
  import AddCategory from './AddCategory.vue';
  import EditCategory from './EditCategory.vue';
  
  export default {
    name: 'BookCategoryManager',
    components: { AddCategory, EditCategory },
    data() {
      return {  
        loading: false,         
        search: '',  
        tableData: [],               
      };        
    },
    methods: { 
      getAllCategories() { 
        this.$api.post('category/getcategories', null).then((res) => {                        
          if (res.code === 200) {     
            this.tableData = res.data;
          } else {
            alert('获取图书类型数据失败!');
          }
        });              
      },
      addCategory() {
        this.$refs.addCategory.dialogFormVisible = true;
      },
      handleEdit(row) {
        this.$refs.editCategory.dialogFormVisible = true;
        this.$refs.editCategory.form = { ...row };
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除该图书类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '确认删除!',
          });
          this.$api.post('category/deletecategory', row).then((res) => { 
            if (res.code === 200) {                           
              this.getAllCategories();                   
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
      this.getAllCategories();
    }
  };
  </script>
  
  <style scoped>
  /* 样式代码 */
  </style>
  