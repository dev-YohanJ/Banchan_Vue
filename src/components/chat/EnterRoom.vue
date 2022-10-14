<template>
  <div class="bg-white-400 h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/3 bg-white sm:mx-0" style="height: 500px">
                <div class="flex flex-col flex-1 justify-center mb-8">
                    <h1 class="text-4xl text-center font-bold">오늘의 반찬</h1>
                    <div class="w-full mt-4">
                        <form class="form-horizontal w-3/4 mx-auto" method="GET">
                            <div class="flex flex-col mt-4" required>
                                <span class="px-1 text-gray-600 " >닉네임</span>
                                <input type="text" class="flex-grow h-10 px-2 border rounded border-grey-400" v-model="username" required>
                            </div>
                            <label class="flex flex-col mt-4">
                              <span class= "px-1 text-gray-600 p-2">대화상대</span>
                              <select  v-on:change="changeRoom($event)" class="form-select h-10 block w-full rounded">
                                <option value="Chat Room">테스트용</option>
                                <!-- <option value="Stocks">Stocks</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Mutual Funds and ETFs">Mutual Funds and ETFs</option> -->
                              </select>
                            </label>
                            <div class="flex flex-col mt-8">
                                <button v-on:click.prevent="enterRoom()" class="bg-blue-500 hover:bg-blue-700 text-black text-sm font-semibold py-2 px-4 rounded">
                                    입장
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
export default {
  name: 'EnterRoom',
  
 data: () => ({
   username: '',
   selected: "Chat Room",
 }),
 computed: {
        users() {
            console.log(this.$store.state.users)
            return this.$store.state.users
            
        }
    },
  methods: {
    changeRoom () {
      this.selected = target.value
    },
    enterRoom () {
      if (this.username === ''){
        alert("아이디를 입력하세요.") 
      }
      if (this.users.includes(this.username)) {
        alert("이미 사용중인 이름입니다.")
      }
      else {
      this.$emit('child-room', this.selected)
      this.$emit('user-to-room', this.username)
      }
    }
  }
}
</script>

<style>
</style>
