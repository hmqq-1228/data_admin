<template>
  <div class="main_top">
<!-- <div class="mianCont" v-for="(item,index) in banArray" :key="index">
        <div  class="podiumData show" v-for="item in item" :key="item.id" :style="{marginBottom:item.margin? '30px':0,}">
          <div class="headquartersName" title="指挥部" :style="{background:item.color,}"  v-if="item.showProjectName" >{{item.headquartersName}}</div>
          <div class="bgColor" :style="{background:item.color,borderRadius:(item.margin?'0 0 20px 20px':'')}">
              <div class="projectName"  title="工区" v-if="item.showProjectName" >{{item.projectName}}</div>
              <div class="banzu" title="班组"><div class="dadui">{{item.name}}</div>
              <div class="dddddd" v-for="(items,index) in item.arry" :key="items.id+index">{{items.name}}</div></div>
          </div>
        </div>

      <waterfall :col="2" :data="banArray">
        <template>
        <div  class="podiumData " style="margin:20px;" v-for="item in banArray" :key="item.id" :style="{background:item.color}">
          <waterfall :col="2" :data="item.workAreaList">
            <template>
              <div  class="podiumData show" v-for="items in item.workAreaList" :key="items.id">
                <div class="headquartersName" title="指挥部" >{{item.headquartersName}}</div>
                <div class="projectName"  title="工区"   >{{item.name}}</div>
                <div class="banzu" title="班组"><div class="dadui">{{items.name}}</div>
                <div class="dddddd" v-for="(itemss,index) in items.groupList" :key="items.id+index">{{itemss.name}}</div></div>
              </div>
            </template>
          </waterfall>
        </div>
        </template>
      </waterfall>
      </div> -->

      <waterfall :col="4" :data="banArray" v-if="banArray.length>0">
        <template>
          <div  class="" style="margin:0 20px;border-radius: 20px;overflow: hidden;" v-for="(item,index) in banArray" :key="index">
            <div class="headquartersName" style="margin-top:20px;" :style="{background:item.color,}" @click="seeDetail(item.parentId)">{{item.headquartersName}}</div>
            <div class="projectName"    @click="goSection(item.id)" >{{item.name}}</div>
            <div v-for="items in item.workAreaList" :key="items.id" style="padding:10px 0;" :style="{background:item.color,}">
              <div class="workName" ><div class="dadui" @click="goWorkArea(items.id)">{{items.name}}</div>
              <div class="work_item" v-for="itemss in items.groupList" :key="itemss.id" @click.stop="goProject(itemss.id)">{{itemss.name}}</div></div>
            </div>
          </div>
        </template>
      </waterfall>
  </div>
</template>

<script>

