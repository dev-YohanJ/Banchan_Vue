<template>
<div class="container">
  <Board_List/>
</div>
</template>

<script>
import Board_List from '../../components/main/main.vue'

import {useRouter} from 'vue-router'
export default {
    components: {
        Board_List
    },
    props:{
        parent_id:{
            type:String,
            required:false
        }
    },
    emits:['parent_getSession'],

    setup(props,context){

        //부모 컴포넌트에 App_1.vue에 있는 getSession을 호출합니다.
        //<router-view @parent_getSession="getSession" :parent_id="id" />
        context.emit("parent_getSession");

        const router = useRouter();
        const goWrite=()=>{
            router.push({
                name:'Board_Write',
                params:{id:props.parent_id}
            });
        }

        return{
            goWrite
        }
    }
}
</script>

<style>

</style>