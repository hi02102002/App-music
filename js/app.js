'use strict';
const dashboardImg = document.querySelector('.dashboard-img');
const app = document.querySelector('.app');
const audio = document.querySelector('audio');
const btnPlayPause = document.querySelectorAll('.play-pause');
const bottomPlayer = document.querySelector('.bottom-player');
const btnHiddenMainPlayer = document.querySelector('.main-player .hidden');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const randomBtn = document.querySelector('.control .random');
const repeatBtn = document.querySelector('.control .repeat');

class AudioItem {
  constructor(name, audioUrl, imgUrl, author) {
    this.name = name;
    this.audioUrl = audioUrl;
    this.imgUrl = imgUrl;
    this.author = author;
  }
}

class AppMusic {
  #currentSong = 0;
  #isPlaying = false;
  #isRandom = false;
  #isRepeat = false;

  #audioList = [
    new AudioItem(
      'Muộn Rồi Mà Sao Còn',
      'audio/MuonRoiMaSaoCon.mp3',
      'img/MuonRoiMaSaoCon.jfif',
      'Sơn Tùng M-TP'
    ),

    new AudioItem(
      'Chạy Ngay Đi',
      'audio/ChayNgayDi.mp3',
      'img/ChayNgayDi.png',
      'Sơn Tùng M-TP'
    ),

    new AudioItem(
      'Có Chắc Yêu Là Đây',
      'audio/CoChacYeuLaDay.mp3',
      'img/CoChavYeuLaDay.jpg',
      'Sơn Tùng M-TP'
    ),

    new AudioItem(
      'Nàng Thơ',
      'audio/NangTho.mp3',
      'img/NangTho.jpg',
      'Hoàng Dũng'
    ),

    new AudioItem(
      'STAY',
      'audio/Stay.mp3',
      'img/Stay.png',
      'Justin Bieber, The Kid LAROI'
    ),

    new AudioItem(
      'The Playah (feat. SlimV)',
      'audio/ThePlayAh.mp3',
      'img/ThePlayAh.jpg',
      'Soobin Hoàng Sơn, SlimV'
    ),

    new AudioItem(
      'Thích Em Hơi Nhiều',
      'audio/ThichEmHoiNhieu.mp3',
      'img/ThichEmHoiNhieu.jfif',
      'Wren Evans'
    ),

    new AudioItem(
      'WAP (feat. Megan Thee Stallion)',
      'audio/Wap.mp3',
      'img/Wap.jfif',
      'Cardi B, Megan Thee Stallion'
    ),

    new AudioItem(
      'một triệu like',
      'audio/MotTrieuLike.mp3',
      'img/MotTrieuLike.jfif',
      'Đen, Thành Đồng'
    ),

