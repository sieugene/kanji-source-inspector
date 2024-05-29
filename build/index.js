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
exports.bootstrap = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const yarxi_1 = require("./services/yarxi");
const findMeaning_1 = require("./services/findMeaning");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const kanji = "日";
    yield (0, yarxi_1.yarxi)(browser, kanji);
    yield (0, findMeaning_1.findMeaning)(browser, kanji);
    //   await browser.close();
});
exports.bootstrap = bootstrap;
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("start");
    yield (0, exports.bootstrap)();
    console.log("end");
}))();
