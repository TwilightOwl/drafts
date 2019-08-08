import React from 'react'

import pushToast from './toast-lib'

export default class Child extends React.PureComponent {

    pushA = () => 
        pushToast({ title: 'A', body: 'This is the toast with title "A" and with the long text as body. Time is 2 sec.', time: 2000})
    
    pushB = () => 
        pushToast({ title: 'B', body: 'This is the toast with title "B". Time is 5 sec.', time: 5000})
    

    render() {
        console.log('* * * Child render')
        return (
            <div>
                <button onClick={this.pushA} >push A</button>
                <br/>
                <button onClick={this.pushB} >push B</button>
            </div>
        )
    }
}