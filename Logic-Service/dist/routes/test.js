"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_token_1 = __importDefault(require("../middlewares/auth-token"));
const test_controller_1 = require("../controllers/test-controller");
const router = (0, express_1.Router)();
router.get('/', auth_token_1.default, test_controller_1.test);
exports.default = router;
