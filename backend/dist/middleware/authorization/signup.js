"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupMiddleware = signupMiddleware;
const zod_1 = require("../../types/zod");
const ResponseEnums_1 = require("../../constants/ResponseEnums");
function signupMiddleware(req, res, next) {
    const payload = req.body;
    try {
        const parsedPayload = zod_1.signupSchema.safeParse(payload);
        req.signupPayload = parsedPayload.data;
        next();
    }
    catch (err) {
        res.status(ResponseEnums_1.HttpResponse.BAD_REQUEST).json({
            success: false,
            msg: err instanceof Error ? err.message : 'Invalid inputs'
        });
    }
}
