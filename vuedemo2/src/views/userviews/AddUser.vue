<template>
    <div>   
    <el-dialog
        title="增加一个用户"
        v-model="dialogFormVisible"
        :before-close="clear"
        width=30%
        >  
        <el-form :model="form" :rules="rules" style="text-align:left" ref="form" >
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="username">
            <el-input type="text" name="username" v-model="form.username" autocomplete="off" placeholder="请输入登录账号" ></el-input>
        </el-form-item>
  
        <el-form-item label="登录密码 " :label-width="formLabelWidth" prop="password" >         
            <el-input name="password" type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码" ></el-input>
        </el-form-item>

        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="telephone">
            <el-input type="text" name="phone" v-model="form.phone" autocomplete="off" placeholder="请输入电话号码" ></el-input>
        </el-form-item> 
        </el-form>
        
        <div slot="footer" class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>       
          <el-button type="primary" @click="onSubmit()">确 定</el-button>
        </div>         
      </el-dialog>     
    </div>
  </template>
  <script>
  export default {
      name: 'AddUser',
      components:{},
      data () {
        return {
          dialogFormVisible: false,        
          form: {                             
             username:'',
             password:'', 
             phone:'',             
          },
          formLabelWidth: '80px',
          rules: {            
            username: [
              { required: true, message: '请输入登录账号', trigger: 'blur' },
              { min: 3, max: 16, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true,  message: '请输入登录密码', trigger: 'blur' },
              { min: 3, max: 16, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入电话号码',trigger: 'blur' },
              { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'blur' }
            ],
          }
        }
      },
      methods: {
        clear () {       
          this.form = {            
            username:'',
            password:'', 
            phone:'',                             
          }
        },      
        onSubmit () {        
            if((this.form.username.trim() !== '' 
                && this.form.username !== undefined) 
                && (this.form.password !== '' 
                && this.form.password !== undefined))
            {   
              //alert("用户账号:"+ this.form.username ) 
              this.$confirm('此操作将增加用户: '+ this.form.name +' , 是否继续?', '提示', 
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '确认增加用户!'
                    });
                    var _this = this                 
                    let data = {
                        password: this.form.password,
                        username: this.form.username,
                        phone: this.form.phone
                    }                    
                    this.$api.post('auth/add/user', data)
                        .then((res) => {                        
                            if (res.code === 200) {
                                this.$emit("onReload")
                                this.dialogFormVisible = false
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '增加用户失败'
                                });   
                            }        
                        })
                })                               
            }
        }
    },    
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