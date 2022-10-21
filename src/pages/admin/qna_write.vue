<template>
  <div class="container w-75">
    <Qna_Write :parent_id="id"/>
  </div>
</template>

<script>
import Qna_Write from '../../components/admin/qna_write.vue'
export default {
  components: {
    Qna_Write
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
    const id = props.parent_id
    return{id}
  }
}
</script>

<style scoped>

</style>