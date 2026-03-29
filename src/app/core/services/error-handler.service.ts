import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiError, ApiErrorType } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handle(error: unknown): ApiError {
    if (error instanceof HttpErrorResponse) {
      return this.handleHttpError(error);
    }
    return {
      type: 'unknown',
      message: 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  private handleHttpError(error: HttpErrorResponse): ApiError {
    const statusMap: Record<number, ApiErrorType> = {
      404: 'not_found',
      403: 'forbidden',
      401: 'forbidden',
      429: 'rate_limit',
    };

    const type: ApiErrorType = statusMap[error.status] ?? 'unknown';

    const messages: Record<ApiErrorType, string> = {
      not_found: 'Dieser GitHub-User wurde nicht gefunden.',
      forbidden: 'Zugriff verweigert. Bitte Token prüfen.',
      rate_limit: 'API Rate Limit erreicht. Bitte kurz warten.',
      network: 'Keine Verbindung zur GitHub API.',
      unknown: `Unbekannter Fehler (${error.status}).`,
    };

    return {
      type,
      message: messages[type],
      statusCode: error.status,
    };
  }
}
