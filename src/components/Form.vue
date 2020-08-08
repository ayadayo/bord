<template>
  <form 
    class="c-form" 
    novalidate="true"
    @submit="ckeckForm"
  >
    <p>共有したい着信履歴を入力してください</p>
    <div v-if="inputdata.errors.length" class="c-errors">
      <div v-for="(error,index) in inputdata.errors" :key="index">
      【エラーが発生しました】<br>
      {{error}}
      </div>
    </div>
    <div class="c-form__item">
      <label for="telDate">着信日</label>
      <input 
      type="date" 
      id="telDate"
      v-model="inputdata.inputDate"
      >
    </div>
    <div class="c-form__item">
      <label for="telNumber">電話番号</label>
      <input 
      type="number" 
      id="telNumber"
      v-model="inputdata.inputNumber"
      >
    </div>
    <div class="c-form__item">
      <label for="telWho">誰宛の電話か</label>
      <input 
      type="text" 
      id="telWho"
      v-model="inputdata.inputWho"
      >
    </div>
    <div class="c-form__item">
      <label for="telContent">内容</label>
      <textarea 
      id="telContent" 
      rows="5" 
      v-model="inputdata.inputContent"
      ></textarea>
    </div>
    <button class="c-button">登録する</button>
  </form>
</template>
<script>
import {db} from '../plugins/firebase'
export default {
  name:'chatForm',//formなど、htmlタグに存在している名前はダメ
  data:function(){
    return {
      inputdata:{
        errors:[],
        inputDate:'',
        inputNumber:null,
        inputContent:'',
        inputWho:''
      }
    }
  },
  methods: {
    addComment(){
      const timeStamp = new Date()
      db.collection('comments').add({
          date:this.inputdata.inputDate,
          tel:this.inputdata.inputNumber,
          content:this.inputdata.inputContent,
          name:this.inputdata.inputWho,
          createdAt:timeStamp
      })
    },
    ckeckForm:function(event){
      this.inputdata.errors = [];
      if(!this.inputdata.inputNumber) {
        this.inputdata.errors.push('電話番号は必須です')
      }
      if(!this.inputdata.errors.length) {
        this.addComment();
        // const timeStamp = new Date()
        // db.collection('comments').add({
        //   date:this.inputdata.inputDate,
        //   tel:this.inputdata.inputNumber,
        //   content:this.inputdata.inputContent,
        //   name:this.inputdata.inputWho,
        //   createdAt:timeStamp
        // })
      }
      event.preventDefault();
    }
  }
}
</script>
<style>
  .c-form {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
  }
  .c-form p {
    margin-bottom: 10px;
  }
  .c-form__item:nth-child(n+2) {
    margin-top: 10px;
  }
  .c-form input,.c-form textarea {
    margin-left: 5px;
    background: #e9e9e9;
    border-radius: 5px;
    padding: 3px;
    width: 500px;
  }
  .c-form label {
    display: inline-block;
    vertical-align: top;
    width: 100px;
  }
  .c-button {
    display: block;
    margin: 20px auto 0;
    padding: 5px 0;
    background: #3c5ab3;
    color: #fff;
    border-color: #3c5ab3;
    width: 200px;
    border-radius:5px;
  }
  .c-errors {
    color:red;
  }
</style>