<template>
  <div id="app" class="l-wrapper">
  <h1>電話履歴</h1>
  <p>着信履歴を記録しましょう。迷惑電話や営業電話ナンバーを共有することが目的です。</p>
    <chatForm/>
    <searchForm/>
    <chatBord/>
  </div>
</template>
<script>
import chatBord from './components/ChatBoard'
import chatForm from './components/Form'
import searchForm from './components/search'
export default {
  name:'App',
  components:{
    chatBord,
    chatForm,
    searchForm
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
    margin: 30px auto;
  }
</style>