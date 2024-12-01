<template>
  <div>
    <el-dialog
      title="增加图书"
      v-model="dialogFormVisible"
      :before-close="clear"
      width="30%"
    >
      <el-form v-model="form" style="text-align: left" ref="form">
        <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
          <el-input type="text" name="title" v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input type="text" name="author" v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书ID" :label-width="formLabelWidth" prop="bookId">
          <el-input type="text" name="bookId" v-model="form.bookId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书类型" :label-width="formLabelWidth" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择图书类型">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在库情况" :label-width="formLabelWidth" prop="inStock">
          <el-checkbox v-model="form.inStock">在库</el-checkbox>
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
  name: 'AddBook',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: '',
        author: '',
        bookId: '',
        categoryId: null,
        inStock: true
      },
      categories: [], // 存储图书类型
      formLabelWidth: '80px',
    }
  },
  methods: {
    clear() {
      this.form = {
        title: '',
        author: '',
        bookId: '',
        categoryId: null,
        inStock: true
      }
    },
    getCategories() {
      this.$api.post('category/getcategories').then((res) => {
        if (res.code === 200) {
          this.categories = res.data;
        } else {
          this.$message({
            type: 'info',
            message: '获取图书类型失败'
          });
        }
      });
    },
    onSubmit() {
      this.$api.post('book/add', this.form)
        .then((res) => {
          if (res.code === 200) {
            this.$emit("onReload")
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: 'info',
              message: '增加图书失败'
            });
          }
        })
    },
    openDialog() {
      this.clear();
      this.dialogFormVisible = true;
    }
  },
  mounted() {
    this.getCategories(); // 获取图书类型
  }
}
</script>

<style scoped>
.el-icon-circle-plus-outline {
  margin: 50px 0 0 20px;
  font-size: 100px;
  float: left;
  cursor: pointer;
}
</style>
