import { observable, action } from 'mobx'

interface Toast {
    title: string,
    body: string,
    time: number,
    key: string
}

type Push = (toast: Omit<Toast, 'key'>) => void

class ToastStore {

    @observable public toasts: Toast[] = []
    
    @action
    public push: Push = ({ title, body, time = 3000 }) => {
        const toast = { title, body, time, key: `${Date.now()}-${Math.random()}`}
        this.toasts.push(toast)
        this.deferredPop(toast)
    }

    private deferredPop = ({ time, key }: Toast) => (
        setTimeout(
            action(() => this.toasts.splice(this.toasts.findIndex(toast => toast.key === key), 1)),
            time
        )
    )
}

export const Store = new ToastStore()

export default Store.push