import { observable, action, createAtom, computed } from 'mobx';

import { request } from './Http';

class Store {

    constructor() {
        this.method = this.method.bind(this);
        //debugger;
    }

    method(){}

    //@observable data: any;
  
    // @action
    // retrieve = async () => {
    //     this.data = await request('url');
    // }

    atomA = createAtom("observable_A", undefined, 
        // если в какой-то момент у A не остается подписчиков, то запускается эта функция. не всегда нужно такое поведение
        // () => this.unload()
        () => alert('A')
    );

    atomB = createAtom("observable_B", undefined, 
        () => this.unload()
    );

    _cachedValue: any;

    retrieveValue = async (value: any) => await new Promise(r => setTimeout(() => r(value), 1000))

    _B: any = 0;

    get B() {
        this.atomB.reportObserved()
        return this._B
    }

    @computed get AB() {
        return this.B + this.A
    }

    // use as observable in React component
    get A() {
        console.log(this.atomA.reportObserved());
        //this.obs()
        if (!this._cachedValue) {
            // sync
            // this._cachedValue = "cached " + Math.random();

            setInterval(() => {
                this._B = Math.random()
                this.atomB.reportChanged();
                console.log('__ B has been changed')
            }, 500)
            
            // здесь не нужно вызывать reportChanged, т.к. в синхронной функции меняем значение _cachedValue и новое же возвращаем из геттера
            this._cachedValue = "retrieving...";
            // async
            this.retrieveValue(Math.random()).then(action(v => {
                this._cachedValue = "cached " + v;
                // reportChanged нужен только когда асинхронно собираемся поменять _cachedValue
                // вызываем у atomA поскольку мы привзяали atomA к геттеру для A вызовом reportObserved - геттер вызвался значит кто-то использует A - сообщим это mobx'у
                this.atomA.reportChanged();
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
        this.atomA.reportChanged();
    };
}

export default new Store();