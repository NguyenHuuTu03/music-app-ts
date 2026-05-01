import { Request, Response } from "express";
import Song from "../../../../models/song.model";
import Topic from "../../../../models/topic.model";
import Singer from "../../../../models/singer.model";

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
