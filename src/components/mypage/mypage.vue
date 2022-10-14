<template>
  <!-- 왼쪽 네비게이션 -->
   <div style="margin-top:100px; margin-bottom:100px">
      <div class="row">
         <div class="buble">
                <div>
                    <aside>
                        <h3>오늘의 반찬</h3>
                        <ul class="nav nav-pills flex-column">
                            <li><router-link class="nav-item nav-link active" :to="{name:'Mypage'}">마이페이지</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Wish'}">찜 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Buy'}">구매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Sell'}">판매 목록</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Update'}">개인정보수정</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Secession'}">회원탈퇴</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Notice_List'}">공지사항</router-link></li>
                            <li><router-link class="nav-item nav-link" :to="{name:'Mypage'}">문의게시판</router-link></li>
                        </ul>
                    </aside>
                </div>
         </div>

            <div style="margin-left: 40px;">
                <div class="pic">
                    <div class="user-warp">
                        <div class="user-image">
                            <img class="icon" src="../../assets/basic.jpg"> 
                        </div>
                        <div class="user-text">
                                <img v-if="member.picture==null" class="profile" src="../../assets/profile.png"> <!--../../assets/profile.png -->
                               
                                <img v-if="member.picture" class="profile" :src="require(`C:/upload/${member.picture}`)"/>
                        </div>
                        <div class="label">
                            <label>
                                <div type="button">프로필 수정</div>    
                                <input type="file" v-show="false" @change="change">
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-area">
                <div class="nick-area">
                    <span v-show="btn == '수정'" class="nick">{{member.nickname}}</span>
                    <input type="textarea" v-show="btn == '확인'" class="nick" v-model.lazy="member.nickname">
                    <button style="margin-left: 10px; color:#212529;" @click="nchange">{{btn}}</button>
                </div>
                <div class="showintro" v-show="ibtn == '소개글수정'" style="margin-top:30px; margin-bottom:25px;">
                    {{member.intro}}
                </div>
                <textarea   rows="9" cols="45"
                    class="form-control"
                    v-show="ibtn == '확인'"
                    v-model.lazy="member.intro"
                    maxlength="300"
                    style="resize:none; margin-top:25px;">
                </textarea>
                <button @click="ichange" style="color:#212529;">{{ibtn}}</button>
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
        const fileName = ref("");
        const member = ref({});
        const btn = ref("수정");
        const ibtn = ref("소개글수정");
        const date = ref("");
        const pic = ref("");
        
        let file = '';

        const nchange = ()=> {
            if (btn.value == "수정") {
                btn.value = "확인";
            } else {
                btn.value = "수정"
                nick();
            }
        }

        const ichange = ()=> {
            if (ibtn.value == "소개글수정") {
                ibtn.value = "확인"
                
            } else {
                ibtn.value = "소개글수정";
                content();
            }
        }
       
        const load = async() => {
            console.log("load입니다");
            const id = props.parent_id;
            console.log("load() id="+ id);
            try {
                const res = await axios.get(`members/${id}`)
                member.value = res.data;
                console.log(res.data);
                if(member.value==null) {
                    console.log('null입니다.');
                    return;
                }
            } catch(err) {
                console.log(err)
                console.log("여기는 에러")
            }
        }

        const nick = async() => {
            try {
                const res = await axios.patch('members/nick', member.value)
                if (res.data == 1) {
                    console.log("nick수정완료");
                }
            } catch(err) {
                    console.log(err);
            }
        }

        const content = async() => {
            try {
                const res = await axios.patch('members/intro', member.value)
                if (res.data == 1) {
                    console.log("content수정완료");
                }
            } catch(err) {
                    console.log(err);
            }
        }

        watch( ()=> props.parent_id , ()=>{
            console.log('watch=' + props.parent_id);
            if (props.parent_id) {
                load();
            }
        });
        


        //props.parent_id 값이 있는 경우 info()를 호출합니다.
        if(props.parent_id)
           load(); 


        const change = async(event) => {

            const id = props.parent_id;
            console.log("change() id="+ id);
            file = event.target.files[0];
            fileName.value = file.name;
            console.log(fileName.value);


            let frm = new FormData();
            if (file !='' && fileName.value != null) { // let file = ''; 초기값 상태가 아닌지 확인합니다.
                frm.append("uploadfile", file);
                frm.append("id", id);

                try {
                const res = await axios.patch('members',
                frm
                ,
                {
                    headers:
                        { 'Content-Type' : 'multipart/form-data;charset=UTF-8' }
                }
                );

                load();

                } catch(err) {
                    console.log('여기는 오류');
                    console.log(err);
                }

            }

        } // update end



        return {
            member, btn, change, nchange, ichange, ibtn, date, pic
        }
    }
}
</script>

<style scoped>
.nav-link.active,
  .show > .nav-link {
    background: #c64832;
}
.active:hover {
   background: #993423;
}
.showintro {
    width: 450px;
    height: 200px;
}
label div {
    margin-top: 10px;
    text-align: center;
}
.label {
    position: relative;
    left: 92px;
    bottom: 85px;
     width: 106px;
    border: 1px solid rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    height: 40px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    margin-left: 10px;
    font-size: 13px;
}
button {
    border: 1px solid #dddddd;
    outline: 0px;
}
.pic {
    width:310px;
    height:310px;
    margin-right: 30px;
    border: 1px solid #dddddd;
}
.user-warp {
    widows: 100%;
    position: relative;
}
.user-warp img {
    width: 100%;
    vertical-align: middle;
}
.user-text {
    position: absolute;
    top: 80%;
    left: 50%;
    border-radius: 50%;
    width: 100px;
    height: 100%;
    transform: translate( -50%, -50%);
}
.profile {
    width: 100px;
    height: 100px;
    border-radius: 50%;
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
.introduce {
    border: 1px solid #dddddd;
}
.mybody {
    float:right;
}
</style>