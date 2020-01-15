const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  constructor(excutor) {
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallBacks = [];
    this.onRejectedCallBacks = [];
    this.status = PENDING;
    try{
      excutor(this._resolved.bind(this), this._rejected.bind(this));
    } catch(e) {
      this._rejected(e)
    }
  }

  _resolved(value) {
    if(this.status !== PENDING) {
      return;
    }
    this.status = FULFILLED;
    this.value = value;
    this.onResolvedCallBacks.forEach(fn => fn())
  }

  _rejected(reason) {
    if(this.status !== PENDING) {
      return;
    }
    this.status = REJECTED;
    this.reason = reason;
    this.onRejectedCallBacks.forEach(fn => fn())
  }

  then(fulfilled, rejected) {
    if(this.status === FULFILLED) {
      fulfilled(this.value);
    } 
    if(this.status === REJECTED) {
      rejected(this.reason);
    }
    if(this.status === PENDING) {
      this.onResolvedCallBacks.push(() => {
        fulfilled(this.value);
      })
      this.onRejectedCallBacks.push(() => {
        rejected(this.reason);
      })
    }
  }
}


module.exports = Promise;