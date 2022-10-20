<template>
<footer class="footer spad">
    <div class="container">
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="footer__about">
                <div class="footer__about__logo">
                    <router-link class="nav-link" :to="{name:'Main'}"><img src="@/assets/img/logo.png"></router-link>
                <ul>
                    <li>Address: 서울시 종로구</li>
                    <li>Phone: +82 02.1234.1234</li>
                    <li>Email: hello@banchan.com</li>
                </ul>
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

#app > div > div.footer.container > footer > div > div > div > div > a > img{
	min-width: 200px !important;
    padding-top: 10px;
}

.footer__about__logo a {
	display: inline-block;
}
</style>