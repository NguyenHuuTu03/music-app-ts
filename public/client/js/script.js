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
  ap.on('ended', function () {
    avatar.style.animationPlayState = "paused";

    const link = `/songs/listen/${song._id}`;
    const option = {
      method: "PATCH"
    };
    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const listen = document.querySelector(".inner-listen span");
          listen.innerHTML = `${data.listen} lượt`
        }
      });
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

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const inputSearch = boxSearch.querySelector('input[name="keyword"]');
  inputSearch.addEventListener("keyup", () => {
    const keyword = inputSearch.value.trim();

    const boxSuggest = boxSearch.querySelector(".search-suggest");
    const suggestList = boxSuggest.querySelector(".suggest-list");

    // 👉 Nếu rỗng thì ẩn luôn và không gọi API
    if (!keyword) {
      boxSuggest.classList.remove("show");
      suggestList.innerHTML = "";
      return;
    }

    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then(res => res.json())
      .then(data => {
        const songs = data.songs;

        if (songs.length > 0) {
          boxSuggest.classList.add("show");
          const htmls = songs.map(song => {
            return `
            <a href="/songs/detail/${song.slug}" class="inner-item">
              <div class="inner-image">
                <img src="${song.avatar}" alt="${song.title}">
              </div>
              <div class="inner-info">
                <div class="inner-title-suggest">${song.title}</div>
                <div class="inner-singer">
                  <i class="fa-solid fa-microphone-lines"></i>
                  ${song.infoSinger?.fullName || ""}
                </div>
              </div>
            </a>
          `
          });

          suggestList.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}
// End Search Suggest