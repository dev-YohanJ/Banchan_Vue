<template>
    <!-- <Sidebar/> -->
    <Notice_Update :parent_id="id"/>
</template>

<script>
// import Sidebar from '../../components/sidebarDo.vue'
import Notice_Update from '../../components/admin/notice_update.vue'
export default {
  components: {
    Notice_Update
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