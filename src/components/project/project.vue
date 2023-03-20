<template>
  <div class="mianCont home">
    <!-- <img src="https://anzhique.oss-cn-hangzhou.aliyuncs.com/static/loginBg1.png" alt=""> -->
    <div class="hdNav">
      <div class="hdLeft">
        <div class="name">{{projectName}}数据看板</div>
        <div>{{currentTime}} <span>{{currentTimeStr}}</span></div>
      </div>
      <div class="dataBox">
       <!-- <el-date-picker
          v-model="valueData"
          type="date"
          :clearable="false"
          :editable="false"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <div class="el-icon-caret-bottom"></div> -->
      </div>
    </div>

    <div class="datePicker" style="padding:10px;" >
      <div class="datePickerBack" @click="backPage">返回上一页</div>
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


    <div style="padding: 0 20px;">
      <div class="content">
        <div class="leftBox">
          <div class="topCard">
            <div class="peoType">
              <div class="show_icon" style="padding-left:40px;">
                <div ><img class="manber_blue" src="../../../static/manber_black.png" alt=""> </div>
                <div class="total" style="padding-left:12px;"> 人员总数    <b style="padding-left:70px;">{{personTotal}}</b> <span>人</span></div>
              </div>
              <div v-show="personTotal>0" id="typeChart" style="width: 450px;height:450px;"></div>
              <div class="noResult" v-show="personTotal == 0">
                <img src="../../../static/noResult.png" alt="">
                <div>暂无数据，请先添加人员~</div>
              </div>
            </div>
            <div class="group">
              <!-- <div class="total">班组学习情况：<b>{{totalGroup}}</b> <span>个</span></div> -->
              <!-- <div class="total">班组学习情况</div> -->

              <div class="showb_btn">
                <div class="show_icon" style="padding-left:40px;">
                  <div ><img style="margin-top:5px; width:24px;" class="manber_blue" src="../../../static/round_black.png" alt=""> </div>
                  <div class="total" style="padding-left:12px;">{{chartCurrent==1? '学习任务完成率':'学习覆盖率'}}</div>
                </div>
              <div class="show_icon part_table" style="padding-right:40px;">
                <div @click="changeEchart('1')" :class="chartCurrent == '1'?'active':''">学习任务完成率</div>
                <div @click="changeEchart('2')" :class="chartCurrent == '2'?'active':''">学习覆盖率</div>
              </div>
              </div>

              <div v-if="chartCurrent==2">
                <div class="groupList" v-if="totalGroup > 0">
                <div class="groupItem" v-for="item in groupDataList" :key="item.id">
                  <div class="name">{{item.name}}</div>
                  <div class="progressBox">
                    <div class="progress">
                      <div class="active" :style="'width:'+ (item.userLearnNumber/item.userNotLeaveNumber)*100 + '%'"></div>
                    </div>
                    <div class="result" v-if="item.userNotLeaveNumber!=0"><span class="percentage">{{parseInt((item.userLearnNumber/item.userNotLeaveNumber)*1000)/10 + '%'}}</span></div>
                    <div class="result" v-if="item.userNotLeaveNumber==0"><span class="percentage"  style="font-size:16px;">暂无人员</span></div>
                    <div class="result" style="flex: 1;text-align: center;">({{item.userLearnNumber}}/{{item.userNotLeaveNumber}})</div>
                  </div>
                </div>
                </div>

                <div class="noResult" v-if="totalGroup == 0">
                  <img src="../../../static/noResult.png" alt="">
                  <div>暂无数据，请先添加班组~</div>
                </div>
                <div style="text-align: right;padding-right: 30px;" v-if="totalGroup > 6">
                  <el-pagination
                    :page-size="6"
                    @current-change="currentPageFun"
                    layout="prev, pager, next"
                    :total="totalGroup">
                  </el-pagination>
                </div>
              </div>


              <div v-if="chartCurrent==1">
                <div class="groupList" v-if="totalGroup > 0">
                <div class="groupItem" v-for="item in groupDataList" :key="item.id">
                  <div class="name">{{item.name}}</div>
                  <div class="progressBox">
                    <div class="progress">
                      <div class="active" :style="'width:'+ (item.userTaskFinishNumber/item.userNotLeaveNumber)*100 + '%'"></div>
                    </div>
                    <div class="result" v-if="item.userNotLeaveNumber!=0"><span class="percentage">{{parseInt((item.userTaskFinishNumber/item.userNotLeaveNumber)*1000)/10 + '%'}}</span></div>
                    <div class="result" v-if="item.userNotLeaveNumber==0"><span class="percentage" style="font-size:16px;">暂无人员</span></div>
                    <div class="result" style="flex: 1;text-align: center;">({{item.userTaskFinishNumber}}/{{item.userNotLeaveNumber}})</div>
                  </div>
                </div>
                </div>

                <div class="noResult" v-if="totalGroup == 0">
                  <img src="../../../static/noResult.png" alt="">
                  <div>暂无数据，请先添加班组~</div>
                </div>
                <div style="text-align: right;padding-right: 30px;" v-if="totalGroup > 6">
                  <el-pagination
                    :page-size="6"
                    @current-change="currentPageFun"
                    layout="prev, pager, next"
                    :total="totalGroup">
                  </el-pagination>
                </div>
              </div>
              
              <div class="hoverBtn"><el-tooltip class="item" effect="dark" :content="chartCurrent ==1?'学习完成人数/在场学习人数':'在场学习人数/在场人数'" placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
              
            </div>

          </div>
          <div class="bottomCard">
            <div class="title">
              <div class="show_icon">
                <div ><img style="margin-top:6px;vertical-align: bottom; width:30px;" class="manber_blue" src="../../../static/book_black.png" alt=""> </div>
                 <div class="label" style="padding-left:12px;">个人学习情况</div>
              </div>
              <el-select v-model="valueStudy" @change="getCurrentGroup" clearable filterable placeholder="请选择所属班组" style="font-size:16px;">
                <el-option v-for="item in searchGroupList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </div>
            <div class="headerList">
              <div class="name">姓名</div>
              <div class="type">岗位/工种</div>
              <div class="dateItem">所属班组</div>
              <div class="study">学习进度</div>
              <div class="total">学习课件数</div>
            </div>
            <div class="contList" v-show="peopleStudyList.length>0" v-for="item in peopleStudyList" :key="item.id">
              <div class="name">{{item.name}}</div>
              <div class="type">{{item.workTypeName}}</div>
              <div class="dateItem">{{item.teamName}}</div>
              <div class="study">
                <div class="progress">
                  <div class="active" :style="'width:' + (item.learnNumber/personStudyMax)*100 + '%'"></div>
                </div>
              </div>
              <div class="total">{{item.learnNumber}} 节</div>
            </div>
          <!-- <div class="contList not" v-if="peopleStudyList.length == 0">
              该班组暂无人员
            </div> -->
            <div class="noResult" v-if="peopleStudyList.length == 0">
              <img src="../../../static/groupIcon.png" alt="">
              <div>当前班组已离场，暂无人员数据~</div>
            </div>
            <div style="text-align: right;padding-right: 30px;" v-if="personNum > 6">
              <el-pagination
                :page-size="6"
                :current-page="personPage"
                @current-change="currentPersonFun"
                layout="prev, pager, next"
                :total="personNum">
              </el-pagination>
            </div>
          </div>
        </div>



        <div class="rightBox">
          <!-- <div class="label">学习数据</div> -->

          <div class="show_background">
          <div class="show_icon">
                <div ><img style="margin-top:4px;width:26px;" class="manber_blue" src="../../../static/study_black.png" alt=""> </div>
                 <div class="label" style="padding-left:12px;">学习数据</div>
          </div>
            <div class="numberList">
              <div class="nItem">
                <div class="imgicon"><img src="../../../static/study_logo.png" alt=""></div>
                <div class="hedDiv" style="color:#FF8F00;">{{learnDataObj.learnNumber}}</div>
                <div class="result">总看课数（节）</div>
              </div>
              <div class="nItem">
                <div class="imgicon"><img src="../../../static/test_paper.png" alt=""></div>
                <div class="hedDiv" style="color:#7ED321;" >{{learnDataObj.examNumber}}</div>
                <div class="result">考试试卷（套）</div>
              </div>
            </div>
          </div>

          <div class="show_background">
            <div class="show_icon">
                  <div ><img style="margin-top:4px;width:26px;" class="manber_blue" src="../../../static/study_black.png" alt=""> </div>
                  <div class="label" style="padding-left:12px;">综合数据</div>
            </div>

            
            <div class="examBox">
              <div id="examChart" style="width: 380px;height:380px;"></div>
            </div>
            <div class="label" >考试人数占比</div>
           
            <div class="examBox">
              <div id="levelChart" style="width: 380px;height:380px;"></div>
            </div>
             <div class="label">学习覆盖率</div>
          </div>
        </div>


        
      </div>
    </div>
  </div>
