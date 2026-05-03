import { Request, Response } from "express";
import FavoriteSong from "../../../../models/favorite-songs.model";
import Song from "../../../../models/song.model";
import Singer from "../../../../models/singer.model";

// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    userId: res.locals.user.id,
    deleted: false,
  }).lean();
  for (const item of favoriteSongs as any) {
    const infoSong = await Song.findOne({
      _id: item.songId,
      deleted: false,
    });
    const infoSinger = await Singer.findOne({
      _id: infoSong?.singerId,
      deleted: false,
    });
    item.infoSong = infoSong;
    item.infoSinger = infoSinger;
  }
  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Danh sách bài hát yêu thích",
    songs: favoriteSongs,
  });
};
