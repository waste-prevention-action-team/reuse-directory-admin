export default (url, callback) => {
    const js = document.createElement('script')
    js.src = url
    document.head.appendChild(js)
    js.onload = callback
}
