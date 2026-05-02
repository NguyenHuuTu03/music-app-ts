// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  const dataSong = aplayer.getAttribute("data-song");
  const song = JSON.parse(dataSong);

  const dataSinger = aplayer.getAttribute("data-singer");
  const singer = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
      name: song.title,
      artist: dataSinger.fullName,
      url: '/client/audio/cat-doi-noi-sau.mp3',
      cover: song.avatar
    }],
    autoplay: true
  });
  const avatar = document.querySelector(".singer-detail .inner-avatar img");

  ap.on('play', function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avatar.style.animationPlayState = "paused";
  });
}

// End APlayer