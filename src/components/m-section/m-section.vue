<template>
  <div class="mainCounts">
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
    <div class="title" style="padding-top:2rem;">
      <div class="line"></div>
      <div class="text">数据总览</div>
    </div>
    <div class="dataCard">
      <div class="cardList">
        <div class="item subordinateUnits">
          <div class="lf">
            <div class="name t1">工区总个数</div>
            <div class="num">{{baseData.subordinateUnitsNumber}} <span>个</span></div>
          </div>
          <!-- <img src="../../../static/m-icon_new1.png" alt=""> -->
        </div>
        <div class="item totalUserNumber">
          <div class="lf">
            <div class="name t2">总人数</div>
            <div class="num">{{baseData.totalUserNumber}} <span>个</span></div>
          </div>
          <!-- <img src="../../../static/m-icon_new2.png" alt=""> -->
        </div>
      </div>
      <div class="cardList" style="margin-top: 1rem;">
        <div class="item userLeaveNumber">
          <div class="lf">
            <div class="name t3">离场总人数</div>
            <div class="num">{{baseData.userLeaveNumber}} <span>个</span></div>
          </div>
          <!-- <img src="../../../static/m-icon_new3.png" alt=""> -->
        </div>
        <div class="item userLoginNumber">
          <div class="lf">
            <div class="name t4">登录总人数</div>
            <div class="num">{{baseData.userLoginNumber}} <span>个</span></div>
          </div>
          <!-- <img src="../../../static/m-icon_new4.png" alt=""> -->
        </div>
      </div>

      <div class="cardList" style="margin-top: 1rem;">
        <div class="item userLearnNumber">
          <div class="lf">
            <div class="name t3">学习总人数</div>
            <div class="num">{{baseData.userLearnNumber}} <span>个</span></div>
          </div>
          <!-- <img src="../../../static/m-icon_new5.png" alt=""> -->
        </div>
        <div class="item learnNumber">
          <div class="lf">
            <div class="name t4">学习总次数</div>
            <div class="num">{{baseData.learnNumber}} <span>个</span></div>
          </div>
          <!-- <img src="../../../static/m-icon_new6.png" alt=""> -->
        </div>
      </div>

      <div class="cardList" style="margin-top: 1rem;">
        <div class="item userExamNumber">
          <div class="lf">
            <div class="name t3">考试人数</div>
            <div class="num">{{baseData.userExamNumber}} <span>个</span></div>
          </div>
          <!-- <img src="../../../static/m-icon_new7.png" alt=""> -->
        </div>
        <div class="item userTaskFinishNumber">
          <div class="lf">
            <div class="name t4">学习完成任务数</div>
            <div class="num">{{baseData.userTaskFinishNumber}} <span>个</span></div>
          </div>
          <!-- <img src="../../../static/m-icon_new8.png" alt=""> -->
        </div>
      </div>

      
    </div>
    <!-- <div class="learnCard">
      <div class="cardLf">
        <div class="name">累计学习总次数</div>
        <div class="num"><span>{{baseData.isReadCoursewareCount}}</span></div>
      </div>
      <img src="../../../static/m-allData.png" alt="">
    </div> -->


