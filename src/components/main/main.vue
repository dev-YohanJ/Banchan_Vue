<template>
    <!-- 배너 -->
    <div class="item">
        <img src="@/assets/img/banner.jpg" class="banner">
    </div>
 
    <!-- 게시글이 존재하는 경우 -->
	<div class="list">
		<div v-if="listcount>0">
			<div class="rows">
				<span>줄보기</span>
				<select class="form-control" v-model="limit">
					<option value=1>1</option>
					<option value=3>3</option>
					<option value=5>5</option>
					<option value=7>7</option>
					<option value=10 selected>10</option>
				</select>
			</div>
			
			<div class="container">
				<div class="contents_all" v-for="(item, index) in list" :key="index">
					<div class="picture">
					<img v-if="item" :src="require(`C:/upload/${item.image}`)"/>
					</div>
					<div class="contents">
						<div class="first">
							<router-link :to="{name:'Item_Detail', params:{num:`${item.id}`}}">
								<div class="title">{{item.name}}</div>
							</router-link>
							<div>{{item.location}}</div>
						</div>
						<div class="content">
							<div class="price">{{item.price}}원</div>
							<div class="regdate">{{item.regdate}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="center">
			등록된 글이 없습니다.
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
    const limit = ref(10)
    let currentpage = 1
    let maxpage = 1
    const listcount = ref(0)
    const list = ref([])
    const startnum = ref(0)

    //줄보기가 바뀌는 경우 getList() 호출한다.
    watch(limit, ()=>{
      console.log('[board_list.vue : store.state.page] ' + store.state.page)
      getList(store.state.page)
    })

    //pagination의 페이지 번호를 클릭한 경우 pageDo.vue에서 store의 state.page값을 선택한 페이지로 변경
    //그때 getList() 호출한다.
    watch(()=>store.state.page, ()=>{
      console.log('[board_list.vue : store.state.page] ' + store.state.page)
      getList(store.state.page)
    })
    
    const getList = async (page) => {
      try {
        const res = await axios.get(`item?page=${page}&limit=${limit.value}`)

        list.value = res.data.boardlist
        listcount.value = res.data.listcount
        maxpage = res.data.maxpage
        currentpage = res.data.page
        startnum.value = listcount.value-(currentpage-1)*limit.value
        console.log('page의 startnum.value = ' + startnum.value)

        for (let i=0; i < list.value.length; i++) {
          console.log(list.value[i].image)
          list.value[i].image = list.value[i].image.split(',')
          list.value[i].image = list.value[i].image[0]
        }
        console.log("이미지:"+list.value[0].image[0])

        const pagelist = ref([])
        for(let i=res.data.startpage; i<=res.data.endpage; i++){
          pagelist.value.push(i)
        }

        //pageDo.vue에서 사용하기 위해 store에 저장
        const obj = {maxpage, currentpage, pagelist}
        store.dispatch('store_obj', obj)
      }catch(err){
        console.log(err)
      }
    }

    getList(1)

    return {
      limit, startnum, list, listcount
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

.banchan > div> img{
    padding: 5px;
    width:300px;
    height: 230px;
	object-fit: cover;
}

.banchan > div {
	white-space: nowrap;
	text-align:center;
}

select.form-control{
  width:auto;margin-bottom:2em;display:inline-block;
}
.rows{text-align:right;}
.center{text-align:center}

.container{
  display: flex;
  flex-wrap: wrap;
  margin: auto;
}

.contents_all{
  width: 350px;
  margin-right:10px;
  margin-bottom: 11px;
  border: 1px solid #dddddd;
  display: block;
  padding: 10px;
}

.title{
  font-size:15px;
  padding-bottom: 10px;
  color: red;
  font-weight: bold;
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
  font-size:14px;
  color: grey;
}

.list{
	margin: 0 auto;
	margin-top:100px;
}

.first{
	display:flex;
	justify-content: space-between;
}


</style>
