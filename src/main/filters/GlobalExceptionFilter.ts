import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { NotFoundError } from 'src/domain/errors/NotFoundError'
import { ValidationError } from 'src/domain/errors/ValidationError'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const { statusCode, body } = this.mapException(exception)

    response.status(statusCode).json(body)
  }

  private mapException(exception: unknown): {
    statusCode: number
    body: { code: string; body: unknown }
  } {
    if (exception instanceof ValidationError) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        body: {
          code: exception.code,
          body: exception.body,
        },
      }
    }

    if (exception instanceof NotFoundError) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        body: {
          code: exception.code,
          body: exception.body,
        },
      }
    }

    if (exception instanceof HttpException && exception.getStatus() < 500) {
      const statusCode = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      return {
        statusCode,
        body: {
          code: this.resolveHttpExceptionCode(statusCode),
          body:
            typeof exceptionResponse === 'string'
              ? { message: exceptionResponse }
              : exceptionResponse,
        },
      }
    }

    console.log(exception)
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        code: 'INTERNAL_SERVER_ERROR',
        body: {
          message: 'Internal server error',
        },
      },
    }
  }

  private resolveHttpExceptionCode(statusCode: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      500: 'INTERNAL_SERVER_ERROR',
    }

    return codes[statusCode] ?? 'HTTP_ERROR'
  }
}
