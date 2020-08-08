<template>
  <div class="c-list">
    <div v-for="(comment,index) in comments" :key="index" class="c-list__item">
    <p class="c-list__number" v-if="comment.tel">電話番号：{{comment.tel}}</p>
    <p class="c-list__number" v-if="comment.date">日にち：{{comment.date}}</p>
    <p class="c-list__name" v-if="comment.name">担当者：{{comment.name}}</p>
    <p class="c-list__content" v-if="comment.content">コメント：{{comment.content}}</p>
    </div>
  </div>
</template>
<script>
import {db} from '../plugins/firebase';
export default {
  name:'chatBord',
  data:function(){
    return {
      comments:[]
    }
  },
  firestore(){
    return {
      comments:db.collection('comments').orderBy('createdAt','desc')
    }
  }

}
</script>
<style>
  .c-list {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
  }
  .c-list__item {
    padding: 10px 0;
  }
  .c-list__item:nth-child(n+2) {
    border-top: 1px solid #ddd;
  }
</style>