<template>
<div class="container">
    <form @submit.prevent="add">
      <h3>상품등록</h3><br>
      <div class="form-group">
        <div class="room-deal-information-container">
      <div class="room-deal-information-title">사진 등록</div>
      <div class="room-file-upload-wrapper">
          <div v-if="!files.length" class="room-file-upload-example-container">
              <div class="room-file-upload-example">
                  <div class="room-file-notice-item">
                    <span class="red">최소 1장 이상</span>의 이미지를 등록해주세요.(최대 3장까지 가능합니다.)
                    <br>이미지 한 장당 10MB 까지 등록이 가능합니다.
                  </div>
                  <div class="room-file-notice-item room-file-upload-button">
                      <div class="image-box">
                          <label for="file">이미지 등록</label>
                          <input type="file" id="file" @change="imageUpload" multiple />
                      </div>
                  </div>
              </div>
          </div>
          <div v-else class="file-preview-content-container">
              <div class="file-preview-container">
                  <div class="file-preview-wrapper-upload">
                      <div class="image-box">
                          <label for="file">추가 사진 등록</label>
                          <input type="file" id="file"  @change="imageAddUpload" multiple />
                      </div>
                      <!-- <div class="file-close-button" @click="fileDeleteButton" :name="file.number">x</div> -->
                  </div>
                  <div v-for="(file, index) in files" :key="index" class="file-preview-wrapper">
                      <div class="file-close-button" @click="fileDeleteButton" :name="file.number">
                          x
                      </div>
                      <img :src="file.preview" />
                  </div>
              </div>
          </div>
      </div>
  </div>
      </div>
      <div class="form-group">
        <label for="board_subject">제목</label>
        <input 
          type="text"
          v-model.lazy="board.subject"
          maxlength="100"
          class="form-control"
          placeholder="상품 제목을 입력해주세요."
          required>
      </div>
      <div class="form-group">
        <label for="board_price">가격</label>
        <input 
          type="text"
          v-model.lazy="board.price"
          maxlength="100"
          class="form-control"
          placeholder="숫자만 입력해주세요."
          required>
      </div>
      <div class="form-group">
        <label for="board_content">내용설명</label>
        <textarea
          v-model.lazy="board.description"
          rows="10"
          class="form-control"
          placeholder="구매자에게 필요한 정보를 입력해주세요."
          required></textarea>
      </div>
      <!-- <div class="form-group">
        <label for="board_allergy">알레르기 성분</label>
        <input 
          type="text"
          v-model.lazy="board.allergy"
          maxlength="100"
          class="form-control"
          placeholder="알레르기 성분을 골라주세요."
          required>
      </div> -->
      <div class="form-group buttons">
        <div></div>
        <div>
          <button type="submit" class="btn btn-danger">등록</button>
          <!-- <button type="reset" class="btn btn-danger">취소</button> -->
        </div>
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

    const files=ref([]);
    const filesPreview = ref([]);
    const uploadImageIndex=ref(0);
    const imageUpload = (event)=> {
        let num = -1;
        for (let i = 0; i < event.target.files.length; i++) {
            let eachFiles = event.target.files[i]
              files.value = [
                ...files.value,
                {
                    file: eachFiles,
                    preview: URL.createObjectURL(eachFiles),
                    number: i,
                }
              ]
            num = i;
        }
        uploadImageIndex.value = num + 1; //이미지 index의 마지막 값 + 1 저장
        console.log(files.value);
    }


    const imageAddUpload = (event) => {
        let num = -1;
          for (let i = 0; i < event.target.files.length; i++) {
            let eachFiles = event.target.files[i]
              files.value=[
                  ...files.value,
                    {
                    //실제 파일
                    file: eachFiles,
                    //이미지 프리뷰
                    preview: URL.createObjectURL(eachFiles),
                    //삭제및 관리를 위한 number
                    number: i + uploadImageIndex.value,
                }
              ]
            num = i;
        }
        uploadImageIndex.value = uploadImageIndex.value + num + 1;
    }

    const fileDeleteButton = (e)=> {
        const name = e.target.getAttribute('name');
        console.log(name)
        files.value = files.value.filter(data => data.number !== Number(name));
    }

    const board = ref({
      fileName:'',
      description:'',
      price:'',
      subject:'',
    //   allergy:''
    })
    const router = useRouter()


    const add = async () => {
      console.log("upload start");
      let frm = new FormData()
      if(files.value.length > 0){
        for(let i=0; i<files.value.length;i++){
                            //같은 이름으로 여러 번 올려야 합니다.
            
            console.log(files.value[i].file.name);
            frm.append("uploadfile", files.value[i].file); 
        }
      }
      frm.append('seller', props.parent_id)
      frm.append('name', board.value.subject)
      frm.append('price', board.value.price)
      frm.append('description', board.value.description)
    //   frm.append('allergy', board.value.allergy)
      if(files.value.length<1){
        alert("이미지를 등록해주세요.");
      } else if(isNaN(board.value.price)==true){
        alert("숫자만 입력해주세요.");
      }


      try{
        const res = await axios.post('product_new', frm,
          {headers:
            {'Content-Type':'multipart/form-data;charset=UTF-8'}
          }
          )
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
        board, add, 
        fileDeleteButton,imageUpload,imageAddUpload,
        files,//업로드용 파일
        filesPreview,
        uploadImageIndex // 이미지 업로드를 위한 변수
    }
  }
}
</script>

<style scoped>
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
  font-weight: 700;
}

input, textarea{
  border-radius:0;
  margin: 0 0 30px 0;
}

label{
  font-size:20px;
  font-weight:600
}

.red{
  color:#C64832;
  font-weight:bold;
}

</style>