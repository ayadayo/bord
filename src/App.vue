<template>
  <div id="app" class="l-wrapper">
  <h1>電話履歴</h1>
  <p>電話通知を記録しましょう。迷惑電話や営業電話ナンバーを共有することが目的です。</p>
    <chatBord/>
  </div>
</template>
<script>
import chatBord from './components/ChatBoard'
export default {
  name:'App',
  components:{
    chatBord
  }
}
</script>
<style>
  body {
    background: #f7f6fb;
    font-family: 'Noto Sans JP', sans-serif;
  }
  .l-wrapper {
    max-width: 800px;
    padding: 20px;
    margin: 30px auto;
    background: #fff;
  }
</style>