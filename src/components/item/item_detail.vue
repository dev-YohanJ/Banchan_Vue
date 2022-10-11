<template>
  <!-- <div>
		<table class="table">
			<thead>
        <tr>
		  		<th colspan=2>MVC 게시판-view페이지</th>
		  	</tr>
      </thead>
      <tbody>
		  	<tr>
		  		<td>글쓴이</td>
		  		<td>{{board.seller}}</td>
		  	</tr>
		  	<tr>
		  		<td>제목</td>
		  		<td>{{board.name}}</td>
		  	</tr>
        <tr>
		  		<td>가격</td>
		  		<td>{{board.price}}</td>
		  	</tr>
        <tr>
		  		<td>내용</td>
		  		<td>{{board.description}}</td>
		  	</tr>
				<tr>
					<td>첨부파일</td>
          <td v-if="board.image">
            <div @click="download"><img class="attach" src="../../assets/attach.png">{{board.original}}</div>
          </td>
          <td v-else></td>
				</tr>
        <tr>
				  <td colspan=2>
						<div class="group" 
                v-if="board.seller == parent_id || parent_id == 'admin'">
              <router-link :to="{name:'Item_Update'}">
                <button class="btn btn-warning">수정</button>
              </router-link>
              <button class="btn btn-danger" @click="showModal">삭제</button>
            </div>
            <div class="group" v-else>
              <router-link :to="{name:'Main'}">
                <button class="btn btn-danger">판매자에게 연락하기</button>
              </router-link>
              <router-link :to="{name:'Main'}">
                <button class="btn btn-danger">찜</button>
              </router-link>
            </div>
				  </td>
			  </tr>
      </tbody>
		</table>
  </div> -->

  <div class="container">
      <div class="row">
          <div class="col-lg-6 col-md-6">
            <img src="@/assets/img/food/jeyuk.jpg" alt="">
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
                    <div class="item_address"><i class="fa fa-map-marker"></i>서울시 종로구 이화동(미구현)</div>
                    <div class="item_description">{{board.description}}</div>
                  </div>
                  <div class="group" 
                      v-if="board.seller == parent_id || parent_id == 'admin'">
                    <router-link :to="{name:'Item_Update'}">
                      <button class="btn btn-danger modify">내 반찬 관리하기</button>
                    </router-link> 
                    <button class="btn btn-danger" @click="showModal">삭제하기</button>
                  </div>
                  <div class="group" v-else>
                    <router-link :to="{name:'Main'}">
                      <button class="chat">판매자에게 연락하기</button>
                    </router-link>
                    <router-link :to="{name:'Main'}">
                      <button class="zzim"><i class="fa fa-heart"></i>찜하기</button>
                    </router-link>
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
        const res = await axios.get(`items/${num}`)
        console.log(res.data)
        board.value = res.data.item
        board.value.regdate = board.value.regdate.slice(0, 10)
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
  padding: 13px 80px 12px;
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
  padding: 13px 70px 12px;
  margin:0 0 0 10px;
}

.zzim{
  padding: 13px 40px;
}

</style>