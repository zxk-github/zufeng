<template>
  <div>
    <div v-for="option of layers" :key="option.id"> {{option.message}} {{option.id}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        layers: []
      }
    },
    mounted() {
      this.id = 0;
    },
    methods: {
      add(options) {
        let layer = {
          ...options,
          id: ++this.id
        }
        this.layers.push(layer);
        layer.timer = setTimeout(() => {
          this.remove(layer);
        }, options.duration)
      },
      remove(layer) {
        clearTimeout(layer.timer);
        this.layers = this.layers.filter(l => l.id !== layer.id)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>