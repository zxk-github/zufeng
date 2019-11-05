let processData = (_) => {
  let data = {
    name: _.name,
    initiatorType: _.initiatorType
  }
}

export default {
  init() {
    // 获取资源相关的信息
    window.onload = function() {
      let resourceData = performance.getEntriesByType('resource')
    }
  }
}