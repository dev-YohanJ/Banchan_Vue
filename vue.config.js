/*
1. 웹팩은 싱글 파일 컴포넌트(.vue)로 작성한 파일을 브라우저가 인식할 수 있는 형태의 파일로 변환해 준다.

2. cmd 창에서 npm run build

3. 브라우저에서 http://localhost:8088/vue로 접속
 */

module.exports = ({
  //vue build시 build된 파일 경로
  outputDir: "C:/Users/Yohan/Desktop/Spring-boot/Vue_Board/src/main/resources/static",

  //index.html 경로
  indexPath: "C:/Users/Yohan/Desktop/Spring-boot/Vue_Board/src/main/resources/templates/index.html",

  //기본 시작 경로 - <link rel="icon" href="<%= BASE_URL %>icecream.ico>"의 <%= BASE_URL %>에 해당 값
  publicPath: "/vue/",

  lintOnSave: false
})