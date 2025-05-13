"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.loginSchema = exports.todoSchema = void 0;
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name required').max(100),
    lastName: zod_1.z.string().max(100).optional(),
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(6, 'Password must be atleast 6 characters long')
});
exports.signupSchema = signupSchema;
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(6, 'Password must be atleast 6 characters long')
});
exports.loginSchema = loginSchema;
const todoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(200),
    description: zod_1.z.string().max(300)
});
exports.todoSchema = todoSchema;
