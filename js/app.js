const dashboardImg = document.querySelector('.dashboard-img');
const app = document.querySelector('.app');

class Audio {
  constructor(name, audioUrl, imgUrl, author) {
    this.name = name;
    this.audioUrl = audioUrl;
    this.imgUrl = imgUrl;
    this.author = author;
  }
}

class AppMusic {
  constructor() {
    this._scaleImg();
  }

  _scaleImg() {
    app.addEventListener('scroll', function (e) {});
  }
}

const appMusic = new AppMusic();
