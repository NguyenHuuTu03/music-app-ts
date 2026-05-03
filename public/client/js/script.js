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

// Button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const id = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
    const typeLike = isActive ? "dislike" : "like"
    const link = `/songs/like/${typeLike}/${id}`;

    const option = {
      method: "PATCH"
    };
    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.like} thích`;
          buttonLike.classList.toggle("active");
        }
      });
  });
}
// End Button like

// Button favorite
const listFavoriteSong = document.querySelectorAll("[button-favorite]");
if (listFavoriteSong) {
  listFavoriteSong.forEach(buttonFavoriteSong => {
    buttonFavoriteSong.addEventListener("click", () => {
      const id = buttonFavoriteSong.getAttribute("button-favorite");
      const isActive = buttonFavoriteSong.classList.contains("active");
      const typeFavorite = isActive ? "unfavorite" : "favorite"
      const link = `/songs/favorite/${typeFavorite}/${id}`;

      const option = {
        method: "PATCH"
      };
      fetch(link, option)
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            buttonFavoriteSong.classList.toggle("active");
          }
        });
    });
  });

}
// End Button favorite