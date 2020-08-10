<template>
  <div class="c-list">
      <div class="c-sort">
        <p>電話番号から検索する</p>
        <input type="text" :value="searchNumber" @input="searchNumber = $event.target.value;sortDate();">
        <div v-if="searchResult">
        お探しの電話番号では、現在{{searchResult.length}}件の履歴があります。
          <div v-for="(search,index) in searchResult" :key="index" class="c-list__item">
            <p class="c-list__number" v-if="search.date">着信日：{{search.date}}</p>
            <p class="c-list__number" v-if="search.tel">電話番号：{{search.tel}}</p>
            <p class="c-list__name" v-if="search.name">誰宛の電話か：{{search.name}}さん</p>
            <p class="c-list__content" v-if="search.content">内容：{{search.content}}</p>              
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import {db} from '../plugins/firebase';
export default {
  name:'search',
  data:function(){
    return {
      searchNumber:'',
      searchResult:[]
    }
  },
  methods: {
    sortDate:function(){
      this.searchResult = [];
      db.collection('comments').where('tel','==',this.searchNumber)
      .get()
      .then((telNumber) => {
        telNumber.forEach((document) => {
          // let id = document.id;
          // let data = document.data();
          // this.result.push[id] = data;
          this.searchResult.push(document.data()); 
          // console.log(document.id, " => ", document.data());
        });
      })
      // .catch(function(err){
      //   console.log(`${err}お探しの電話番号はまだ登録されていません`)
      // });
    } 
  }
 
}
</script>