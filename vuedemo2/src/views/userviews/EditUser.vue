<template>
  <div>
    <el-dialog
      title="用户信息编辑修改"
      v-model="dialogFormVisible"
      :before-close="clear"
      width="30%"
    >
      <el-form v-model="form" style="text-align: left" ref="form">
        <el-form-item label="ID" :label-width="formLabelWidth" prop="id">
          <el-input name="id" type="text" v-model="form.id" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="username">
          <el-input type="text" name="username" v-model="form.username" autocomplete="off" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth" prop="password">
          <el-input name="password" type="text" v-model="form.password" autocomplete="off" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone">
          <el-input type="text" name="phone" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 新增用户身份选择 -->
        <el-form-item label="用户身份" :label-width="formLabelWidth" prop="usertype">
          <el-radio-group v-model="form.usertype">
            <el-radio-button value="reader">读者</el-radio-button>
            <el-radio-button value="manager">图书管理员</el-radio-button>
          </el-radio-group>
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
  name: 'EditUser',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        username: '',
        password: '',
        phone: '',
        usertype: '' // 新增用户身份字段
      },
      formLabelWidth: '80px',
    }
  },
  methods: {
    clear() {
      this.form = {
        id: '',
        username: '',
        password: '',
        phone: '',
        usertype: '' // 新增用户身份字段
      }
    },
    onSubmit() {
      let data = {
        id: this.form.id,
        password: this.form.password,
        username: this.form.username,
        phone: this.form.phone,
        usertype: this.form.usertype // 确保提交时包含用户身份字段
      }
      this.$api.post('user/updateuser', data)
        .then((res) => {
          if (res.code === 200) {
            this.$emit("onReload")
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: 'info',
              message: '修改用户信息失败'
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
