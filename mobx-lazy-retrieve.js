// https://github.com/mobxjs/mobx/issues/1910
// https://codesandbox.io/s/pwl87n09kq
// https://codesandbox.io/s/2olv8v8090

import { action, createAtom } from "mobx";

class Cache {
  atom = createAtom("cache", undefined, 
  () => this.unload()
  );

  _cachedValue;

  retrieveValue = async (value) => await new Promise(r => setTimeout(() => r(value), 1000))

  // use as observable in React component
  get value() {
    this.atom.reportObserved();
    if (!this._cachedValue) {
      // sync
      // this._cachedValue = "cached " + Math.random();
      
      // async
      this._cachedValue = "retrieving...";
      this.retrieveValue(Math.random()).then(action(v => {
        this._cachedValue = "cached " + v;
        this.atom.reportChanged(true);
      }))
      //this._cachedValue = "cached " + Math.random();
    }
    return this._cachedValue;
  }

  unload() {
    // If no component was rendering our cache,
    // it's value would be disposed, even when invalidateCache
    // wasn't called explicitly!
    this._cachedValue = undefined;
  }

  // call from ui for reset value
  @action
  invalidateCache = () => {
    this.unload();
    this.atom.reportChanged(true);
  };
}

export default new Cache();
