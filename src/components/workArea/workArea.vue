<template>
  <div class="mianCont">
     <sections :commandObject="commandObject"></sections>
  </div>
</template>

<script>
   import sections from '@/components/component/index.vue'
  // var echarts = require('echarts');
  export default {
    name: '',
    components: {
      sections,
    },
    props: {
      pageNum:{
        type:Object
      }
    },
    data () {
      return {
        commandObject:{}
      }
    },
    created() {
        this.commandObject={
          "name":"",
          "analyzing":'队伍',
          "present":"班组",
          "color":'#5125BE',
          "chartColor_top":"#B67BEF",
          "chartColor_bottom":"#7F45DA",
          "analyzingIcon":{
            "allpepole":require("../../../static/icons/allpepole_purple.png"),
            "allnum":require("../../../static/icons/allnum_purple.png"),
            "leave":require("../../../static/icons/leave_purple.png"),
            "passwrold":require("../../../static/icons/passwrold_purple.png"),
            "book":require("../../../static/icons/book_purple.png"),
            "evaluate":require("../../../static/icons/evaluate_purple.png"),
            "study":require("../../../static/icons/study_purple.png"),
            "sussece":require("../../../static/icons/sussece_purple.png"),
          },
          "exam_num":require("../../../static/manber_purple.png"),
          "work_type":require("../../../static/learn_purple.png"),
          "part":require("../../../static/book_purple.png"),
          "list":require("../../../static/list_purple.png"),
          "path":'/project',
          "type": 5
        }
      },
    mounted(){

    },
  
    methods:{

    }
  }
</script>
