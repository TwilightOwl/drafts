export {}
/*
private add = <T>(name: string) => {
    Object.defineProperty(
      this, 
      name, 
      {
        get: (): Promise<T> => {
          return this._getPrivateItem<T>(name)()
        },
        set: (value: T): Promise<void> => {
          return this._setPrivateItem<T>(name)(value)
        }
      }
    )
  }
*/

const obj = { Old: null }
const storage = {} as { [K in string]: string }
const set = <T>(name: string, value: T) => {
    storage[name] = JSON.stringify(value)
}
const get = <T>(name: string) => {
    return JSON.parse(storage[name]) as T
}

const add = <T>() => <X extends string>(name: X) => {
    Object.defineProperty(
        obj, 
        name, 
        {
          get: (): T => {
            return get<T>(name)
          },
          set: (value: T): void => {
            set<T>(name, value)
          }
        }
    )
    type Q = typeof obj
    // даже если по факту свойство name добавляется как getter и setter в типах оно должно быть как просто поле со значением типа T 
    type K = { [k in X]: T } & Q
    // interface Result extends Q {
    //     [k in X]: T
    // }
    // return obj as { A: { set: (value: T) => void, get: () => T } }
    return obj as K
}
const O = add<number>()('A');
O.A = 3
O.A

//////// getter и setter в итоге выглядят в типе объекта как одно свойство с одним типом

class Cl {
    a = 10
    get g() { return 1 }
    set g(x: number) {}
}

interface I extends Cl {}
const t: I = new Cl()
t.a
t.g