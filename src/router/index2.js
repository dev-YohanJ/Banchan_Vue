import {createRouter, createWebHistory} from 'vue-router';
import Main from '../pages/main/main.vue';
import Login from '../components/member/member_login.vue';
import Join from '../components/member/member_join.vue';
import Product_Write from '../components/board/item_write.vue';
import Mypage from '../components/mypage/mypage.vue';
import Notice_List from '../pages/admin/notice_list.vue';
import Notice_Detail from '../pages/admin/notice_detail.vue'
// import Board_List from '../pages/board/board_list.vue';
// import Board_Detail from '../pages/board/board_detail.vue';
// import Board_Write from '../component/board/board_write.vue';
// import Board_Update from '../component/board/board_update.vue';
// import Board_Reply from '../component/board/board_reply.vue';
// import Member_Update from '../component/member/member_update.vue';
// import Member_List from '../pages/member/member_list.vue';
// import Member_Info from '../component/member/member_info.vue';
// import Error_404 from '../component/error/404Do.vue';
const router = createRouter({
	history : createWebHistory(),
	routes : [
	{
		path:'/',
		redirect:'/banchan/main'
	},	
	{
		path:'/banchan',
		redirect:'/banchan/main'
	},	
	{
		path:'/banchan/main',
		name : 'Main',
		component : Main
	},
	{
		path:'/banchan/login',
		name : 'Login',
		component : Login
	},
	{
		path:'/banchan/join',
		name : 'Join',
		component : Join
	},
	{
		path:'/banchan/product_new',
		name : 'Product_Write',
		component : Product_Write
	},
	{
		path: '/banchan/mypage',
		name: 'Mypage',
		component: Mypage
	},
	{
		path: '/banchan/notice/list',
		name: 'Notice_List',
		component: Notice_List
	},
	{
		path: '/banchan/notice/:num/detail',
		name: 'Notice_Detail',
		component: Notice_Detail
	},
	// {
	// 	path:'/banchan/notices/list',
	// 	name : 'Board_List',
	// 	component : Board_List		
	// },
	// {
	// 	path:'/banchan/notices/:num/detail',
	// 	name : 'Board_Detail',
	// 	component : Board_Detail,

	// },
	// {
	// 	path:'/banchan/notices/write/:id',
	// 	name : 'Board_Write',
	// 	component : Board_Write
	// },
	// {
	// 	path:'/banchan/notices/:num/edit',
	// 	name : 'Board_Update',
	// 	component : Board_Update
	// },
	// {
	// 	path:'/banchan/notices/:num/reply',
	// 	name : 'Board_Reply',
	// 	component : Board_Reply
	// },
	// {
	// 	path:'/banchan/users/edit',
	// 	name : 'Member_Update',
	// 	component : Member_Update
	// },
	// {
	// 	path:'/banchan/users/list',
	// 	name : 'Member_List',
	// 	component : Member_List
	// },
	// {
	// 	path:'/banchan/users/:id/info',
	// 	name : 'Member_Info',
	// 	component : Member_Info
	// },
	// {
	// 	path:'/:pathMatch(.*)*',
	// 	redirect : '/banchan/404'
	// },
	// {
	// 	path:'/banchan/404',
	// 	name : '404',
	// 	component : Error_404
	// }
]
});

export default router;
