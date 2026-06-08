import { Injectable, isDevMode, inject } from '@angular/core';
import { NotificationService } from './notification.service';

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  OFF = 4,
}

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  // Only log everything in development mode. Tighten up in production.
  private minLevel: LogLevel = isDevMode() ? LogLevel.DEBUG : LogLevel.WARN;
  private notification = inject(NotificationService);

  debug(msg: string, ...optionalParams: any[]) {
    this.writeLog(LogLevel.DEBUG, msg, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeLog(LogLevel.INFO, msg, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeLog(LogLevel.WARN, msg, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeLog(LogLevel.ERROR, msg, optionalParams);
  }

  private writeLog(level: LogLevel, msg: string, params: any[]) {
    if (level < this.minLevel) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${LogLevel[level]}] -`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(prefix, msg, ...params);
        break;
      case LogLevel.INFO:
        console.info(prefix, msg, ...params);
        break;
      case LogLevel.WARN:
        console.warn(prefix, msg, ...params);
        break;
      case LogLevel.ERROR:
        console.error(prefix, msg, ...params);
        if (isDevMode()) this.notification.show(msg);
        break;
    }
  }
}
