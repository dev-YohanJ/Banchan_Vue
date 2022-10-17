<template>
  <div>
    <form @submit.prevent="update">
      <h2>문의사항 수정</h2>
      <div class="form-group">
        <label for="board_subject">제목</label>
        <input 
          type="text"
          v-model.lazy="board.board_SUBJECT"
          maxlength="100"
          class="form-control"
          placeholder="Enter board_subject"
          required>
      </div>

      <div class="form-group">
        <label for="board_content">문의 내용</label>
        <textarea
          name="BOARD_CONTENT"
          v-model.lazy="board.board_CONTENT"
          rows="10"
          class="form-control"
          required></textarea>
      </div>

      <div class="form-group">
        <label for="board_pass">비밀번호</label>
        <input 
          type="password"
          v-model.lazy="board.board_PASS"
          maxlength="30"
          class="form-control"
          placeholder="비밀번호를 입력하세요"
          required>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">수정</button>
        <button type="reset" class="btn btn-danger" @click="goDetail">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from '../../axios/axiossetting.js'
export default {
  props: {
    parent_id: {
      type: String,
      required: false
    }
  },
  emits:['parent_getSession'],
  setup(props, context){
    context.emit('parent_getSession')
    
    const board = ref({})
    const router = useRouter()
    const num = useRoute().params.num

    const getDetail = async () => {
      try{
        console.log('num=' + num)
        const res = await axios.get('qna/'+ num)
        console.log(res.data)
        board.value = res.data.board
        if(board.value==null){
          console.log('null입니다.')
          router.push("{name:'404'}")
          return
        }

        board.value.board_PASS = ''
      }catch(err){
        console.log(err)
      }
    }

    getDetail()

    const update = async ()=>{
      let frm = new FormData()

      frm.append('BOARD_SUBJECT', board.value.board_SUBJECT)
      frm.append('BOARD_CONTENT', board.value.board_CONTENT)
      frm.append('BOARD_PASS', board.value.board_PASS)
      frm.append('BOARD_NUM', num)

      try{
        const res = await axios.patch('qna', frm)
        console.log(res.data)
        if(res.data=="Nopass"){
          alert('비밀번호를 확인하세요')
        }else if(res.data=='success'){
          router.push({name:'Qna_Detail', params:{num:num}})
        }else if(res.data=='fail'){
          console.log('수정 실패입니다.')
        }
      }catch(err){
        console.log(err)
      }
    }

    const goDetail = ()=>{
      router.push({name:'Qna_Detail', params:{num:num}})
    }

    return {
      board, update, goDetail
    }
  }
}
</script>

<style scoped>
.remove{
  width:10px;
  position:relative;
  top:-10px;
}
img {
  width: 20px;
}
button {
  margin-right: 1em;
}
textarea{
  resize: none;
}
</style>