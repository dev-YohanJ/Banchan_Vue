<template>
<div class="container">
    <form @submit.prevent="add">
      <h3>상품등록</h3><br>
      <div class="form-group">
        <!-- <label>파일 첨부</label>
        <label>
          <img src="../../assets/attach.png" alt="파일첨부" @change="onFileChange" />
          <img class="item_Image" :src="board.fileName">
          <input type="file" v-show="false" @change="change">
        </label>
        <span>{{board.fileName}}</span> -->
        <div class="room-deal-information-container">
      <div class="room-deal-information-title">사진 등록</div>
      <div class="room-file-upload-wrapper">
          <div v-if="!files.length" class="room-file-upload-example-container">
              <div class="room-file-upload-example">
                  <div class="room-file-notice-item">
                    최소 1장 이상의 이미지를 등록해주세요.(최대 3장까지 가능합니다.)
                    <br>이미지 한 장당 10MB 까지 등록이 가능합니다.
                  </div>
                  <div class="room-file-notice-item room-file-upload-button">
                      <div class="image-box">
                          <label for="file">이미지 등록</label>
                          <input type="file" id="file" ref="files" @change="imageUpload" multiple />
                      </div>
                  </div>
              </div>
          </div>
          <div v-else class="file-preview-content-container">
              <div class="file-preview-container">
                  <div class="file-preview-wrapper-upload">
                      <div class="image-box">
                          <label for="file">추가 사진 등록</label>
                          <input type="file" id="file" ref="files" @change="imageAddUpload" multiple />
                      </div>
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
        <label for="board_allergy">알레르기 성분</label>
        <input 
          type="text"
          v-model.lazy="board.allergy"
          maxlength="100"
          class="form-control"
          placeholder="알레르기 성분을 골라주세요."
          required>
      </div>

      <div class="comp_hashtag" @click="setHashtags" ref="group">
        <p class="help" v-if="helpVisible">{{ defaultPlaceholder }}</p>

        <!-- Hashtags -->
        <div class="tags" v-if="!helpVisible">
        <input
            type="text"
            class="fake"
            ref="fake"
            @keydown.backspace.prevent="deleteTag(focusIndex)"
            @keydown.delete.prevent="deleteTag(focusIndex)"
        />
        <span
            class="tag"
            v-for="(row, index) in tags"
            :key="index"
            :class="{ active: row.select }"
            @click="selectTag(index)"
            >{{ row.value }}</span
        >
        </div>
        <!--// Hashtags -->

        <div class="inp" v-show="!helpVisible">
        <input
            type="text"
            ref="input"
            v-model.trim="value"
            @focus="initSelect"
            @keydown.space.prevent="addHashTags"
            @keydown.enter.prevent="addHashTags"
            @keydown.backspace="initErrorMsg"
            @keydown.delete="initErrorMsg"
            placeholder="태그입력"
        />
        </div>

        <transition
        enter-active-class="animate__animated animate__fadeInDown animate__faster"
        leave-active-class="animate__animated animate__fadeOut"
        >
        <p class="noti" v-if="this.errorMsg">{{ errorMsg }}</p>
        </transition>
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
    data() {
    return {
      defaultPlaceholder: this.placeholder
        ? this.placeholder
        : "#추천태그 #특수문자제외",
      errorMsg: null,
      focusIndex: null,
      helpVisible: true,
      tags: [],
      value: "",
    };
  },
  methods: {
    setVisible() {
      return (this.helpVisible = false);
    },
    async setHashtags() {
      if (this.tags.length > 0) {
        return;
      }

      const result = await this.setVisible();

      if (!result) this.$refs.input.focus();
    },

    addTag() {
      this.tags.push({ value: this.value, select: false });
      return true;
    },
    unselectTag() {
      this.tags.forEach((tag) => (tag.select = false));
    },
    selectTag(idx) {
      if (this.tags.some((tag) => tag.select)) {
        this.unselectTag();
      }

      this.tags[idx].select = !this.tags[idx].select;

      if (!this.tags[idx].select) {
        this.initSelectIndex();
        return;
      }

      this.$refs.fake.focus();
      this.focusIndex = idx;
    },
    deleteTag(idx) {
      if (idx === null) {
        return;
      }

      this.initSelectIndex();
      this.tags.splice(idx, 1);
    },

    initSelect() {
      if (!this.tags.some((tag) => tag.select)) {
        return;
      }

      this.unselectTag();
      this.initSelectIndex();
    },
    initSelectIndex() {
      this.focusIndex = null;
    },
    initErrorMsg() {
      this.errorMsg = null;
    },
    validate() {
      if (this.tags.some((tag) => tag.value === this.value)) {
        return "중복된 단어를 입력하셨습니다.";
      }

      const regex = /[~!@#$%^&*()+|<>?:{},.="':;/-]/;
      if (regex.test(this.value)) {
        return "특수문자는 태그로 등록할 수 없습니다.";
      }

      return false;
    },
    async addHashTags(event) {
      // CASE 공백
      if (event.target.value === "") {
        this.initErrorMsg();
        event.target.focus();
        return;
      }
      // CASE 유효성(중복,특문)
      const resultMsg = await this.validate();
      if (resultMsg) {
        this.errorMsg = resultMsg;
        this.$refs.input.focus();
        return;
      }

      await this.addTag();

      this.errorMsg = null;
      this.value = null;
      this.$refs.input.focus();
    },
  },
  mounted() {},



/* add */ 
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
      fileName:'',
      description:'',
      price:'',
      subject:'',
      allergy:''
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
      // frm.append('uploadfile', file)
      frm.append('seller', props.parent_id)
      frm.append('name', board.value.subject)
      frm.append('price', board.value.price)
      frm.append('description', board.value.description)
      frm.append('allergy', board.value.allergy)
      console.log(board.value.subject, board.value.price, board.value.description, board.value.allergy, props.parent_id);

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


    // 파일 업로드
    const files = ref([]) //업로드용 파일
    const filesPreview = ref([])
    let uploadImageIndex = 0 // 이미지 업로드를 위한 변수
    
    const imageUpload = () => {
          console.log(files);

          // this.files = [...this.files, this.$refs.files.files];
          //하나의 배열로 넣기
          let num = -1;
          for (let i = 0; i < files.length; i++) {
              files = [
                  ...files,
                  //이미지 업로드
                  {
                      //실제 파일
                      file: files.files[i],
                      //이미지 프리뷰
                      preview: URL.createObjectURL(files.files[i]),
                      //삭제및 관리를 위한 number
                      number: i
                  }
              ];
              num = i;
              //이미지 업로드용 프리뷰
              // this.filesPreview = [
              //   ...this.filesPreview,
              //   { file: URL.createObjectURL(this.$refs.files.files[i]), number: i }
              // ];
          }
          uploadImageIndex = num + 1; //이미지 index의 마지막 값 + 1 저장
          console.log(files);
          // console.log(this.filesPreview);
      }

      const imageAddUpload = () => {
          console.log(this.$refs.files.files);

          if(this.uploadImageIndex < 3){
          // this.files = [...this.files, this.$refs.files.files];
          //하나의 배열로 넣기c
          let num = -1;
          for (let i = 0; i < this.$refs.files.files.length; i++) {
              console.log(this.uploadImageIndex);
              this.files = [
                  ...this.files,
                  //이미지 업로드
                  {
                      //실제 파일
                      file: this.$refs.files.files[i],
                      //이미지 프리뷰
                      preview: URL.createObjectURL(this.$refs.files.files[i]),
                      //삭제및 관리를 위한 number
                      number: i + this.uploadImageIndex
                  }
              ];
              num = i;
          }
          this.uploadImageIndex = this.uploadImageIndex + num + 1;

          console.log(this.files);
          // console.log(this.filesPreview);
          }
      }

      const fileDeleteButton = (e) => {
          const name = e.target.getAttribute('name');
          this.files = this.files.filter(data => data.number !== Number(name));
          // console.log(this.files);
      }

    return {
      board, change, add
      , files, filesPreview, uploadImageIndex, imageUpload, imageAddUpload, fileDeleteButton
    }
  },

