import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';

@observer
class BUsing extends React.Component {
    render() {
        console.log('* * * BUsing render')
        return (
            Store.B
        )
    }
}

@observer
class Screen extends React.Component {

    state = {
        useB: false
    }

    invalidateA = () => {
        Store.invalidateCache();
    }

    toggleBUsing = () => {
        this.setState({ useB: !this.state.useB })
    }

    render() {
        console.log('* * * Screen render')
        return (
            <div>
                observable data: {Store.data}
                <br/>
                Data A: {Store.A}
                <br/>
                {this.state.useB && `Data B: ${Store.B}`}
                <br/>
                <button onClick={this.invalidateA} >Invalidate A</button>
                <br/>
                <button onClick={this.toggleBUsing} >Toggle B using</button>
            </div>
        )
    }
}

export default class Comp extends React.Component {
    render() {
        console.log('* * * Comp render')
        return(
            <React.Fragment>
                <Screen />
                <BUsing />
            </React.Fragment>
        )
    }
}