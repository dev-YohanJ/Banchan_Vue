<template>
  <div class="container">
      <div class="row">
          <div class="col-lg-6 col-md-6">
              <vueper-slides fade :touchable="false" fixed-height = "400px">
                <vueper-slide
                  v-for="(slide, i) in slides"
                  :key="i"
                  :image="slide.image" />
              </vueper-slides>
            <!-- <img v-if="image1" :src="require(`C:/upload/${image1}`)"/> 
            {{image1}}  -->
          </div>
          <div class="col-lg-6 col-md-6">
              <div class="product__details__text">
                  <div class="first_con">
                    <h3>{{board.name}}</h3>
                    <div>
                      <i class="fa fa-eye"></i>{{board.readcount}}
                        <span>|</span>
                      <i class="fa fa-clock-o"></i>{{board.regdate}}
                    </div>
                  </div>
                  <div class="second_con">
                    <div class="product__details__price">{{board.price}}원</div>
                    <div class="product__details__rating">
                        <span>(별점 미구현)</span>
                        <i class="fa fa-star fa-2x"></i>
                        <i class="fa fa-star fa-2x"></i>
                        <i class="fa fa-star fa-2x"></i>
                        <i class="fa fa-star fa-2x"></i>
                        <i class="fa fa-star-half-o fa-2x"></i>
                    </div>
                  </div>
                  <div class="description">
                    <div class="item_address"><i class="fa fa-map-marker"></i>{{board.location}}</div>
                    <div class="item_description">{{board.description}}</div>
                  </div>
                  <div class="group" 
                      v-if="board.seller == parent_id || parent_id == 'admin'">
                    <router-link :to="{name:'Item_Update'}">
                      <button class="btn btn-danger modify">내 반찬 관리하기</button>
                    </router-link> 
                    <button class="btn btn-danger">끌어올리기</button>
                  </div>
                  <div class="group" v-else>
                      <router-link :to="{name:'Chat'}">
                        <button class="chat">판매자에게 채팅</button>
                      </router-link>
                      <button class="buy">구매하기</button>
                      <button class="zzim"><i class="fa fa-heart"></i>찜하기</button>
                  </div>
                  <!-- <a href="#" class="primary-btn">ADD TO CARD</a> -->
                  <!-- <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a> -->
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import axios from '../../axios/axiossetting.js'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  props: {
    parent_id: {
      type: String,
      required: true
    }
  },
  components: { VueperSlides, VueperSlide },
  setup(){
    //board_list.vue에서 <router-link :to="{name:'Board_Detail', params:{num:`${item.board_NUM}`}}">로
    //이동할 때 사용된 파라미터 num을 가져온다.
    const num = useRoute().params.num
    const board = ref({})
    const router = useRouter()
    let i = ref("")
    let slides = ref([])
    const getDetail = async ()=>{
      try{
        const res = await axios.get(`items/${num}`)
        console.log(res.data)
        board.value = res.data.item
        // 작성일
        board.value.regdate = board.value.regdate.slice(0, 10)

        //이미지 불러오기
        board.value.image = board.value.image.split(',')

        console.log("length:"+board.value.image.length)
        console.log(board.value.image)

        for(i=0; i<board.value.image.length-1; i++){
          console.log(board.value.image[i])
          slides.value.push({
            image: require(`C:/upload/${board.value.image[i]}`)
          })
        }
      
        
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

    return {
      board, count, slides
    }
  }
}
</script>

<style scoped>
.attach {
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

.first_con{
  display:flex;
  justify-content: space-between;
  color:gray;
}

.container{
  margin:100px 0;
}

img{
  width:600px;
  height:400px;
	object-fit: cover;
}

.description{
  border: 1px solid #dddddd;
  padding: 10px 10px 140px 10px;
}

.item_address{
  border-bottom: 1px solid #dddddd;
  padding: 0 0 10px 0;
}

.item_description{
  padding: 10px 0 0 0;
}

button{
  font-size: 20px;
	color: #ffffff;
	font-weight: 800;
	display: inline-block;
	padding: 13px 50px 12px;
	background: #C64832;
  border:none;
  border-radius:0;
}

.group{
  margin:20px 0 0 0;
}

.modify{
  margin-left:10px;
  padding: 13px 70px 12px;
  background: #FCAB01;
}

::before{
  margin: 0 5px 0 0;
}

span{
  padding: 0 10px;
  color:lightgray
}

.second_con{
  display:flex;
  justify-content: space-between;
}

.chat{
  width:250px;
  padding: 13px 0px 12px;
  margin:0 0 0 10px;
}

.buy{
  width:250px;
  padding: 13px 0px 12px;
}

.zzim{
  width:160px;
  padding: 13px 0px;
}

.vueperslide__content-wrapper{
  height: 500px;
}


</style>