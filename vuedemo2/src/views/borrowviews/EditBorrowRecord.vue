<template>
    <div>
      <el-dialog
        title="编辑借阅记录"
        v-model="dialogFormVisible"
        :before-close="clear"
        width="30%"
      >
        <el-form v-model="form" style="text-align: left" ref="form">
          <el-form-item label="记录ID" :label-width="formLabelWidth" prop="id">
            <el-input name="id" type="text" v-model="form.id" readonly disabled></el-input>
          </el-form-item>
          <el-form-item label="书名" :label-width="formLabelWidth" prop="bookId">
            <el-select v-model="form.bookId" placeholder="请选择书本">
              <el-option
                v-for="book in books"
                :key="book.id"
                :label="book.title"
                :value="book.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="userId">
            <el-select v-model="form.userId" placeholder="请选择用户">
              <el-option
                v-for="user in users"
                :key="user.id"
                :label="user.username"
                :value="user.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借出日期" :label-width="formLabelWidth" prop="borrowDate">
            <el-date-picker v-model="form.borrowDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="归还截至日期" :label-width="formLabelWidth" prop="returnDueDate">
            <el-date-picker v-model="form.returnDueDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="是否已归还" :label-width="formLabelWidth" prop="isReturned">
            <el-checkbox v-model="form.isReturned">已归还</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditBorrowRecord',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          bookId: null,
          userId: null,
          borrowDate: '',
          returnDueDate: '',
          isReturned: false
        },
        books: [],
        users: [],
        formLabelWidth: '80px',
      }
    },
    methods: {
      clear() {
        this.form = {
          id: '',
          bookId: null,
          userId: null,
          borrowDate: '',
          returnDueDate: '',
          isReturned: false
        }
      },
      getBooks() {
        this.$api.post('book/getbooks', null).then((res) => {
          if (res.code === 200) {
            this.books = res.data;
          } else {
            this.$message({
              type: 'info',
              message: '获取书本数据失败'
            });
          }
        });
      },
      getUsers() {
        this.$api.post('user/getusers', null).then((res) => {
          if (res.code === 200) {
            this.users = res.data;
          } else {
            this.$message({
              type: 'info',
              message: '获取用户数据失败'
            });
          }
        });
      },
      onSubmit() {
        this.$api.post('borrow/update', this.form)
          .then((res) => {
            if (res.code === 200) {
              this.$emit("onReload")
              this.dialogFormVisible = false
            } else {
              this.$message({
                type: 'info',
                message: '编辑借阅记录失败'
              });
            }
          })
      }
    },
    mounted() {
      this.getBooks();
      this.getUsers();
    }
  }
  </script>
  
  <style scoped>
  /* 样式代码 */
  </style>
  