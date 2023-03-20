<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // mounted() {
  //   if (this._isMobile()) {
  //     alert("手机端");
  //   } else {
  //     alert("pc端");
  //   }
  // },
  methods:{
    _isMobile(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  }
}
</script>

<style>
#app {
  font-family: 'PingFangSC-Regular, PingFang SC';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  min-height: 100%;
  background-color: #ECF2F8;
}
*{
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
}
.el-container{
  min-height: 100%;
}
.el-header{
  padding: 0 !important;
}

.loginBox .el-input{
   font-size: 16px !important;
 }
.el-button{
  font-size: 16px !important;
}
 .login .el-input__inner{
    height: 60px !important;
    line-height: 60px !important;
    padding-left: 50px !important;
    background-color: #f8f8f8 !important;
  }
  .login .el-input__icon{
    font-size: 24px !important;
    width: 40px !important;
    line-height: 60px !important;
    color: #59B8F1 !important;
  }
  .el-input__inner{
    font-size: 22px !important;
    color: #fff !important;
    border: none !important;
    background-color: transparent !important;
  }
  .bottomCard .el-input__inner{
    font-size: 16px !important;
    color: #377DFF !important;
    border: 1px solid #aaa !important;
    width: 240px !important;
    border-radius: 20px !important;
  }
  .bottomCard .el-input__icon{
    color: #333 !important;
    font-size: 18px !important;
    font-weight: bold !important;
  }
	.title2 .el-input__inner{
	  font-size: 1.4rem !important;
    font-weight: bold !important;
	  color: #377DFF !important;
	  border: none !important;
   /* height: auto !important;
    line-height: 0 !important; */
	  background-color: transparent !important;
	}
 /* .title2 .el-input__suffix{
    top: 12px !important;
  } */
  .el-input__icon{
    color: #fff !important;
    font-size: 24px !important;
    margin-right: 8px !important;
  }
  .title2 .el-input__icon{
    color: #666 !important;
    font-size: 22px !important;
    font-weight: bold !important;
    margin-right: -6px !important;
  }
  .el-input--prefix .el-input__inner{
    padding-left: 40px !important;
    padding-right: 0 !important;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:208px !important;
  }
  .hovers{
    line-height: 18px;
    color: #2A70F1;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    font-size: 14px;
    border-bottom: 2px solid #2A70F1;
    cursor: pointer;
  }
</style>