//   props: {
//         placeholder: {
//             type: String,
//         }
//     },

//     setup(props){
//         console.log(props.placeholder)
//         const defaultPlaceholder = props.placeholder
//             ? this.placeholder
//             : "#추천태그 #특수문자제외"
//         const errorMsg = null
//         const focusIndex = null
//         let helpVisible = true
//         const tags = ref([])
//         const value = ""

//         const setVisible = () => {
//         return (helpVisible = false);
//         }
        
//         const setHashtags = async() => {
//         if (tags.length > 0) {
//             return;
//         }

//         const result = await setVisible();

//         if (!result) this.$refs.input.focus();
//         }

//         const addTag = () => {
//         this.tags.push({ value: this.value, select: false });
//         return true;
//         }

//         const unselectTag = () => {
//         this.tags.forEach((tag) => (tag.select = false));
//         }

//         const selectTag = (idx) => {
//         if (this.tags.some((tag) => tag.select)) {
//             this.unselectTag();
//         }

//         this.tags[idx].select = !this.tags[idx].select;

//         if (!this.tags[idx].select) {
//             this.initSelectIndex();
//             return;
//         }

//         this.$refs.fake.focus();
//         this.focusIndex = idx;
//         }

//         const deleteTag = (idx) => {
//         if (idx === null) {
//             return;
//         }

