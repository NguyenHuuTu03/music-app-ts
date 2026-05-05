"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../../../models/song.model"));
const singer_model_1 = __importDefault(require("../../../../models/singer.model"));
const topic_model_1 = __importDefault(require("../../../../models/topic.model"));
const systemConfig = __importStar(require("../../../../config/system"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false,
    }).lean();
    for (const song of songs) {
        const infoTopic = yield topic_model_1.default.findOne({
            _id: song.topicId,
        });
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
        });
        song.infoTopic = infoTopic;
        song.infoSinger = infoSinger;
    }
    res.render("admin/pages/songs/index", {
        pageTitle: "Danh sách bài hát",
        songs: songs,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
    }).select("fullName");
    res.render("admin/pages/songs/create", {
        pageTitle: "Tạo mới bài hát",
        topics: topics,
        singers: singers,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const song = new song_model_1.default({
        title: req.body.title,
        avatar: avatar,
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.topicId,
        status: req.body.status,
        audio: audio,
        lyrics: req.body.lyrics,
    });
    yield song.save();
    console.log(req.body);
    res.redirect(`${systemConfig.pathAdmin.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    const song = yield song_model_1.default.findOne({
        _id: songId,
        deleted: false,
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
    });
    const singers = yield singer_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = {
        title: req.body.title,
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.topicId,
        status: req.body.status,
        lyrics: req.body.lyrics,
    };
    if (req.body.avatar) {
        song.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        song.audio = req.body.audio[0];
    }
    yield song_model_1.default.updateOne({
        _id: req.params.songId,
    }, song);
    res.redirect(req.get("Referer") ||
        `${systemConfig.pathAdmin.prefixAdmin}/songs/edit/${req.params.songId}`);
});
exports.editPatch = editPatch;
