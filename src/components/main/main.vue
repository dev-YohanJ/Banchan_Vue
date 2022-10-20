<template>
  <!-- 배너 -->
  <div class="item">
      <img src="@/assets/img/banner.jpg" class="banner">
  </div>
  
  <div class="col-lg-12">
      <div class="section-title">
          <h2>오늘의 반찬</h2>
      </div>
  </div>
  <div class="container_all">

	<div class="list">
			<div class="container">
				<div class="contents_all" v-for="(item, index) in list" :key="index">
          <router-link style=text-decoration:none; :to="{name:'Item_Detail', params:{num:`${item.id}`}}">
            <div v-if="item.status == 0" class="picture">
              <img v-if="item" :src="require(`C:/upload/${item.image}`)"/>
            </div>
            <div v-if="item.status == 1" class="picture_sell">
              <img class="pic" v-if="item" :src="require(`C:/upload/${item.image}`)"/>
              <p v-if="item.status == 1" class="picture_text">판매완료</p>
            </div>

            <div class="contents">
              <div class="first">
                  <div class="title">{{item.name}}</div>
                <div class="regdate"><i class="fa fa-clock-o" aria-hidden="true"></i>{{item.regdate}}</div>
              </div>
              <div class="content">
                <div class="price">{{item.price}}원</div>
                <div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>{{item.location}}</div>
              </div>
            </div>
          </router-link>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import {useStore} from 'vuex'
import axios from '../../axios/axiossetting.js'
export default {
  setup(){
    const store = useStore()
        let option_data = ref([])
        option_data.value = [
            {value:'N', label:'제목'},
            {value:'L', label:'지역'},
            {value:'NL', label:'제목 또는 지역'},
        ]
        const limit = ref(50)
        let currentpage = 1
        let maxpage = 1
        const list = ref([])
        const listcount = ref(0)
        const startnum = ref(0)
        const search_field = ref('NL')
        const placeholder_message = ref('아이디를 입력하세요')
        console.log('search_field2=' + search_field.value)
        const search_word = ref('')
        const f2 = ref(null)
        const search = () => {
            console.log('search하러 가요')
            if(search_word.value==''){
                alert('검색어를 입력하세요')
                f2.value.focus()
                return
            }
            getList(currentpage)
        }

        const change_placeholder = () => {
            option_data.value.filter(item => {
                if(item.value===search_field.value){
                placeholder_message.value = item.label + '(를)을 입력하세요'
                return
                }
            })
        }

        const getList = async (page) => {
        try{
            const res = await axios.get(`item?page=${page}&limit=${limit.value}&search_field=${search_field.value}&search_word=${search_word.value}`);
            console.log('boardlist1=' + res.data)
            list.value = res.data.boardlist1
            maxpage = res.data.maxpage
            currentpage = res.data.page
            search_field.value = res.data.search_field
            search_word.value = res.data.search_word
            startnum.value = listcount.value - (currentpage-1) * limit.value

            for (let i=0; i < list.value.length; i++) {
                console.log(list.value[i].image)
                list.value[i].image = list.value[i].image.split(',')
                list.value[i].image = list.value[i].image[0]
            }
            // console.log("이미지:"+list.value[0].image[0])

            const pagelist = ref([])
            for(let i=res.data.startpage; i<=res.data.endpage; i++){
            pagelist.value.push(i)
            }

            const obj = {maxpage, currentpage, pagelist}
            store.dispatch('store_obj', obj)
        }catch(err){
            console.log(err)
        }
        }

        getList(1)

        //watch 검색어가 변경된 경우 
        watch(()=>store.state.search_data, ()=>{

          search_word.value = store.state.search_data.keyword
          console.log(search_word.value)
          search_field.value = store.state.search_data.search_field
          console.log(search_field.value)
          getList(1)
        })

        watch(limit, ()=>{
        store.dispatch('store_limit', limit.value)
        console.log('board_list_vue - store.state.page] ' + store.state.page)
        getList(store.state.page)
        })

        //pagination에서 페이지 번호를 클릭한 경우 store.state.page의 값이 변경된다.
        //store.state.page에 해당하는 목록을 가져오기
        watch(()=>store.state.page, ()=>{
        getList(store.state.page)
        })


        return {
            limit, search_field, search_word, search, listcount, list, startnum,
            placeholder_message, change_placeholder, option_data, f2      
        }
  }
}
</script>

<style scoped>

.banner{
    width:800px;
    margin: auto;
	padding: 35px 0 0 0;
	margin-bottom: 100px;
	display:inline-block;
}

.banchans{
    text-align: center;
	margin:auto;
	
} 

.banchan{
	display:inline-block;
	margin:auto;
	
}

select.form-control{
  width:auto;margin-bottom:2em;display:inline-block;
}
.rows{text-align:right;}
.center{text-align:center}

.container{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  width: 100%;
}

.contents_all{
  width: 24.1%;
  margin-right:10px;
  margin-bottom: 11px;
  border: 1px solid #dddddd;
  display: block;
  padding: 10px;
}


.title{
  font-size:16px;
  color: #252525;;
  text-decoration: none;
}

.content{
  display:flex;
  justify-content: space-between;
}

.price{
  font-size:18px;
  font-weight:bold;
}

.regdate{
  display:flex;
  font-size:14px;
  color: grey;
}

.list{
  display: block;
  width: 100%;
	margin: 0 auto;
}

.first{
	display:flex;
	justify-content: space-between;
  align-items: center;
  margin-top:10px;
  padding-bottom: 10px;
}

.filter-text {
    color: rgb(255 255 255);
    text-align: center;
    line-height: 225px;
    font-size: 30px;
}
.filter {
    position: relative;
    bottom: 279px;
    width: 328px;
    height: 219px;
    background: rgba(0, 0, 0, 0.6);
}

.picture > img{
  width:100%;
  height: 200px;
  object-fit: cover;
}

.picture_sell > img{
  width:100%;
  height: 200px;
  object-fit: cover
}

.picture_sell{
  filter: brightness(100%); 
}

.pic{
  filter: brightness(50%); 
}

.picture_text{
  position: absolute;
  top: 46%;
  width: 100%;
  font-size: 22px;
  font-weight: right;
  text-align:center;
  color:white !important;
}

.img{
  width:100%;
  height: 80%;
}

a{
  color: #252525;
}


.fa-map-marker{
  padding: 0 5px 5px 0;
}

.fa-clock-o{
  padding: 1px 5px 0px 0;
}

.location{
  display:flex;
  align-items: center;
}

</style>
