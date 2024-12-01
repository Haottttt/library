<template>
  <div>
    <el-dialog
      title="编辑图书类型"
      v-model="dialogFormVisible"
      :before-close="clear"
      width="30%"
    >
      <el-form v-model="form" style="text-align: left" ref="form">
        <el-form-item label="ID" :label-width="formLabelWidth" prop="id">
          <el-input name="id" type="text" v-model="form.id" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="类别名" :label-width="formLabelWidth" prop="name">
          <el-input type="text" name="name" v-model="form.name" autocomplete="off"></el-input>
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
  name: 'EditCategory',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: ''
      },
      formLabelWidth: '80px',
    }
  },
  methods: {
    clear() {
      this.form = {
        id: '',
        name: ''
      }
    },
    onSubmit() {
      this.$api.post('category/updatecategory', this.form)
        .then((res) => {
          if (res.code === 200) {
            this.$emit("onReload")
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: 'info',
              message: '编辑图书类型失败'
            });
          }
        })
    }
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
