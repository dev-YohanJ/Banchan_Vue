<template>
  <Secession :parent_id="parent_id" />
  <Modal_secession/>
</template>

<script>
import Secession from '../../components/mypage/secession.vue';
import Modal_secession from '../../components/modalDo_secession.vue';
export default {
  components: {
    Secession, Modal_secession
  },

  props: {
    parent_id: {
      type:String,
      required:true
    }
  },
  emits:['parent_getSession'],
  setup(props, context) {
    //아래의 문장이 없으면 새로고침 시 사라집니다.
    context.emit("parent_getSession");
  }

}
</script>

<style>
</style>