    new AudioItem('UP', 'audio/Up.mp3', 'img/Up.jfif', 'Cardi B'),
  ];
  constructor() {
    this._renderListAudio();
    this._playerUi();
    this._loadCurrentSong();
    this._selectSong();
    this._eventControl();
    this._playingProgress();
    this._autoNextSong();
  }

  _renderListAudio() {
    const audioWrapper = document.querySelector('.content .audio-list');

    for (const [index, item] of this.#audioList.entries()) {
      const audioItem = document.createElement('li');
      audioItem.classList.add('audio-item');
      audioItem.innerHTML = `
      <span class="audio-ordinal">${index + 1}</span>
      <img src="${item.imgUrl}" alt="" class="audio-img" />
      <div class="audio-infor">
        <span class="name text-semibold text-semibold-12"
          >${item.name}</span
        >
        <span class="author">${item.author}</span>
      </div>
      <div class="more">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="#b3b3b3"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="#b3b3b3"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="#b3b3b3"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      `;

      audioWrapper.append(audioItem);
    }
  }

  _conventTime(inputSecond) {
    let seconds = Math.floor(inputSecond % 60);
    let minutes = Math.floor(inputSecond / 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  _random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _loadCurrentSong() {
    const nameSongBottomPlayer = document.querySelector('.bottom-player .name');
    const authorSongBottomPlayer = document.querySelector(
      '.bottom-player .author'
    );
    const imgSongBottomPlayer = document.querySelector(
      '.bottom-player .audio-img img'
    );

    const nameSongMainPlayer = document.querySelector('.main-player .name');
    const authorSongMainPlayer = document.querySelector('.main-player .author');
    const imgSongMainPlayer = document.querySelector(
      '.main-player .player-img'
    );
    const nameSongItem = document.querySelectorAll(
      '.content .audio-infor .name'
    );

    nameSongMainPlayer.textContent = nameSongBottomPlayer.textContent =
      this.#audioList[this.#currentSong].name;

    authorSongMainPlayer.textContent = authorSongBottomPlayer.textContent =
      this.#audioList[this.#currentSong].author;

    audio.src = this.#audioList[this.#currentSong].audioUrl;
    imgSongMainPlayer.src = imgSongBottomPlayer.src =
      this.#audioList[this.#currentSong].imgUrl;

    nameSongItem.forEach(name => {
      name.style.color = '#b3b3b3';
    });
    nameSongItem[this.#currentSong].style.color = '#57b65f';
  }

  _nextSong() {
    this.#currentSong++;
    if (this.#currentSong >= this.#audioList.length) {
      this.#currentSong = 0;
    }
    this._loadCurrentSong();
  }

  _prevSong() {
    this.#currentSong--;
    if (this.#currentSong <= 0) {
      this.#currentSong = this.#audioList.length - 1;
    }
    this._loadCurrentSong();
  }

  _randomSong() {
    const randomNumber = this._random(0, this.#audioList.length - 1);
    this.#currentSong = randomNumber;
    this._loadCurrentSong();
  }

  _repeatSong() {
    if (this.#isRepeat) {
      audio.loop = true;
    } else {
      audio.loop = false;
    }
  }

  _selectSong() {
    const songs = document.querySelectorAll('.audio-item');
    songs.forEach((song, index) => {
      song.addEventListener(
        'click',
        function (e) {
          if (e.target.closest('.more')) return;
          this.#currentSong = index;
          this._loadCurrentSong();
          audio.play();
        }.bind(this)
      );
    });
  }

  _autoNextSong() {
    if (audio.loop === false) {
      audio.addEventListener(
        'ended',
        function () {
          if (this.#isRandom) {
            this._randomSong();
          } else {
            this._nextSong();
          }
          audio.play();
        }.bind(this)
      );
    }
  }

  _eventControl() {
    // click to open audio and pause
    btnPlayPause.forEach(btn => {
      btn.addEventListener(
        'click',
        function (e) {
          if (this.#isPlaying === true) {
            audio.pause();
          } else {
            audio.play();
          }
        }.bind(this)
      );
    });

    // click random to random song
    randomBtn.addEventListener(
      'click',
      function () {
        this.#isRandom = !this.#isRandom;
        if (this.#isRandom === true) {
          randomBtn.classList.add('active');
        } else {
          randomBtn.classList.remove('active');
        }
      }.bind(this)
    );

    // click repeat to repeat song
    repeatBtn.addEventListener(
      'click',
      function () {
        this.#isRepeat = !this.#isRepeat;
        repeatBtn.classList.toggle('active');
        this._repeatSong();
      }.bind(this)
    );

    //when audio is playing
    audio.addEventListener(
      'play',
      function () {
        this.#isPlaying = true;
        app.classList.add('is-playing');
      }.bind(this)
    );

    //when audio is pausing
    audio.addEventListener(
      'pause',
      function () {
        this.#isPlaying = false;
        app.classList.remove('is-playing');
      }.bind(this)
    );

    // move next song
    nextBtn.addEventListener(
      'click',
      function () {
        if (this.#isRandom) {
          this._randomSong();
        } else {
          this._nextSong();
        }
        audio.play();
      }.bind(this)
    );

    // move prev song
    prevBtn.addEventListener(
      'click',
      function () {
        if (this.#isRandom) {
          this._randomSong();
        } else {
          this._prevSong();
        }
        audio.play();
      }.bind(this)
    );
  }

  // show and hidden main-player ui
  _playerUi() {
    //when click bottom player to show main-player
    bottomPlayer.addEventListener('click', function (e) {
      if (
        e.target.closest('.bottom-player .like') ||
        e.target.closest('.bottom-player .play-pause')
      ) {
        return;
      }

      app.classList.add('is-main-player');
    });

    //when click btn hidden to hidden main-player
    btnHiddenMainPlayer.addEventListener('click', function () {
      app.classList.remove('is-main-player');
    });
  }

  _playingProgress() {
    const start = document.querySelector('.song-duration .start');
    const end = document.querySelector('.song-duration .end');
    const progressBar = document.querySelector('.progress');
    const now = progressBar.querySelector('.line');
    const circle = progressBar.querySelector('.circle');

    audio.addEventListener(
      'loadedmetadata',
      function () {
        start.innerHTML = this._conventTime(audio.currentTime);
        end.innerHTML = this._conventTime(audio.duration);
      }.bind(this)
    );

    progressBar.addEventListener('click', function (event) {
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.pageX; // get coordinate x
      let p =
        (coordEnd - coordStart) / progressBar.getBoundingClientRect().width; // get position

      now.style.width = p * 100 + '%'; // set width for now
      circle.style.left =
        now.getBoundingClientRect().width -
        circle.getBoundingClientRect().width +
        'px';
      audio.currentTime = p * audio.duration;
      audio.play();
    });

    setInterval(() => {
      start.innerHTML = this._conventTime(audio.currentTime);
      now.style.width = (audio.currentTime / audio.duration) * 100 + '%';
      circle.style.left =
        now.getBoundingClientRect().width -
        circle.getBoundingClientRect().width +
        'px';
    }, 1000);
  }
}

const appMusic = new AppMusic();
