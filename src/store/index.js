import {createStore} from 'vuex'
export default createStore({
  state:{
    count:0,
    display:false,
    obj:{},
    page:1,
    limit:10,
    users: [],
    search_data: {},
  },
  getters: {
    allUsers: state => state.users
  },
  mutations:{ 
    update_count(state, payload){
      state.count = payload 
    },
    update_display(state, payload) {
      state.display = payload;
    },
    update_list(state, payload){
      state.obj = payload 
    },
    update_page(state, payload){
      state.page = payload 
    },
    update_limit(state, payload){
      state.limit = payload 
    },
    ADD_USER (state, user) {
      state.users.push(user)
    },
    REMOVE_USER (state, user) {
      state.users.splice(user, 1);
    },
    search_data (state, search_data) {
      state.search_data = search_data
    }
  },
  actions:{ 
    count(context, count){
      context.commit('update_count', count)
    },
    display(context, display) {
      context.commit('update_display', display);
    },
    store_obj(context, obj){
      context.commit('update_list', obj)
    },
    store_page(context, page){
      context.commit('update_page', page)
    },
    store_limit(context, limit){
      context.commit('update_limit', limit)
    },
    addUser({commit}, payload) {
      commit('ADD_USER', payload)
    },
    removeUser({commit}, payload) {
      commit('REMOVE_USER', payload)
    },
    search_data(context, payload) {
      context.commit('search_data', payload)
    },
  }
})