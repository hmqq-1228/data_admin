<template>
  <div class="mainCounts mainCount">
		<div class="header">
      <div class="titleName">{{projectName}}数据看板</div>
      <div class="datePicker" >
       <el-date-picker
          v-model="valueData"
          type="date"
          :clearable="false"
          :editable="false"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
          :pickerOptions="showOnPick"
          @change="showChange"
          placeholder="选择日期">
        </el-date-picker>
        <!-- <div class="el-icon-caret-bottom"></div> -->
    </div>
    </div>

    <div class="title" style="margin-bottom:0;padding-top:4rem;">
      <div class="line"></div>
      <div class="text">项目总人数（{{personTotal?personTotal:0}}人）</div>
    </div>
    <div class="data_type">
      <div v-show="personTotal>0" id="my_chart" style="width: 320px;height: 420px;margin: 0 auto;"></div>
      <div class="noResultImg" v-show="personTotal == 0">
        <img src="../../../static/noResult.png" alt="">
        <div>暂无人员~</div>
      </div>
    </div>
    <div class="title" style="margin-bottom:6px;">
      <div class="line"></div>
      <div class="text">学习覆盖率（{{totalGroup?totalGroup:0}}个）</div>
    </div>
    <div style="color:#AAAAAA;font-size:14px;text-align: left;margin-bottom:18px;">（已完成周学习任务人数/在场总人数）</div>
    <div class="examList">
      <div class="item" v-show="groupDataList.length > 0" v-for="item in groupDataList" :key="item.id">
        <div class="name">
          <div class="label">{{item.name}}</div>
          <div class="num"><span>{{item.todayLearnNumber}}</span> 个</div>
        </div>
        <div class="progress">
          <div class="active" :style="'width:'+ (item.todayLearnNumber/groupMaxNum)*100 + '%'"></div>
        </div>
      </div>
      <div class="noResultImg" v-show="groupDataList.length == 0">
        <img src="../../../static/noResult.png" alt="">
        <div>暂无班组~</div>
      </div>
      <div class="addMore" v-if="groupPage < totalPage && totalGroup > 4" @click="currentPageFun"><i class="el-icon-d-arrow-right"></i> 查看更多</div>
    </div>
    <div class="title2">
      <div class="lf">
        <div class="line"></div>
        <div class="text">个人学习情况</div>
      </div>
      <div class="rt">
        <el-select v-model="valueStudy" @change="getCurrentGroup" placeholder="请选择所属班组">
          <el-option
            v-for="item in searchGroupList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="learn_tab">
      <div class="tabHd">
        <div style="width: 20%;">姓名</div>
        <div style="width: 30%;">岗位/工种</div>
        <div style="width: 28%;">所属班组</div>
        <div style="width: 22%;">看课数量</div>
      </div>
      <div class="tabItem" v-for="(item,index) in peopleStudyList" :key="item.id+index">
        <div style="width: 20%;">{{item.name}}</div>
        <div class="more" style="width: 30%;">{{item.workTypeName}}</div>
        <div class="more" style="width: 28%;">{{item.teamName}}</div>
        <div style="width: 22%;">{{item.learnNumber}}节</div>
      </div>
      <div class="tabItem noResult" v-if="peopleStudyList.length == 0">
        暂无人员~
      </div>
    </div>
    <div class="addMore" v-if="personPage < personTotalPage && personNum > 6" @click="currentPersonFun"><i class="el-icon-d-arrow-right"></i> 查看更多</div>

     <div class="title">
      <div class="line"></div>
      <div class="text">学习数据</div>
    </div> 
    <div class="dataCard">
      <div class="cardList">
        <div class="item">
          <img src="../../../static/m-project1.png" alt="">
          <div class="lf">
            <div class="name t1">总看课节数</div>
            <div class="num">{{learnDataObj.learnNumber}} <span>节</span></div>
          </div>
        </div>
        <div class="item">
          <img src="../../../static/m-project2.png" alt="">
          <div class="lf">
            <div class="name t2">试卷数量</div>
            <div class="num">{{learnDataObj.examNumber}} <span>套</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      <div class="line"></div>
      <div class="text">考试数据</div>
    </div>
    <div class="data_type">
      <div id="my_chart2" style="width: 100%;height: 340px;"></div>
    </div>
    <div class="data_type" style="margin-top: 4rem;">
      <div id="my_chart3" style="width: 100%;height: 340px;"></div>
    </div>
	</div>
