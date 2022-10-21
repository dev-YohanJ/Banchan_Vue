<template>
<footer class="footer spad">
    <div class="container">
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="footer__about">
                <div class="footer__about__logo">
                    <router-link class="nav-link" :to="{name:'Main'}"><img src="@/assets/img/logo.png"></router-link>
                    <div class="footer_content">
                        <div>서울특별시 종로구 율곡로10길 105 디아망 4F(봉익동 10-1 디아망 4F)</div>
                        <div>Phone: 070-8240-3211~3</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
</template>

<script>
</script>

<style scoped>
.footer {
	background: #F3F6FA;
	width:100%;
}

.footer__about {
	margin-bottom: 30px;
}

.footer__about ul li {
	font-size: 16px;
	color: #1c1c1c;
	line-height: 36px;
	list-style: none;
}

.footer__about__logo{
	margin-bottom: 15px;
    display: flex;
}

img{
    max-width: 170px;
    margin-left: 50px;
}

.footer__about__logo a {
	display: inline-block;
}


.footer_content{
    display: flex;
    width: 1000px;
    white-space:nowrap;
    flex-direction: column;
    justify-content: center;
}

.nav-link{
    padding: 0;
}

</style>