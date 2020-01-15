<template>
  <div>
    childrenParent: 
    <button @click="broadcast">childrenParent</button>
    <childrenParentGrand @broadcase="broadcastfn"></childrenParentGrand>

  </div>
</template>

<script>
  import childrenParentGrand from './0.childrenParentGrand.vue';
  export default {
    components: {
      childrenParentGrand
    },
    mounted() {
    },
    methods: {
      broadcast() {
        this.$broadcast('broadcase', 123)
      },
      broadcastfn() {
        console.log(...arguments)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>