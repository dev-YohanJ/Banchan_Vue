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
                            <li><router-link class="nav-item nav-link active" :to="{name:'Wish'}">찜 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Buy'}">구매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Sell'}">판매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Update_Check'}">개인정보수정</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Secession'}">회원탈퇴</router-link></li>
                        </ul>
                    </aside>
                </div>
         </div>
         <div style="width: 900px;">
            <span style="font-size:18px;">찜</span><span style="color: rgb(247, 47, 51); font-size:20px;">{{listcount}}</span>
            <hr class="cutline">
            <div class="seldel">
                <input type="checkbox" v-model="isAll" @click="all()" /><button @click="wish_del"
                        style="color:#212529;">선택삭제</button>
            </div>
            <div style="clear:both">
                <div class="clearfix" v-for="(item,index) in list" :key="index" > <!-- 상품 2개 한 줄 -->
                    <div class="list"> <!-- 반찬 + 가격정보 합치기 div-->
                        <div class="banchan">
                            <router-link :to="{name:'Item_Detail', params:{num:`${item.id}`}}">
                            <img v-if="item.image" :src="require(`C:/upload/${item.image[0]}`)">
                            </router-link>
                        </div>
                        <div class="info">
                            <div class="title">{{item.name}}</div>
                            <div><span class="price">{{item.price}}</span><span>원</span></div>
                            <input class="checkbtn" type="checkbox" v-model="selectedAllValue[index]" />
                            <hr>
                            <div class="address">{{item.location}}</div> <!-- {{item.location}} -->
                            <div v-if="item.status == 1" class="filter">
                                <div class="filter-text">판매완료</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="moremore" :style="more2" id="message" @click="more">
                    <img src="../../assets/plus.png" class="plus" :style="{display:imgst}"> 
                    {{message}}
                </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import {ref, watch} from 'vue';
import axios from '../../axios/axiossetting.js';
export default {
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    emits:['parent_getSession'],

    setup(props, context) {
        context.emit("parent_getSession");
        let page=1;
        const selectedAllValue = ref([]);
        const isAll = ref(false);
        const message = ref('찜한 목록이 없습니다');
        const more2 = ref("");
        const list = ref({});
        const listcount = ref(0);
        const imgst = ref('none');
        const checksave = ref([]);

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
        

        watch( ()=> props.parent_id , ()=>{
            console.log('watch=' + props.parent_id);
            if (props.parent_id) {
                load(page);
            }
        })

        const load = async(page) => {
            console.log("load입니다");
            const id = props.parent_id;
            console.log("load() id="+ id);
            try {
                const res = await axios.get("wish", {params:{id : id, page:page}})
                console.log(res.data);

                if(res.data==null) {
                    console.log('null입니다.');
                    return;
                }

                list.value = res.data.item;
                selectedAllValue.value=[];
                for (var i=0; i < list.value.length; i++) {
                    list.value[i].image= list.value[i].image.split(",");
                    console.log(list.value[i].image);

                    if(checksave.value.length == 0) {
                        for(var j=0; j<list.value.length; j++) {
                            checksave.value[j] = false;
                        }
                        
                    }

                    if(checksave.value.length > 0) {
                        if (checksave.value.length <= list.value.length) {
                        selectedAllValue.value.push(checksave.value[i]);
                        } else {
                            selectedAllValue.value.push(false);
                        }
                    }
                    
                }
                // 체크박스 기억 초기화
                checksave.value=[];

                listcount.value = res.data.listcount;
                console.log("listcount.value=" + listcount.value);

                if (listcount.value == 0) {
                    message.value = "찜한 목록이 없습니다"
                } else {
                    if (listcount.value > list.value.length) {
                        message.value = "더보기";
                        more2.value = "cursor: pointer;"
                        imgst.value = "inline";
                    } else {
                        message.value = "";
                        more2.value = "";
                        imgst.value = "none";
                    }
                } 
            } catch(err) {
                console.log(err)
                console.log("여기는 에러")
            }
        }

        if (props.parent_id) {
                load(page);
            }

        watch( selectedAllValue, ()=>{
            let count = 0;
            for(var i=0; i < selectedAllValue.value.length; i++) {
                if (selectedAllValue.value[i] == true) {
                    count++
                }
            }
            checksave.value = selectedAllValue.value;
            console.log(checksave.value);

            isAll.value = list.value.length == count ? true : false;
            if (count == 0) {
                isAll.value = false;
            }
        }, {deep:true})

        const more = () => {
            load(++page);
        }

        const wish_del = async()=> {
            const member_id = props.parent_id;
            console.log("wish_del = "+ member_id);
            console.log(checksave.value);

            let item_id = "";
            let frm=new FormData();
            for(var i=0; i<checksave.value.length; i++) {
                if(checksave.value[i] == true) {
                   item_id += "item_id=" + list.value[i].id + "&";
                }
            }
            console.log(item_id);
            item_id += "member_id=" + member_id;
            const answer = confirm("정말 삭제하시겠습니까?");
            if(answer) {
                try {
                    const res = await axios.delete("wish?" + item_id);
                    console.log(res.data);
                    
                    // 체크박스 기억 초기화
                    checksave.value=[];
                    load(page);
                    
                } catch(err) {
                    console.log(err)
                }
            }
        }

        return {
           isAll, all, selectedAllValue, message, more, list, imgst, wish_del, listcount, more2
        }
    }
}
</script>

<style scoped>
.moremore {
    text-align: center;
}
.filter-text {
    color: rgb(255 255 255);
    text-align: center;
    line-height: 150px;
}
.filter {
    position: relative;
    right: 151px;
    bottom: 150px;
    width: 150px;
    height: 150px;
    background: rgba(0, 0, 0, 0.6);
}
.nav-link.active,
  .show > .nav-link {
    background: #c64832;
}
.active:hover {
   background: #993423;
}
.plus {
    width:20px; height:20px;
}
#message {
    padding-top: 20px;
    clear:both;
}
.clearfix {
    margin-top: 20px;
}
.clearfix:nth-child(even)  {
    float:right;
}
.clearfix:nth-child(odd)  {
    float:left;
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
    width: 900px;
    background: rgb(255 255 255);
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