<!-- 学习日增次数 -->
    <div class="title">
      <div class="line"></div>
      <div class="text">日新增学习次数</div>
    </div>
    <!-- <div class="data_type">
      <div id="my_chart_line" style="width: 100%;height: 360px;"></div>
    </div> -->
    <div class="study examList">
      <div class="item" v-for="item in studyList" :key="item.id">
        <div class="name">
          <div class="label">{{item.name}}</div>
          <div class="num"><span>{{item.todayLearnNumber}}</span>人</div>
        </div>
        <div class="progress">
          <div class="active" :style="'width:'+ (item.todayLearnNumber/studyPersonExamMax)*100 + '%'"></div>
        </div>
      </div>
      <div class="addMore" v-if="studyCurrentPage < studyListPage && studyListNum > 4" @click="addExamPageFunNum"><i class="el-icon-d-arrow-right"></i> 查看更多</div>
    </div>






    <div class="title" style="justify-content: space-between;">
      <div style="display:flex;"  @click="clickActiveExam(1)">
        <div class="line"></div>
        <div class="examNav">
          <div class="text " :class="activeExam==1?'active-exam-nav':''" style="line-height:2.4rem; font-size:1.8rem;">学习周任务完成数</div>
          <!-- <div class="text" @click="clickActiveExam(activeExam==2?1:2)">{{activeExam==2? '学习周任务完成数':'各单位考试情况'}}</div> -->
        </div>
      </div>
      <div style="display:flex;"  @click="clickActiveExam(2)">
        <div class="line" style="margin-right:1rem;"></div>
        <div class="examNav">
          <!-- <div class="text active-exam-nav" >{{activeExam==1? '学习周任务完成数':'各单位考试情况'}}</div> -->
          <div class="text" :class="activeExam==2?'active-exam-nav':''" style="line-height:2.4rem; font-size:1.8rem;">各单位考试情况</div>
        </div>
      </div>

    </div>
    <div class=" examList" v-if="activeExam==1">
      <div class="item" v-for="item in examData" :key="item.id">
        <div class="name">
          <div class="label">{{item.name}}</div>
          <div class="num"><span>{{item.userExamNumber}}</span> 人</div>
        </div>
        <div class="progress">
          <div class="active" :style="'width:'+ (item.userExamNumber/personExamMax)*100 + '%'"></div>
        </div>
      </div>
      <div class="addMore" v-if="examCurrentPage < examTotalPage && examTotalNum > 4" @click="addExamPageFun"><i class="el-icon-d-arrow-right"></i> 查看更多</div>
    </div>
    <!-- //学习周任务完成数 -->
    <div class=" examList" v-if="activeExam==2">
      <div class="item" v-for="item in studySuccess" :key="item.id">
        <div class="name">
          <div class="label">{{item.name}}</div>
          <div class="num"><span>{{item.todayLearnNumber}}</span> 人</div>
        </div>
        <div class="progress">
          <div class="active" :style="'width:'+ (item.todayLearnNumber/personStudyMax)*100 + '%'"></div>
        </div>
      </div>
      <div class="addMore" v-if="examCurrentPage < examTotalPage && examTotalNum > 4" @click="addExamPageFun"><i class="el-icon-d-arrow-right"></i> 查看更多</div>
    </div>

<!-- 各单位学习情况 -->
    <div class="title">
      <div class="line"></div>
      <div class="text">各单位学习情况</div>
    </div>
    <div class="part_info">
      <div class="pItem" v-for="item in learnData" :key="item.id">
        <div class="pHd">{{item.name}} </div>
        <div class="dataList">
          <div class="data1">
            <div class="result">{{item.totalUserNumber}}<span></span></div>
            <div class="info">导入总人数</div>
          </div>
          <div class="data1">
            <div class="result">{{item.userNotLeaveNumber}}<span></span></div>
            <div class="info">在场人数</div>
          </div>
          <div class="data1">
            <div class="result">{{item.userLeaveNumber}}<span></span></div>
            <div class="info">离场人数</div>
          </div>
          <div class="data1">
            <div class="result">{{item.userLoginNumber}}<span></span></div>
            <div class="info">在场登录人数</div>
          </div>
          <div class="data1">
            <div class="result">{{item.userLearnNumber}}<span></span></div>
            <div class="info">在场学习人数</div>
          </div>
          <div class="data1">
            <div class="result">{{item.userExamNumber}}<span></span></div>
            <div class="info">在场考试人数</div>
          </div>
          <div class="data1 type2">
            <div class="result">{{item.loginRate>0?((item.loginRate)*100).toFixed(2):0}}<span> %</span></div>
            <div class="info">在场登录覆盖率</div>
          </div>
          <div class="data1 type2">
            <div class="result">{{item.learnRate>0?((item.learnRate)*100).toFixed(2):0}}<span> %</span></div>
            <div class="info">在场学习覆盖率</div>
          </div>
        </div>
      </div>
      <div class="addMore" v-if="currentPage < totalPage && totalNumber > 4" @click="addPageFun"><i class="el-icon-d-arrow-right"></i> 查看更多</div>
    </div>


