<template>
    <el-container>
      <el-header style="height:60px; border-bottom: 1px solid #eee;">
        <div style="float:left;width:240px;height:50px;font-size:36px;margin-top:5px">图书检索</div>
        <div style="float:right;width:400px;height:30px;text-align:bottom;margin-top:25px">
          <el-input
            v-model="search"
            placeholder="请输入作者名或图书类别名"
            @keyup.enter="searchBooks"
            style="width: 300px;"
          ></el-input>
          <el-button type="primary" @click="searchBooks">搜索</el-button>
        </div>
      </el-header>
  
      <el-main>
        <el-table :data="tableData" style="width: 100%" max-height="680px">
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
        </el-table>
      </el-main>
    </el-container>
  </template>
  
  <script>
  export default {
    name: 'SearchBooks',
    data() {
      return {
        search: '',
        tableData: []
      };
    },
    methods: {
      searchBooks() {
        if (!this.search.trim()) {
          this.$message({
            type: 'info',
            message: '请输入搜索关键词'
          });
          return;
        }
        this.$api.post('book/search', {
          keyword: this.search
        }).then((res) => {
          if (res.code === 200) {
            this.tableData = res.data;
          } else {
            this.$message({
              type: 'info',
              message: '搜索失败'
            });
          }
        }).catch((error) => {
          console.error('API request error:', error);
          this.$message({
            type: 'error',
            message: '搜索失败，请稍后再试'
          });
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式代码 */
  </style>
  