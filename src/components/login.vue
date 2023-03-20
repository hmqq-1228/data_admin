<template>
  <div class="loginBox">
   <!-- <video id="bgvid" playsinline="" autoplay muted loop>
       <source src="https://anzhique.oss-cn-hangzhou.aliyuncs.com/static/202108061503.mp4" type="video/mp4">
    </video> -->
		<!-- <img src="https://anzhique.oss-cn-hangzhou.aliyuncs.com/static/loginBg.png" alt="" id="bgvid"> -->
    <!-- <div class="loginName">项目后台管理系统</div> -->
    <div class="login">
      <div style="margin-bottom: 50px;"><img src="https://anzhique.oss-cn-hangzhou.aliyuncs.com/static/loginTitle.png" alt="" style="width: 75%;"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="name" class="inputBox">
          <el-input v-model="ruleForm.name" prefix-icon="el-icon-user" placeholder="请输入账号" @keypress.native.enter="onEnterPress('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="inputBox" style="margin-top: 32px;">
          <el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" @keypress.native.enter="onEnterPress('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
import {userLogin,getPublic, getOssSign, getUserInfo} from '@/http/login.js';
export default {
  name: '',
 props: {
     value: String
   },
  data () {
    return {
      fileList: [],
      dataObj: {
              policy: '',
              signature: '',
              key: '',
              ossaccessKeyId: '',
              dir: '',
              host: ''
            },
      msg: '',
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入您的账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { min: 6, message: '密码至少为6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created(){

  },
  methods:{
    onEnterPress(formName){
      this.submitForm(formName);
    },
    submitForm(formName){
      var that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          getPublic().then((res)=>{
            if(res.data.code == 200){
              let pass = md5(that.ruleForm.password);
              let rsaCode = res.data.data;
              let rsaPw = that.$getRsaCode(pass, rsaCode);
              let obj = {
                account : that.ruleForm.name,
                password : rsaPw
              }
              that.loginFun(obj);
            }
          })
        } else {
          return false;
        }
      });
    },
    loginFun(obj){
      var that = this;
      userLogin(obj).then((res)=>{
        if(res.data.code == 200){
          localStorage.setItem('userToken', res.data.data);
          that.getUserInfoFun()
        }else{
          that.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    getUserInfoFun(){
      var that = this;
      getUserInfo().then((res)=>{
        if(res.data.code == 200){
          that.$router.push('/home')
          sessionStorage.setItem('projectId', res.data.data.projectId);
          sessionStorage.setItem('componyInfo', JSON.stringify(res.data.data));
        }
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginBox{
    height: 100%;
    width: 100%;
    background: url('https://anzhique.oss-cn-hangzhou.aliyuncs.com/static/loginBg.png') no-repeat center 0px;
    position: relative;
   }
  #bgvid{
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
  }
  .loginName{
     font-size: 36px;
     color: #fff;
     font-weight: bold;
     position: absolute;
     top: 10%;
     left: 0;
     right: 0;
     bottom: 0;
     margin: 0 auto;
     z-index: 88;
     text-shadow: 5px 5px 8px #000;
   }
  .login{
    width: 500px;
    height: 400px;
    box-sizing: border-box;
    position: absolute;
    top: 25%;
    right: 160px;
    margin: auto;
    border-radius: 15px;
    z-index: 99;
  }
  .login button{
    width: 100%;
    margin-top: 50px;
  }
  .login .el-button{
    padding: 20px 20px !important;
    font-size: 18px !important;
  }

  .login .el-button--primary{
    color: #fff !important;
    background: linear-gradient(180deg,#50A7F0, #3872ED) !important;
    border-radius: 42px !important;
  }
</style>
