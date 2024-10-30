const socket = io("/");
let myVideoStream;
let peers = {};

// Error handling for media devices
async function initializeMedia() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        myVideoStream = stream;
        addVideoStream(myVideo, stream);
    } catch (err) {
        console.error("Error accessing media devices:", err);
        showError("Could not access camera or microphone");
    }
}

// User presence detection
function handleUserPresence() {
    let lastActivity = Date.now();
    
    document.addEventListener('mousemove', () => {
        lastActivity = Date.now();
        socket.emit('user-active');
    });

    setInterval(() => {
        if (Date.now() - lastActivity > 300000) { // 5 minutes
            socket.emit('user-inactive');
        }
    }, 60000);
}

// Connection handling
socket.on('user-connected', userId => {
    connectToNewUser(userId, myVideoStream);
});

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close();
    removeVideoStream(userId);
});

// Error handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message animate-error';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

// Room management
function joinRoom(roomId, userId) {
    socket.emit('join-room', roomId, userId);
}

function leaveRoom() {
    myVideoStream.getTracks().forEach(track => track.stop());
    socket.emit('leave-room');
    window.location.href = '/';
} 
