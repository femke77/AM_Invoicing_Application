// nestjs will give us an automatic global exception filter out-of-the-box, however this is a better implementation
// because it is more explicit and we can customize it to our needs plus we can log to the console including detailed cause of the error
// and stack trace when we are in dev mode. No logging middleware is added because I have it logging here and this is
// comprehensive for ALL errors

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";
import { randomUUID } from "crypto";

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp: string;
  path: string;
  correlationId?: string;
  details?: any;
}

@Catch() // Catching all exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const correlationId = request.headers["x-correlation-id"] || randomUUID();

    let status: number;
    let errorResponse: ErrorResponse;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      errorResponse = {
        statusCode: status,
        message: this.extractMessage(exceptionResponse),
        error: this.extractError(exceptionResponse, status),
        timestamp: new Date().toISOString(),
        path: request.url,
        correlationId,
        details: this.extractDetails(exceptionResponse),
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = {
        statusCode: status,
        message: "Internal Server Error",
        error: "Internal Server Error",
        timestamp: new Date().toISOString(),
        path: request.url,
        correlationId,
      };

      // Only include error details in non-production environments for security purposes
      if (process.env.NODE_ENV !== "production") {
        errorResponse.details =
          exception instanceof Error
            ? {
                name: exception.name,
                message: exception.message,
                stack: exception.stack,
              }
            : exception;
      }
    }

    // Log the error with correlation ID for traceability
    this.logger.error(
      `[${correlationId}] Exception at ${request.url}:`,
      exception instanceof Error ? exception.stack : exception
    );

    response
      .status(status)
      .header("X-Correlation-ID", correlationId)
      .json(errorResponse);
  }

  private extractMessage(exceptionResponse: any): string | string[] {
    if (typeof exceptionResponse === "string") {
      return exceptionResponse;
    }
    if (typeof exceptionResponse === "object") {
      return exceptionResponse.message || "Unknown error";
    }
    return "Unknown error";
  }

  private extractError(exceptionResponse: any, status: number): string {
    if (typeof exceptionResponse === "object" && exceptionResponse.error) {
      return exceptionResponse.error;
    }
    return HttpStatus[status] || "Internal Server Error";
  }

  private extractDetails(exceptionResponse: any): any {
    if (typeof exceptionResponse === "object" && exceptionResponse.details) {
      return exceptionResponse.details;
    }
    return undefined;
  }
}
