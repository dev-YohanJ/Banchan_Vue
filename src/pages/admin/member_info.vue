<template>
  <Sidebar/>
  <Member_Info/>
  <Paging/>
</template>

<script>
import Sidebar from '../../components/sidebarDo.vue'
import Member_Info from '../../components/admin/member_info.vue'
import Paging from '../../components/pageDo.vue'
export default {
  components:{
    Sidebar, Member_Info, Paging
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