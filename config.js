const CONFIG = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        {
            urls: 'turn:your-turn-server.com',
            username: 'username',
            credential: 'credential'
        }
    ],
    mediaConstraints: {
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
        },
        audio: {
            echoCancellation: true,
            noiseSuppression: true
        }
    },
    roomConfig: {
        maxParticipants: 10,
        autoCloseEmpty: true,
        timeoutMinutes: 60
    }
}; 
