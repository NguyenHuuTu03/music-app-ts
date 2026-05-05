"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const song_model_1 = __importDefault(require("../../../../models/song.model"));
const topic_model_1 = __importDefault(require("../../../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../../../models/singer.model"));
const favorite_songs_model_1 = __importDefault(require("../../../../models/favorite-songs.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugSong,
        deleted: false,
    });
    const songs = yield song_model_1.default.find({
        topicId: topic === null || topic === void 0 ? void 0 : topic.id,
        deleted: false,
    })
        .select("title avatar slug like singerId")
        .lean();
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false,
        })
            .select("fullName avatar")
            .lean();
        song.infoSinger = infoSinger;
    }
    res.render("client/pages/songs/list", {
        pageTitle: topic === null || topic === void 0 ? void 0 : topic.title,
        songs: songs,
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slug,
        status: "active",
        deleted: false,
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song === null || song === void 0 ? void 0 : song.singerId,
        deleted: false,
    }).select("fullName avatar");
    const topic = yield topic_model_1.default.findOne({
        _id: song === null || song === void 0 ? void 0 : song.topicId,
        deleted: false,
    })
        .select("title")
        .lean();
    if (res.locals.user) {
        const favoriteSong = yield favorite_songs_model_1.default.findOne({
            userId: res.locals.user.id,
            songId: song === null || song === void 0 ? void 0 : song.id,
            deleted: false,
        });
        song["isFavoriteSong"] = favoriteSong ? true : false;
        const userId = song === null || song === void 0 ? void 0 : song.like.find((item) => item === res.locals.user.id);
        song.isLike = userId ? true : false;
    }
    res.render("client/pages/songs/detail", {
        pageTitle: song === null || song === void 0 ? void 0 : song.title,
        song: song,
        singer: singer,
        topic: topic,
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.songId;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
        status: "active",
    });
    const userId = song === null || song === void 0 ? void 0 : song.like.find((item) => item == res.locals.user.id);
    if (typeLike == "like") {
        if (!userId) {
            yield song_model_1.default.updateOne({
                _id: id,
            }, {
                $push: { like: res.locals.user.id },
            });
        }
    }
    if (typeLike == "dislike") {
        yield song_model_1.default.updateOne({ _id: id }, { $pull: { like: res.locals.user.id } });
    }
    const newSong = yield song_model_1.default.findOne({
        _id: song === null || song === void 0 ? void 0 : song.id,
        deleted: false,
    });
    res.json({
        code: 200,
        message: "Thành công!",
        like: newSong === null || newSong === void 0 ? void 0 : newSong.like.length,
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.songId;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const exitsFavoriteSong = yield favorite_songs_model_1.default.findOne({
                userId: res.locals.user.id,
                songId: id,
                deleted: false,
            });
            if (!exitsFavoriteSong) {
                const record = new favorite_songs_model_1.default({
                    userId: res.locals.user.id,
                    songId: id,
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_songs_model_1.default.deleteOne({
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
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.songId;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    const newListen = ((song === null || song === void 0 ? void 0 : song.listen) || 0) + 1;
    yield song_model_1.default.updateOne({
        _id: id,
    }, {
        listen: newListen,
    });
    const newSong = yield song_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    res.json({
        code: 200,
        message: "Thành công!",
        listen: newSong === null || newSong === void 0 ? void 0 : newSong.listen,
    });
});
exports.listen = listen;
