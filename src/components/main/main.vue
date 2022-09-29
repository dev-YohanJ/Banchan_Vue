<template>
    <!-- 배너 -->
    <div class="item">
        <img src="@/assets/img/banner.jpg" class="banner">
    </div>

    <!-- 반찬 목록 -->
    <div class="col-lg-12">
        <div class="section-title">
            <h2>오늘의 반찬</h2>
        </div>
    </div>
    <div class="content">
        <img src="@/assets/img/food/jeyuk.jpg">
        <img src="@/assets/img/food/tofu.jpg">
        <img src="@/assets/img/food/namul_1.jpg">
    </div>
    <div>
        <span>테스트</span>
    </div>

</template>

<script>
import {ref, watch} from 'vue';
import {useStore} from 'vuex';
import axios from '../../axios/axiossetting.js';
export default {

	setup(){
		const store = useStore();
		const limit=ref(10);
		let currentpage = 1;
		let maxpage = 1;
		const listcount = ref(0);
		const list = ref([]);
		const startnum = ref(0)

		//줄보기가 바뀌는 경우 getList() 호출합니다.
		watch(limit, ()=>{
			console.log("[board_list.vue : store.state.page] " + store.state.page)
			getList(store.state.page);
		})

		//페이지 네이션의 페이지 번호를 클릭한 경우 pageDo.vue에서 store의 state.page값을 선택한 페이지로 변경합니다.
		//그 때 getList() 호출합니다.
		watch(()=>store.state.page, ()=>{
			console.log("[board_list.vue : store.state.page] " + store.state.page)
			getList(store.state.page);
		})

		const getList = async (page) => {

			try {
				const res = await axios.get(`boards?page=${page}&limit=${limit.value}`);

				list.value = res.data.boardlist;
				listcount.value=res.data.listcount;
				maxpage=res.data.maxpage;
				currentpage=res.data.page;
				startnum.value=listcount.value-(currentpage-1)*limit.value;
				console.log("page의 startnum.value = " + startnum.value);

				const pagelist=ref([]);
				for(let i=res.data.startpage; i<=res.data.endpage;i++){
					pagelist.value.push(i);
				}

				//pageDo.vue에서 사용하기 위해 store에 저장합니다.
				const obj = {maxpage, currentpage, pagelist};
				store.dispatch('store_obj', obj);
			} catch (err) {
				console.log(err);
			}
		};

		getList(1);

		return{
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
}

.content{
    text-align: center;
} 

.content > img{
    padding: 5px;
    width:310px;
    height: 230px;
}





</style>
