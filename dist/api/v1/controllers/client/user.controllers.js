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
exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../../../models/user.model"));
const generateHelpers = __importStar(require("../../../../helpers/generate"));
const register = (req, res) => {
    res.render("client/pages/users/register", {
        pageTitle: "Đăng ký",
    });
};
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exitsEmail = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false,
    });
    if (exitsEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!",
        });
        return;
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    const tokenUser = generateHelpers.generateRandomString(30);
    const user = new user_model_1.default({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        tokenUser: tokenUser,
    });
    yield user.save();
    res.cookie("tokenUser", tokenUser);
    res.redirect("/topics");
});
exports.registerPost = registerPost;
const login = (req, res) => {
    res.render("client/pages/users/login", {
        pageTitle: "Đăng nhập",
    });
};
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exitsEmail = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false,
    });
    if (!exitsEmail) {
        res.redirect("/users/login");
        return;
    }
    if ((0, md5_1.default)(req.body.password) != exitsEmail.password) {
        res.redirect("/users/login");
        return;
    }
    if (exitsEmail.status != "active") {
        res.redirect("/users/login");
        return;
    }
    res.cookie("tokenUser", exitsEmail.tokenUser);
    res.redirect("/topics");
});
exports.loginPost = loginPost;
const logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/topics");
};
exports.logout = logout;
