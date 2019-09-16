// man instanceof object

function instance_of(ins, con) {
  let conProto = con.prototype; // 取构造函数的原型
  let insProto = Object.getPrototypeOf(ins);
  while(true) {
    if(insProto === null) return false;
    if(insProto === conProto) return true;
    insProto = Object.getPrototypeOf(insProto);
  }
}



function instance_of(ins, con) {
  let conProto = con.prototype;
  while(true) {
    let insProto = Object.getPrototypeOf(ins);
    if(insProto === null) return false;
    if(insProto === conProto) return true;  
  }
}




