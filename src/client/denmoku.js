const baseUrl = 'http://localhost:3000';

const reservationTableHeadHtml = "<thead><tr><th>No</th><th>曲名</th><th>アーティスト</th><th></th></tr></thead>";
const searchResultTableHeadHtml = "<thead><tr><th>曲名</th><th>アーティスト</th><th></th></tr></thead>";

async function post(url, data) {
    const response = await fetch(baseUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response; 
}

async function put(url, data) {
    const response = await fetch(baseUrl + url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json(); 
}

async function deleteData(url, data) {
    const response = await fetch(baseUrl + url, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json(); 
}


function createReservationTable(songs){
    const div = document.getElementById("non-reservation-message");
    const t = document.getElementById('reservation-table');
    t.innerHTML = reservationTableHeadHtml;

    if (songs.length === 0) {
        div.innerHTML = "<h3>曲が予約されていません</h3>";
        t.innerHTML = "";
    } else {
        div.innerHTML = "";
    }

    const tb = document.createElement('tbody');

    let index = 0;
    songs.forEach(song => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = createArtistPageLink(song);
        const td4 = document.createElement('td');
        const button = createDeleteReservationButton(index);
        
        td1.innerText = index + 1;
        td2.innerText = song.songName;
        td4.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tb.appendChild(tr);
        index += 1;
    });
    index = 0;

    t.appendChild(tb);

    document.getElementById('artist-name-input').value = '';
    document.getElementById('song-name-input').value = '';
    document.getElementById('search-result').innerHTML = '<table id="search-result-table"></table>';
}

async function createSearchResultTable(songs){
    if (songs.length === 0) {
        document.getElementById("search-result").innerHTML = '<h3>該当する楽曲が見つかりませんでした</h3><table id="search-result-table"></table>';
    } else {
        document.getElementById("search-result").innerHTML = '<table id="search-result-table"></table>';
    }
    const t = document.getElementById('search-result-table');
    t.innerHTML = searchResultTableHeadHtml;
    const tb = document.createElement('tbody');

    songs.forEach(song => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = createArtistPageLink(song);
        const td3 = document.createElement('td');
        const button = document.createElement('button');

        td1.innerText = song.songName;
        button.onclick = () => postReservations(song.songId);
        button.innerText = '予約';
        td3.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tb.appendChild(tr);
    });

    t.appendChild(tb);

}

async function getReservations() {
    try {
        const res = await fetch(baseUrl + '/reservations');
        const data = await res.json();

        if (data.length === 0) {
            const div = document.getElementById("non-reservation-message");
            div.innerHTML = "<p>曲が予約されていません</p>"
        } else {
            createReservationTable(data);
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
    } 
}

async function postReservations(songId) {
    try {
        const res = await post('/reservations', [{'songId': songId}]);
        const data = await res.json();

        const div = document.getElementById("non-reservation-message");
        if (data.length === 0) {
            div.innerHTML = "<h3>曲が予約されていません</h3>"
        } else {
            div.innerHTML = "";
            createReservationTable(data);
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
    } 
}

function createDeleteReservationButton(index) {
    const button = document.createElement('button');
    button.onclick = () => deleteReservations(index);
    button.innerText = '削除';
    return button;
  }

function createArtistPageLink(song) {
    const td = document.createElement('td');
    td.classList.add('clickable');
    console.log(song);
    td.onclick = () => gotoArtistPage(song.artistName);
    td.innerText = song.artistName;
    return td;
}

async function deleteReservations(index) {
    try {
        console.log("delete" + index);
        const res = await fetch(baseUrl + '/reservations?index='+index, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
            }
          });
        const data = await res.json();

        const div = document.getElementById("non-reservation-message");
        if (data.length === 0) {
            div.innerHTML = "<h3>曲が予約されていません</h3>"
        } else {
            div.innerHTML = "";
        }
        createReservationTable(data);
    } catch (error) {
        console.error('Error fetching reservations:', error);
    } 
}

async function searchSongsByArtistName() {
    const q = document.getElementById('artist-name-input').value;
    const res = await fetch(baseUrl + '/artists/search?q=' + q);
    const data = await res.json();

    createSearchResultTable(data);
}

async function searchSongsByArtistId(artistId) {
    const res = await fetch(baseUrl + '/' + artistId + '/songs');
    const data = await res.json();
    console.log("kitayo:" ,data)

    return data;
}

async function searchSongsBySongName() {
    const q = document.getElementById('song-name-input').value;
    const res = await fetch(baseUrl + '/songs/search?q=' + q);
    const data = await res.json();

    createSearchResultTable(data);
}

function gotoAdmin() {
    window.location.href = './admin.html';
}

function gotoArtistPage(artistIdorName) {
    window.location.href = './artist.html?artist=' + encodeURIComponent(artistIdorName);
}

window.onload = getReservations;