//         this.initSelectIndex();
//         this.tags.splice(idx, 1);
//         }

//         const initSelect = () => {
//         if (!this.tags.some((tag) => tag.select)) {
//             return;
//         }

//         this.unselectTag();
//         this.initSelectIndex();
//         }

//         const initSelectIndex = () => {
//         this.focusIndex = null;
//         }

//         const initErrorMsg = () => {
//         this.errorMsg = null;
//         }

//         const validate = () => {
//         if (this.tags.some((tag) => tag.value === this.value)) {
//             return "중복된 단어를 입력하셨습니다.";
//         }

//         const regex = /[~!@#$%^&*()+|<>?:{},.="':;/-]/;
//         if (regex.test(this.value)) {
//             return "특수문자는 태그로 등록할 수 없습니다.";
//         }

//         return false;
//         }

//         const addHashTags = async(event) => {
//         // CASE 공백
//         if (event.target.value === "") {
//             this.initErrorMsg();
//             event.target.focus();
//             return;
//         }
//         // CASE 유효성(중복,특문)
//         const resultMsg = await this.validate();
//         if (resultMsg) {
//             this.errorMsg = resultMsg;
//             this.$refs.input.focus();
//             return;
//         }

//         await this.addTag();

//         this.errorMsg = null;
//         this.value = null;
//         this.$refs.input.focus();
//         }
        
//         return{
//             defaultPlaceholder, errorMsg, focusIndex, helpVisible, tags, value, 
//         setVisible, setHashtags, addTag, unselectTag, selectTag, deleteTag, initSelect, initSelectIndex, initErrorMsg, validate, addHashTags
//         }
//     }
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
      border-radius: 5px;
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
      border-radius: 3px;
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
      border-radius: 5px;
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

/* 해시태그 */
.comp_hashtag {
  position: relative;
  width: 100%;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 40px;
  margin: 100px auto;
  text-align: left;
  box-sizing: border-box;
}

  .noti {
    position: absolute;
    left: 0;
    top: 100%;
    font-size: 12px;
    margin-top: 5px;
    padding: 0 5px;
    border-radius: 4px;
    border: 1px solid #ea2136;
    color: #ea2136;
    text-align: left;
    line-height: 2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .help {
    padding: 0;
    margin: 0;
    line-height: 30px;
    font-weight: 300;
    font-size: 14px;
    color: #ccc;
    vertical-align: top;
  }

  .tags {
    position: relative;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -6px;
  }

    .fake {
      position: absolute;
      width: 1px;
      height: 1px;
      left: -1px;
      right: -1px;
      padding: 0;
      border: 0;
      outline: none;
      -webkit-appearance: none;
      -webkit-text-size-adjust: none;
    }
    .tag {
      display: inline-block;
      position: relative;
      margin: 0 5px 6px 0;
      padding: 0 5px;
      line-height: 30px;
      border-radius: 5px;
      background-color: #eee;
      vertical-align: top;
      word-wrap: break-word;
      word-break: break-all;
      font-size: 13px;
      text-align: left;
    }
      .tag:hover:after {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #aaa;
        content: "";
        border-radius: 5px;
      }

      .tag:before {
        display: inline;
        content: "#";
      }

      .tag.active {
        background-color: #656565;
        color: #fff;
      }
        .tag:hover:after {
          display: none;
        }

  .inp {
    display: inline-block;
    overflow: hidden;
    height: 30px;
    width: 150px;
    vertical-align: top;
    font-family: "Noto Sans KR", "Malgun Gothic", "굴림", Gulim, "돋움", Dotum,
      Sans-serif;
  }

    .inp:before {
      display: inline;
      position: relative;
      top: -1px;
      content: "#";
      color: #3e3e3e;
      margin-right: 2px;
      vertical-align: top;
      line-height: 30px;
    }

    .inp > input {
      width: 135px;
      height: 28px;
      vertical-align: top;
      color: #3e3e3e;
      -webkit-appearance: none;
      -webkit-text-size-adjust: none;
      padding: 0;
      border: 0;
      outline: none;
      vertical-align: top;
      font-family: "Noto Sans KR", "Malgun Gothic", "굴림", Gulim, "돋움", Dotum,
        Sans-serif;
    }



/* 파일 */
.file-label {
  margin-top: 30px;
  background-color: #E8A684;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  width: 100px;
  border-radius: 6px;
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

</style>