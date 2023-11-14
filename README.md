# horikoshi-api-solo

## About this
カラオケのデンモクを模したシステムを実装する

## Words
### reservations
カラオケの予約曲

### artists
歌手

### songs
曲

### search
検索

## APIs
- GET /reservations　：予約情報を取得
- POST /reservations　：楽曲を予約
- DELETE /reservations :予約した楽曲を削除

- GET /songs　：楽曲一覧を取得　（songIdをクエリパラメータに設定した場合対象楽曲情報を取得）
- GET /:artistIdorName/songs　：対象アーティストの楽曲一覧を取得
- POST /songs　：楽曲を登録
- PUT /songs　　：楽曲情報をを更新
