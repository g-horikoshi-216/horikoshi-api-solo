const baseUrl = 'http://localhost:3000';

const reservationTableHeadHtml = "<thead><tr><th>No</th><th>曲名</th><th>アーティスト</th></tr></thead>";

async function post(url, data) {
    const response = await fetch(baseUrl + url, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data),
    });
    return response.json(); 
}

async function put(url, data) {
    const response = await fetch(baseUrl + url, {
      method: "PUT", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data),
    });
    return response.json(); 
}

async function deleteData(url, data) {
    const response = await fetch(baseUrl + url, {
      method: "DELETE", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data),
    });
    return response.json(); 
}

function makeReservationTable(songs){
    let index = 1;
    const t = document.getElementById('reservation-table');
    t.innerHTML = reservationTableHeadHtml;
    const tb = document.createElement('tbody');

    songs.forEach(song => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        td1.innerText = index;
        td2.innerText = song.songName;
        td3.innerText = song.artistName;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tb.appendChild(tr);
        index += 1; 
    });

    t.appendChild(tb);

}

async function getReservations() {
    try {
        const res = await fetch(baseUrl + '/reservations');
        const data = await res.json();
        console.log(data);

        if (data.length === 0) {
            const div = document.getElementById("non-reservation-message");
            div.innerHTML = "<p>曲が予約されていません</p>"
        } else {
            makeReservationTable(data);
        }


    } catch (error) {
        console.error('Error fetching reservations:', error);
    } 
}

async function postReservations() {
    try {
        const res = await post('/reservations', JSON.stringify([{songId: 2}]));
        const data = await res.json();
        console.log(data);

        if (data.length === 0) {
            const div = document.getElementById("non-reservation-message");
            div.innerHTML = "<p>曲が予約されていません</p>"
        } else {
            makeReservationTable(data);
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
    } 
}


  

window.onload = getReservations;