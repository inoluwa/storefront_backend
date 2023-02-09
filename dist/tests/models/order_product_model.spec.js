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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_product_1 = require("../../models/order_product");
var products_1 = require("../../models/products");
var orders_1 = require("../../models/orders");
var users_1 = require("../../models/users");
var productStore = new products_1.ProductStore();
var orderStore = new orders_1.OrderStore();
var userStore = new users_1.UserStore();
var orderProductStore = new order_product_1.OrderProductStore();
describe('Order-product Model', function () {
    var product;
    var productId;
    var userId;
    var orderId;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var userTop, product, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create({
                        username: 'Test',
                        password: 'Pass275',
                        firstName: 'Kunle ',
                        lastName: 'Oyewusi'
                    })];
                case 1:
                    userTop = _a.sent();
                    userId = Number(userTop.id);
                    return [4 /*yield*/, productStore.createProduct({
                            "product_name": "Monitor",
                            "price": 90,
                            "category": "Home appliances"
                        })];
                case 2:
                    product = _a.sent();
                    productId = product.id;
                    return [4 /*yield*/, orderStore.create({
                            user_id: userId,
                            status_of_order: true
                        })];
                case 3:
                    order = _a.sent();
                    orderId = order === null || order === void 0 ? void 0 : order.id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should add product to order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addProductToOrder, productAddToOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addProductToOrder = {
                        order_id: orderId,
                        product_id: productId,
                        quantity: 1
                    };
                    return [4 /*yield*/, orderProductStore.addProductToOrder(addProductToOrder)];
                case 1:
                    productAddToOrder = _a.sent();
                    expect(addProductToOrder.product_id).toEqual(productAddToOrder.product_id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get all order-products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var allOrderProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderProductStore.AllOrderProduct()];
                case 1:
                    allOrderProduct = _a.sent();
                    expect(allOrderProduct.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