<!-- 学习排行榜——————————————————————______________________________________________—————— -->
    <div class="title">
      <div class="line"></div>
      <div class="text">学习次数排行榜</div>
    </div>
    <div class="studyRank">
      <div class="rankNum">排名</div>
      <div class="rankName">标段名称</div>
      <div class="studyNum">学习次数</div>
    </div>
    <div class="rank_item">
      <div class="rank_items" v-for="(item,index) in rankList" :key="index">
          <!-- <div class="rankIcon"><img :src="allrankIcon[index]" alt=""></div> -->
          <div class="rankIcon" v-if="index+1==1"><img src="../../../static/rankIcon1.png" alt=""></div>
          <div class="rankIcon" v-if="index+1==2"><img src="../../../static/rankIcon2.png" alt=""></div>
          <div class="rankIcon" v-if="index+1==3"><img src="../../../static/rankIcon3.png" alt=""></div>
          <div class="rankIcon" v-if="index+1==4"><img src="../../../static/rankIcon4.png" alt=""></div>
          <div class="rankIcon" v-if="index+1==5"><img src="../../../static/rankIcon5.png" alt=""></div>
          <el-tooltip class="item" effect="dark" :content="item.name"  placement="top">
            <div class="rank_item_name">{{item.name}}</div>
          </el-tooltip>
          <div class="rank_study_num">{{item.value}}次</div>
      </div>
      
    </div>



    <div class="title">
      <div class="line"></div>
      <div class="text">各工种总人数</div>
    </div>
    <div class="data_type" style="display:flex;box-sizing:border-box;">
      <div id="my_chart" style="width:38rem;height:38rem;"></div>
    </div>
    <div class="title">
      <div class="line"></div>
      <div class="text">下属单位列表</div>
    </div>
    <div class="sectionList">
      <div class="sItem" v-for="item in sectionList" @click="getSectionInfo(item.id, item.name)" :key="item.id">
        <div>{{item.name}}</div>
        <div class="info">点击查看详情</div>
      </div>
    </div>
    <div class="addMore" v-if="sectionPage < sectionTotal && sectionTotalNum > 6" @click="changeSectionPage"><i class="el-icon-d-arrow-right"></i> 查看更多</div>
	</div>
</template>

