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
          "analyzing":'工区',
          "present":"大队",
          "color":'#0390D0',
          "chartColor_top":"#5DDFFA",
          "chartColor_bottom":"#3DB1E5",
          "analyzingIcon":{
            "allpepole":require("../../../static/icons/allpepole_blues.png"),
            "allnum":require("../../../static/icons/allnum_blues.png"),
            "leave":require("../../../static/icons/leave_blues.png"),
            "passwrold":require("../../../static/icons/passwrold_blues.png"),
            "book":require("../../../static/icons/book_blues.png"),
            "evaluate":require("../../../static/icons/evaluate_blues.png"),
            "study":require("../../../static/icons/study_blues.png"),
            "sussece":require("../../../static/icons/sussece_blues.png"),
          },
          "exam_num":require("../../../static/manber_blues.png"),
          "work_type":require("../../../static/learn_blues.png"),
          "part":require("../../../static/book_blues.png"),
          "list":require("../../../static/list_blues.png"),
          "path":'/workArea',
          "type": 4
        }
      },
    mounted(){

    },
  
    methods:{

    }
  }
</script>
