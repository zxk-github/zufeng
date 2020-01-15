<template>
  <div>
    <defaultslot v-slot:default>defaultslot</defaultslot>
    <defaultslot v-slot:name>nameslot</defaultslot>
    <defaultslot v-slot:scoptslot="scoptValue" >{{scoptValue.bla}}</defaultslot>

  </div>
</template>

<script>
  import defaultslot from './component/defaultslot.vue'

  export default {
    components: {
      defaultslot
    }
  }
</script>

<style lang="scss" scoped>

</style>