<template>
  <div class="container w-75">
    <Qna_Detail :parent_id="parent_id"/>
    <Modal/>
    <Comment :parent_id="parent_id"/>
  </div>
</template>

<script>
import Qna_Detail from '../../components/admin/qna_detail.vue'
import Modal from '../../components/modalDo_Qna.vue'
import Comment from '../../components/commentDo.vue'
export default {
  components: {
    Qna_Detail, Modal, Comment
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