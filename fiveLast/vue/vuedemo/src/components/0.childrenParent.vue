<template>
  <div>
    childParent: 
    <childParentGrand @eat='eat'></childParentGrand>
  </div>
</template>

<script>
  import childParentGrand from './0.childrenParentGrand.vue';
  export default {
    name: 'childParent',
    components: {
      childParentGrand
    },
    methods: {
      eat() {
        alert('eat')
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>