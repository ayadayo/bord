<template>
  <v-app>
    <v-container>
      <ChatBoard/>
      <ChatFrom/>
    </v-container>
  </v-app>
</template>

<script>
  import ChatBoard from './components/ChatBoard'
  import ChatFrom from './components/Form'

  export default {
    name: 'App',
    components: {
      ChatBoard,
      ChatFrom
    },
  }
</script>