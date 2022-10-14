<template>
    <div class="modal1 bg" v-show="display">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <form @submit.prevent="goDelete">
                        <div class="form-gorup">
                            <label for="pwd">비밀번호</label>
                            <input type="password"
                                    class="form-control" placeholder="Enter password"
                                    v-model.lazy="board_pass" required>
                        </div>
                        <button type="submit" class="btn btn-primary">전송</button>
                        <button type="button" class="btn btn-danger"
                                data-dismiss="modal" @click="hidden">취소</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from '../axios/axiossetting.js';
import {useStore} from 'vuex';
export default {
    props: {
        parent_id:{
        type:String,
        required:true
        }
    },
    emits:['parent_getSession'],
    setup(props, context) {
        const store = useStore();
        const router = useRouter();
        const display = computed(()=> store.state.display);

        const goDelete = async ()=> {
            const res = await axios.delete(`member/${id}`)
            if(res.data != 1) {
                alert('삭제 실패 입니다.')
            } else {
                alert('삭제 성공');
                store.dispatch('display', false);
                router.push({
                    name : 'Main',
                });
            }
        }

        return {
            hidden, goDelete, board_pass, display
        }
    }
};
</script>

<style scoped>
 .modal1 {
    top: 0;
    left: 0;
    overflow: hidden;
    outline: 0;
 }
 .bg{
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.5);
	position:fixed;padding:20px
	}


</style>
