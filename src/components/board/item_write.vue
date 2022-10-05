<template>
  <div>
    <form @submit.prevent="add">
      <h1>상품등록 테스트</h1>
      <div class="form-group">
        <label for="board_subject">제목</label>
        <input 
          type="text"
          v-model.lazy="board.subject"
          maxlength="100"
          class="form-control"
          placeholder="제목을 입력해주세요."
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
          v-model.lazy="board.description"
          rows="10"
          class="form-control"
          placeholder="구매자에게 필요한 정보를 입력해주세요."
          required></textarea>
      </div>
      <div class="form-group">
        <label>파일 첨부</label>
        <label>
          <img src="../../assets/attach.png" alt="파일첨부">
          <input type="file" v-show="false" @change="change" multiple>
        </label>
        <span>{{board.fileName}}</span>
        <div v-for="(item, index) in previewList" :key="index" class="preview">
          <img :src="item.url" class="preview_img">
        </div>
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
    const previewList = ref([]);
    const board = ref({
      description:'',
      price:'',
      subject:'',
      allergy:'',
      fileName:''
    })
    let file=''
    const router = useRouter()

    const change = event => {
      const files = event.target.files; //이벤트가 발생한 객체(<input type='file'>)의 첫번째 파일을 가져옵니다.
      console.log(files)
      for(let i=0;i<files.length;i++){
        console.log(files[i].name)
      //이미지의 타입이 image/png, image/jpg, image/jpeg 인 경우 이미지를 미리보기합니다.
            if(files[i] && files[i].type.match(/^image\/(png|jpg|jpeg)$/)){
            
              //해당 파일의 전체 내용을 URL 텍스트로 변환한 값입니다.
              previewList.value.push({url:window.URL.createObjectURL(files[i]),
                                      name : files[i].name});
            }else{
              previewList.value.splice(i,0); //조건에 맞는 파일이 아닌 경우 미리보기하지 않습니다.
            }
      }//for
      file = event.target.files[0]
      board.value.fileName = file.name
    }

    const add = async () => {

      console.log('하하')
      let frm = new FormData()
      if(file!=''){ //let file='' 초기값 상태가 아닌지 확인한다. 즉, 파일을 선택하면 그 파일을 업로드한다.
        frm.append('uploadfile', file)
      }
      frm.append('seller', props.parent_id)
      frm.append('name', board.value.subject)
      frm.append('price', board.value.price)
      frm.append('description', board.value.description)
      frm.append('allergy', board.value.allergy)

      try{
        const res = await axios.post('product_new', frm,
          {headers:
            {'Content-Type':'multipart/form-data;charset=UTF-8'}
          })
        console.log(res.data)
        router.push({
          name : 'Main'
        })
      }catch(err){
        console.log('여기는 오류')
        console.log(err)
      }
    }

    return {
      board, change, add
      , previewList
    };
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

.preview_img{
  width:100px;
}

.preview{
  display: inline;
}
</style>