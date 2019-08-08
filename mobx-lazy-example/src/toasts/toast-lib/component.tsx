import React from 'react'
import { observer } from 'mobx-react'

import { Store } from './store'

@observer
export default class WrapWithToasts extends React.Component {
    render() {
        console.log('* * * WrapWithToasts render')
        return (
            <>
                {this.props.children}
                {Store.toasts.map(toast => (
                    <div key={toast.key}>
                        <br/>
                        {toast.key}<br/>
                        {toast.title}<br/>
                        {toast.body}<br/>
                    </div>
                ))}
            </>
        )
    }
}