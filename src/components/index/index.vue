<template>

</template>

<script>
export default {
  data() {
    return {
      isRouter: true,
    };
  },
  mounted() {
    let that = this;
    let type = that.$route.query.type;
    sessionStorage.setItem('sourseId', that.$route.query.id);
    sessionStorage.setItem('type', that.$route.query.type);
    // console.log('sssssssss', that._isMobile())
    if (that._isMobile()) {
      if(type == 1){
        if( that.$route.query.iOS==1){
          that.$router.push({
          path:'/m-home',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type,
            iOS:that.$route.query.iOS
          }
        })
        }else{
          that.$router.push({
          path:'/m-home',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type,
          }
         })
        }
      }else if(type == 2){

        if( that.$route.query.iOS==1){
          that.$router.push({
          path:'/m-command',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type,
            iOS:that.$route.query.iOS
          }
        })
        }else{
          that.$router.push({
            path:'/m-command',
            query:{
              id: that.$route.query.id,
              type: that.$route.query.type
            }
          })
        }
      
      }else if(type == 3){
         if( that.$route.query.iOS==1){
          that.$router.push({
          path:'/m-section',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type,
            iOS:that.$route.query.iOS
          }
        })
        }else{
           that.$router.push({
            path:'/m-section',
            query:{
              id: that.$route.query.id,
              type: that.$route.query.type
            }
          })
        }
       
      }else if(type == 4){
        if( that.$route.query.iOS==1){
          that.$router.push({
          path:'/m-workArea',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type,
            iOS:that.$route.query.iOS
          }
        })
        }else{
          that.$router.push({
            path:'/m-workArea',
            query:{
              id: that.$route.query.id,
              type: that.$route.query.type
            }
          })
        }
  
      }else if(type == 5){
        that.$router.push({
          path:'/m-project',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type
          }
        })
      }
    } else {
      if(type == 1){
        that.$router.push({
          path:'/home',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type
          }
        })
      }else if(type == 2){
        that.$router.push({
          path:'/command',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type
          }
        })
      }else if(type == 3){
        that.$router.push({
          path:'/section',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type
          }
        })
      }else if(type == 4){
        that.$router.push({
          path:'/workArea',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type
          }
        })
      }else if(type == 5){
        that.$router.push({
          path:'/project',
          query:{
            id: that.$route.query.id,
            type: that.$route.query.type
          }
        })
      }
    }
  },
  created(){
  },
  methods: {
    _isMobile(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  }
}
</script>

<style scoped="scoped">

</style>
