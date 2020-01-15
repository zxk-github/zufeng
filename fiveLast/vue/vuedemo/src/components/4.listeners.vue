<template>
  <div>
    listeners: {{$listeners}}
    通过v-on直接将事件向子组件传递
    <listeners-grand v-on="$listeners"></listeners-grand>
  </div>
</template>

<script>
  import listenersGrand from './4.listenersGrand.vue'
  export default {
    mounted() {
      // console.log(this.$listeners)
    },
    components: {
      listenersGrand
    }
  }
</script>

<style lang="scss" scoped>

</style>