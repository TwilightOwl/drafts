import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';

@observer
export default class Screen extends React.Component {

    state = {
        useAtom2: false
    }

    onClick = () => {
        //Store.retrieve();
        //Store.obs();
        // Store.atom2.reportObserved();
        Store.invalidateCache();
        this.setState({ useAtom2: !this.state.useAtom2 })
    }

    render() {
        console.log('render')
        return (
            <div>
                Data: {Store.value}<br/>
                <button title='Press me' onClick={this.onClick} >PRESS ME !!!</button>
                {/* {Store.obs()} */}
                {this.state.useAtom2 ? `val: ${Store.v}` : ''}
                <br/>
            </div>
        )
    }
}
