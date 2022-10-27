import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: Error | HttpException | AxiosError, host: ArgumentsHost) {
    const startTimestamp = Date.now();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const statusCode = this.computeStatusCode(exception);
    const message = this.computeMessage(exception);

    const res = ctx.getResponse<Response>();
    this.logger.error(
      `[${request.path} ${
        Date.now() - startTimestamp
      }ms] ${statusCode}: ${JSON.stringify(message)}`,
    );
    res.status(statusCode).json({
      statusCode,
      message,
    });
  }

  private computeStatusCode(
    exception: Error | HttpException | AxiosError,
  ): number {
    if (exception instanceof HttpException) return exception.getStatus();
    if (exception.name === AxiosError.name)
      return (exception as AxiosError)?.response?.status;
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private computeMessage(exception: Error | HttpException | AxiosError) {
    if (exception.name === AxiosError.name)
      return (exception as AxiosError)?.response?.data;
    return exception.message || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
