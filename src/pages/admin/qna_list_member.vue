<template>
    <Qna_List/>
    <Paging/>
    <button class="btn btn-primary" @click="goWrite">글쓰기</button>
</template>

<script>
import Qna_List from '../../components/admin/qna_list.vue'
import Paging from '../../components/pageDo.vue'
import {useRouter} from 'vue-router'
export default {
  components: {
    Qna_List, Paging
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
        name:'Qna_Write',
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

</style>