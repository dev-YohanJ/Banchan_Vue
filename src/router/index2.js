import {createRouter, createWebHistory} from 'vue-router';
import Main from '../pages/main/main.vue';
import Login from '../components/member/member_login.vue';
import Join from '../components/member/member_join.vue';
import Product_Write from '../components/item/item_write.vue';
import Mypage from '../components/mypage/mypage.vue';
import Wish from '../components/mypage/wish.vue';
import Buy from '../components/mypage/buy.vue';
import Sell from '../components/mypage/sell.vue';
import Update from '../components/mypage/update';
import Secession from '../components/mypage/secession';
import Notice_List from '../pages/admin/notice_list.vue';
import Notice_Detail from '../pages/admin/notice_detail.vue'
import Notice_Write from '../pages/admin/notice_write.vue';
import Notice_Update from '../pages/admin/notice_update.vue';
import Qna_List from '../pages/admin/qna_list.vue';
import Qna_Detail from '../pages/admin/qna_detail.vue'
import Item_List_Admin from '../pages/admin/item_list_admin.vue';
import Member_List from '../pages/admin/member_list.vue';
import Member_Info from '../pages/admin/member_info.vue';
import Member_Update from '../components/admin/member_update.vue';
import Item_List from '../pages/item/item_list.vue';
import Item_Detail from '../pages/item/item_detail.vue';
import Item_Update from '../pages/item/item_update.vue';
// import Board_Reply from '../component/board/board_reply.vue';
import Error_404 from '../components/error/404Do.vue';
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
		path: '/banchan/wish',
		name: 'Wish',
		component: Wish
	},
	{
		path: '/banchan/buy',
		name: 'Buy',
		component: Buy
	},
	{
		path: '/banchan/sell',
		name: 'Sell',
		component: Sell
	},
	{
		path: '/banchan/update',
		name: 'Update',
		component: Update
	},
	{
		path: '/banchan/secession',
		name: 'Secession',
		component: Secession // 회원탈퇴
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
	{
		path:'/banchan/notice/write/:id',
		name : 'Notice_Write',
		component : Notice_Write
	},
	{
		path:'/banchan/notice/:num/edit',
		name : 'Notice_Update',
		component : Notice_Update
	},
	{
		path: '/banchan/qna/list',
		name: 'Qna_List',
		component: Qna_List
	},
	{
		path: '/banchan/qna/:num/detail',
		name: 'Qna_Detail',
		component: Qna_Detail
	},
	{
		path:'/banchan/admin/item/list',
		name : 'Item_List_Admin',
		component : Item_List_Admin		
	},
	{
		path:'/banchan/users/list',
		name : 'Member_List',
		component : Member_List
	},
	{
		path:'/banchan/users/:id/info',
		name : 'Member_Info',
		component : Member_Info
	},
	{
		path:'/banchan/users/:id/edit',
		name : 'Member_Update',
		component : Member_Update
	},
	{
		path:'/banchan/item/list',
		name : 'Item_List',
		component : Item_List		
	},
	{
		path:'/banchan/item/:num/detail',
		name : 'Item_Detail',
		component : Item_Detail,
	},
	{
		path:'/banchan/item/:num/edit',
		name : 'Item_Update',
		component : Item_Update
	},
	// {
	// 	path:'/banchan/notices/:num/reply',
	// 	name : 'Board_Reply',
	// 	component : Board_Reply
	// },

	// {
	// 	path:'/:pathMatch(.*)*',
	// 	redirect : '/banchan/404'
	// },
	{
		path:'/banchan/404',
		name : '404',
		component : Error_404
	}
]
});

export default router;
