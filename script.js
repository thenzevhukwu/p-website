let offset = 0;
async function fetchTime() {
    try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC');
        const data = await response.json();
        const serverTime = new Date(data.utc_datetime);
        const localTime = new Date();
        offset = serverTime - localTime;
        return new Date(data.utc_datetime);
    } catch (error) {
        console.error('Error fetching time:', error);
    }
}

function updateTime() {
    const clockElement = document.getElementById('clock');
    const now = new Date(new Date().getTime() + offset);
    const timeString = now.toLocaleTimeString();
    const dayString= now.toLocaleTimeString('en-US', { weekday:'long'});
    clockElement.textContent = `${dayString}`;
}

fetchTime().then(() => {
    updateTime();
    setInterval(updateTime, 1000);
})