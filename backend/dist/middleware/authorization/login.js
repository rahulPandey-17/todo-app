"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMiddleware = loginMiddleware;
const zod_1 = require("../../types/zod");
const ResponseEnums_1 = require("../../constants/ResponseEnums");
function loginMiddleware(req, res, next) {
    if (!req.body) {
        throw new Error('Request body not provided');
    }
    const payload = req.body;
    try {
        const parsedPayload = zod_1.loginSchema.safeParse(payload);
        req.parsedLoginPayload = parsedPayload.data;
        next();
    }
    catch (err) {
        res.status(ResponseEnums_1.HttpResponse.BAD_REQUEST).json({
            success: false,
            msg: err instanceof Error ? err.message : 'Invalid inputs'
        });
    }
}
