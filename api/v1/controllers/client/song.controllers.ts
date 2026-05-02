import { Request, Response } from "express";
import Song from "../../../../models/song.model";
import Topic from "../../../../models/topic.model";
import Singer from "../../../../models/singer.model";
import FavoriteSong from "../../../../models/favorite-songs.model";

// [GET] /songs/:slugSong
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugSong,
    deleted: false,
  });
  const songs = await Song.find({
    topicId: topic?.id,
    deleted: false,
  })
    .select("title avatar slug like singerId")
    .lean();

  for (const song of songs as any[]) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    })
      .select("fullName avatar")
      .lean();
    song.infoSinger = infoSinger;
  }
  res.render("client/pages/songs/list", {
    pageTitle: topic?.title,
    songs: songs,
  });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slug = req.params.slugSong;
  const song = await Song.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  });
  const singer = await Singer.findOne({
    _id: song?.singerId,
    deleted: false,
  }).select("fullName avatar");
  const topic = await Topic.findOne({
    _id: song?.topicId,
    deleted: false,
  })
    .select("title")
    .lean();

  const favoriteSong = await FavoriteSong.findOne({
    songId: song?.id,
    deleted: false,
  });
  (song as any)["isFavoriteSong"] = favoriteSong ? true : false;
  res.render("client/pages/songs/detail", {
    pageTitle: song?.title,
    song: song,
    singer: singer,
    topic: topic,
  });
};

// [PATCH] /like/:typeLike/:songId
export const like = async (req: Request, res: Response) => {
  const id = req.params.songId;
  const typeLike = req.params.typeLike;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
    status: "active",
  });
  const newLike =
    typeLike == "like" ? (song?.like || 0) + 1 : (song?.like || 0) - 1;
  await Song.updateOne(
    {
      _id: id,
    },
    {
      like: newLike,
    },
  );
  res.json({
    code: 200,
    message: "Thành công!",
    like: newLike,
  });
};

// [PATCH] /favorite/:typeFavorite/:songId
export const favorite = async (req: Request, res: Response) => {
  const id = req.params.songId;
  const typeFavorite = req.params.typeFavorite;
  switch (typeFavorite) {
    case "favorite":
      const exitsFavoriteSong = await FavoriteSong.findOne({
        songId: id,
        deleted: false,
      });
      if (!exitsFavoriteSong) {
        const record = new FavoriteSong({
          // userId: "",
          songId: id,
        });
        await record.save();
      }
      break;
    case "unfavorite":
      await FavoriteSong.deleteOne({
        songId: id,
      });
      break;
    default:
      break;
  }
  res.json({
    code: 200,
    message: "Thành công!",
  });
};
