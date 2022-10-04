<template>
<div class="container">
  <Main/>
</div>
</template>

<script>
import Main from '../../components/main/main.vue'
export default {
    components: {
        Main
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

        return{
        }
    }
}
</script>

<style>

</style>