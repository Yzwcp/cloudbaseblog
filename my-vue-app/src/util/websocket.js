import io from 'socket.io-client'
const socket = io('ws://localhost:3030')
export default socket
