const baseUrl = 'http://localhost:3000';

const artistListTableHeadHtml = "<thead><tr><th>No</th><th>アーティスト</th><th></th></tr></thead>";
const songListTableHeadHtml = "<thead><tr><th>No</th><th>曲名</th><th>アーティスト</th><th></th></tr></thead>";

let artists = [];
let songs = [];
let selectedArtistId = 0; 
let selectedSongId = 0;

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

function createArtistListTable(){
    const div = document.getElementById("non-artist-message");
    const t = document.getElementById('artist-list-table');
    t.innerHTML = artistListTableHeadHtml;

    if (artists.length === 0) {
        div.innerHTML = "<h3>アーティストが登録されていません</h3>";
        t.innerHTML = "";
    } else {
        div.innerHTML = "";
        div.classList.add('container');
    }

    const tb = document.createElement('tbody');

    let index = 0;
    artists.forEach(artist => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const button = createEditArtistButton(artist.artistId);
        
        td1.innerText = index + 1;
        td2.innerText = artist.artistName;
        td3.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tb.appendChild(tr);
        index += 1;
    });
    index = 0;

    t.appendChild(tb);

    // document.getElementById('artist-name-input').value = '';
    // document.getElementById('song-name-input').value = '';
    // document.getElementById('search-result').innerHTML = '<table id="search-result-table"></table>';
}

function createSongListTable(){
    const div = document.getElementById("non-song-message");
    const t = document.getElementById('song-list-table');
    t.innerHTML = songListTableHeadHtml;

    if (songs.length === 0) {
        div.innerHTML = "<h3>楽曲が登録されていません</h3>";
        t.innerHTML = "";
    } else {
        div.innerHTML = "";
        div.classList.add('container');
    }

    const tb = document.createElement('tbody');

    let index = 0;
    songs.forEach(song => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const button = createEditSongButton(song.songId);
        
        td1.innerText = index + 1;
        td2.innerText = song.songName;
        td3.innerText = song.artistName;
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

    // document.getElementById('artist-name-input').value = '';
    // document.getElementById('song-name-input').value = '';
    // document.getElementById('search-result').innerHTML = '<table id="search-result-table"></table>';
}

// async function createSongListTable(songs){
//     if (songs.length === 0) {
//         document.getElementById("-result").innerHTML = '<h3>該当する楽曲が見つかりませんでした</h3><table id="search-result-table"></table>';
//     } else {
//         document.getElementById("search-result").innerHTML = '<table id="search-result-table"></table>';
//     }
//     const t = document.getElementById('search-result-table');
//     t.innerHTML = searchResultTableHeadHtml;
//     const tb = document.createElement('tbody');

//     songs.forEach(song => {
//         const tr = document.createElement('tr');
//         const td1 = document.createElement('td');
//         const td2 = document.createElement('td');
//         const td3 = document.createElement('td');
//         const button = document.createElement('button');

//         td1.innerText = song.songName;
//         td2.innerText = song.artistName;
//         button.onclick = () => postReservationsAndBackToDenmoku(song.songId);
//         button.innerText = '予約';
//         td3.appendChild(button);

//         tr.appendChild(td1);
//         tr.appendChild(td2);
//         tr.appendChild(td3);

//         tb.appendChild(tr);
//     });

//     t.appendChild(tb);

// }

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


function createEditArtistButton(artistId) {
    const button = document.createElement('button');
    button.onclick = () => gotoEditArtistPage(artistId);
    button.innerText = '編集';
    return button;
}

function createEditSongButton(songId) {
    const button = document.createElement('button');
    button.onclick = () => gotoEditSongPage(songId);
    button.innerText = '編集';
    return button;
}

async function searchSongsByArtistName() {
    const q = document.getElementById('artist-name-input').value;
    const res = await fetch(baseUrl + '/artists/search?q=' + q);
    const data = await res.json();

    createSearchResultTable(data);
}

async function searchSongsByArtistIdorName(artistIdorName) {
    const res = await fetch(baseUrl + '/' + artistIdorName + '/songs');
    const data = await res.json();

    return data;
}

async function searchSongsBySongName() {
    const q = document.getElementById('song-name-input').value;
    const res = await fetch(baseUrl + '/songs/search?q=' + q);
    const data = await res.json();

    createSearchResultTable(data);
}

async function getArtists() {
    const res = await fetch(baseUrl + '/artists');
    const data = await res.json();

    artists = data.map( list => ({...list}));
    console.log(artists);
}

async function postArtists() {
    try {
        let artistName = document.getElementById("artist-name-input").value;
        const res = await post('/artists', [{'name': artistName}]);

        document.getElementById('artist-name-input').value = '';
    } catch (error) {
        console.error('Error fetching reservations:', error);
    } finally {
        adminPageInit();
    }
}

async function getSongs() {
    const res = await fetch(baseUrl + '/songs');
    const data = await res.json();

    songs = data.map( list => ({...list}));
    console.log(songs);
}

async function postSongs() {
    try {
        const artistId = document.getElementById('artist-select').value;
        let songName = document.getElementById("song-name-input").value;
        const res = await post('/' + artistId + '/songs', [{'name': songName}]);

        document.getElementById('song-name-input').value = '';
    } catch (error) {
        console.error('Error fetching reservations:', error);
    } finally {
        adminPageInit();
    }
}


function gotoDenmoku() {
    window.location.href = './denmoku.html';
}

function gotoAdmin() {
    window.location.href = './admin.html';
}


function gotoArtistPage(artistIdorName) {
    window.location.href = './artist.html?artist=' + encodeURIComponent(artistIdorName);
}

function gotoEditArtistPage(artistId) {
    window.location.href = './edit-artist.html?artistId=' + artistId;
}

function gotoEditSongPage(songId) {
    window.location.href = './edit-song.html?songId=' + songId;
}

async function adminPageInit() {
    await getArtists();
    await getSongs();
    const select = document.getElementById('artist-select');
    
    artists.forEach( artist => {
        let option = document.createElement('option');
        option.innerText = artist.artistName;
        option.value = artist.artistId;
        select.appendChild(option);
    })

    await createArtistListTable();
    await createSongListTable();
}

window.onload = adminPageInit;