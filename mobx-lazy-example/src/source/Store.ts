import { observable, action, createAtom } from 'mobx';

import { request } from './Http';

class Store {
    // @observable data: any;

    // @action
    // retrieve = async () => {
    //     this.data = await request('url');
    // }


    atom = createAtom("cache", undefined, 
    () => this.unload()
    );

    atom2 = createAtom("cache2", undefined, 
    () => this.unload()
    );

    _cachedValue: any;

    retrieveValue = async (value: any) => await new Promise(r => setTimeout(() => r(value), 1000))

    val: any = (console.log(this.atom.reportObserved()), 0);

    obs = () => {
        console.log(this.atom2.reportObserved());
    }

    get v() {
        console.log(this.atom2.reportObserved());
        return this.val
    }

    // use as observable in React component
    get value() {
        console.log(this.atom.reportObserved());
        //this.obs()
        if (!this._cachedValue) {
        // sync
        // this._cachedValue = "cached " + Math.random();

        setInterval(() => {
            this.val = Math.random()
            this.atom2.reportChanged();
        }, 500)
        
        // async
        this._cachedValue = "retrieving...";
        this.retrieveValue(Math.random()).then(action(v => {
            this._cachedValue = "cached " + v;
            this.atom.reportChanged();
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
        this.atom.reportChanged();
    };
}

export default new Store();