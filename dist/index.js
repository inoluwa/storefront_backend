"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orders_routes_1 = __importDefault(require("./handlers/orders_routes"));
var products_routes_1 = __importDefault(require("./handlers/products_routes"));
var users_routes_1 = __importDefault(require("./handlers/users_routes"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
var port = 3000;
app.use(body_parser_1.default.json());
//call the functions
(0, orders_routes_1.default)(app);
(0, products_routes_1.default)(app);
(0, users_routes_1.default)(app);
app.listen(port, function () {
    console.log("Server running at ".concat(port));
});
exports.default = app;
