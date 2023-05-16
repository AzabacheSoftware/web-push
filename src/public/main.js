const PUBLIC_VAPID_KEY = 'BEm0eCiy3R63HrjcYnc4N5wdyIiPdlUvLD4DJc8CC9XRXdVIgSzj2j2p6led_vqBUpPwbzF3iLuYYcdM0-pcJOc'


const subscription = async () => {

    // Register Service Worker

    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
    console.log('Service Worker Registered');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log('Subscribed!!!');

}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

// UI
const form = document.querySelector('#myform');
const message = document.querySelector('#message');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({message: message.value}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  form.reset();
});

// Service Worker support
if("serviceWorker" in navigator){
    subscription().catch(err => console.log(err));
}


