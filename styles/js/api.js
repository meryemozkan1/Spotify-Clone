import { renderSongs } from "./ui.js";

const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=TR&listId=ip-country-chart-TR";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "41f4b3175emshc60b87d916dc889p17880ejsna8334502f3ff",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
// API isteklerini yönettiğimiz clas yapısı
export class API {
  constructor() {
    this.songs = [];
  }
  //* Popüler müzikleri getirir
  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();
    //* API'den aldığımız şarkıları song dizisine aktartdık
    this.songs = data.tracks;
    //* Ekrana popüler müzikleri aktaracak fonksiyona songs dizisini parametre olarak gönderdik
    renderSongs(this.songs);
  }
  //* Arama methodu
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
      options
    );
    const data = await res.json();
    console.log(data);
    // Veriyi istediğimiz hale çevir
    // song.track yerine song'a erişme
    let newData = data.tracks.hits;

    newData = newData.map((song) => ({ ...song.track }));
    this.songs = newData;
    console.log(this.songs);
    // aratılan şarkıları ekrana bas
    renderSongs(this.songs);
  }
}
