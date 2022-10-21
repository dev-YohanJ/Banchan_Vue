<template>
  <div class="container w-75">
    <Item_List/>
    <Paging/>
  </div>
</template>

<script>
import Item_List from '../../components/admin/item_list_admin.vue'
import Paging from '../../components/pageDo.vue'
export default {
  components: {
    Item_List, Paging
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

    // const router = useRouter()
    // const goWrite = ()=>{
    //   router.push({
    //     name:'Board_Write',
    //     params:{id:props.parent_id}
    //   })
    // }

    return {
      // goWrite
    }
  }
}
</script>

<style>

</style>