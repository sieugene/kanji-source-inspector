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
exports.yarxi = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const yarxi = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto("https://www.yarxi.ru/online/");
    yield page.waitForSelector("#tab_tango");
    yield page.click("#tab_tango");
    yield page.waitForSelector("input#tread");
    yield page.type("input#tread", input);
    yield page.waitForSelector('input[onclick="return tst();"]');
    yield page.click('input[onclick="return tst();"]');
    yield page.waitForFunction(() => {
        const element = document.querySelector("#entryframe");
        return !!element;
    });
    const entryFrameContent = yield page.evaluate(() => {
        const element = document.querySelector("#entryframe");
        return element ? element.innerHTML : null;
    });
    if (entryFrameContent) {
        console.log("HTML содержимое #entryframe:", entryFrameContent);
    }
    else {
        console.log("#entryframe не найден или не содержит контент.");
    }
    //   await browser.close();
});
exports.yarxi = yarxi;
