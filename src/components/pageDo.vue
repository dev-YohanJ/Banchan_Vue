<template>
  <ul class="pagination">
    <li v-if="currentpage > 1" class="page-item">
      <a style="cursor: pointer" class="page-link" @click="getList(currentpage-1)">
        이전
      </a>
    </li>
    <li 
      v-for="page in pagelist" 
      :key="page" 
      class="page-item"
      :class="currentpage == page ? 'active' : ''">
      <a style="cursor: pointer" class="page-link" @click="getList(page)">{{page}}</a>
    </li>
    <li v-if="maxpage > currentpage" class="page-item">
      <a style="cursor: pointer" class="page-link" @click="getList(currentpage+1)">다음</a>
    </li>
  </ul>
</template>

<script>
import {ref, watch} from 'vue'
import {useStore} from 'vuex'
import axios from '../axios/axiossetting.js'
export default {
  setup(){
    const store = useStore()
    const maxpage = ref(0)
    const currentpage = ref(1)
    const pagelist = ref([])

    watch(()=>store.state.obj, ()=>{
      maxpage.value = store.state.obj.maxpage
      currentpage.value = store.state.obj.currentpage
      pagelist.value = store.state.obj.pagelist
    })

    //pagination의 페이지 번호를 클릭한 경우
    //store의 state.page 값을 선택한 페이지로 변경한다.
    const getList = (page) => {
      store.dispatch('store_page', page)
    }

    return{
      getList, currentpage, pagelist, maxpage
    }
  }
}
</script>

<style scoped>
     ul.pagination{justify-content: center;}
</style>