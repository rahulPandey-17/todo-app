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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const signup_1 = require("../../middleware/authorization/signup");
const prisma_1 = require("../../generated/prisma");
const ResponseEnums_1 = require("../../constants/ResponseEnums");
const login_1 = require("../../middleware/authorization/login");
const router = express_1.default.Router();
dotenv_1.default.config();
const prisma = new prisma_1.PrismaClient();
const message = 'Internal server error';
router.post('/signup', signup_1.signupMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.signupPayload) {
            res.status(ResponseEnums_1.HttpResponse.BAD_REQUEST).json({
                success: false,
                msg: 'Missing signup payload'
            });
            return;
        }
        const { firstName, lastName, email, password } = req.signupPayload;
        const userExists = yield prisma.users.findUnique({
            where: { email }
        });
        if (userExists) {
            res.status(ResponseEnums_1.HttpResponse.CONFLICT).json({
                success: false,
                msg: 'User with this email already exists'
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.users.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        });
        res.status(ResponseEnums_1.HttpResponse.CREATED).json({
            success: true,
            msg: 'User created successfully',
            newUser
        });
    }
    catch (err) {
        res.status(ResponseEnums_1.HttpResponse.INTERNAL_ERROR).json({
            success: false,
            msg: err instanceof Error ? err.message : message
        });
    }
    finally {
        yield prisma.$disconnect();
    }
}));
router.post('/login', login_1.loginMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.parsedLoginPayload) {
            res.status(ResponseEnums_1.HttpResponse.BAD_REQUEST).json({
                success: false,
                msg: 'Login credentials not provided'
            });
            return;
        }
        const { email, password } = req.parsedLoginPayload;
        const user = yield prisma.users.findUnique({
            where: { email },
            select: { email: true, password: true, id: true }
        });
        const error_message = 'Invalid username or password';
        if (!user) {
            res.status(ResponseEnums_1.HttpResponse.UNAUTHORIZED).json({
                success: false,
                msg: error_message
            });
            return;
        }
        const checkPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!checkPassword) {
            res.status(ResponseEnums_1.HttpResponse.UNAUTHORIZED).json({
                success: false,
                msg: error_message
            });
            return;
        }
        const id = user.id;
        if (!process.env.JWT_KEY) {
            res.status(ResponseEnums_1.HttpResponse.BAD_REQUEST).json({
                success: false,
                msg: 'JWT seceret key not provided'
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id, email }, process.env.JWT_KEY, { expiresIn: '1hr' });
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60,
        });
        res.status(ResponseEnums_1.HttpResponse.OK).json({
            success: true,
            msg: 'Login successfull',
        });
    }
    catch (err) {
        res.status(ResponseEnums_1.HttpResponse.INTERNAL_ERROR).json({
            success: false,
            msg: err instanceof Error ? err.message : message
        });
    }
    finally {
        yield prisma.$disconnect();
    }
}));
router.use((err, req, res, next) => {
    res.status(ResponseEnums_1.HttpResponse.NOT_FOUND).json({
        success: false,
        msg: 'Route not found'
    });
});
exports.default = router;
