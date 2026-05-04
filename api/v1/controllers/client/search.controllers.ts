import { Request, Response } from "express";
import Song from "../../../../models/song.model";
import Singer from "../../../../models/singer.model";
import { convertToSlug } from "../../../../helpers/convertToSlug";

// [GET] /:type
export const result = async (req: Request, res: Response) => {
  const keyword = req.query.keyword;
  let newSongs: any[] = [];
  if (keyword) {
    const stringRegex = new RegExp(keyword.toString(), "i");
    const stringSlug = convertToSlug(keyword.toString());
    const stringSlugRegex = new RegExp(stringSlug, "i");
    const songs = await Song.find({
      $or: [{ title: stringRegex }, { slug: stringSlugRegex }],
      deleted: false,
    });
    for (const song of songs as any) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
      });
      newSongs.push({
        id: song.id,
        title: song.title,
        avatar: song.avatar,
        like: song.like,
        slug: song.slug,
        infoSinger: {
          fullName: infoSinger?.fullName,
        },
      });
    }
  }
  const type = req.params.type;
  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        pageTitle: "Kết quả tìm kiếm",
        songs: newSongs,
        keyword: keyword,
      });
      break;
    case "suggest":
      res.json({
        code: 200,
        message: "Thành công!",
        songs: newSongs,
      });
      break;
    default:
      break;
  }
};
