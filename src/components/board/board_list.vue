<template>
<!-- 게시글이 존재하는 경우 -->
  <div v-if="listcount>0">
    <div class="rows">
	    <span>줄보기</span>
	    <select class="form-control" v-model="limit">
		    <option value=1>1</option>
		    <option value=3>3</option>
		    <option value=5>5</option>
		    <option value=7>7</option>
		    <option value=10 selected>10</option>
	    </select>
	  </div>
	  <table class="table table-striped">
	    <thead>
		    <tr>
		      <th colspan=3>MVC 게시판 - list</th>
		      <th colspan=2>		
		        <span>글 개수 : {{listcount}}</span>
		      </th>
		    </tr>
		    <tr>
		      <th><div>번호</div></th>
		      <th><div>제목</div></th>
		      <th><div>작성자</div></th>
		      <th><div>날짜</div></th>
		      <th><div>조회수</div></th>
		    </tr>
	    </thead>
	    <tbody>
        <tr v-for="(item, index) in list" :key="index">
		      <td>{{startnum-index}}</td>
		      <td>
            <router-link :to="{name:'Board_Detail', params:{num:`${item.board_NUM}`}}">
              <span v-for="num in item.board_RE_LEV*2" :key="num">&nbsp;&nbsp;</span>
              <img v-if="item.board_RE_LEV>0" src="../../assets/line.gif">
              <span>{{item.board_SUBJECT}}</span>
            </router-link>
          </td>
		      <td>{{item.board_NAME}}</td>
		      <td>{{item.board_DATE}}</td>
		      <td>{{item.board_READCOUNT}}</td>
		    </tr>
	    </tbody>
	  </table>
  </div>
  <div v-else class="center">
    등록된 글이 없습니다.
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import {useStore} from 'vuex'
import axios from '../../axios/axiossetting.js'
export default {
  setup(){
    const store = useStore()
    const limit = ref(10)
    let currentpage = 1
    let maxpage = 1
    const listcount = ref(0)
    const list = ref([])
    const startnum = ref(0)

    //줄보기가 바뀌는 경우 getList() 호출한다.
    watch(limit, ()=>{
      console.log('[board_list.vue : store.state.page] ' + store.state.page)
      getList(store.state.page)
    })

    //pagination의 페이지 번호를 클릭한 경우 pageDo.vue에서 store의 state.page값을 선택한 페이지로 변경
    //그때 getList() 호출한다.
    watch(()=>store.state.page, ()=>{
      console.log('[board_list.vue : store.state.page] ' + store.state.page)
      getList(store.state.page)
    })
    
    const getList = async (page) => {
      try {
        const res = await axios.get(`boards?page=${page}&limit=${limit.value}`)

        list.value = res.data.boardlist
        listcount.value = res.data.listcount
        maxpage = res.data.maxpage
        currentpage = res.data.page
        startnum.value = listcount.value-(currentpage-1)*limit.value
        console.log('page의 startnum.value = ' + startnum.value)

        const pagelist = ref([])
        for(let i=res.data.startpage; i<=res.data.endpage; i++){
          pagelist.value.push(i)
        }

        //pageDo.vue에서 사용하기 위해 store에 저장
        const obj = {maxpage, currentpage, pagelist}
        store.dispatch('store_obj', obj)
      }catch(err){
        console.log(err)
      }
    }

    getList(1)

    return {
      limit, startnum, list, listcount
    }
  }
}
</script>

<style scoped>
select.form-control{
  width:auto;margin-bottom:2em;display:inline-block;
}
.rows{text-align:right;}
.center{text-align:center}
</style>