import {worKareaList} from '@/http/home.js'
  export default {
    name: '',
    data () {
      return {
        banArray:["","","",""],
        valueData:"",
        projectList:[]
          // banArray:[{
          // name:'临建',
          // namef:true,
          // namef2:true,
          // name1:'一工区',
          // name2:'桥梁一队',
          // banzu:["桥梁一班","钢筋一班","桥梁二班","桥梁三班","钢筋四班","钢筋二班","桥梁三班","钢筋四班","钢筋二班",,"桥梁二班","桥梁三班","钢筋四班","钢筋二班",
          //        "钢筋四班","钢筋二班","钢筋二班","钢筋二班","钢筋二班","钢筋二班钢筋二班","钢筋二班","钢筋二班","钢筋二班",]
          // }]
      }
    },
    created() {
      if(sessionStorage.getItem("getDate")==null){
        this.valueData = this.getDate(-1);
      }else{
        this.valueData=sessionStorage.getItem("getDate")
      }
     this.getTotalData()
    },
    mounted() {
      var that = this;
      window.addEventListener("resize", () => {
        that.getRemSize();
      });
      that.getRemSize();
    },
    methods:{
      
      getRemSize(){
        var html = document.getElementsByClassName("main_top")[0];
        
        var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
        html.style.fontSize = oWidth / 118.9 + 'px';
        window.scrollTo(0,0);
      },


    getTotalData(){
        let that = this;
        worKareaList({"workDate":that.valueData}).then((res)=>{
          if(res.data.code == 200){
           this.dataHadle1(res.data.data) 
          }else{
            that.banArray=[]
            console.log("this.banArray",this.banArray)
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },

      
      // 获取今天日期
      getDate(dates) {
        var dd = new Date();
        var n = dates || 0;
        dd.setDate(dd.getDate() + n);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;
        var d = dd.getDate();
        m = m < 10 ? "0" + m: m;
        d = d < 10 ? "0" + d: d;
        var day = y + "-" + m + "-" + d;
        return day;
      },

    dataHadle(data){
      let GroupNameList=[],GroupList=[],name="",projectNameShow=true,projectName="",that=this
      if(data.headquartersList.name!=null){
          projectName=data.headquartersList.name
      }
      for(let i=0;i<data.projectList.length;i++){
        let colors=["#D8F0FF","#FFF9D8","#FFD8E1","#FFE5D8"]
        console.log(Math.floor(Math.random()*4))
        data.projectList[i].color=colors[Math.floor(Math.random()*4)]
      }
      console.log(data)
      // 下面是为班组赵工区——————————————————————————————————————————————————————分割————————————————————————————————————
        for(let i=0;i<data.workAreaList.length;i++){
                GroupList.push(data.workAreaList[i])
                GroupList[i].arry=[]
                // 下面是先根据工区把班组进行划分———————————————————————————————分割—————————————————————————————
                for (const key in data.workAreaGroupList) {
                  if(data.workAreaGroupList[key].parentId==GroupList[i].id){
                    GroupList[i].arry.push(data.workAreaGroupList[key])
                  }  
                }
                // 下面是根据id把班组划分标段名字————————————————————————————————————————————————————分割——————————————————————————————————————
                for (const key in data.projectList) {
                    if(data.projectList[key].id==GroupList[i].parentId){
                    GroupList[i].projectName=data.projectList[key].name
                    GroupList[i].color=data.projectList[key].color
                    }
                }
                GroupList[i].headquartersName=data.headquartersList[0].name
        }
          // 下面是根据名字显示不显示标段名字或者显示————————————————————————————————分割————————————————————————————————————————————————————
           for (const key in GroupList) {
              if(key<GroupList.length&&GroupList[key].projectName==GroupList[parseInt(key)>0? parseInt(key)-1:parseInt(key)].projectName){
                GroupList[parseInt(key)].showProjectName=false
              }else{
                GroupList[key].showProjectName=true
              }
          }
          // 下面是循环判断margin————————————————————————————————分割————————————————————————————————————————————————————
           for (const key in GroupList) {
              if(0<key<GroupList.length&&GroupList[key].showProjectName){
                GroupList[parseInt(key)-1].margin=true
              }
          }
          GroupList[GroupList.length-1].showProjectName=false
          GroupList[0].showProjectName=true
          // 下面是随机颜色
          let nums=[]
          for (const key in GroupList) {
              if(GroupList[key].showProjectName==true){
                nums.push(key)
              }
          }
          console.log("nums",nums,"nums,length",nums.length)
          // 下面是循环进行分组一组几个————————————————————————————————————————————————分割——————————————————————————————————————
          for(let i=0;i<GroupList.length/9;i++){
              let newArry=[]
            for(let k=0;k<9;k++){
              if(GroupList[k+i*9]){
                newArry.push(GroupList[k+i*9])
              }
              if(k==0){
                GroupList[k+i*9].showProjectName=true
              }
            }
            GroupNameList.push(newArry)
          }
          
          that.banArray=GroupNameList
       
    },

  
    dataHadle1(data){
      let projectList={},GroupList=[],that=this
      if(data.headquartersList.name!=null){
          projectName=data.headquartersList.name
      }
    for(let i=0;i<data.projectList.length;i++){
        let colors=["#D8F0FF","#FFF9D8","#FFD8E1","#FFE5D8"]
        data.projectList[i].color=colors[i%4]
      }
        for (const key in data.projectList) {
         data.projectList[key].workAreaList=[]
        }
        projectList=data.projectList

        console.log(data)
        for(let i=0;i<data.workAreaList.length;i++){
          GroupList.push(data.workAreaList[i])
          GroupList[i].groupList=[]
          for (const key in data.workAreaGroupList) {
            if(data.workAreaGroupList[key].parentId==GroupList[i].id){
              GroupList[i].groupList.push(data.workAreaGroupList[key])
            }   
         }
        }

          for (const key in projectList) {
            for(let i=0;i<GroupList.length;i++){
              if(projectList[key].id==GroupList[i].parentId){
                projectList[key].workAreaList.push(GroupList[i])
              }
              if(projectList[key].name==GroupList[i].name){
                projectList[key].workAreaList.push(GroupList[i])
              }
            }
          }


         let newArryjson=[]
         for (const key in projectList) {
           
            if(projectList[key].workAreaList.length>10){
             
              for(let i=0;i<projectList[key].workAreaList.length/10;i++){
                let newArr={}
                newArr.id=projectList[key].id
                newArr.color=projectList[key].color
                newArr.name=projectList[key].name
                newArr.parentId=projectList[key].parentId
                newArr.workAreaList=[]
                for (let index = 0; index <10; index++) {
                    if(projectList[key].workAreaList[i*10+index]){
                        newArr.workAreaList.push(projectList[key].workAreaList[i*10+index])
                    }
                }
                newArryjson.push(newArr)
              }
            }else{
              newArryjson.push(projectList[key])
            }
          
          }
          
         for (const key in newArryjson) {
            newArryjson[key].headquartersName=data.headquartersList[0].name
            newArryjson[key].parentId=data.headquartersList[0].id
         }
            // console.log(newArryjson)
          // projectList[GroupList.length-1].showProjectName=false
          that.banArray=newArryjson
         
    },

    goCommand(event){
       this.$router.push({
          path:'/command',
          query:{
            id: event,
            type: 2
          }
      })
    },
    goSection(event){
        if(this.$route.path=="/section"){
          this.$emit('msg',false)
        }else{
          this.$router.push({
            path:'/section',
            query:{
              id: event,
              type: 3
            }
          })
        }
    },

    goWorkArea(event){
        if(this.$route.path=="/workArea"){
          this.$emit('msg',false)
        }else{
          this.$router.push({
              path:'/workArea',
              query:{
                id: event,
                type: 4
              }
           })
        }

         
    },
    goProject(event){
       this.$router.push({
          path:'/project',
          query:{
            id: event,
            type: 5
          }
      })
    },

    }


    
  }
</script>

<style scoped="scoped">
 .mianCont{
     display:flex;
     flex-direction:column;
     height:91%;
     flex-wrap: wrap;
     padding:0 50px;
     width: 100%;
     box-sizing: border-box;
     min-height:700px;
 }
.podiumData{

  width: 24%;
}
.podiumData_name{
  background:#fff;
}

.workName{
  display: flex;
  background:#fff;
  flex-wrap: wrap;
  color:#666666;
  padding-bottom:20px;
  margin: 0 10px 0;
  cursor: pointer;
}
.work_item{
  font-weight: 400;
  color: #666666;
  line-height: 22px;
  padding: 20px 10px 0;
  cursor: pointer;
}
.dadui{
  padding:2px 5px;
  margin: 18px 5px 0;
  background: #DCD3F2;
  border-radius:2px;
}
.projectName{
  width:100%;
  padding: 6px 16px;
  background:#242F42;
  box-sizing: border-box;
  color:#fff;
  text-align: left;
  cursor: pointer;
}
.headquartersName{
  padding: 0 25px 23px;
  padding-left:16px;
  text-align: left;
  font-size: 1.5em;
  font-weight: 500;
  color: #333333;
  border-radius: 20px 20px 0 0;
  padding-top:20px;
  background: #D8F0FF;
  cursor: pointer;
}
.main_top{
  position: fixed;
  width:100%;
  min-width:1400px;
  z-index: 2;
  height:100%;
  top: 0;
  left:0;
  background-color: #ECF2F8;
  overflow-y: auto;
  padding-top: 80px;
  padding-bottom: 40px;
  box-sizing: border-box;
}
.bgColor{
  background:#D8F0FF;
  box-sizing: border-box;
  padding:10px 0 ;
}
</style>

