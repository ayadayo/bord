<template>
  <form 
    class="c-form" 
    ref="telForm"
    :class="{'is-overlay':isActive}"
    novalidate="true"
    @submit="ckeckForm"
  >
  <div class="c-complete" v-if="isActive">
  記録が完了しました。
  </div>
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
      class="c-input"
      v-model="inputDate"
      >
    </div>
    <div class="c-form__item">
      <label for="telNumber">電話番号</label>
      <input 
      type="number" 
      id="telNumber"
      class="c-input"
      v-model="inputdata.inputNumber"
      >
    </div>
    <div class="c-form__item">
      <label for="telWho">誰宛の電話か</label>
      <select 
      name="telWho" 
      id="telWho" 
      class="c-input"
      v-model="inputdata.inputWho">
      <option value="">選択してください</option>
        <option v-for="staff of staffList"
        :key="staff.name"
        :value="staff.name">{{staff.name}}</option>
      </select>
    </div>
    <div class="c-form__item">
      <label for="telContent">内容</label>
      <textarea 
      id="telContent" 
      rows="5" 
      class="c-input"
      v-model="inputdata.inputContent"
      ></textarea>
    </div>
    <button class="c-button">記録する</button>
  </form>
</template>
<script>
import {db} from '../plugins/firebase'
import staffList from '../config/seezStaff'

function zeropadding(val){
  return ('00' + val).slice(-2);
}

export default {
  name:'chatForm',//formなど、htmlタグに存在している名前はダメ
  data:function(){
    const today = new Date();
    return {
      staffList:staffList,
      isActive:false,      
      inputdata:{
        errors:[],
        inputNumber:null,
        inputContent:'',
        inputWho:''
      },
      inputDate:[
        today.getFullYear(),
        zeropadding(today.getMonth() +1),
        zeropadding(today.getDate()),
      ].join('-'),
    }
  },
  methods: {
    addComment(){
      const timeStamp = new Date()
      db.collection('comments').add({
          date:this.inputDate,
          tel:this.inputdata.inputNumber,
          content:this.inputdata.inputContent,
          name:this.inputdata.inputWho,
          createdAt:timeStamp
      })
        this.clear();

    },
    timerStart(){
      this.isActive = true;
      setTimeout(this.timerClose,3000);
    },
    timerClose() {
      this.isActive = false;
      clearInterval(this.timerStart);
    },
    clear() {
      // const telForm = this.$refs.telForm;
      this.inputdata.inputNumber = '';
      this.inputdata.inputContent = '';
      this.inputdata.inputWho = '';
    },
    ckeckForm:function(event){
      this.inputdata.errors = [];
      if(!this.inputdata.inputNumber) {
        this.inputdata.errors.push('電話番号は必須です')
      }
      if(!this.inputdata.errors.length) {
        this.addComment();
        this.timerStart();
      }
      event.preventDefault();
    }
  }
}
</script>
<style>
  .c-form {
    position: relative;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
  }
  .is-overlay.c-form:before {
    content: "";
    background: #000;
    opacity: .3;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .c-complete {
    position: absolute;
    z-index: 2;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: #2db3bd;
    padding: 20px 10px;
    border-radius: 10px;
    font-weight: bold;
    color: #fff;
  }
  .c-form p {
    margin-bottom: 10px;
  }
  .c-form__item:nth-child(n+2) {
    margin-top: 10px;
  }
  .l-wrapper input,.l-wrapper textarea,.l-wrapper select {
    margin-left: 5px;
    background: #e9e9e9;
    border-radius: 5px;
    padding: 5px;
    width: 500px;
  }
  .c-form input[type="date"] {
    width: 150px;
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
    border: 1px solid #3c5ab3;
    width: 200px;
    border-radius:5px;
  }
  .c-button:hover {
    background: #fff;
    color: #3c5ab3;
  }
  .c-errors {
    color:red;
  }
</style>