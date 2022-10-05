<template>
    <Sidebar/>
    <Notice_List/>
    <Paging/>
</template>

<script>
import Sidebar from '../../components/sidebarDo.vue'
import Notice_List from '../../components/admin/notice_list.vue'
import Paging from '../../components/pageDo.vue'
import {useRouter} from 'vue-router'
export default {
  components: {
    Sidebar, Notice_List, Paging
  },
  props: {
    parent_id:{
      type:String,
      required:false
    }
  },
  emits:['parent_getSession'],

  setup(props, context){
    //부모 컴포넌트 App_1.vue에 있는 getSession을 호출한다.
    //<router-view @parent_getSession="getSession" :parent_id="id" />
    context.emit('parent_getSession')

    const router = useRouter()
    const goWrite = ()=>{
      router.push({
        name:'Board_Write',
        params:{id:props.parent_id}
      })
    }

    return {
      goWrite
    }
  }
}
</script>

<style scoped>
/* .sidebar{float:left; margin: 0 auto; }
.notice{float:left; margin: 0 auto; } */
</style>