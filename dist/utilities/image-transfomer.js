"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
function newResizeImage(filename, height, width, errorMsg) {
    if (errorMsg === void 0) { errorMsg = "Image is not found"; }
    try {
        return (0, sharp_1.default)(path_1.default.resolve("images/".concat(filename, ".jpg")))
            .resize({
            width: width,
            height: height,
            fit: sharp_1.default.fit.cover
        })
            .toBuffer();
    }
    catch (err) {
        console.log("Testing error", err);
        return new Promise(function () {
            throw new Error(errorMsg);
        });
    }
}
exports.default = newResizeImage;
