import { Request, Response } from "express";
import Song from "../../../../models/song.model";
import Topic from "../../../../models/topic.model";
import Singer from "../../../../models/singer.model";
import FavoriteSong from "../../../../models/favorite-songs.model";
import User from "../../../../models/user.model";

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

  if (res.locals.user) {
    const favoriteSong = await FavoriteSong.findOne({
      userId: res.locals.user.id,
      songId: song?.id,
      deleted: false,
    });

    (song as any)["isFavoriteSong"] = favoriteSong ? true : false;
    const userId = song?.like.find((item) => item === res.locals.user.id);
    (song as any).isLike = userId ? true : false;
  }

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
  const userId = song?.like.find((item) => item == res.locals.user.id);
  if (typeLike == "like") {
    if (!userId) {
      await Song.updateOne(
        {
          _id: id,
        },
        {
          $push: { like: res.locals.user.id },
        },
      );
    }
  }
  if (typeLike == "dislike") {
    await Song.updateOne({ _id: id }, { $pull: { like: res.locals.user.id } });
  }
  const newSong = await Song.findOne({
    _id: song?.id,
    deleted: false,
  });
  res.json({
    code: 200,
    message: "Thành công!",
    like: newSong?.like.length,
  });
};

// [PATCH] /favorite/:typeFavorite/:songId
export const favorite = async (req: Request, res: Response) => {
  const id = req.params.songId;
  const typeFavorite = req.params.typeFavorite;
  switch (typeFavorite) {
    case "favorite":
      const exitsFavoriteSong = await FavoriteSong.findOne({
        userId: res.locals.user.id,
        songId: id,
        deleted: false,
      });

      if (!exitsFavoriteSong) {
        const record = new FavoriteSong({
          userId: res.locals.user.id,
          songId: id,
        });
        await record.save();
      }
      break;
    case "unfavorite":
      await FavoriteSong.deleteOne({
        userId: res.locals.user.id,
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

// [PATCH] /listen/:songId
export const listen = async (req: Request, res: Response) => {
  const id = req.params.songId;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
  });
  const newListen = (song?.listen || 0) + 1;
  await Song.updateOne(
    {
      _id: id,
    },
    {
      listen: newListen,
    },
  );
  const newSong = await Song.findOne({
    _id: id,
    deleted: false,
  });

  res.json({
    code: 200,
    message: "Thành công!",
    listen: newSong?.listen,
  });
};
