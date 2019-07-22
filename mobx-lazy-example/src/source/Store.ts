import { observable, action, createAtom } from 'mobx';

import { request } from './Http';

class Store {

    @observable data: any;
  
    // @action
    // retrieve = async () => {
    //     this.data = await request('url');
    // }

    atomA = createAtom("observable_A", undefined, 
    //() => this.unload()
    );

    atomB = createAtom("observable_B", undefined, 
    //() => this.unload()
    );

    _cachedValue: any;

    retrieveValue = async (value: any) => await new Promise(r => setTimeout(() => r(value), 1000))

    _B: any = 0;

    get B() {
        console.log(this.atomB.reportObserved());
        return this._B
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
        
        // async
        this._cachedValue = "retrieving...";
        this.retrieveValue(Math.random()).then(action(v => {
            this._cachedValue = "cached " + v;
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