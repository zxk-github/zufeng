<template>
  <div>
    <KInputItem v-model="model.name" type="text"></KInputItem>
  </div>
</template>

<script>
  import KInputItem from './index.vue';
  export default {  
    data() {
      return {
        model: {
          name: '',
          password: ''
        }
      }
    },
    components: {
      KInputItem
    }
  }
</script>

<style lang="scss" scoped>

</style>