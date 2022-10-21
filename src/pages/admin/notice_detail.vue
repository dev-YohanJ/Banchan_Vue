<template>
  <div class="container w-75">
    <Notice_Detail :parent_id="parent_id"/>
    <Modal/>
  </div>
</template>

<script>
import Notice_Detail from '../../components/admin/notice_detail.vue'
import Modal from '../../components/modalDo_Notice.vue'
export default {
  components: {
    Notice_Detail, Modal
  },
  props: {
    parent_id:{
      type:String,
      required:true
    }
  },
  emits:['parent_getSession'],
  setup(props, context){
    //아래의 문장이 없으면 detailView를 새로고침했을 때 헤더가 사라진다.
    context.emit('parent_getSession')
  }
}
</script>

<style>

</style>