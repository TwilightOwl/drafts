

import { observable, action, createAtom, computed } from 'mobx';

import { request } from './Http';

const lazy = <R>(producer: () => R): R | Promise<R> => {
  return producer()
}


const addLazyObservableGetter = <T, N extends string, R>(target: T, name: N, producer: () => R | Promise<R>) => {

  const closure = {
    atom: createAtom("observable_A", undefined, 
      // если в какой-то момент у A не остается подписчиков, то запускается эта функция. не всегда нужно такое поведение
      // () => this.unload()
      () => alert('A')
    ),
    cached: undefined as unknown as R,
    process: false
  }

  Object.defineProperty(target, name, {
    get: (): R => {
      closure.atom.reportObserved()
      if (closure.cached === undefined && !closure.process) {
        closure.process = true
        // closure.cached = 'retrieving...';
        const result = producer()
        //TODO: beautify code
        if (result instanceof Promise) {
          result.then(value => {
            closure.process = false
            closure.cached = value
            closure.atom.reportChanged()
          })
        } else {
          closure.process = false
          closure.cached = result
          closure.atom.reportChanged()
        }
      }
      return closure.cached;
    }
  })
}

// interface IStore {
//   lazyA: number
// }

class Store /*implements IStore*/ {

  constructor() {
    console.log(this.lazyA)
    debugger;
    //TODO: extend this with new property type
    addLazyObservableGetter(this, 'lazyA', () => new Promise(resolve => setTimeout(() => resolve(Math.random() + this.a), 3000)))
    // interface I extends Store {
    //   lazyA: number
    // }
    // return this as unknown as I
  }

  //TODO: decorate with producer. decorator will mark this property. Then in constructor call addAllLazyObservableGetter(this) - it will
  //  iterate over all marked properties and rewrite them with getter. 
  //This approach is very good for TS because it gives us class with explicitly defined properties
  //like this:
  // @lazy(producer)
  // lazyA: number
  lazyA: number = 9


  a = 10

  b = () => {
    //TODO: big problem!!!
    return this.lazyA
  }

}

interface I extends Store {
  lazyA: number
}

export default new Store() as I;


