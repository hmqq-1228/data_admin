<template>
  <div class="mianCont">
    <div class="hdNav">
      <div class="hdLeft">
        <div class="name">集团（总览）数据看板</div>
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
        </el-date-picker>-->
        <div class="show_mask_btn" @click="hanldeShowMask">
          <div>项目切换</div>
          <div class="mask_icon"><i class="i"></i></div>
        </div> 
      </div>
    </div>

    <div class="datePicker" style="padding-top:82px;" >
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

    <div class="dataCont" :style="isSmallScreen?'padding: 0 0 0 0;':'padding: 0 50px 0 ;'" @click="showMask=false">
      <div class="left_cont topData">
        
        <div class="data_card">
          <div class="left_item">
            <div class="left_item_icon"><img src="../../../static/icons/allpepole.png" alt=""></div>
            <div class="left_item_text">
               <div class="name_tips">
                 <div class="left_item_name">指挥部总数 (个)</div>
                 <div><el-tooltip class="item" effect="dark" content="当前项目下子项目的个数" placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
                 </div>
              <div class="num">{{baseData.subordinateUnitsNumber!=null? baseData.subordinateUnitsNumber:'0'}}</div>
              <div class="update">更新时间：{{valueData}}  </div>
            </div>
          </div>
          <div class="left_item">
            <div class="left_item_icon"><img src="../../../static/icons/allnum.png" alt=""></div>
            <div class="left_item_text">
               <div class="name_tips">
                 <div class="left_item_name">总人数 (人)</div>
                 <div><el-tooltip class="item" effect="dark" content="当前项目下导入人员总数"  placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
                 </div>
             <div class="num">{{baseData.totalUserNumber!=null? baseData.totalUserNumber:'0'}}</div>
              <div class="update">更新时间：{{valueData}}  </div>
            </div>
          </div>


          <div class="left_item">
            <div class="left_item_icon"><img src="../../../static/icons/leave.png" alt=""></div>
            <div class="left_item_text">
               <div class="name_tips">
                 <div class="left_item_name">离场总人数（人）</div>
                 <div><el-tooltip class="item" effect="dark" content="当前项目下已离场的人员总数" placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
                 </div>
              <div class="num">{{baseData.userLeaveNumber!=null? baseData.userLeaveNumber:'0'}}</div>
              <div class="update">更新时间：{{valueData}}  </div>
            </div>
          </div>


          <div class="left_item">
            <div class="left_item_icon"><img src="../../../static/icons/passwrold.png" alt=""></div>
            <div class="left_item_text">
               <div class="name_tips">
                 <div class="left_item_name">登录总人数（人）</div>
                 <div><el-tooltip class="item" effect="dark" content="当前项目下已登录过APP/小程序的总累计人数，不包含离场/删除人数" placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
                 </div>
             <div class="num">{{baseData.userLoginNumber!=null? baseData.userLoginNumber:'0'}}</div>
              <div class="update">更新时间：{{valueData}}  </div>
            </div>
          </div>

          <div class="left_item">
            <div class="left_item_icon"><img src="../../../static/icons/book.png" alt=""></div>
            <div class="left_item_text">
               <div class="name_tips">
                 <div class="left_item_name">学习总人数（人）</div>
                 <div><el-tooltip class="item" effect="dark" content="当前项目下已学习过一门课程的总累计人数，不包含离场/删除人数" placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
                 </div>
             <div class="num">{{baseData.userLearnNumber!=null? baseData.userLearnNumber:'0'}}</div>
              <div class="update">更新时间：{{valueData}} </div>
            </div>
          </div>


          <div class="left_item">
            <div class="left_item_icon"><img src="../../../static/icons/evaluate.png" alt=""></div>
            <div class="left_item_text">
               <div class="name_tips">
                 <div class="left_item_name">学习总次数（次）</div>
                 <div><el-tooltip class="item" effect="dark" content="当前项目下所有员工已经学习的课程总数" placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
                 </div>
             <div class="num">{{baseData.learnNumber!=null? baseData.learnNumber:'0'}}</div>
              <div class="update">更新时间：{{valueData}}  </div>
            </div>
          </div>

          <div class="left_item">
            <div class="left_item_icon"><img src="../../../static/icons/study.png" alt=""></div>
            <div class="left_item_text">
               <div class="name_tips">
                 <div class="left_item_name">考试人数（人）</div>
                 <div><el-tooltip class="item" effect="dark" content="当前项目下所有员工参与过一次考试的总人数" placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
                 </div>
             <div class="num">{{baseData.userExamNumber!=null? baseData.userExamNumber:'0'}}</div>
              <div class="update">更新时间：{{valueData}}  </div>
            </div>
          </div>

          <div class="left_item">
            <div class="left_item_icon"><img src="../../../static/icons/sussece.png" alt=""></div>
            <div class="left_item_text">
               <div class="name_tips">
                 <div class="left_item_name">学习完成任务数（人）</div>
                 <div><el-tooltip class="item" effect="dark" content="当前项目下所有完成学习任务的总人数，统计时间周一至周日" placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
                 </div>
             <div class="num">{{baseData.userTaskFinishNumber!=null? baseData.userTaskFinishNumber:'0'}}</div>
              <div class="update">更新时间：{{valueData}}  </div>
            </div>
          </div>


        </div>


      </div>
      <div class="dataItem">
          <div class="part_table part_tableNew">
            <div class="partName hasRight">
              <div class="lf" v-show="chartCurrent == '1'">
                <img src="../../../static/exam_num.png" alt="">
                <div>各单位考试人数</div>
              </div>
              <div class="lf" v-show="chartCurrent == '2'">
                <img src="../../../static/exam_num.png" alt="">
                <div>各单位新增学习次数</div>
              </div>
              <div class="lf" v-show="chartCurrent == '3'">
                <img src="../../../static/exam_num.png" alt="">
                <div>学习周任务完成数</div>
              </div>
              <div class="rt">
                <div @click="changeEchart('1')" :class="chartCurrent == '1'?'active':''">各单位考试人数</div>
                <div @click="changeEchart('2')" :class="chartCurrent == '2'?'active':''">新增学习次数</div>     
                <div @click="changeEchart('3')" :class="chartCurrent == '3'?'active':''">学习周任务完成数</div>
              </div>
            </div>


            <div class="chartBox" v-show="examNumList.length != 0&&chartCurrent == '1'">
              <div id="my_chart" style="width: 92%;height: 302px;"></div>
              <div class="el-icon-caret-left icon" v-if="studyCurrent > 1" @click="reduceNum(1)"></div>
              <div class="el-icon-caret-left icon dis" v-else></div>
              <div></div>
              <div class="el-icon-caret-right icon" v-if="studyCurrent < studyTotal" @click="addNumber(1)"></div>
              <div class="el-icon-caret-right icon dis" v-else></div>
            </div>
            <div class="noResult" v-show="examNumList.length == 0&&chartCurrent == '1'">
              <img src="../../../static/noResult.png" alt="">
              <div>暂无数据</div>
            </div>

    <!-- 第二个组装图 -->
             <div class="chartBox" v-show="examNumList.length != 0&&chartCurrent == '2'">
              <div id="my_chart_two" style="width: 92%;height: 302px;"></div>
              <div class="el-icon-caret-left icon" v-if="studyCurrent2 > 1" @click="reduceNum(2)"></div>
              <div class="el-icon-caret-left icon dis" v-else></div>
              <div></div>
              <div class="el-icon-caret-right icon" v-if="studyCurrent2 < studyTotal" @click="addNumber(2)"></div>
              <div class="el-icon-caret-right icon dis" v-else></div>
            </div>
            <div class="noResult" v-show="examNumList.length == 0&&chartCurrent == '2'">
              <img src="../../../static/noResult.png" alt="">
              <div>暂无数据</div>
            </div>

            <!-- 第三个组装图 -->
            <div class="chartBox" v-show="examNumList.length != 0&&chartCurrent == '3'">
              <div id="my_chartpp" style="width:92%;height: 302px;"></div>
              <div class="el-icon-caret-left icon" v-if="studyCurrent3 > 1" @click="reduceNum(3)"></div>
              <div class="el-icon-caret-left icon dis" v-else></div>
              <div></div>
              <div class="el-icon-caret-right icon" v-if="studyCurrent3 < studyTotal" @click="addNumber(3)"></div>
              <div class="el-icon-caret-right icon dis" v-else></div>
            </div>
            <div class="noResult" v-show="examNumList.length == 0&&chartCurrent == '3'">
              <img src="../../../static/noResult.png" alt="">
              <div>暂无数据</div>
            </div>
        </div>

        <div class="part_table part_table_new_right ">
          <div class="partName">
            <img src="../../../static/work_type.png" alt="">
            <div>在场工种总人数</div>
          </div>
          <div class="work_type" v-show="workTypeList.length > 0">
            <div class="type_left">
               <div :title="work.rate!=0? work.name+' 占比  '+work.rate:work.name+' 占比 0.001'" v-for="(work,index) in workTypeList" :key="index">
                <div class="name">{{work.name}}</div>
                <div class="percentPants">
                  <div class="num"><span>{{work.value}}</span> 人</div>
                  <div class="hr"></div>
                  <div class="percent"><span style="color:#AC5AFF;">{{work.rate!=0?Math.floor(work.rate*10000)/100:0.01}} </span> %</div>
                </div>
              </div>
            </div>
          </div>


          <div class="noResult" v-show="workTypeList.length == 0">
            <img src="../../../static/noResult.png" alt="">
            <div>暂无数据，请先添加工种~</div>
          </div>

          <div class="pagination" style="padding-top:56px;">
            <el-pagination
              layout="prev, pager, next"
              :page-size = "8"
              @current-change="workCurrentPageFun"
              :total="workDataList.total">
            </el-pagination>
          </div>

        </div>
      </div>

    </div>




    <div class="dataCont" :style="isSmallScreen?'padding: 0 0 40px 0;':'padding: 0 50px 40px 50px;'" @click="showMask=false">


      <div class="dataContNewTable">

        <div class="left_cont row2" style="padding-bottom:30px;">
          <!-- <div class="part_table" style="min-height:630px;"> -->
          <div class="part_table" style="height:100%;">
            <div class="partName" style="display:flex;justify-content: space-between;">
              <div class="partName">
                <img src="../../../static/part.png" alt="">
                <div>各单位学习情况</div>
              </div>
              <div class="show_hover">
                <el-tooltip class="item" effect="dark" content=""  placement="top">
                  <div class="hovers">指标解析</div>
                  <div slot="content">
                      <span>当前项目各单位的学习情况</span><br/><br/>
                      <span>人员总数: 导入项目的总人数，已剔除删除人数</span><br/><br/>
                      <span>在场人数: 项目当前人数，已剔除删除、离场人数</span><br/><br/>
                      <span>离场人数: 已经离场人数</span><br/><br/>
                      <span>在场登录人数: 在场人数中，已登录过APP/小程序的人数</span><br/><br/>
                      <span>在场学习人数: 在场人数中，已有一次学习行为的人数</span><br/><br/>
                      <span>在场考试人数: 在场人数中，已有过考试的人数，不计课后题</span><br/><br/>
                      <span>在场登录覆盖率: 登录人数/在场人数</span><br/><br/>
                      <span>在场学习覆盖率: 在场学习人数/在场人数</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
            <div class="partHd">
              <div class="name">单位名称</div>
              <div class="total">人员总数</div>
              <div class="total">在场人数</div>
              <div class="total">离场人数</div>
              <div class="num">在场登录人数</div>
              <div class="num">在场学习人数</div>
              <div class="num">在场考试人数</div>
              <div class="level">在场登录覆盖率</div>
              <div class="level">在场学习覆盖率</div>
            </div>
            <div class="partItem" v-for="item in learnData" :key="item.id">
              <div class="name">{{item.name}}</div>
              <div class="total">{{item.totalUserNumber}}</div>
              <div class="total">{{item.userNotLeaveNumber}}</div>
              <div class="total">{{item.userLeaveNumber}}</div>
              <div class="num">{{item.userLoginNumber}}</div>
              <div class="num">{{item.userLearnNumber}}</div>
              <div class="num">{{item.userExamNumber}}</div>
              <div class="level">{{item.loginRate>0?((item.loginRate)*100).toFixed(2):0}}%</div>
              <div class="level">{{item.learnRate>0?((item.learnRate)*100).toFixed(2):0}}%</div>
            </div>
            <div class="noResult" v-show="learnData.length == 0">
              <div class="partName">
                <img src="../../../static/noResult.png" alt="">
                <div>暂无数据，请先学习~</div>
              </div>
            </div>
            <div class="pagination" v-if="totalNumber > 7">
              <el-pagination
                layout="prev, pager, next"
                :page-size = "7"
                @current-change="currentPageFun"
                :total="totalNumber">
              </el-pagination>
            </div>
          </div>
        </div>

          <div class="part_table part_table_progress">
            <div class="partName" style="display:flex;justify-content: space-between;">
              <div class="partName" >
                <img src="../../../static/part.png" alt="">
                <div>学习次数排行榜-标段</div>
              </div>
              <div class="show_hover"><el-tooltip class="item" effect="dark" content="上周一至周日，新增学习次数排行前五名"  placement="top"><div class="hovers">指标解析</div></el-tooltip></div>
            </div>
            <div class="top_five">

              <div class="top_one" v-for="(item,index) in rankList" :key="item.value+index">
                <div class="top_item_topNum">TOP{{index+1}}</div>
                <div class="top_item_progress">
                  <div v-if="index==0"><el-progress :stroke-width="12" color="#00B277" :show-text="false" :percentage="item.value/studyListMaxNum*100"></el-progress></div>
                  <div v-if="index==1"><el-progress :stroke-width="12" color="#FEB836" :show-text="false" :percentage="item.value/studyListMaxNum*100"></el-progress></div>
                  <div v-if="index==2"><el-progress :stroke-width="12" color="#7B36FE" :show-text="false" :percentage="item.value/studyListMaxNum*100"></el-progress></div>
                  <div v-if="index==3"><el-progress :stroke-width="12" color="#E936FE" :show-text="false" :percentage="item.value/studyListMaxNum*100"></el-progress></div>
                  <div v-if="index==4"><el-progress :stroke-width="12" color="#FE7636" :show-text="false" :percentage="item.value/studyListMaxNum*100"></el-progress></div>
                  <div class="rank_name">{{item.name}}</div>
                </div>
                <div class="top_item_num">{{item.value}}次</div>
              </div>


            </div>
          </div>

      </div>


      <div class="right_cont row2">
        <div class="part_table belong"  >
          <div class="partName" style="margin-bottom: 20px;">
            <img src="../../../static/list.png" alt="">
            <div>下属单位列表</div>
          </div>
          <div class="right_cont_item">
            <div class="item" v-for="item in sectionList" :key="item.id">
              <div class="name" @click="getSectionInfo(item.id,item.name)">{{item.name}}</div>
              <!-- <div class="infoBtn" >查看该单位详情</div> -->
            </div>
        
          </div>
          <div class="noResult" v-show="sectionList.length == 0">
            <img src="../../../static/noResult.png" alt="">
            <div>暂无数据，请先添加下级部门~</div>
          </div>
          <div class="pagination" v-if="sectionTotal > 8">
            <el-pagination
              layout="prev, pager, next"
              @current-change="changeSectionPage"
              :page-size="18"
              :total="sectionTotal">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <div class="showMask" v-show="showMask">
        <div class="showMaskItem"  @click="getSectionInfo(item.id,item.name)" v-for="item in sectionList" :key="item.id">{{item.name}}</div>
    </div>

  </div>