</template>
<script>
  import {workType,totalData,branchList,allGroup,personInfo,projectInfo} from '@/http/home.js'
  export default {
    name: '',
    data () {
      return {
        projectName: '',
        valueStudy: '',
        searchGroupList: [],
        personTypeList: [],
        personTotal: 0,
        valueData:"",
        groupPage: 1,
        groupDataList: [],
        totalGroup: [],
        totalPage: 1,
        groupMaxNum: 0,
        personPage: 1,
        peopleStudyList: [],
        personNum: 1,
        personTotalPage: 1,
        learnDataObj: {},
        showOnPick:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      }
    },
    mounted() {
      var that = this;
      window.addEventListener("resize", () => {
        that.getRemSize();
      });
      that.getPeopleData();
      that.getLearnData()
    },
    created(){
      if(sessionStorage.getItem("getDate")==null){
        this.valueData = this.getDate(-1);
      }else{
        this.valueData=sessionStorage.getItem("getDate")
      }
      console.log(sessionStorage.getItem("projectName"))
      if(sessionStorage.getItem("projectName")!=null){
       this.projectName=sessionStorage.getItem("projectName")
      }else{
        this.projectName=""
      }
      this.getRemSize();
      this.getGroupList();
      this.getAllGroup();
      sessionStorage.setItem('sourseId', this.$route.query.id);
      sessionStorage.setItem('type', this.$route.query.type);
      this.setTitlle()
    },
    methods:{
       setTitlle(){
          var u = navigator.userAgent,app = navigator.appVersion;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //如果输出结果是true就判定是android终端或者uc浏览器
          // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //根据输出结果true或者false来判断ios终端
          if(isAndroid){
            window.AzqBridge.setTitleBar("{'hasHead': true,'titleStr': '','bgColor': '#ffffff','titleColor': '#333333', 'showBack': true}");
          }
       },
      getRemSize(){
        var html = document.getElementsByTagName("html")[0];
        var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
        html.style.fontSize = oWidth / 37.5 + 'px';
        window.scrollTo(0,0);
      },
      // 人员类型数据
      getPeopleData(){
        var that = this;
        let data={
          current: 1,
          size: 200,
          "workDate":that.valueData
        }
        workType(data).then((res)=>{
          if(res.data.code == 200){
            that.personTypeList = res.data.data.records;
            let numList = [];
            let sum = 0;
            for(let i=0;i<that.personTypeList.length;i++){
              numList.push(JSON.parse(that.personTypeList[i].value))
            }
            numList.forEach(item =>{
                sum = sum + item
            })
            // console.log('sssssss', that.personTypeName)
            that.personTotal = sum;
            this.getWorkTypeData();
          }
        })

        
      },
      // 班组列表
      currentPageFun(){
        this.groupPage = this.groupPage + 1;
        this.getGroupList()
      },
      getGroupList(){
        var that = this;
        let obj = {
          current: this.groupPage,
          size: 4,
          "workDate":that.valueData
        }
        branchList(obj).then((res)=>{
          if(res.data.code == 200){
            let numList = [];
            that.groupDataList = that.groupDataList.concat(res.data.data.records);
            that.totalGroup = res.data.data.total;
            that.totalPage = res.data.data.pages;
            for(let i=0;i<that.groupDataList.length;i++){
              numList.push(that.groupDataList[i].todayLearnNumber	)
            }
            that.groupMaxNum = (Math.max(...numList)*1.1)>0?(Math.max(...numList)*1.1):100;
          }
        })
      },
      // 个人学习情况筛选
      getAllGroup(){
        let that = this;
        allGroup().then((res)=>{
          if(res.data.code == 200){
            that.searchGroupList = res.data.data;
            // if(that.searchGroupList.length > 0){
            //   that.valueStudy = that.searchGroupList[0].id;
            // }
            that.getPeopleInfo();
          }
        })
      },
      getCurrentGroup(val){
        this.valueStudy = val;
        this.personPage = 1;
        this.peopleStudyList = [];
        this.getPeopleInfo();
      },
      currentPersonFun(){
        this.personPage = this.personPage + 1;
        this.getPeopleInfo();
      },
      // 个人学习情况
      getPeopleInfo(){
        var that = this;
        let obj = {
          teamId: this.valueStudy,
          current: this.personPage,
          size: 6,
          "workDate":that.valueData
        }
        personInfo(obj).then((res)=>{
          if(res.data.code == 200){
            that.peopleStudyList = that.peopleStudyList.concat(res.data.data.records);
            for(let i=0;i<that.peopleStudyList.length;i++){
              if(!that.peopleStudyList[i].teamName){
                that.peopleStudyList[i].teamName = '暂无班组';
              }
            }
            that.personNum = res.data.data.total;
            that.personTotalPage = res.data.data.pages;
          }
        })
      },
      // 学习数据
      getLearnData(){
        var that = this;
        totalData({"workDate":that.valueData}).then((res)=>{
          if(res.data.code == 200){
            // that.projectName=res.data.data.unitName
            that.learnDataObj = res.data.data;
            let obj = {
              name: '已考人数',
              value: that.learnDataObj.userExamNumber
            }
            let obj2 = {
              name: '未考人数',
              value: that.learnDataObj.totalUserNumber-that.learnDataObj.userExamNumber
            }
            let obj3 = {
              name: '已学人数',
              value: that.learnDataObj.userLearnNumber
            }
            let obj4 = {
              name: '在场总人数',
              value: that.learnDataObj.totalUserNumber
            }
            let examList = [];
            let passList = [];
            examList.push(obj);
            examList.push(obj2);
            passList.push(obj3);
            passList.push(obj4);
            if(examList){
              this.getExamNumber(examList);
            }
            if(passList){
              this.getExamLevel(passList);
            }
          }
        })
      },
      // 饼状图
      getWorkTypeData(){
        var chartDom = document.getElementById('my_chart');
        var myChart = this.$echarts.init(chartDom);
        var index = 0;//默认选中高亮模块索引
        var option;

        option = {
          tooltip: {
            trigger: 'item'
          },
          // legend: {
          //   type:"scroll",
          //   bottom: '0%',
          //   left: 'center',
          //   selectedMode:false,//取消图例上的点击事件
          // },
          series: [
            {
              name: '工种人数',
              type: 'pie',
              radius: ['50%', '80%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
                formatter: '{b} \n\n {c} 人'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                  fontWeight: 'bold'
                },
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              labelLine: {
                show: false
              },
              data: this.personTypeList
            }
          ]
        };
        option && myChart.setOption(option);
        window.addEventListener("resize", () => { myChart.resize();});
        myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
        // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
        myChart.on('mouseover',function(e){
          myChart.dispatchAction({type: 'downplay',seriesIndex: 0,dataIndex:0});
          if(e.dataIndex != index){
            myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
          }
          if(e.dataIndex == 0){
            myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex:e.dataIndex});
          }
        });

        //当鼠标离开时，把当前项置为选中
        myChart.on('mouseout',function(e){
            index = e.dataIndex;
            myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        });
      },
      // 考试人数占比
      getExamNumber(examList){
        var chartDom = document.getElementById('my_chart2');
        var myChart = this.$echarts.init(chartDom);
        var index = 0;//默认选中高亮模块索引
        var option;

        option = {
          title: {
            text: '考试人数占比',
            left: 'left'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} 人'
          },
          legend: {
            bottom: '0%',
            left: 'center',
            selectedMode: false,
          },
          series: [
            {
              name: '考试人数占比',
              type: 'pie',
              radius: ['40%', '70%'],
              color:['#377DFF','#FEC82B'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
                formatter: '{b}\n\n{c}人'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '16',
                  fontWeight: 'bold'
                },
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              labelLine: {
                show: false
              },
              data: examList
            }
          ]
        };
        option && myChart.setOption(option);
        window.addEventListener("resize", () => { myChart.resize();});
        myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
        // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
        myChart.on('mouseover',function(e){
          myChart.dispatchAction({type: 'downplay',seriesIndex: 0,dataIndex:0});
          if(e.dataIndex != index){
            myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
          }
          if(e.dataIndex == 0){
            myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex:e.dataIndex});
          }
        });

        //当鼠标离开时，把当前项置为选中
        myChart.on('mouseout',function(e){
            index = e.dataIndex;
            myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        });
      },
      // 考试合格率
      getExamLevel(passList){
        var chartDom = document.getElementById('my_chart3');
        var myChart = this.$echarts.init(chartDom);
        var index = 0;//默认选中高亮模块索引
        var option;

        option = {
          title: {
            text: '学习覆盖率',
            left: 'left'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {d}% '
          },
          legend: {
            bottom: '0%',
            left: 'center',
            selectedMode: false,
          },
          series: [
            {
              name:"在场人数",
              type: 'pie',
              radius: ['40%', '70%'],
              color:['#00B478','#8537FF'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
                formatter: '{b}\n\n{d}%'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '16',
                  fontWeight: 'bold'
                },
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              labelLine: {
                show: false
              },
              data: passList
            }
          ]
        };
        option && myChart.setOption(option);
        window.addEventListener("resize", () => { myChart.resize();});
        myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
        // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
        myChart.on('mouseover',function(e){
          myChart.dispatchAction({type: 'downplay',seriesIndex: 0,dataIndex:0});
          if(e.dataIndex != index){
            myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
          }
          if(e.dataIndex == 0){
            myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex:e.dataIndex});
          }
        });

        //当鼠标离开时，把当前项置为选中
        myChart.on('mouseout',function(e){
            index = e.dataIndex;
            myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        });
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
      // 获取当前时间
      getNowTime: function () {
        let dateTime
        let yy = new Date().getFullYear()
        let mm = new Date().getMonth() + 1 < 10? '0'+ (new Date().getMonth() + 1) : new Date().getMonth() + 1
        let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
        let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
          :
          new Date().getMinutes()
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
          :
          new Date().getSeconds()
        dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
        this.currentTime = dateTime;
        if(hh>=4 && hh<=8){
          this.currentTimeStr = '早上好！美好的一天开始啦~'
        }else if(hh>8 && hh<12){
          this.currentTimeStr = '上午好！一份耕耘，一份收获。'
        }else if(hh>=12 && hh<14){
          this.currentTimeStr = '中午好！要好好干饭，褪去疲劳。'
        }else if(hh>=14 && hh<=18){
          this.currentTimeStr = '下午好！努力，幸运自会与你不期而遇~'
        }else if(hh>18 && hh<=23){
          this.currentTimeStr = '晚上好！愿美梦扫去您一日的疲惫~'
        }else{
          this.currentTimeStr = '太早了！要好好睡觉呦~'
        }
      },

       //日期选中————————————————————
      showChange(){
        this.groupDataList=[]
        this.searchGroupList=[]
        this.peopleStudyList=[]
        this.learnDataObj=[]
        this.examData=[]
        this.studySuccess=[]
        this.getRemSize();
        this.getGroupList();
        this.getAllGroup();
        this.getPeopleData();
        this.getLearnData();
        this.getExamNumber([]);
        this.getExamLevel([]);
        sessionStorage.setItem('getDate',this.valueData);
      },
    }
  }
