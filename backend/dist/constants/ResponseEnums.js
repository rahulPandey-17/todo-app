"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
var HttpResponse;
(function (HttpResponse) {
    HttpResponse[HttpResponse["OK"] = 200] = "OK";
    HttpResponse[HttpResponse["CREATED"] = 201] = "CREATED";
    HttpResponse[HttpResponse["CONFLICT"] = 409] = "CONFLICT";
    HttpResponse[HttpResponse["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpResponse[HttpResponse["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpResponse[HttpResponse["UNAUTHORIZED"] = 403] = "UNAUTHORIZED";
    HttpResponse[HttpResponse["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(HttpResponse || (exports.HttpResponse = HttpResponse = {}));
