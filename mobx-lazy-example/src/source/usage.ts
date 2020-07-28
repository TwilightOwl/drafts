

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

const mark = (target, prop, descriptor?: BabelDescriptor) => {
  descriptor
}

//@ts-ignore
const dec = (target, prop, descriptor?: BabelDescriptor) => {

  const f = descriptor.get
  const [a,b] = f();
  debugger
  let binded: Function;
  descriptor.get = () => {
    const [self, prodcer] = f();
    debugger
    if (!binded) {
      binded = prodcer.bind(self)
    }
    return binded()
  }
  return descriptor

  const closure = {
    atom: createAtom("asd", undefined, 
      // если в какой-то момент у A не остается подписчиков, то запускается эта функция. не всегда нужно такое поведение
      // () => this.unload()
      // () => alert('A')
    ),
    cached: undefined,
    process: false
  }

  debugger;
  let i = 0;

  // const producer = descriptor.get() //.bind(descriptor);
  const producer = descriptor.value //.bind(descriptor);

  delete descriptor.value
  delete descriptor.writable
  descriptor.set = (x: any) => {}
  // it works when you apply decorator to getter
  descriptor.get = function() {
     // debugger;
     //return i++

    closure.atom.reportObserved()
    if (closure.cached === undefined && !closure.process) {
      closure.process = true
      // closure.cached = 'retrieving...';
      const result = producer()
      console.log(target)
      debugger;
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
  };
  debugger
  return descriptor



  // Object.defineProperty(target, prop, {
  //   // value: 999,
  //   get: () => {
  //     debugger;
  //     return 111
  //   }
  // })

  // 
  // return {
  //   enumerable: false,
  //   configurable: true, // See #1477
  //   writable: true, // See #1398
  //   // value: 555,
  //   get: () => {
  //     // debugger;
  //     return i++
  //   }
  // }
}

// interface IStore {
//   lazyA: number
// }

class Store /*implements IStore*/ {

  self = this

  constructor() {
    debugger;
    //@ts-ignore
    //this.expField = this.__proto__.expField.bind(this);
    //@ts-ignore
    //this.expField = this.expField.bind(this)

    //console.log(this.lazyA)
    //debugger;
    //TODO: extend this with new property type
    // addLazyObservableGetter(this, 'lazyA', () => new Promise(resolve => setTimeout(() => resolve(Math.random() + this.a), 3000)))
    // interface I extends Store {
    //   lazyA: number
    // }
    // return this as unknown as I
  }

  //TODO: decorate with producer. decorator will mark this property. Then in constructor call addAllLazyObservableGetter(this) - it will
  //  iterate over all marked properties and rewrite them with getter. 
  // Возможно это не надо делать в коснтрукторе т.к. в екораторе может быть ссылка на this
  //This approach is very good for TS because it gives us class with explicitly defined properties
  //like this:
  // @lazy(producer)
  // lazyA: number
  lazyA: number = 9

  //@dec get expField() { return 0 }
  //@dec expField!: number

  @dec get expField() {
    //debugger;
    return [this, () => new Promise(resolve => setTimeout(() => {
      debugger;
      resolve(Math.random() + (this.a || 0));
    }, 3000))]
  }

  f(){}
  get g(){ return 10 }

  method(x: number) {
    return x + 1
  }

  a = 10

  b = () => {

    const pr = this.expField;

    //TODO: big problem!!!
    return this.lazyA
  }

}

interface I extends Store {
  lazyA: number
}

export default new Store() as I;


