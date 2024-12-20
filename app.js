<script>

const token = 'YOUR_SPOTIFY_ACCESS_TOKEN';  // Spotify APIのアクセストークンをここに入れます

// API URL（ランキングのデータを取得するためのエンドポイント）
const url = 'https://api.spotify.com/v1/browse/categories/toplists/playlists';

// Spotify APIにリクエストを送る関数
async function getTopSongs() {
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        console.error('Spotify APIからデータを取得できませんでした');
        return;
    }
    
    const data = await response.json();
    const playlists = data.playlists.items;  // 取得したプレイリストのリスト
    
    // トップ10のプレイリスト情報を表示
    displayTopSongs(playlists.slice(0, 10));
}

// プレイリスト情報をHTMLに表示する関数
function displayTopSongs(playlists) {
    const songListContainer = document.getElementById('songList');
    
    playlists.forEach((playlist, index) => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song');
        
        songDiv.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <img src="${playlist.images[0].url}" alt="${playlist.name}">
            <div class="song-info">
                <h4>${playlist.name}</h4>
                <p>by ${playlist.owner.display_name}</p>
            </div>
        `;
        
        songListContainer.appendChild(songDiv);
    });
}

// ページ読み込み後にデータを取得して表示
getTopSongs();
</script>
