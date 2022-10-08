<template>
  <div>
    <form @submit.prevent="update">
      <h3>상품수정</h3><br>
      <div class="form-group">
        <label for="board_subject">제목</label>
        <input 
          type="text"
          v-model.lazy="board.name"
          maxlength="100"
          class="form-control"
          placeholder="Enter board_subject"
          required>
      </div>
      <div class="form-group">
        <label for="board_price">가격</label>
        <input 
          type="text"
          v-model.lazy="board.price"
          maxlength="100"
          class="form-control"
          placeholder="가격을 입력해주세요."
          required>
      </div>
      <div class="form-group">
        <label for="board_content">내용</label>
        <textarea
          name="BOARD_CONTENT"
          v-model.lazy="board.description"
          rows="10"
          class="form-control"
          required></textarea>
      </div>

      <div class="form-group" v-if="board.board_RE_LEV==0">
        <label for="board_file">파일 첨부</label>
        <label>
          <img src="../../assets/attach.png" alt="파일첨부">
          <input type="file" name="uploadfile" v-show="false" @change="change">
        </label>
        <span>{{fileName}}</span>
        <img src="../../assets/remove.png" alt="파일삭제" class="remove" 
          v-if="fileName" @click="remove">
      </div>


      <div class="form-group">
        <div></div>
        <div>
          <button type="submit" class="btn btn-danger">수정하기</button>
        </div>
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
    
    const fileName = ref('')
    const board = ref({})
    let file = ''
    const router = useRouter()
    const num = useRoute().params.num
    let check = 0

    const getDetail = async () => {
      try{
        console.log('num=' + num)
        //const res = await axios.get(`boards/${num}`)
        const res = await axios.get('items/'+ num)
        console.log(res.data)
        board.value = res.data.item
        if(board.value==null){
          console.log('null입니다.')
          router.push("{name:'404'}")
          return
        }
        //"board_ORIGINAL":null로 전송된 경우 fileName.value=null이다.
        fileName.value = board.value.board_ORIGINAL
        console.log('파일이름 = ' + fileName.value)

        board.value.board_PASS = ''
      }catch(err){
        console.log(err)
      }
    }

    getDetail()

    const change = event => {
      file = event.target.files[0]
      fileName.value = file.name
      check++
    }

    const update = async ()=>{
      let frm = new FormData()
      // if(file!=''){ //let file='' 초기값 상태가 아닌지 확인한다. 즉, 파일을 선택하면 그 파일을 업로드한다.
      //   frm.append('uploadfile', file)
      // }
      frm.append('seller', props.parent_id)
      frm.append('name', board.value.subject)
      frm.append('price', board.value.price)
      frm.append('description', board.value.description)

      // if(check==0 && fileName.value != null){ //기존파일 그대로인 경우
      //   frm.append('check', fileName.value)
      //   frm.append('image', board.value.image)
      // }

      try{
        const res = await axios.patch('items', frm,
          {headers:
            {'Content-Type':'multipart/form-data;charset=UTF-8'}
          })
        console.log(`수정 응답 : ${res.data}`)
        if(res.data=="Nopass"){
          alert('비밀번호를 확인하세요')
        }else if(res.data=='success'){
          router.push({name : 'Board_Detail'})
        }else if(res.data=='fail'){
          console.log('수정 실패입니다.')
        }
      }catch(err){
        console.log('여기는 오류')
        console.log(err)
      }
    }

    const remove = ()=>{
      fileName.value=''
    }

    const goDetail = ()=>{
      router.push({name:'Board_Detail'})
    }

    return {
      fileName, board, change, update, remove, goDetail
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

.main-container {
      width: 1000px;
      height: 400px;
      margin:0 0 250px 0;
  }
  
  .room-deal-information-container {
      color: #222222;
      border: 1px solid #dddddd;
  }
  
  .room-deal-information-title {
      text-align: center;
      font-size: 18px;
      line-height: 60px;
      border-bottom: 1px solid #dddddd;
  }
  
  .room-deal-information-content-wrapper {
      min-height: 50px;
      display: flex;
  }
  
  .room-deal-informtaion-content-title {
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      background-color: #f9f9f9;
  }
  
  .room-deal-information-content {
      width: 100%;
      font-size: 14px;
  }
  
  .room-deal-option-selector {
      display: flex;
      align-items: center;
      padding: 15px;
  }
  
  .room-deal-option-item {
      width: 100px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #cccccc;
      /* border-radius: 5px; */
      cursor: pointer;
  }
  
  .room-deal-option-item:last-child {
      margin-left: 10px;
  }
  
  .room-deal-option-notice {
      margin-left: auto;
      font-size: 14px;
      color: #888888;
  }
  
  .room-deal-option-item-deposit {
      margin-left: 10px;
  }
  
  .room-deal-information-wrapper {
      display: flex;
      flex-direction: column;
  }
  
  .room-deal-information-option {
      padding: 10px;
      display: flex;
      align-items: center;
  }
  
  .room-deal-information-option:last-child {
      border-bottom: 1px solid #dddddd;
  }
  
  .room-deal-information-item-type {
      font-size: 13px;
      color: #fff;
      background-color: #61b6e5;
      min-width: 50px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      /* border-radius: 3px; */
  }
  
  .room-deal-information-item-wrapper {
      display: flex;
      align-items: center;
      margin-left: 10px;
      height: 46px;
      width: 100%;
  }
  
  .room-deal-information-item-wrapper>input {
      border: 1px solid #dddddd;
      width: 140px;
      height: 100%;
      padding: 0 15px;
      font-size: 15px;
  }
  
  .room-deal-inforamtion-won {
      margin: 0 10px;
  }
  
  .room-deal-information-example {
      color: #888888;
  }
  
  .room-deal-information-option:not(:first-child) {
      margin-top: 10px;
  }
  
  .room-deal-inforamtion-divide {
      font-size: 22px;
      margin: 0 8px;
      color: #222222;
      font-weight: 100;
  }
  
  .room-deal-close-button-wrapper {
      margin-left: auto;
      cursor: pointer;
  }
  
  .room-deal-close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background-color: #666666;
      color: rgb(220, 220, 220);
  }
  
  .room-deal-cliked {
      background-color: rgb(235, 235, 235);
      color: rgb(170, 170, 170);
  }
  
  .room-file-upload-example {
      height: 100%;
  }
  
  .room-write-content-container {
      border-top: 1px solid #dddddd;
      min-height: 260px;
  }
  
  .file-preview-content-container {
      height: 100%;
  }
  
  .room-file-upload-wrapper {
      margin: 20px;
      border: 1px solid #dddddd;
      background-color: #f4f4f4;
      min-height: 350px;
      font-size: 15px;
      color: #888888;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
  }
  
  .room-file-upload-example-container {
      display: flex;
      align-items: center;
      justify-content: center;
      /* height: 100%;
width: 100%; */
  }
  
  
  .room-file-notice-item {
      margin-top: 5px;
      text-align: center;
  }
  
  .image-box {
      margin-top: 30px;
      padding-bottom: 20px;
      text-align: center;
  }
  
  .image-box input[type='file'] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
  }
  
  .image-box label {
      display: inline-block;
      padding: 10px 20px;
      background-color: #C64832;
      color: #fff;
      vertical-align: middle;
      font-size: 15px;
      cursor: pointer;
      /* border-radius: 5px; */
  }
  
  .file-preview-wrapper {
      padding: 10px;
      position: relative;
  }
  
  .file-preview-wrapper>img {
      position: relative;
      width: 200px;
      height: 150px;
      z-index: 10;
  }
  
  .file-close-button {
      position: absolute;
      /* align-items: center; */
      line-height: 18px;
      z-index: 99;
      font-size: 18px;
      right: 5px;
      top: 10px;
      color: #fff;
      font-weight: bold;
      background-color: #666666;
      width: 20px;
      height: 20px;
      text-align: center;
      cursor: pointer;
  }
  
  .file-preview-container {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
  }
  
  .file-preview-wrapper-upload {
      margin: 10px;
      padding-top: 20px;
      background-color: #888888;
      width: 200px;
      height: 150px;
  }
  
  .room-write-button-wrapper {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #222222;
  }
  
  .room-write-button-wrapper>div {
      width: 160px;
      height: 50px;
      border: 1px solid #dddddd;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      cursor: pointer;
  }
  
  .room-write-button {
      margin-left: 15px;
      color: #fff;
      background-color: #1564f9;
  }
  
  .room-write-button:hover {
      opacity: 0.8;
  }


button {
  margin-right: 1em;
}

.container{
  margin: 50px;
}

/* 파일 */
.file-label {
  margin-top: 30px;
  background-color: #E8A684;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  width: 100px;
  /* border-radius: 6px; */
  cursor: pointer;
}
.file {
  display: none;
}


img{
  width:200px;
  height:200px;
  object-fit: cover;
}

button{
  width:180px;
  height:50px;
  font-size:22px;
  border-radius: 0px;
  background-color:#C64832;
}

.buttons{
  display: flex;
  justify-content: space-between;
}

h3{
  margin: 20px 0 0 0;
}

</style>