</script>

<style scoped="scoped">
	.mainCount{
		padding: 2rem 2rem 4rem 2rem;
    font-size: 1.4rem;
    background-color: #fff;
	}
  .noResultImg{
    margin-top: 2rem;
  }
  .noResultImg>div{
    margin-top: 1rem;
    font-size: 1.6rem;
    color: #999;
  }
  .mainCount .header{
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 999;
    width: 100%;
    box-sizing: border-box;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 1.2rem 2rem 0 2rem;
    box-sizing: border-box;
  }
  .title{
    color: #333;
    font-weight: bold;
    font-size: 2rem;
    display: flex;
    justify-content: flex-start;
    margin-top: 2.4rem;
    margin-bottom: 2rem;
  }
  .title .line,.title2 .line{
    width: 0.4rem;
    height: 2.5rem;
    background: #377DFF;
    border-radius: 2px;
    margin-right: 1rem;
  }
  .title2{
    color: #333;
    font-weight: bold;
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    margin-top: 2.4rem;
    margin-bottom: 1.5rem;
  }
  .title2 .lf{
    display: flex;
    justify-content: flex-start;
    width: 65%;
    margin-top: 6px;
  }
  .cardList{
    display: flex;
    justify-content: space-between;
  }
  .learn_tab .tabHd{
    margin-bottom: 1rem;
  }
  .learn_tab .tabHd,.learn_tab .tabItem{
    font-size: 1.4rem;
    color: #333;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .learn_tab .tabItem{
    font-size: 1.4rem;
    font-weight: normal;
    padding: 1rem 0;
    
  }
  .learn_tab .tabItem.noResult{
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
    color: #999;
  }
  .learn_tab .tabItem .more{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .cardList .item{
    width: 49%;
    box-shadow: 0px 2px 1.5rem 0px rgba(205,219,236,0.4);
    border-radius: 8px;
    padding: 1.2rem 1rem 1.2rem 1.5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: left;
  }
  .cardList .item img{
    width: 3rem;
    height: 3rem;
    margin-top: 1.2rem;
  }
  .cardList .item .t1{
    color: #FF8F00 ;
  }
  .cardList .item .t2{
    color: #81D32F;
  }
  .cardList .item .t3{
    color: #FBAC3B ;
  }
  .cardList .item .t4{
    color: #896DFF;
  }
  .cardList .item .num{
    font-size: 2.2rem;
    font-weight: bold;
    text-align: left;
  }
  .cardList .item .num span{
    font-size: 1.4rem;
    font-weight: normal;
  }

  .addMore{
    padding: 0.8rem;
    text-align: center;
    color: #377DFF;
    margin-top: 1rem;
  }
  .addMore i{
    transform: rotate(90deg);
  }
  .examList .item{
    background: #FFFFFF;
    box-shadow: 0px 2px 1.5rem 0px rgba(205,219,236,0.4);
    border-radius: 0.8rem;
    font-size: 1.4rem;
    padding: 1.5rem 2.5rem;
    border-left: 0.6rem solid #D7E5FF;
    margin-top: 1.5rem;
  }
  .examList .item .name{
    display: flex;
    justify-content: space-between;
  }
  .examList .item .name .label{
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 3.5rem;
  }
  .examList .item .name .num{
    color: #377DFF;
  }
  .examList .item .name .num span{
    font-size: 2.6rem;
    font-weight: bold;
  }
  .examList .item .progress{
    width: 100%;
    height: 1rem;
    background: #EFF2F7;
    border-radius: 0.5rem;
    margin-top: 1.2rem;
    overflow: hidden;
  }
  .examList .item .progress .active{
    width: 80%;
    height: 1rem;
    background: linear-gradient(270deg, #68B4FF 0%, #377DFF 100%);
    border-radius: 4px 0px 0px 4px;
  }
  .titleName{
    line-height:4rem;
  }
</style>

<style>
.mainCounts .el-input__inner {
    width: 14rem !important;
    font-size: 1.4rem !important;
    border: none !important;
    background-color: transparent !important;
    color: #333333 !important;
}
.mainCounts .el-input__icon{
  font-size:1.4rem !important;
  color: #333333 !important;
  
}
.mainCounts .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 14rem !important;
}
.mainCounts .el-input__icon{
  margin: 0 !important;
}
.mainCounts .el-input--prefix .el-input__inner{
  padding-left: 3rem !important;
}


.mainCounts .title2 .rt .el-input__inner{
    margin-right: 3rem;
    padding-right: 0;
    white-space: nowrap;      /*超出的空白区域不换行*/
    overflow: hidden;         /*超出隐藏*/
    text-overflow: ellipsis;  /*文本超出显示省略号*/
}
</style>