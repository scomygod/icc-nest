import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { ErrorResponse } from '../interfaces/error-response.interface';

type ExceptionResponseBody =
  | string
  | {
      message?: string | ValidationError[];
    };

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    let details: Record<string, string> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse =
        exception.getResponse() as ExceptionResponseBody;

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        if (Array.isArray(exceptionResponse.message)) {
          message = 'Datos de entrada inválidos';
          details = this.extractValidationErrors(exceptionResponse.message);
        } else if (typeof exceptionResponse.message === 'string') {
          message = exceptionResponse.message;
        } else {
          message = exception.message;
        }
      } else {
        message = exception.message;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Error interno del servidor';
    }

    const errorResponse: ErrorResponse = {
      timestamp: new Date().toISOString(),
      status,
      error: HttpStatus[status] ?? 'Internal Server Error',
      message,
      path: request.url,
      ...(details && { details }),
    };

    response.status(status).json(errorResponse);
  }

  private extractValidationErrors(
    errors: ValidationError[],
  ): Record<string, string> {
    const result: Record<string, string> = {};

    for (const error of errors) {
      if (error.constraints) {
        const firstConstraint = Object.values(error.constraints)[0];
        result[error.property] = firstConstraint;
      }

      if (error.children && error.children.length > 0) {
        const childErrors = this.extractValidationErrors(error.children);
        Object.assign(result, childErrors);
      }
    }

    return result;
  }
}
