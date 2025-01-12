import * as fs from "fs";
import { Request, Response } from "express";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception.message || "Internal server error";

    const logMessage = `[${new Date().toISOString()}] ${status} - ${message}\n`;
    fs.appendFileSync("errors.log", logMessage);

    // Отправляем ответ
    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: null, 
    });
  }
}
