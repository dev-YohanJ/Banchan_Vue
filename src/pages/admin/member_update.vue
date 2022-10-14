<template>
  <Sidebar/>
  <Member_Update/>
</template>

<script>
import Sidebar from '../../components/sidebarDo.vue'
import Member_Update from '../../components/admin/member_update.vue'
export default {
  components:{
    Sidebar, Member_Update, Paging
  },
  props: {
    parent_id: {
      type: String,
      required: false
    }
  },
  emits:['parent_getSession'],
  setup(props, context){
    context.emit('parent_getSession')
  }
}
</script>

<style scoped>

</style>