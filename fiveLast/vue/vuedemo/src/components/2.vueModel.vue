<template>
  <div>
    <div>{{value}} {{count3}}<button @click="change">click</button></div>
  </div>
</template>

<script>
  export default {
    props: {
      value: Number,
      count3: Number
    },
    methods: {
      change() {
        this.$emit('input', 3);
        this.$emit('changeCount3', 4)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>