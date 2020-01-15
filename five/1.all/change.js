let commonComponent = [{mid: 1}, {mid: 1}, {mid: 4}, {mid: 3}]
function change() {
  if(commonComponent.length === 2) {
    if(commonComponent[0].mid === commonComponent[1].mid) {
        this.$Notification.failed('通用模块不能重复使用', '', 5000)
        return false;
    }
  } else if(commonComponent.length > 2) {
    for(let i = 0; i < commonComponent.length-1; i++) {
        for(let j = i + 1; j < commonComponent.length; j++) {
            if(commonComponent[i].mid === commonComponent[j].mid) {
                return false
            }
        }
    }
  }
  return true
}
console.log(change())