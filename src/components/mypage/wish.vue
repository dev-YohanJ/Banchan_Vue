<template>
  <!-- 왼쪽 네비게이션 -->
   <div style="margin-top:100px; margin-bottom:100px">
      <div class="row">
         <div class="buble">
                <div>
                    <aside>
                        <h3>오늘의 반찬</h3>
                        <ul class="nav nav-pills flex-column">
                            <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">마이페이지</router-link></li>
                            <li><router-link class="nav-item nav-link active bg-danger" :to="{name:'Wish'}">찜 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Buy'}">구매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Sell'}">판매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Update'}">개인정보수정</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Secession'}">회원탈퇴</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">공지사항</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">문의게시판</router-link></li>
                        </ul>
                    </aside>
                </div>
         </div>
         <div>
            <span>찜</span><span>10</span>
            <hr class="cutline">
            <div class="seldel">
                <input type="checkbox" v-model="isAll" @click="all()" /><button>선택삭제</button>
            </div>
            <div>
                <div class="clearfix"> <!-- 상품 2개 한 줄 -->
                    <div class="list"> <!-- 반찬 + 가격정보 합치기 div-->
                        <div class="banchan">
                            <img src="@/assets/img/food/jeyuk.jpg">
                        </div>
                        <div class="info">
                                <div class="title">제육볶음</div>
                                <div><span class="price">6,000</span><span>원</span></div>
                                <input class="checkbtn" type="checkbox" v-model="selectedAllValue[0]" />
                                <hr>
                                <div class="address">서울시 종로구 이화동</div>
                        </div>
                    </div>
                    <div class="list"> <!-- 반찬 + 가격정보 합치기 div-->
                        <div class="banchan">
                            <img src="@/assets/img/food/jeyuk.jpg">
                        </div>
                        <div class="info">
                                <div class="title">제육볶음</div>
                                <div><span class="price">6,000</span><span>원</span></div>
                                <input class="checkbtn" type="checkbox" v-model="selectedAllValue[1]" />
                                <hr>
                                <div class="address">서울시 종로구 이화동</div>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="list"> <!-- 반찬 + 가격정보 합치기 div-->
                        <div class="banchan">
                            <img src="@/assets/img/food/jeyuk.jpg">
                        </div>
                        <div class="info">
                                <div class="title">제육볶음</div>
                                <div><span class="price">6,000</span><span>원</span></div>
                                <input class="checkbtn" type="checkbox" v-model="selectedAllValue[2]" />
                                <hr>
                                <div class="address">서울시 종로구 이화동</div>
                        </div>
                    </div>
                    <div class="list"> <!-- 반찬 + 가격정보 합치기 div-->
                        <div class="banchan">
                            <img src="@/assets/img/food/jeyuk.jpg">
                        </div>
                        <div class="info">
                                <div class="title">제육볶음</div>
                                <div><span class="price">6,000</span><span>원</span></div>
                                <input class="checkbtn" type="checkbox" v-model="selectedAllValue[3]" />
                                <hr>
                                <div class="address">서울시 종로구 이화동</div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px; cursor: pointer;" id="message" @click="more">{{message}}</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import {ref, watch} from 'vue';
import axios from '../../axios/axiossetting.js';
import {useRouter} from 'vue-router';
export default {
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    emits:['parent_getSession'],

    setup(props, context) {
        let page=1;
        const selectedAllValue = ref([false, false, false, false]);
        const isAll = ref(false);
        const message = ref('찜한 목록이 없습니다');

        const all = ()=> {
            if (isAll.value) {
                for(var i=0; i < selectedAllValue.value.length; i++) {
                    selectedAllValue.value[i] = false
                }
            } else {
                for(var i=0; i < selectedAllValue.value.length; i++) {
                    selectedAllValue.value[i] = true
                }    
            }
        }
        
        watch( selectedAllValue.value, ()=>{
            let count = 0;
            for(var i=0; i < selectedAllValue.value.length; i++) {
                if (selectedAllValue.value[i] == true) {
                    count++
                }
            }
            isAll.value = selectedAllValue.value.length == count ? true : false;
        })

        const getList = async(page)=>{
            const id = props.parent_id;
            console.log("getList() id="+ id);
            try {
                const res = await axios.get("members/", {params:{id : id, page:page}})
                listcount.value = res.data.listcount;
                list.value = res.data.list;

                if (listcount.value == 0) {
                    message.value = "등록된 댓글이 없습니다."
                } else {
                    if (listcount.value > list.value.length) {
                        message.value = "더보기";
                    } else {
                        message.value = "";
                    }

                    count_message.value = "총 50자까지 가능합니다."

                    //store에 저장
                    store.dispatch('count', listcount.value);

                } 
            } catch (err) {
                console.log(err);
            }
                
        }

        const more = () => {
            getList(++page);
        }

        return {
           isAll, all, selectedAllValue, message, more
        }
    }
}
</script>

<style scoped>
.list {
    margin-top: 20px;
}
.title {
    margin: 5px;
}
.price {
    margin: 5px;
}
.checkbtn {
    position: relative;
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-left: 220px;
}
hr {
    margin-top: 40px;
    margin-bottom: 3px;
}
.address {
    margin-left: 10px;
    font-size: 12px;
}
.info {
    float: left;
    width: 260px;
    height: 150px;
    border: 1px solid #dddddd;
    margin-right: 20px;
}
.seldel {
    margin-bottom: 10px;
}
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.banchan{
    display:inline-block;
    margin:auto;
    width: 150px;
    height: 150px;
    float: left;
    margin-left: 20px;
}
button {
    margin-left: 10px;
    border: 1px solid #dddddd;
    outline: 0px;
}
input[type=checkbox] {
    position: relative;
    top: 6px;
    cursor: pointer;
    width: 20px;
    height: 20px;
}
.cutline {
    width: 907px;
    background: brown;
    margin-top: 0px;
    margin-bottom: 10px;
}
.row {
    margin-left: 15px;
}
.buble {
    margin-right: 20px;
}
h3 {
    margin: 10px 30px 0px 0px;
}


</style>