</template>

<script>
  import {workType,branchList,allGroup,personInfo,totalData} from '@/http/home.js'
  export default {
    name: '',
    data () {
      return {
        projectName: '',
        currentTime: '',
        currentTimeStr: '',
        valueStudy: '',
        personTypeList: [],
        personTypeName: [],
        personTotal: 0,
        groupPage: 1,
        totalGroup: 0,
        groupMaxNum: 0,
        groupDataList: [],
        searchGroupList: [],
        personPage: 1,
        personNum: 0,
        personStudyMax: 0,
        peopleStudyList: [],
        learnDataObj: {},
        chartCurrent: 1,
        valueData:"",
         showOnPick:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      }
    },
    mounted() {
      this.getPeopleData();
      this.getLearnData();
    },
    created() {
      console.log(sessionStorage.getItem("getDate"))
      if(sessionStorage.getItem("getDate")==null){
        this.valueData = this.getDate(-1);
      }else{
        this.valueData=sessionStorage.getItem("getDate")
      }
      sessionStorage.setItem('sourseId', this.$route.query.id);
      sessionStorage.setItem('type', this.$route.query.type);
      this.getPeopleInfo();
      this.getNowTimeFun();
      this.getGroupList();
      this.getAllGroup();
      if(sessionStorage.getItem("projectName")!=null){
        this.projectName=sessionStorage.getItem("projectName")
      }else{
         this.projectName=""
      }
    },
    methods:{
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
        // console.log(dateTime)
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
      getNowTimeFun(){
        let that = this;
        setInterval(function(){
          that.getNowTime()
        }, 1000)
      },
      // 人员类型数据__________________________________________
      getPeopleData(){
        var that = this;
        let data={
          current: 1,
          size:200,
          "workDate":that.valueData
        }
        workType(data).then((res)=>{
          if(res.data.code == 200){
            that.personTypeList = res.data.data.records;
            let numList = [];
            let sum = 0;
            for(let i=0;i<that.personTypeList.length;i++){
              that.personTypeName.push(that.personTypeList[i].name)
              numList.push(JSON.parse(that.personTypeList[i].value))
            }
            numList.forEach(item =>{
                sum = sum + item
            })
            that.personTotal = sum;
            this.getTypeLine();
          }
        })
      },
      // 班组列表
      currentPageFun(val){
        this.groupPage = val;
        this.getGroupList()
      },
      // 下面是学习任务完成率
      getGroupList(){
        var that = this;
        let obj = {
          current: this.groupPage,
          size: 6,
          "workDate":that.valueData
        }
        branchList(obj).then((res)=>{
          if(res.data.code == 200){
            that.groupDataList = res.data.data.records;
            that.totalGroup = res.data.data.total;
            if(this.personPage == 1){
              that.groupMaxNum = res.data.data.records[0]?(res.data.data.records[0].number)*1.2:100;
            }
          }
        })
      },
      // 个人学习情况 
      getAllGroup(){
        let that = this;
        allGroup().then((res)=>{
          if(res.data.code == 200){
            that.searchGroupList = res.data.data;
            // if(that.searchGroupList.length > 0){
            //   that.valueStudy = that.searchGroupList[0].id;
            // }
          }
        })
      },
      backPage(){
        this.$router.go(-1)
      },
      getCurrentGroup(val){
        this.valueStudy = val;
        this.personPage = 1;
        this.getPeopleInfo();
      },
      currentPersonFun(val){
        this.personPage = val;
        this.getPeopleInfo();
      },
      getPeopleInfo(){
        var that = this;
        let obj = {
          teamId: that.valueStudy,
          current: this.personPage,
          size: 6,
          "workDate":that.valueData
        }
        personInfo(obj).then((res)=>{
          if(res.data.code == 200){
            that.peopleStudyList = res.data.data.records;
            that.personNum = res.data.data.total;
            for(let i=0;i<that.peopleStudyList.length;i++){
              if(!that.peopleStudyList[i].teamName){
                that.peopleStudyList[i].teamName = '暂无班组';
              }
            }
            if(this.personPage == 1){
              that.personStudyMax = res.data.data.records[0]?(res.data.data.records[0].learnNumber)*1.2:100;
            }
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
              value: that.learnDataObj.userExamNumber,
              itemStyle: {
                   color: {
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      type: 'linear',
                      global: false,
                      colorStops: [
                        {
                          offset: 0,
                          color: '#78A3FF'
                        },
                        // {
                        //   // 注意：该亮色部分仅为说明渐变方向实际应用中请勿如此。
                        //   offset: 0.5,
                        //   color: '#78A3FF'
                        // },
                        {
                          offset: 1,
                          color: '#6C7DFF'
                        }
                      ]
                    }
                }
            }
            let obj2 = {
              name: '未考人数',
              value:( parseInt(that.learnDataObj.totalUserNumber-that.learnDataObj.userLeaveNumber)-that.learnDataObj.userExamNumber),
              itemStyle: {
                   color: {
                      x: 1,
                      y: 0,
                      x2: 0,
                      y2: 0,
                      type: 'linear',
                      global: false,
                      colorStops: [
                        {
                          offset: 0,
                          color: '#FFD433'
                        },
                        {
                          offset: 1,
                          color: '#FEA917'
                        }
                      ]
                    }
                }
            }
            let obj3 = {
              name: '已学人数',
              value: that.learnDataObj.userLearnNumber
            }
            let obj4 = {
              name: '在场总人数',
              value: parseInt(that.learnDataObj.totalUserNumber-that.learnDataObj.userLeaveNumber)
            }
            let examList = [];
            let passList = [];
            examList.push(obj2);
            examList.push(obj);
            passList.push(obj3);
            passList.push(obj4);
            if(examList){
              this.getExamLine(examList);
            }
            if(passList){
              this.getLevelLine(passList);
            }
          }
        })
      },
      // 工种饼图
      getTypeLine(){
        let myChart = this.$echarts.init(document.getElementById('typeChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            textStyle: {
              color: "#333"
            }
          },
          legend: {
            show:true,
            type: 'scroll',
            orient: 'vertical',
            align:"right",
            right: 0,
            top: 20,
            itemWidth:20,  
            itemHeight:8,
            selectedMode:false,
            data: this.personTypeName
          },
          series: [
            {
              name: '工种统计',
              type: 'pie',
              radius: '55%',
              center: ['35%', '50%'],
              label:{            //饼图图形上的文本标签
                normal:{
                  show:false,
                  overflow: "truncate",
                  position:'outer', //标签的位置
                  textStyle : {
                    fontSize : 14,
                  },
                },
                
              },
              data: this.personTypeList,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      //考试占比
      getExamLine(examList){
        let myChart = this.$echarts.init(document.getElementById('examChart'));
        myChart.setOption({
          color: ['#73c0de', '#e6a23c'],
          tooltip: {
            trigger: 'item',
            formatter: "{a}<br/>{b}{c} 人",
          },
          legend: {
            bottom: '0%',
            left: 'right',
            orient: 'vertical',
            align: 'left',
            selectedMode:false,
          },
          series: [
            {
              name: '考试情况',
              type: 'pie',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal:{
                  show: true,
                  overflow: "truncate",
                
                  formatter: "{b}\n{c} 人",
                  textStyle : {
                    fontSize : 14,
                    // color: '#fff'
                  }
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 3
              },
              labelLine: {
                show: true
              },
              data: examList
            }
          ]
        })
      },
      getLevelLine(passList){
        let myChart = this.$echarts.init(document.getElementById('levelChart'));
        myChart.setOption({
          color: ['#00B478','#8537FF'],
          tooltip: {
            show:false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {d}%",
          },
          legend: {
            bottom: '0%',
            left: 'right',
            orient: 'vertical',
            align: 'left',
            selectedMode:false,
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              label: {
               normal:{
                 show: true,
                 overflow: "truncate",
                 position:'outer', //标签的位置 {b}\n{c}
                //  formatter: "{d}%\n{b}",
                 formatter: "{b}\n{c}",
                 textStyle : {
                   fontSize : 12,
                   // color: '#fff'
                 }
               }
              },
              labelLine: {
                show: true
              },
              data: passList
            }
          ]
        })
      },
    changeEchart(type){
          let that = this;
          that.chartCurrent = type;
          that.groupPage=1
          if(type == '2'){
            // that.$nextTick(function(){
            //   that.getBranchData();
            // })
          }
        },
    showChange(){
      this.getPeopleInfo();
      this.getNowTimeFun();
      this.getGroupList();
    }
    },
    
  }
</script>

<style scoped="scoped">
  .home{
    /* background-color: #F9FAFC; */
    
    padding-bottom: 40px;
  }
  .hdNav{
    width: 100%;
    padding: 10px 50px;
    background-color: #fff;
    color: #333;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 40px;
  }
  .noResult{
    color: #999;
    margin-top: 100px;
  }
  .noResult>div{
    margin-top: 10px;
  }
  .hdLeft{
    display: flex;
    justify-content: flex-start;
  }
  .hdLeft .name{
    margin-right: 90px;
  }
  .hdLeft span{
    display: inline-block;
    margin-left: 20px;
    font-size: 20px;
    font-weight: normal;
    font-family: fangsong;
  }
  .content{
    min-width: 1670px;
    display: flex;
    justify-content: center;
  }
  .content .leftBox{
    width: 66%;
    margin-right: 30px;
  }
  .content .leftBox .topCard{
    display: flex;
    justify-content: space-between;
  }
  .content .leftBox .topCard>div{
    width: 49%;
    min-height: 560px;
  }
  .content .rightBox{
    width: 32%;
  }
  .peoType,.group{
    width: 523px;
    height: 560px;
    box-shadow: -10px 10px 20px 0px rgba(30, 30, 30, 0.05);
    border-radius: 8px;
    background-color: #fff;
    padding: 40px 0;
    box-sizing: border-box;
    position: relative;
  }
  .peoType #typeChart{
    margin: 0 auto;
  }
  .peoType .total,.group .total{
    font-size: 24px;
    text-align: left;
    padding-left: 40px;
  }
  .peoType .total b,.group .total b{
    font-size: 40px;
  }
  .peoType .total span,.group .total span{
    font-size: 18px;
  }
  .group .groupList{
    padding: 30px 50px 10px 50px;
    box-sizing: border-box;
    font-size: 15px;
    text-align: left;
  }
  .groupList .progress{
    width: 60%;
    height: 11px;
    background: #EFF2F7;
    border-radius: 5px;
    position: relative;
    margin: auto 0;
    overflow: hidden;
  }
  .groupList .progress .active{
    /* width: 92%; */
    height: 11px;
    background: #3D88E4;
    border-radius: 4px 0px 0px 4px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 66;
  }
  .groupList .groupItem{
    margin-bottom: 16px;
  }
  .groupList .groupItem:last-of-type{
    margin-bottom: 0;
  }
  .groupItem .progressBox{
    display: flex;
    justify-content:flex-start;
  }
  .groupItem .progressBox .result{
    width:76px;
    color: #666;
    font-size: 16px;
    margin-left: 20px;
  }
  .bottomCard{
    padding: 40px 50px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: -13px 13px 27px 0px rgba(30, 30, 30, 0.05);
    border-radius: 8px;
    margin-top: 30px;
    min-height: 610px;
  }
  .bottomCard .title{
    display: flex;
    justify-content: flex-start;
  }
  .bottomCard .title .label{
    font-size: 26px;
    margin-right: 50px;
  }
  .headerList,.contList{
    margin: 30px 0 10px 0;
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
  }
  .headerList .name,.contList .name{
    width: 120px;
  }
  .headerList .type,.contList .type{
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .headerList .dateItem,.contList .dateItem{
    width: 240px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .headerList .study,.contList .study{
    width: 400px;
  }
  .headerList .total,.contList .total{
    width: 120px;
  }
  .contList{
    font-size: 15px;
    font-weight: normal;
    margin: 0;
    padding: 23px 0;
  }
  .contList.not{
    color: #999;
    display: block;
    text-align: center;
  }
  .contList .study .progress{
    width: 346px;
    height: 11px;
    background: #EFF2F7;
    border-radius: 5px;
    position: relative;
    margin: auto;
    overflow: hidden;
    margin-top: 5px;
  }
  .contList .study .progress .active{
    /* width: 277px; */
    height: 11px;
    background: #3D88E4;
    border-radius: 4px 0px 0px 4px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 88;
  }
  .rightBox{
    height: 100%;
    /* background-color: #fff;
    box-shadow: -10px 10px 20px 0px rgba(30, 30, 30, 0.05);
    border-radius: 8px;
    padding: 50px 50px 44px 50px; */
    box-sizing: border-box;
  }
  .rightBox .label{
    font-size: 24px;
    text-align: left;
  }
  .numberList{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  .numberList>div{
    width: 50%;
  }
  .numberList .hedDiv{
    display: flex;
    justify-content: center;
    padding-left: 10px;
    text-align: center;
    font-size: 40px;
    font-weight: 600;

  }
  .numberList .hedDiv .dian{
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background-color: #FF8F00;
    margin: auto 0;
  }
  .numberList .hedDiv .tag{
    font-size: 16px;
    padding: 6px 20px;
    background-color: #FF8F00;
    border-radius: 20px;
    color: #fff;
    margin-left: 20px;
  }
  .numberList .hedDiv .dian.type2,.numberList .hedDiv .tag.type2{
    background-color: #7ED321;
  }
  .numberList .result{
    margin-top: 10px;
  }
  .numberList .result b{
    font-size: 30px;
  }
  .numberList .result span{
    font-size: 15px;
  }
  .examBox #examChart,.examBox #levelChart{
    margin: 0 auto;
  }

  .show_icon{
    display: flex;
    align-items: center;
  }
  .show_icon img{
    margin-top: 16px;
    width: 30px;
  }
  .show_background{
    background-color: #fff;
    box-shadow: -10px 10px 20px 0px rgba(30, 30, 30, 0.05);
    border-radius: 8px;
    padding: 34px 20px 25px 40px;
    margin-bottom: 35px;
  }
  .showb_btn{
    display: flex;
    justify-content: space-between;
  }

  .part_table .active{
   color: #377DFF;
   font-size:16px;
  }
  .part_table .active::after{
   content:"";
   color: #377DFF;
   display: -webkit-box;
   width:40px;
   height:4px;
   background: #377DFF;
   border-radius: 2.4px;
   margin: 4px auto 0;
  }

  .part_table div{
    font-size: 16px;
    color: #AAAAAA;
    cursor: pointer;
    padding-right: 20px;
    font-weight: 600;
    height: 20px;
  }

  .hoverBtn{
      position: absolute;
      top: 17px;
      right: 20px;
  }
  .percentage{
    font-size: 24px;
    color: #377DFF;
  }
  .imgicon{
    width: 40px;
    margin: 0 auto;
  }
  .imgicon img{
    width: 100%;
  }
  .datePicker{
    color: #333333;
    text-align: right;
    padding-right: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.datePickerBack{
  padding-left:20px;
  color:#2A70F1;
  font-weight:600;

}
</style>
<style>
.mianCont .el-input__inner {
    width: 180px !important;
    font-size: 18px !important;
    border: none !important;
    background-color: transparent !important;
    color: #333333 !important;
}
.mianCont .bottomCard .el-input__inner{
  width: 200px !important;
  font-size: 14px !important;
  text-align: right;
  padding-right: 40px;
}
.mianCont .el-input__icon{
  font-size:20px !important;
  color: #333333 !important;
  
}
.mianCont .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 180px !important;
}
</style>