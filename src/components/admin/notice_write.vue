<template>
  <div>
    <form @submit.prevent="add">
      <h2>공지사항 등록</h2>
      <div class="form-group">
        <label for="board_pass">비밀번호</label>
        <input 
          type="password"
          v-model.lazy="board.pass"
          maxlength="30"
          class="form-control"
          placeholder="비밀번호를 입력하세요"
          required>
      </div>
      <div class="form-group">
        <label for="board_subject">제목</label>
        <input 
          type="text"
          v-model.lazy="board.subject"
          maxlength="100"
          class="form-control"
          placeholder="제목을 입력하세요"
          required>
      </div>
      <div class="form-group">
        <label for="board_content">내용</label>
        <textarea
          v-model.lazy="board.content"
          rows="10"
          class="form-control"
          required></textarea>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">등록</button>
        <button type="reset" class="btn btn-danger">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from '../../axios/axiossetting.js'
export default {
  props: {
    parent_id: {
      type: String,
      required: true
    }
  },
  emits:['parent_getSession'],

  setup(props, context){
    context.emit('parent_getSession')
    const board = ref({
      pass:'',
      content:'',
      subject:'',
    })
    const router = useRouter()

    const add = async () => {
      let frm = new FormData()
      frm.append('BOARD_SUBJECT', board.value.subject)
      frm.append('BOARD_CONTENT', board.value.content)
      frm.append('BOARD_PASS', board.value.pass)

      try{
        const res = await axios.post('notice/new', frm)
        console.log(res.data)
        router.push({
          name : 'Notice_List'
        })
      }catch(err){
        console.log(err)
      }
    }

    return {
      board, add
    }
  }
}
</script>

<style scoped>
img {
  width: 20px;
}
button {
  margin-right: 1em;
}
</style>