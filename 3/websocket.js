function readyToSend() {
    const url = 'wss://echo-ws-service.herokuapp.com'
    const input = document.querySelector('.input')
    const geolocation = document.querySelector('.geolocation')
    const chat_window = document.querySelector('.messages_wrapper')
    const submit = document.querySelector('.type_wrapper')
    const websocket = new WebSocket(url)
    let check_if_print = true

    websocket.addEventListener('message', printServerMsg)
    geolocation.addEventListener('click', sendLocation)
    submit.addEventListener('submit', sendMessage)

    function sendMessage(event) {
        event.preventDefault()
        if (!input.value.trim().length) return
        check_if_print = true
        websocket.send(input.value)
        chat_window.innerHTML += `<div class="msg user_msg">${input.value}</div>`
        scrollToBottom()
        input.value = ''
    }

    function printServerMsg(event) {
        if (check_if_print === false) return
        chat_window.innerHTML += `<div class="msg server_msg">${event.data}</div>`
        scrollToBottom()
    }

    function sendLocation() {
        if (!('geolocation' in navigator)) return
        navigator.geolocation.getCurrentPosition(position => {
            check_if_print = false
            const coords = position.coords
            websocket.send(`${coords.latitude} ${coords.longitude}`)
            chat_window.innerHTML += `<div class="msg user_msg">
            <a href="https://www.openstreetmap.org/#map=13/${coords.latitude}/${coords.longitude}">Геолокация</a>
            </div>`
            scrollToBottom()
        })
    }

    function scrollToBottom() {
        chat_window.scrollTop = chat_window.scrollHeight
    }
}

document.addEventListener('DOMContentLoaded', readyToSend)