<template>
  <div class="container w-75">
    <Member_Info/>
    <Paging/>
  </div>
</template>

<script>
import Member_Info from '../../components/admin/member_info.vue'
import Paging from '../../components/pageDo.vue'
export default {
  components:{
    Member_Info, Paging
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