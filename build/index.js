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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const app_1 = require("./app");
const ServiceBaseInfo_1 = require("./services/ServiceBaseInfo");
const ServicePartial_1 = require("./services/ServicePartial");
const ServiceYarxi_1 = require("./services/ServiceYarxi");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("start");
    const app = new app_1.App();
    app.process({
        kanji: "日",
        services: [ServiceYarxi_1.ServiceYarxi, ServiceBaseInfo_1.ServiceBaseInfo, ServicePartial_1.ServicePartial],
    });
    console.log("end");
});
exports.bootstrap = bootstrap;
(0, exports.bootstrap)();
