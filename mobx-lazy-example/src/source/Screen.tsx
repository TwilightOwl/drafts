import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';
import Usage from './usage';

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
        useB: false,
        useA: true
    }

    invalidateA = () => {
        Store.invalidateCache();
    }

    toggleBUsing = () => {
        this.setState({ useB: !this.state.useB })
    }
    
    toggleAUsing = () => {
        this.setState({ useA: !this.state.useA })
    }

    render() {
        console.log('* * * Screen render', Usage.expField)
        return (
            <div>
                {/* observable data: {Store.data} */}
                <br/>
                {/* Data A: {Store.A} */}
                {this.state.useA && `Data A: ${Store.A}`}
                <br/>
                {this.state.useB && `Data B: ${Store.B}`}
                <br/>
                Data AB: {Store.AB}
                <br/>
                <button onClick={this.invalidateA} >Invalidate A</button>
                <br/>
                <button onClick={this.toggleAUsing} >Toggle A using</button>
                <br/>
                <button onClick={this.toggleBUsing} >Toggle B using</button>
                <br/><br/>
                {
                    
                    this.state.useA && `Usage lazyA: ${Usage.lazyA}`
                }
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