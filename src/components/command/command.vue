<template>
  <div class="mianCont">
    <commands :commandObject="commandObject"></commands>
  </div>
</template>

<script>
  import commands from '@/components/component/index.vue'

  export default {
    name: '',
    components: {
      commands,
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
        "analyzing":'标段',
        "present":"工区",
        "color":'#0B2B66',
        "chartColor_top":"#1F80E4",
        "chartColor_bottom":"#1145A6",
        "analyzingIcon":{
          "allpepole":require("../../../static/icons/allpepole_blue.png"),
          "allnum": require("../../../static/icons/allnum_blue.png"),
          "leave": require("../../../static/icons/leave_blue.png"),
          "passwrold":require("../../../static/icons/passwrold_blue.png"),
          "book": require("../../../static/icons/book_blue.png"),
          "evaluate": require("../../../static/icons/evaluate_blue.png"),
          "study":require("../../../static/icons/study_blue.png"),
          "sussece":require("../../../static/icons/sussece_blue.png"),
        },
        "exam_num":require("../../../static/manber_blue.png"),
        "work_type": require("../../../static/learn_blue.png"),
        "part": require("../../../static/book_blue.png"),
        "list": require("../../../static/list_blue.png"),
        "path": '/section',
        "type": 3
      }
    },
    mounted(){
    },

    methods:{

      

    }
  }
</script>
