import { Request, Response } from "express";
import Song from "../../../../models/song.model";
import Singer from "../../../../models/singer.model";
import Topic from "../../../../models/topic.model";
import * as systemConfig from "../../../../config/system";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  }).lean();
  for (const song of songs as any) {
    const infoTopic = await Topic.findOne({
      _id: song.topicId,
    });
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
    });
    song.infoTopic = infoTopic;
    song.infoSinger = infoSinger;
  }
  res.render("admin/pages/songs/index", {
    pageTitle: "Danh sách bài hát",
    songs: songs,
  });
};

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  }).select("title");
  const singers = await Singer.find({
    deleted: false,
  }).select("fullName");
  res.render("admin/pages/songs/create", {
    pageTitle: "Tạo mới bài hát",
    topics: topics,
    singers: singers,
  });
};

// [POST] /admin/songs/createPost
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";
  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    audio = req.body.audio[0];
  }
  const song = new Song({
    title: req.body.title,
    avatar: avatar,
    description: req.body.description,
    singerId: req.body.singerId,
    topicId: req.body.topicId,
    status: req.body.status,
    audio: audio,
  });
  await song.save();
  console.log(req.body);
  res.redirect(`${systemConfig.pathAdmin.prefixAdmin}/songs`);
  // res.send("OK");
};
