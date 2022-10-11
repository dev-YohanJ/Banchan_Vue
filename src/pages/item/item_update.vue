<template>
  <Item_Update :parent_id="parent_id"/>
  <Modal/>
</template>

<script>
import Item_Update from '../../components/item/item_update.vue'
import Modal from '../../components/item/modalDelete.vue'
export default {
  components: {
    Item_Update, Modal
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