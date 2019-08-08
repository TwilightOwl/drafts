import React from 'react'

import { WithToasts } from './toast-lib'
import ChildComponent from './ChildComponent'

export default class ToastScreen extends React.Component {
    render() {
        console.log('* * * ToastScreen render')
        return (
            <WithToasts>
                <div style={{ height: 400, width: 400, backgroundColor: 'yellow' }}>
                    This is just a content of application
                    <ChildComponent/>
                </div>
            </WithToasts>
        )
    }
}