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
                        </ul>
                    </aside>
                </div>
         </div>
         <div>
            <span>찜</span><span>10</span>
            <hr class="cutline">
            <div class="seldel">
                <input type="checkbox" v-model="isAll" @change="all" /><button>선택삭제</button>
            </div>
            <div>
                <div class="list"> <!-- 반찬 + 가격정보 합치기 div-->
                    <div class="banchan">
                        <img src="@/assets/img/food/jeyuk.jpg">
                    </div>
                    <div class="info">
                            <div class="title">제육볶음</div>
                            <div><span class="price">6,000</span><span>원</span></div>
                            <input class="checkbtn" type="checkbox" v-model="selectedAllValue" />
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
                            <input class="checkbtn" type="checkbox" v-model="selectedAllValue" />
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
                            <input class="checkbtn" type="checkbox" v-model="selectedAllValue" />
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
                            <input class="checkbtn" type="checkbox" v-model="selectedAllValue" />
                            <hr>
                            <div class="address">서울시 종로구 이화동</div>
                    </div>
                </div>
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
        const selectedAllValue = ref([]);
        const isAll = ref(false);

        const all = ()=> {
            if (isAll.value) {
                selectedAllValue.value = true;
            } else {
                selectedAllValue.value = false;
            }
        }

        watch(selectedAllValue, ()=>{
            isAll.value = selectedAllValue.value.length==1 ? true : false;
        })

        return {
           isAll, all, selectedAllValue
        }
    }
}
</script>

<style scoped>
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
    margin-left: 170px;
}
hr {
    margin-top: 40px;
    margin-bottom: 3px;
}
.address {
    font-size: 12px;
}
.info {
    float: left;
    width: 200px;
    height: 150px;
    border: 1px solid #dddddd;
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
    margin-left: 60px;
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