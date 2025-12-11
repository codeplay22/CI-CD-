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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const client = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username } = req.query;
    let user = yield client.user.findFirst({
        where: {
            username: username,
        },
    });
    if (!user) {
        res.json({ message: "User not found" });
        return;
    }
    res.json({
        username: user.username,
        password: user.password,
        age: user.age,
        city: user.city,
    });
}));
app.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body;
    const { username, password, age, city } = message;
    let user = yield client.user.create({
        data: {
            username: username,
            password: password,
            age: age,
            city: city,
        },
    });
    const users = yield client.user.findMany();
    console.log("users are ", users);
    res.json({ users });
}));
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
