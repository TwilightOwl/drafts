export const request = async (url: string) => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => resolve(Math.random()), 2000)
    })
}