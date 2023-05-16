console.log('Service Worker Loaded');

self.addEventListener('push', e => {
    const data = e.data.json(); e.data.json()
    console.log(data);
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://avatars.githubusercontent.com/u/126070056?v=4',
        //image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRje3w_c2k9D2gOxSMzqnmWMQZurAvG9g-7BQ&usqp=CAU',
        //vibrate: [100, 50, 100],

    })
});