</template>

<script>
  import {totalData,learnInfo,studyRank,workType,branchList,branchData} from '@/http/home.js'
  // var echarts = require('echarts');
  export default {
    name: '',
    data () {
      return {    
      	isSmallScreen: false,
        showMask:false,
        screenWidth: '',
        valueData: '',
        currentTime: '',
        currentTimeStr: '',
        // 基础信息
        baseData: {},
        // 学习信息
        totalNumber: 0,
        currentPage: 1,
        learnData: [],
        // 折线图
        chartCurrent: 1,
        lineName: [],
        lineNameList: [],
        learnLineData: [],
        // 考试信息
        studyList: [],
        xAxisName: [],
        examNumList: [],
        studyTotal: 0,
        studyCurrent: 1,
        studyCurrent2: 1,
        studyCurrent3:1,
        // 工种
        workTypeList: [],
        // 单位列表
        sectionList: [],
        sectionTotal: 0,
        sectionPage: 1,
        params:{},
        rankList:{},//
        showOnPick:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        workDataPage:1,
        workDataList:{},
        studyListMaxNum:0
      }
    },
    created() {
      if(sessionStorage.getItem("getDate")==null){
        this.valueData = this.getDate(-1);
      }else{
        this.valueData=sessionStorage.getItem("getDate")
      }
      sessionStorage.setItem('sourseId', this.$route.query.id);
      sessionStorage.setItem('type', this.$route.query.type);
      this.getNowTimeFun();
      this.getTotalData();
      this.getLearnInfo();
      this.getBranchList();
      this.getWorkType();
      this.getRankData()
      
      
    },
    mounted(){
      if(this.chartCurrent==2){
          this.getBranchData()
          console.log(2)
        }
        if(this.chartCurrent==3){
          this.getShowPartmenData();
          console.log(3)
        }
        if(this.chartCurrent==1){
          this.getStudyInfo()
          console.log(1)
        }
      this.getScreenSize();
      this.getWorkType();
    },
    watch:{
      'screenWidth':function(val){ //监听屏幕宽度变化
        if(val<1468){
          this.isSmallScreen = true;
        }else{
          this.isSmallScreen = false;
        }
      }
    },
    methods:{
      getScreenSize(){
        const that = this;
        that.screenWidth = document.body.clientWidth;
        window.addEventListener("resize", () => {
          that.screenWidth = document.body.clientWidth;
        });
      },
      // 查看集团基础信息
      getTotalData(){
        let that = this;
        that.params={"workDate":that.valueData}
        totalData(that.params).then((res)=>{
          if(res.data.code == 200){
            that.baseData = res.data.data;
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 获取集团各标段学习信息
      currentPageFun(val){
        this.currentPage = val;
        this.getLearnInfo();
      },
      // 获取工种分页
      workCurrentPageFun(val){
        this.workDataPage = val;
        this.getWorkType()
        
      },
      getLearnInfo(){
        let that = this;
        let obj = {
          current: that.currentPage,
          size: 7,
          "workDate":that.valueData
        }
       learnInfo(obj).then((res)=>{
          if(res.data.code == 200){
            
            that.learnData = res.data.data.records;
            that.totalNumber = res.data.data.total;
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        }) 
      },
      // 考试情况
      reduceNum(type){
        if(type==1){
          this.studyCurrent = this.studyCurrent - 1;
          this.getStudyInfo();
        }
        if(type==2){
          this.studyCurrent2 = this.studyCurrent2 - 1;
          this.getBranchData();
        }
        if(type==3){
          this.studyCurrent3 = this.studyCurrent3 - 1;
          this.getShowPartmenData();
        }
       
      },
      addNumber(type){
        if(type==1){
          this.studyCurrent = this.studyCurrent + 1;
          this.getStudyInfo();
        }
        if(type==2){
          this.studyCurrent2 = this.studyCurrent2 + 1;
          this.getBranchData();
        }
        if(type==3){
          this.studyCurrent3 = this.studyCurrent3 + 1;
          this.getShowPartmenData();
        }

      },
      // 各单位考试人数即第一个柱状图接口————————————————————————————————————————————————————————————————
      getStudyInfo(){
        let that = this;
        let sList = [];
        let obj = {
          current: that.studyCurrent,
          size: 5,
          "workDate":that.valueData
        }
       
        learnInfo(obj).then((res)=>{
          if(res.data.code == 200){
            that.xAxisName = [];
            that.examNumList = [];
            sList = res.data.data.records;
            that.studyTotal = res.data.data.pages;
            if(sList.length>0){
              that.xAxisName = sList.map(item => {
                 return item.name;
              })
              that.examNumList= sList.map(item => {
                 return item.userExamNumber;
              })
            }
            that.getPartmentData();
           
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 折线图 handleShowPartmenData
      changeEchart(type){
        let that = this;
        that.chartCurrent = type;
        if(type == '1'){
          that.$nextTick(function(){
            that.getStudyInfo();
          })
        }
        if(type == '2'){
          that.$nextTick(function(){
            that.getBranchData();
          })
        }
        if(type == '3'){
          that.$nextTick(function(){
            that.getShowPartmenData();
          })
        }
      },
        // 第二个柱状图————————————————————————————————————————————————
      getBranchData(){
        let that = this;
        let sList = [];
        let obj = {
          current: that.studyCurrent2,
          size: 5,
          "workDate":that.valueData
        }
        
        learnInfo(obj).then((res)=>{
          
          if(res.data.code == 200){
            sList = res.data.data.records;
            that.studyTotal = res.data.data.pages;
            that.xAxisName = [];
            that.examNumList = [];
            if(sList.length>0){
              that.xAxisName = sList.map(item => {
                 return item.name;
              })
              that.examNumList= sList.map(item => {
                 return item.todayLearnNumber;
              })
              
            }
            that.getBranchLineData();
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
        // 第三个柱状图————————————————————————————————————————————————
      getShowPartmenData(){
        let that = this;
        let sList = [];
        let obj = {
          current: that.studyCurrent3,
          size: 5,
          "workDate":that.valueData
        }
        
        learnInfo(obj).then((res)=>{
          
          if(res.data.code == 200){
            sList = res.data.data.records;
            that.studyTotal = res.data.data.pages;
            if(sList.length>0){
              that.xAxisName = [];
              that.examNumList = [];
              that.xAxisName = sList.map(item => {
                 return item.name;
              })
              that.examNumList= sList.map(item => {
                 return item.userTaskFinishNumber;
              })
              
              that.studyTotals= sList.map(item => {
                 return item.userNotLeaveNumber;
              })
              
            }
            that.handleShowPartmenData();
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 个工种人数
      getWorkType(){
        let that = this;
        let data={
          current: that.workDataPage,
          size: 8,
          workDate:that.valueData
        }
        workType(data).then((res)=>{
          if(res.data.code == 200){
            that.workDataList=res.data.data
            that.workTypeList = res.data.data.records;
            that.getWorkTypeData();
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 学习排行榜————————————
      getRankData(){
         let that = this;
        studyRank(that.params).then((res)=>{
          if(res.data.code == 200){

            let numList=[]
            that.rankList = res.data.data;
            for(let i=0;i<that.rankList.length;i++){
              numList.push(that.rankList[i].value	)
            }
            that.studyListMaxNum= (Math.max(...numList)*1.1)>0?(Math.max(...numList)*1.1):100;
            
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 所属单位列表_________________________________________
      changeSectionPage(val){
        this.sectionPage = val;
        this.getBranchList();
      },
      getBranchList(){
        let that = this;
        let obj = {
          current: that.sectionPage,
          size: 18,
          "workDate":that.valueData
        }
        branchList(obj).then((res)=>{
          if(res.data.code == 200){
            that.sectionList = res.data.data.records;
            that.sectionTotal = res.data.data.total;
          }else{
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      // 跳转指挥部
      getSectionInfo(id, name){
        sessionStorage.setItem('sourseId', id);
        sessionStorage.setItem('type', 2);
				sessionStorage.setItem('name', name);
        this.$router.push({
          path:'/command',
          query:{
            id: id,
            type: 2
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
      // 折线图改柱状图——————————————————————————————————————
      getBranchLineData(){
        let that = this;
        var chartDom = document.getElementById('my_chart_two');
        var myLine = this.$echarts.init(chartDom);
        var option;
        var option;
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: that.xAxisName,
              axisLabel : {//坐标轴刻度标签的相关设置。
                formatter : function(params){
                  var newParamsName = "";// 最终拼接成的字符串
                  var paramsNameNumber = params.length;// 实际标签的个数
                  var provideNumber = 6;// 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                  /**
                   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                   */
                  // 条件等同于rowNumber>1
                  if (paramsNameNumber > provideNumber) {
                      /** 循环每一行,p表示行 */
                      for (var p = 0; p < rowNumber; p++) {
                          var tempStr = "";// 表示每一次截取的字符串
                          var start = p * provideNumber;// 开始截取的位置
                          var end = start + provideNumber;// 结束截取的位置
                          // 此处特殊处理最后一行的索引值
                          if (p == rowNumber - 1) {
                              // 最后一次不换行
                              tempStr = params.substring(start, paramsNameNumber);
                          } else {
                              // 每一次拼接字符串并换行
                              tempStr = params.substring(start, end) + "\n";
                          }
                          newParamsName += tempStr;// 最终拼成的字符串
                      }

                  } else {
                      // 将旧标签的值赋给新标签
                      newParamsName = params;
                  }
                  //将最终的字符串返回
                  return newParamsName
                }

              },
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '学习次数:',
              type: 'bar',
              barWidth: '40',
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: '#377DFF',
                  fontSize: 16
                }
              },
              itemStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#68B4FF' },
                  { offset: 1, color: '#188df0' }
                ]),
              },
              data: that.examNumList
            }
          ]
        };
        option && myLine.setOption(option);
        setTimeout(function (){
            window.onresize = function () {
              myLine.resize();
            }
             myLine.resize();
        },200)
      },
      // 
      showChange(){
        this.getTotalData();
        this.getLearnInfo();
        this.getBranchList();
        this.getWorkType();
        this.getRankData();
        if(this.chartCurrent==2){
          this.getBranchData();
        }
        if(this.chartCurrent==3){
          this.getShowPartmenData();
        }
        if(this.chartCurrent==1){
          this.getStudyInfo();
        }
        sessionStorage.setItem('getDate',this.valueData);
      },
    
      // 柱状图__________________________________________________________________________________
      getPartmentData(){
        let that = this;
        var chartDom = document.getElementById('my_chart');
        var myChart = this.$echarts.init(chartDom);
        var option;
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: that.xAxisName,
              axisLabel : {//坐标轴刻度标签的相关设置。
                formatter : function(params){
                  var newParamsName = "";// 最终拼接成的字符串
                  var paramsNameNumber = params.length;// 实际标签的个数
                  var provideNumber = 6;// 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                  /**
                   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                   */
                  // 条件等同于rowNumber>1
                  if (paramsNameNumber > provideNumber) {
                      /** 循环每一行,p表示行 */
                      for (var p = 0; p < rowNumber; p++) {
                          var tempStr = "";// 表示每一次截取的字符串
                          var start = p * provideNumber;// 开始截取的位置
                          var end = start + provideNumber;// 结束截取的位置
                          // 此处特殊处理最后一行的索引值
                          if (p == rowNumber - 1) {
                              // 最后一次不换行
                              tempStr = params.substring(start, paramsNameNumber);
                          } else {
                              // 每一次拼接字符串并换行
                              tempStr = params.substring(start, end) + "\n";
                          }
                          newParamsName += tempStr;// 最终拼成的字符串
                      }

                  } else {
                      // 将旧标签的值赋给新标签
                      newParamsName = params;
                  }
                  //将最终的字符串返回
                  return newParamsName
                }

              },
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '考试人数:',
              type: 'bar',
              barWidth: '40',
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: '#377DFF',
                  fontSize: 16
                }
              },
              z: 1,
              itemStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#68B4FF' },
                  { offset: 1, color: '#188df0' }
                ]),
              },
              data: that.examNumList
            },
            // {
            //     type: 'pictorialBar',
            //     barWidth: 42,
            //     itemStyle: {
            //         normal: {
            //             color: '#fff', //数据的间隔颜色
            //         },
            //     },
            //     // symbolRepeat: 'fixed',
            //     symbolMargin: 2,
            //     symbol: 'rect',
            //     symbolSize: [42, 6],
            //     // symbolPosition: 'end',
            //     symbolOffset: [0, -8],
            //     data: that.examNumList,
            //     silent:false,
            //     tooltip: {
            //      show: false,
            //     },
            //     z: 2,
            //     zlevel: 0,
            // },


          
          ]
        };
        option && myChart.setOption(option);
        setTimeout(function (){
            window.onresize = function () {
              myChart.resize();
            }
            myChart.resize();
        },200)
      },
      // 饼状图
      getWorkTypeData(){
        // let that = this;
        // var chartDom = document.getElementById('my_chart2');
        // var myChart = this.$echarts.init(chartDom);
        // var index = 0;//默认选中高亮模块索引
        // var option;

        // option = {
        //   tooltip: {
        //     trigger: 'item'
        //   },
        //   // legend: {
        //   //   bottom: '0%',
        //   //   left: 'center'
        //   // },
        //   series: [
        //     {
        //       name: '该工种人数',
        //       type: 'pie',
        //       left: 6,
        //       radius: ['55%', '90%'],
        //       avoidLabelOverlap: false,
        //       label: {
        //         show: false,
        //         position: 'center',
        //         formatter: '{b} \n\n {c} 人'
        //       },
        //       emphasis: {
        //         label: {
        //           show: true,
        //           fontSize: '14',
        //           fontWeight: 'bold'
        //         },
        //         itemStyle: {
        //           shadowBlur: 10,
        //           shadowOffsetX: 0,
        //           shadowColor: 'rgba(0, 0, 0, 0.5)'
        //         }
        //       },
        //       labelLine: {
        //         show: false
        //       },
        //       data: that.workTypeList
        //     }
        //   ]
        // };
        // option && myChart.setOption(option);
        // window.addEventListener("resize", () => { myChart.resize();});
        // myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
        // // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
        // myChart.on('mouseover',function(e){
        //   myChart.dispatchAction({type: 'downplay',seriesIndex: 0,dataIndex:0});
        //   if(e.dataIndex != index){
        //     myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
        //   }
        //   if(e.dataIndex == 0){
        //     myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex:e.dataIndex});
        //   }
        // });

        // //当鼠标离开时，把当前项置为选中
        // myChart.on('mouseout',function(e){
        //     index = e.dataIndex;
        //     myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        // });
      },
      hanldeShowMask(){
        this.showMask=!this.showMask
      },
      // 电池柱状图
      handleShowPartmenData(){
        let that = this;
        var chartDom = document.getElementById('my_chartpp');
        var myChartData = this.$echarts.init(chartDom);
        var option;
        option = {
            // backgroundColor: '#001037',
            grid: {
                top: '10%',
                left: '5%',
                right: '2%',
                bottom: '14%',
            },
            tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
            xAxis:[
                     {
              type: 'category',
              data: that.xAxisName,
              axisLabel : {//坐标轴刻度标签的相关设置。
                formatter : function(params){
                  var newParamsName = "";// 最终拼接成的字符串
                  var paramsNameNumber = params.length;// 实际标签的个数
                  var provideNumber = 6;// 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                  /**
                   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                   */
                  // 条件等同于rowNumber>1
                  if (paramsNameNumber > provideNumber) {
                      /** 循环每一行,p表示行 */
                      for (var p = 0; p < rowNumber; p++) {
                          var tempStr = "";// 表示每一次截取的字符串
                          var start = p * provideNumber;// 开始截取的位置
                          var end = start + provideNumber;// 结束截取的位置
                          // 此处特殊处理最后一行的索引值
                          if (p == rowNumber - 1) {
                              // 最后一次不换行
                              tempStr = params.substring(start, paramsNameNumber);
                          } else {
                              // 每一次拼接字符串并换行
                              tempStr = params.substring(start, end) + "\n";
                          }
                          newParamsName += tempStr;// 最终拼成的字符串
                      }

                  } else {
                      // 将旧标签的值赋给新标签
                      newParamsName = params;
                  }
                  //将最终的字符串返回
                  return newParamsName
                }

              },
              axisTick: {
                alignWithLabel: true
              }
            }
            ],
            //  {
            //     data:that.xAxisName,
            //     axisLine: {
            //         lineStyle: {
            //             color: 'rgba(151, 151, 151, 1)', //底部边框颜色
            //         },
            //     },
            //     axisLabel: {
            //         textStyle: {
            //             color: 'rgba(102, 102, 102, 1)', //底部文字颜色
            //             fontSize: 12,
            //         },
            //     },
            // },
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: false,
                        // lineStyle: {
                        //     color: '#fff', //网格线的颜色
                        //     width: 0,
                        //     type: 'solid',
                        // },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(151, 151, 151, 1)', //左边框颜色
                        },
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 12,
                        textStyle: {
                            color: 'rgba(102, 102, 102, 1)', //左文字颜色
                        },
                    },
                },
            ],
            series: [
              {
                    // name: '学习周任务完成数（人）',
                    type: 'bar',
                    barWidth: 30,
                    showBackground: false,
                    itemStyle: {
                        normal: {
                            color: ["#E8E8E8"],
                        },
                    },
                    data: that.studyTotals,
                    z: 0,
                    zlevel: 0,
                    barGap: '-100%',
                    silent:true,
                    tooltip: {
                      show: false,
                    },
                },
                {
                    name: '学习周任务完成数（人）',
                    type: 'bar',
                    barWidth: 30,
                    showBackground: false,
                    backgroundStyle: {
                        color: 'rgba(232, 232, 232, .7)',
                    },
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    // color: '#00FFE3',//渐变1
                                    color: '#8661E1', //渐变1
                                },
                                {
                                    offset: 1,
                                    // color: '#4693EC',//渐变2
                                    color: '#8661E1', //渐变2
                                },
                            ]),
                        },
                    },
                    data:that.examNumList,
                    z: 0,
                    zlevel: 0,
                    label: {
                        show: false,
                        position:"top",
                        fontSize: 14,
                        color: '#979797', //柱状顶部文字颜色
                        formatter: function (params) {
                            return '20%';
                        },
                    },
                },
                // 下面是数据间隔颜色————————————————————————
                {
                    type: 'pictorialBar',
                    barWidth: 30,
                    itemStyle: {
                        normal: {
                            color: '#fff', //数据的间隔颜色
                        },
                    },
                    symbolRepeat: 'fixed',
                    symbolMargin: 6,
                    symbol: 'rect',
                    symbolSize: [30, 2],
                    symbolPosition: 'end',
                    symbolOffset: [0, 2],
                    data:that.examNumList,
                    z: 1,
                    zlevel: 0,
                    silent:true,
                    tooltip: {
                      show: false,
                    },
                }, 
                // 下面是头上的数字
                {
                    type: 'pictorialBar',
                    barWidth: 30,
                    // symbolRepeat: 'fixed',
                    symbolMargin: 5,
                    symbol: 'rect',
                    symbolSize: [30, 0],
                    symbolPosition: 'start',
                    symbolOffset: [0, 0],
                    data:that.studyTotals,
                    z: 1,
                    zlevel: 0,
                    label: {
                        show: true,
                        position: 'top',
                        fontSize: 14,
                        color: 'rgba(51, 51, 51, 1)', //柱状顶部文字颜色
                        formatter: function (params) {
                            return that.examNumList[params.dataIndex]+'/'+that.studyTotals[params.dataIndex];
                        },
                    },
                     silent:true,
                    tooltip: {
                      show: false,
                    },
                },
                 
            ],
        };

        option && myChartData.setOption(option);
        setTimeout(function (){
            window.onresize = function () {
              myChartData.resize();
            }
            myChartData.resize();
        },200)
      }

    }
  }
</script>

<style scoped="scoped">
  .mianCont{
    min-width: 1366px;
    background-color: #ECF2F8;
  }
  .noResult{
    color: #999;
    margin-top: 45px;
  }
  .noResult>div{
    margin-top: 10px;
  }
  .hdNav{
    width: 100%;
    padding: 10px 50px;
    background-color: #2A70F1;
    color: #fff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 40px;
    position: fixed;
    top: 0;
    z-index: 999;
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
  .dataCont{
    width: 100%;
    padding: 40px 50px;
    box-sizing: border-box;
  }
  .left_cont{
    width: 57%;
    margin-right: 10px;
  }
  .left_cont.row2{
    width: 68%;
    margin-right: 26px;
  }
  .right_cont{
    min-width: 600px;
  }
  .right_cont.row2{
    min-width: 425px;
  }
  .left_cont .data_card{
    display: flex;
    justify-content: space-between;
  }
  .left_cont .left_item{
    width: 18%;
    min-width: 140px;
    padding: 20px 0;
    display: flex;
    margin-right: 10px;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 10px 20px 0px rgba(205, 219, 236, 0.6);
    border-radius: 10px;
    box-sizing: border-box;
  }
  .left_cont .left_item:last-of-type{
    margin-right: 0;
  }
  .left_item .num{
   
    font-size: 42px;
    font-weight: bold;
    color: #377DFF;
  }
  .left_item img{
    width: 40px;
    height: 40px;
  }
  .left_cont p{
    font-size: 16px;
    color: #aaa;
    margin-top: 5px;
  }
  .part_table{
    padding: 30px;
    background: #FFFFFF;
    box-shadow: 0px 10px 30px 0px rgba(205, 219, 236, 0.6);
    border-radius: 10px;
    box-sizing: border-box;
    margin-top: 30px;
  }
  .part_table .partName{
    display: flex;
    justify-content: flex-start;
    font-size: 20px;
    color: #377DFF;
    font-weight: bold;
  }
  .part_table .partName.hasRight{
    display: flex;
    justify-content: space-between;
  }
  .part_table .partName.hasRight .lf{
    display: flex;
    justify-content: flex-start;
  }
  .part_table .partName.hasRight .rt{
    font-size: 16px;
    display: flex;
    justify-content: flex-end;
  }
  .part_table .partName.hasRight .rt>div{
    padding: 4px 18px;
    margin-right: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #AAAAAA;
    border-radius: 14px;
    cursor: pointer;
  }
  .part_table .partName.hasRight .rt>div.active{
   color: #377DFF;
   font-size:16px;
  }
  .part_table .partName.hasRight .rt>div.active::after{
   content:"";
   color: #377DFF;
   display: -webkit-box;
   width:40px;
   height:4px;
   background: #377DFF;
   border-radius: 2.4px;
   margin: 4px auto 0;
  }
  .partName img{
    width: 30px;
    height: 30px;
    margin-right: 12px;
  }
  .partHd{
    color: #000000;
    font-weight: bold;
    margin-top: 10px;
  }
  .partItem{
    color: #666;
    /* padding: 4px 20px; */
    margin: 1px 0;
    box-sizing: border-box;
    line-height: 25px;
  }
  .partItem:hover{
    color: #377DFF;
    background-color: rgba(55,125,255,0.1);
  }

  .partHd,.partItem{
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .partHd .name,.partItem .name{
    width: 35%;
    padding:14px 0;
  }
  .partHd .total,.partItem .total{
    width: 18%;
    padding:14px 0;
  }
  .partHd .num,.partItem .num{
    width: 22%;
    padding:14px 0;
  }
  .partHd .level,.partItem .level{
    width: 25%;
    padding:14px 0;
  }
  .pagination{
    margin-top: 15px;
    text-align: right;
  }
  .chartBox{
    display: flex;
    justify-content: space-between;
  }
  .lineBox{
    display: block;
    width: 100%;
  }
  .chartBox .icon{
    font-size: 32px;
    line-height: 300px;
    color: #377DFF;
    cursor: pointer;
  }
  .chartBox .icon.dis{
    color: #999;
    cursor: not-allowed;
  }
  .work_type{
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  .type_left{
    overflow: scroll;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
  }
  .type_left::-webkit-scrollbar {
      width: 6px;
  }
  .type_left::-webkit-scrollbar-track{
    background-color: #fff;
  }
  .type_left::-webkit-scrollbar-thumb{
    background: #f1f1f1;
    border-radius:10px;
  }
  .type_left>div{
    color: #333;
    font-size: 16px;
    width: 44%;
    float: left;
    padding: 8px 0;
    text-align: left;
    display: flex;
    justify-content: space-between;
    margin-right: 2%;
    cursor: pointer;
    box-sizing: border-box;
    min-width: 240px;
  }
  .type_left>div:hover{
    background-color: rgba(55,125,255,0.1);
  }
  .type_left>div:nth-of-type(2n){
    margin-right: 0;
  }
  .type_left>div .name{
    width: 4rem;
    margin-right: 6px;
    line-height: 1.9rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .type_left>div .name.long{
    width: 100px;
    line-height: 20px;
  }
  .type_left>div .num{
    text-align: center;
  }
  .type_left>div span{
    color: #377DFF;
    font-size:1.3rem;
    font-weight: bold;
  }
  .type_right{
    width: 40%;
    min-width: 250px;
  }
  .type_right #my_chart2{
    min-width: 250px;
    margin-top: 50px;
  }
  .belong .item{
    width: 16.5%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    color: #333;
    border-radius: 8px;

  }
  /* .belong .item:nth-of-type(2n){
    background-color: rgba(241,245,254,0.5);
  } */
  .belong .item:hover{
    /* background-color: rgba(55,125,255,0.1); */
    color: #377DFF;
  }
  .belong .item:hover .infoBtn{
    display: block;
  }
  .belong .item .name{
    width: 100%;
    line-height: 36px;
    cursor: pointer;
  }
  .belong .item .infoBtn{
    padding: 6px 20px;
    border-radius: 20px;
    background-color: #377DFF;
    color: #fff;
    cursor: pointer;
    display: none;
  }



  /* chen */

  .dataItem{
    display: flex;
  }
  .topData{
    width: 100%;
  }
  .topData .data_card{
    flex-wrap: wrap;
  }
  .topData .left_item{
    width:24%;
    margin:0;
    margin-top: 20px;
    text-align: left;
  }
  .left_item_icon{
    margin: 0 9%;
  }
  .name_tips{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-right: 16px;
    box-sizing: border-box;

  }
  .left_item_text{
    width: 100%;
  }

  .left_item_name{
    font-size:16px;
    color: #333333;
  }
  .update{
    font-size: 14px;
    color: #AAAAAA;
  }
  .part_tableNew{
    width: 54%;
    /* min-width: 1040px; */
    margin-right: 26px;
  }
  .part_table_new_right{
    width: 45%;
  }
  .percentPants{
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: flex-end;
  }
.partHd .name, .partHd .num,.partHd .level,.partHd .total{
  border: 1px solid #EBF2FF;
  background: rgba(42, 112, 241, .1);
  margin-right:1px ;
}
.partItem .name, .partItem .num,.partItem .level,.partItem .total{
  border: 1px solid #EBF2FF;
  margin-right:1px ;
}
.right_cont_item{
  display: flex;
  flex-wrap: wrap;
}
.hr{
  width: 2px;
  background: #738496;
  border-right: 1px;
  margin: 0 14px;
  height:70%;
}

.dataContNewTable{
  display: flex;
}
.part_table_progress{
  width: 30.6%;
}
.top_one{
  display: flex;
  width: 88%;
  margin: 54px auto 0;
  align-items: top;
}
.top_item_progress{
  padding-top: 4px;
  flex-grow: 1;
  margin: 0 22px;
  text-align: left;
}

.top_item_topNum{
  color: #000000;
  font-size: 18px;
  font-weight: 600;
}
.top_item_num{
  color: #00B277;
  font-size: 16px;
}
.rank_name{
  padding-top:8px;
}

.showMask{
  height: 100%;
  width: 400px;
  background: rgba(42, 112, 241, .7);
  position: fixed;
  top: 61px;
  right: 0;
  opacity: 0.8;
  overflow: auto;
  padding-bottom: 61px;
  box-sizing: border-box;
}

.showMaskItem{
  width: 96%;
  margin: 0 auto;
  border-bottom: 1px solid #FFFFFF;
  text-align: center;
  padding:20px 0;
  color: #fff;
  cursor: pointer;
}
.showMaskItem:last-child{
  border-bottom: none;
}
.show_mask_btn{
  display: flex;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
.i{
    font-family: element-icons!important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    color: #2A70F1;
    background: #fff;
    border-radius: 50%;
    line-height: 22px;
    font-weight: 600;
    box-sizing: border-box;
    width: 22px;
    height: 22px;
    font-size:16px;
    margin-left: 13px;
}
.i::after{
    content: "\E6D2";
}
.datePicker{
  color: #333333;
  text-align: right;
  padding-right: 90px;
}
.show_hover{
  padding-top:4px ;
}
.percent{
  width: 5rem;
}
</style>

<style>
.mianCont .el-input__inner {
    width: 180px !important;
    font-size: 18px !important;
    border: none !important;
    background-color: transparent !important;
    color: #333333 !important;
    cursor: pointer;
}
.mianCont .el-input__icon{
  font-size:20px !important;
  color: #333333 !important;
  
}
.mianCont .el-date-editor.el-input, .el-date-editor.el-input__inner {
    cursor: pointer;
    width: 180px !important;
}
</style>