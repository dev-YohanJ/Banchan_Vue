<template>
  <div class="container w-75">
    <Member_List/>
    <Paging/>
  </div>
</template>

<script>
import Member_List from '../../components/admin/member_list.vue'
import Paging from '../../components/pageDo.vue'
export default {
  components:{
    Member_List, Paging
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