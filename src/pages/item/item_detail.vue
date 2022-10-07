<template>
  <Item_Detail :parent_id="parent_id"/>
  <Modal/>
</template>

<script>
import Item_Detail from '../../components/item/item_detail.vue'
import Modal from '../../components/modalDo.vue'
export default {
  components: {
    Item_Detail, Modal, Comment
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