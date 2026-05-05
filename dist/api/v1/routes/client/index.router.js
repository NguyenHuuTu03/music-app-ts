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
Object.defineProperty(exports, "__esModule", { value: true });
const topic_router_1 = require("./topic.router");
const song_router_1 = require("./song.router");
const user_router_1 = require("./user.router");
const favorite_song_router_1 = require("./favorite-song.router");
const authMiddleware = __importStar(require("../../../../middleware/client/auth.middleware"));
const search_router_1 = require("./search.router");
const userMiddleware = __importStar(require("../../../../middleware/client/user.middleware"));
const clientRoutes = (app) => {
    app.use(userMiddleware.infoUser);
    app.use("/topics", topic_router_1.topicRoutes);
    app.use("/songs", song_router_1.songRoutes);
    app.use("/users", user_router_1.userRoutes);
    app.use("/favorite-songs", authMiddleware.authRequest, favorite_song_router_1.favoriteSongRoutes);
    app.use("/search", search_router_1.searchRoutes);
};
exports.default = clientRoutes;