<script>
  import {totalData,learnInfo,studyInfo,studyRank,workType,branchList,branchData} from '@/http/home.js'
  export default {
    name: '',
    data () {
      return {
        projectName:"",
        studyList:[],
        baseData: {},
        currentPage: 1,
        valueData: '',
        totalPage: 0,
        totalNumber: 0,
        learnData: [],
        examCurrentPage: 1,
        studyCurrentPage: 1,
        examData: [],
        examTotalPage: 1,
        examTotalNum: 0,
        personExamMax: 0,
        workTypeList: [],
        lineName: [],
        lineNameList: [],
        learnLineData: [],
        sectionPage: 1,
        sectionList: [],
        sectionTotal: 1,
        sectionTotalNum: 0,
        allrankIcon:["../../../static/rankIcon1.png","../../../static/rankIcon2.png","../../../static/rankIcon3.png","../../../static/rankIcon4.png","../../../static/rankIcon5.png"],
        studyListPage:1,  //日增学习页码
        studyListNum:1,  //日增学习总数
        studyPersonExamMax:0,//日增学习的进度条最大值
        rankList:{},//排行榜
        // 下面是日期禁选
        showOnPick:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        activeExam:1,//这里是考试选择
        studySuccess:[],//学习完成率
        personStudyMax:0,//学习完成最大值
        studyCurrent:1,
        studyTotal:1,
     }
    },
    mounted() {
      var that = this;
      window.addEventListener("resize", () => {
        that.getRemSize();
      });
      that.getWorkType();
      that.getBranchData();
    },
    created(){
      if(sessionStorage.getItem("getDate")==null){
        this.valueData = this.getDate(-1);
      }else{
        this.valueData=sessionStorage.getItem("getDate")
      }
      this.getRemSize();
      this.getTotalData();
      this.getLearnInfo();
      this.getExamInfo();
      this.getBranchList();
      this.getRankData()
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
      },
      // 查看集团基础信息
      getTotalData(){
        let that = this;
        totalData({"workDate":that.valueData}).then((res)=>{
          if(res.data.code == 200){
            that.baseData = res.data.data;
            that.projectName=res.data.data.unitName
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 获取集团各标段学习信息
      addPageFun(){
        this.currentPage = this.currentPage + 1;
        this.getLearnInfo();
      },
      getLearnInfo(){
        let that = this;
        let obj = {
          current: that.currentPage,
          size: 4,
          'workDate':that.valueData
        }
        learnInfo(obj).then((res)=>{
          if(res.data.code == 200){
            that.learnData = that.learnData.concat(res.data.data.records);
            that.totalPage = res.data.data.pages;
            that.totalNumber = res.data.data.total;
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 各单位考试情况
      addExamPageFun(){
        this.examCurrentPage = this.examCurrentPage + 1;
        this.getExamInfo();
      },
      // 日增学习次数增加
      addExamPageFunNum(){
        this.studyCurrentPage = this.studyCurrentPage + 1;
        this.getBranchData();
      },
      // 各单位考试情况————————————————————studySuccess
      getExamInfo(){
        let that = this;
        let obj = {
          current: that.examCurrentPage,
          size: 4,
          "workDate":that.valueData,
        }
        learnInfo(obj).then((res)=>{
          if(res.data.code == 200){
            let numList = [];
            let numList2 = [];
            that.examData = that.examData.concat(res.data.data.records);
            that.studySuccess = that.studySuccess.concat(res.data.data.records);
            for(let i=0;i<that.examData.length;i++){
              numList.push(that.examData[i].userExamNumber)
              numList2.push(that.studySuccess[i].todayLearnNumber)
            }
            that.personExamMax = (Math.max(...numList)*1.1)>0?(Math.max(...numList)*1.1):100;
            that.personStudyMax = (Math.max(...numList2)*1.1)>0?(Math.max(...numList2)*1.1):100;
            that.examTotalPage = res.data.data.pages;
            that.examTotalNum = res.data.data.total;
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 折线图改进度条日增学习次数
      getBranchData(){
        let that = this;
        let obj = {
          current: that.studyCurrentPage,
          size: 4,
          "workDate":that.valueData
        }
        branchData(obj).then((res)=>{
        
          if(res.data.code == 200){
            let numList = [];
            //日新增学习次数的数组
            that.studyList = that.studyList.concat(res.data.data.records);
            for(let i=0;i<that.studyList.length;i++){
              numList.push(that.studyList[i].todayLearnNumber)
              
            }
            // 日增学习最大数—
            that.studyPersonExamMax = (Math.max(...numList)*1.1)>0?(Math.max(...numList)*1.1):100;
           
            //日新增学习次数的页码
            that.studyListPage = res.data.data.pages;
             //日新增学习次数的总数
            that.studyListNum = res.data.data.total;
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
          // if(res.data.code == 200){
          //   that.learnLineData = res.data.data.list;
          //   that.learnLineData.forEach((value , index) => {
          //     value['type'] = 'line'
          //     value['smooth'] = true
          //   })
          //   that.lineNameList = that.learnLineData.map(item => {
          //      return item.name;
          //   })
          //   that.lineName = res.data.data.dateList.map(item => {
          //      return item.split('-')[2] + '日';
          //   })
          //   // that.getBranchLineData();
          // }
        })
      },
      // 个工种人数___________________________
      getWorkType(){
        let that = this;
        let data={
          current: 1,
          size: 200,
          "workDate":that.valueData
        }
        workType(data).then((res)=>{
          if(res.data.code == 200){
            that.workTypeList = res.data.data.records;
            that.studyTotal=res.data.data.total
            that.getWorkTypeData();
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 所属单位列表
      changeSectionPage(){
        this.sectionPage = this.sectionPage + 1;
        this.getBranchList();
      },
      getBranchList(){
        let that = this;
        let obj = {
          current: that.sectionPage,
          size: 6,
          "workDate":that.valueData
        }
        branchList(obj).then((res)=>{
          if(res.data.code == 200){
            that.sectionList = that.sectionList.concat(res.data.data.records);
            that.sectionTotal = res.data.data.pages;
            that.sectionTotalNum =  res.data.data.total;
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // router____跳转——————————————————————————
      getSectionInfo(id, name){
        sessionStorage.setItem('sourseId', id);
        // sessionStorage.setItem('type', 3);
        sessionStorage.setItem('m-name', name)
        var u = navigator.userAgent,app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //如果输出结果是true就判定是android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //根据输出结果true或者false来判断ios终端
        var isInsert=false
          try{
             isInsert= JSON.parse(window.AzqBridge.getSwitchParam()).isInsert
          }catch(e){
          } 
        if(isAndroid&& isInsert ){
          let  datas={url:"https://www.anzhique.com/dataAdmin/#/m-workArea?id="+id+"&type=4"}
          let data=JSON.stringify(datas)
            window.AzqBridge.openWebview(data)
        }else if(isiOS && this.$route.query.iOS==1){
             window.webkit.messageHandlers.openWebview.postMessage("https://www.anzhique.com/dataAdmin/#/m-workArea?id="+id+"&type=4&iOS=1")
        }else{
            this.$router.push({
              path:'/m-workArea',
              query:{
                id: id,
                type: 4
              }
            })
          }

        
      },
       setIsInapp(event){
       if(event){
          this.isInIosApp=true
        }
        console.log("setIsInapp",event)
        
      },
    // 排行榜
     getRankData(){
         let that = this;
        studyRank({'workDate':that.valueData}).then((res)=>{
          if(res.data.code == 200){
            that.rankList = res.data.data;
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 折线图
      // getBranchLineData(){
      //   let that = this;
      //   var chartDom = document.getElementById('my_chart_line');
      //   var myLine = this.$echarts.init(chartDom);
      //   var option;
      //   option = {
      //     tooltip: {
      //       trigger: 'axis',
      //       confine: true,
      //     },
      //     legend: {
      //       bottom: '0%',
      //       textStyle: { //图例文字的样式
      //         color: '#333',
      //         fontSize: 10
      //       },
      //       data: that.lineNameList
      //     },
      //     grid: {
      //       left: '2%',
      //       right: '4%',
      //       top: '4%',
      //       bottom: '32%',
      //       containLabel: true
      //     },
      //     xAxis: {
      //       type: 'category',
      //       data: that.lineName,
      //        show:false,
      //     },
      //     yAxis: {
      //       type: 'value'
      //     },
      //     series: that.learnLineData
      //   };
      //   option && myLine.setOption(option);
      //   setTimeout(function (){
      //       window.onresize = function () {
      //         myLine.resize();
      //       }
      //   },200)
      // },
      // 饼状图
      getWorkTypeData(){
        var chartDom = document.getElementById('my_chart');
        var myChart = this.$echarts.init(chartDom);
        var index = 0;//默认选中高亮模块索引
        var option;

        option = {
          tooltip: {
            trigger: 'item',
            position:[80,160]
          },
          legend: {
            type:"scroll",
            bottom: '0%',
            left: 'center',
            show:false,
            selectedMode:false,//取消图例上的点击事件
          },
          series: [
            {
              name: '工种人数',
              type: 'pie',
              top:0,
              radius: ['50%', '80%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 0
              },
              label: {
                show: false,
                position: 'center',
                formatter: '{b} \n\n {c} 人'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show:false,
								// normal: {
								// 	lineStyle: {
								// 		color: 'red'
								// 	},
								// 	smooth: 0.2,
								// 	// length: this.standSize / 50,
								// 	// length2: this.standSize / 100,
								// }
							},
            
              data: this.workTypeList
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
        this.learnData=[]
        this.rankList=[]
        this.sectionList=[]
        this.examData=[]
        this.studyList=[]
        this.studySuccess=[]
        this.getTotalData();
        this.getLearnInfo();
        this.getExamInfo();
        this.getBranchList();
        this.getRankData();
        this.getBranchData();
        this.getWorkType()
        sessionStorage.setItem('getDate',this.valueData);
      },
      clickActiveExam(active){
        this.activeExam=active
      }
    }
  }
</script>

<style scoped="scoped">
	.mainCounts{
		padding: 2rem 2rem 4rem 2rem;
    font-size: 1.4rem;
    background-color: #fff;
	}
  .mainCounts .header{
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    padding: 1rem 2rem 0 2rem;
    box-sizing: border-box;
  }
  .title{
    color: #333;
    font-weight: bold;
    font-size: 1.8rem;
    display: flex;
    justify-content: flex-start;
    margin-top: 2.4rem;
    margin-bottom: 2rem;
  }
  .title .line{
    width: 0.4rem;
    height: 2.5rem;
    background: #377DFF;
    border-radius: 2px;
    margin-right: 1rem;
  }
  .cardList{
    display: flex;
    justify-content: space-between;
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
  .name{
    font-size: 13px;
    color: #AAAAAA;
  }
  /* .cardList .item .t1{
    color: #2A70F1;
  }
  .cardList .item .t2{
    color: #81D32F;
  }
  .cardList .item .t3{
    color: #FBAC3B ;
  }
  .cardList .item .t4{
    color: #896DFF;
  } */
  .cardList .item .num{
    font-size: 2.2rem;
    font-weight: bold;
    text-align: right;
    padding-top: 10px;
    width:100%;
    word-wrap : break-word ;
  }
  .learnCard{
    width: 100%;
    padding: 1.2rem 2rem;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 2px 15px 0px rgba(205,219,236,0.4);
    border-radius: 8px;
    box-sizing: border-box;
    margin-top: 1rem;
  }
  .learnCard .cardLf{
    width: 86%;
  }
  .learnCard .name{
    font-size: 1.4rem;
    color: #FE7636;
    font-weight: bold;
    text-align: left;
    margin-bottom: 4px;
  }
  .learnCard img{
    width: 3rem;
    height: 3rem;
    margin-top: 1rem;
  }
  .learnCard .num span{
    font-size: 2.6rem;
    font-weight: bold;
    color: #333;
  }
  .cardList .item .num span{
    font-size: 1.4rem;
    font-weight: normal;
  }
  .part_info .pItem{
    margin-top: 1.5rem;
    box-shadow: 0px 2px 1.5rem 0px rgba(205,219,236,0.4);
    border-radius: 8px;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .part_info .pHd{
    font-size: 1.6rem;
    padding: 1rem;
    text-align: left;
    width: 100%;
    font-weight: bold;
    border-bottom: 1px solid #E9E9E9;
    box-sizing: border-box;
  }
  .part_info .dataList{
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .part_info .dataList>div{
    width: 33.3%;
    text-align: center;
    padding: 1rem 0;
  }
  .part_info .dataList>div.type2{
    width: 33.3%;
  }
  .part_info .dataList .result{
    font-size: 1.8rem;
    font-weight: 500;
  }
  .part_info .dataList .result span{
    font-size: 1.2rem;
    font-weight: normal;
  }
  .part_info .data1{
    color: #333;
  }
  .part_info .data2{
    color: #896DFF;
  }
  .part_info .data3{
    color: #FBAC3B;
  }
  .part_info .data4{
    color: #81D32F;
  }
  .part_info .info{
    font-size: 1.2rem;
    color: #AAAAAA;
    margin-top: 2px;
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
    border-left: 0.6rem solid #E6F6D5;
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
    color: #333333;
  }
  .examList .item .name .num{
    color: #81D32F;
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
    background: linear-gradient(270deg, #B7EB5C 0%, #81D32F 100%);
    border-radius: 4px 0px 0px 4px;
  }
  .study .item .progress .active{
    width: 80%;
    height: 1rem;
    background: linear-gradient(270deg, #68B4FF 0%, #377DFF 100%);
    border-radius: 4px 0px 0px 4px;
  }
  .study .item .name .num{
    color: #377DFF;
  }
  .study .item{
    border-color:rgba(55, 125, 255, .2);
  }
  .sectionList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .sItem{
    width: 49%;
    padding: 1.5rem 0.8rem;
    box-shadow: 0px 2px 1.5rem 0px rgba(205,219,236,0.4);
    border-radius: 0.8rem;
    border-left: 0.6rem solid #D7E5FF;
    box-sizing: border-box;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: left;
    margin-top: 1rem;
  }
  .sItem .info{
    font-size: 1.3rem;
    color: #AAAAAA;
    margin-top: 6px;
    font-weight: normal;
  }

  .studyRank{
    width: 100%;
    border-radius: 15px;
    margin:0 auto;
    background: linear-gradient(270deg, #68B4FF 0%, #377DFF 100%);
    display: flex;
    justify-content: space-between;
    padding: 6px 20px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
  }
  .rank_item{
    padding-top: 20px;
  }
  .rank_items{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:5px 20px;
    padding-right: 6px;
    color: #333333;
    font-size: 16px;
    font-weight: 600;
    margin-top:10px;
  }
  .rankIcon{
    width: 25px;
    height:30px;
    
  }
  .rankIcon img{
    width: 100%;
  }
  .rank_study_num{
    width: 30%;
  }.rank_item_name{
    width: 52%;
    text-align: left;
    font-size:16px;
    color: #333333;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .header{
    display: flex;
    justify-content: space-between;
    line-height: 40px;
  }
  .examNav{
    display: flex;
  }
  .examNav{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size:16px;
    color: #AAAAAA;
  }
  .active-exam-nav{
    font-size:1.8rem;
    color: #333333;
  }
  .header{
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 999;
    width: 100%;
    box-sizing: border-box;
    left: 0;
  }
  .lf{
    width: 100%;
  }
  .t1,.t2,.t3,.t4,.t5,.t6{
    position: relative;
  }
  .t1::after,.t2::after,.t3::after,.t4::after,.t5::after,.t6::after{
      content: "";
      display: inline-block;
      width: 20px;
      height: 2px;
      background: #fff;
      position: absolute;
      left: 0;
      bottom:-10px;
  }
.item .lf,.lf .name{
    color: #fff !important;
  }
.subordinateUnits{
  background:url("../../../static/subordinateUnitsNumber.png") no-repeat;
  background-size: 100% 100%;
}
.totalUserNumber{
  background:url("../../../static/totalUserNumber.png") no-repeat;
  background-size: 100% 100%;
}
.userLeaveNumber{
  background:url("../../../static/userLeaveNumber.png");
  background-size: 100% 100%;
}
.userLoginNumber{
  background:url("../../../static/userLoginNumber.png");
  background-size: cover;
}
.userLearnNumber{
  background:url("../../../static/userLearnNumber.png");
  background-size: 100% 100%;
}
.learnNumber{
  background:url("../../../static/learnNumber.png");
  background-size: 100% 100%;
}
.userExamNumber{
  background:url("../../../static/userExamNumber.png");
  background-size: 100% 100%;
}
.userTaskFinishNumber{
  background:url("../../../static/userTaskFinishNumber.png");
  background-size: 100% 100%;
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
.mainCounts .titleName{
  width: 16rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.focusing:focus{
  border: none !important;
}
</style>