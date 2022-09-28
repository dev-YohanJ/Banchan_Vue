<template>
  <div>
    <form @submit.prevent="add">
      <h1>MVC 게시판 - write 페이지</h1>
      <div class="form-group">
        <label for="board_name">글쓴이</label>
        <!-- input 태그는 type="reset"을 선택하면 모두 클리어되어 
            input이 아닌 태그를 사용해 값을 유지 -->
        <div class="form-control" readonly>
          {{parent_id}}
        </div>
      </div>
      <div class="form-group">
        <label for="board_pass">비밀번호</label>
        <input 
          type="password"
          v-model.lazy="board.pass"
          maxlength="30"
          class="form-control"
          placeholder="Enter board_pass"
          required>
      </div>
      <div class="form-group">
        <label for="board_subject">제목</label>
        <input 
          type="text"
          v-model.lazy="board.subject"
          maxlength="100"
          class="form-control"
          placeholder="Enter board_subject"
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
        <label>파일 첨부</label>
        <label>
          <img src="../../assets/attach.png" alt="파일첨부">
          <input type="file" v-show="false" @change="change">
        </label>
        <span>{{board.fileName}}</span>
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
      name:'',
      pass:'',
      content:'',
      subject:'',
      fileName:''
    })
    let file=''
    const router = useRouter()

    const change = event => {
      file = event.target.files[0]
      board.value.fileName = file.name
    }

    const add = async () => {
      console.log('하하')
      let frm = new FormData()
      if(file!=''){ //let file='' 초기값 상태가 아닌지 확인한다. 즉, 파일을 선택하면 그 파일을 업로드한다.
        frm.append('uploadfile', file)
      }
      frm.append('BOARD_SUBJECT', board.value.subject)
      frm.append('BOARD_CONTENT', board.value.content)
      frm.append('BOARD_PASS', board.value.pass)
      frm.append('BOARD_NAME', props.parent_id)

      try{
        const res = await axios.post('boards/new', frm,
          {headers:
            {'Content-Type':'multipart/form-data;charset=UTF-8'}
          })
        console.log(res.data)
        router.push({
          name : 'Board_List'
        })
      }catch(err){
        console.log('여기는 오류')
        console.log(err)
      }
    }

    return {
      board, change, add
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