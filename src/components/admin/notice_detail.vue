<template>
  <div>
		<table class="table">
			<thead>
        <tr>
		  		<th colspan=2>MVC 게시판-view페이지</th>
		  	</tr>
      </thead>
      <tbody>
		  	<tr>
		  		<td>제목</td>
		  		<td>{{board.board_SUBJECT}}</td>
		  	</tr>
        <tr>
		  		<td>날짜</td>
		  		<td>{{board.board_DATE}}</td>
		  	</tr>
        <tr>
		  		<td>조회수</td>
		  		<td>{{board.board_READCOUNT}}</td>
		  	</tr>
        <tr>
		  		<td>내용</td>
		  		<td>{{board.board_CONTENT}}</td>
		  	</tr>
			  <tr>
				  <td colspan=2>
						<div class="group" v-if="parent_id == 'admin'">
              <router-link :to="{name:'Notice_Update'}">
                <button class="btn btn-warning">수정</button>
              </router-link>
              <button class="btn btn-danger" @click="showModal">삭제</button>
            </div>
            <router-link :to="{name:'Notice_List'}"><button class="btn btn-success">목록</button></router-link>
				  </td>
			  </tr>
      </tbody>
		</table>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import axios from '../../axios/axiossetting.js'
export default {
  props: {
    parent_id: {
      type: String,
      required: true
    }
  },
  setup(){
    //board_list.vue에서 <router-link :to="{name:'Board_Detail', params:{num:`${item.board_NUM}`}}">로
    //이동할 때 사용된 파라미터 num을 가져온다.
    const num = useRoute().params.num

    const board = ref({})
    const router = useRouter()
    const getDetail = async ()=>{
      try{
        const res = await axios.get(`notice/${num}`)
        console.log(res.data)
        board.value = res.data.board
        if(board.value==null){
          console.log('null입니다.')
          router.push("{name:'404'}")
          return
        }
      }catch(err){
        console.log(err)
      }
    }

    getDetail()

    const store = useStore()
    const count = computed(()=>{
      return store.state.count
    })

    const showModal = ()=>{
			//store에 값을 변경합니다.
			store.dispatch('display', true);
		}

    return {
      board, count, showModal
    }
  }
}
</script>

<style  scoped>
img {
	width:20px;
}

 table > thead,table > tbody > tr:nth-last-child(1) {
	text-align: center
}

td:nth-child(1) {
	width: 20%
}


table > tbody >tr:nth-child(5)>td:nth-child(2)>a {
	color: black
}


.btn-primary {
	background-color: #4f97e5
}

.group{display: inline-block}
button{
	margin-left:20px;
}

#comment > table > tbody > tr > td:nth-child(2){
 width:60%
}
#count{
 position: relative;
    top: -10px;
    left: -10px;
    background: orange;
    color: white;
    border-radius: 30%;
}
</style>