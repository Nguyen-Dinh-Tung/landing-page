import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
const GM7_DEFAULT_TIME_ZONE = 'Asia/Ho_Chi_Minh';
import * as moment from 'moment-timezone';

export const transportsCommon = {
  formatDate: moment().tz(GM7_DEFAULT_TIME_ZONE).format('DD-MM-YYYY hh:mm:ss'),
};
export const logFormatConsole = winston.format.combine(
  winston.format.label({
    label: process.env.APP_NAME || 'APP_NAME',
  }),
  winston.format.timestamp({
    format: transportsCommon.formatDate,
  }),
  winston.format.errors({ stack: true }),
  winston.format.json({
    space: 2,
  }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    if (info?.isApiLog) {
      return `[${info.message}] ${info.originalUrl} | ${info.statusCode} | ${info.timestamp} | ${info.ip} - ${info.statusMessage}`;
    }
    return `[${info.level}] - ${info.timestamp} | ${JSON.stringify(info)}`;
  }),
);

export const transportDailyFileInfoConfig = new DailyRotateFile({
  level: 'info',
  filename: `logs/%DATE%/combined.log`,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
});
export const transportDailyFileFUllApiConfig = new DailyRotateFile({
  level: 'request',
  filename: `logs/%DATE%/full-api.log`,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
});
export const transportDailyFileErrorConfig = new DailyRotateFile({
  level: 'error',
  filename: `logs/%DATE%/error.log`,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
});
export const transportDailyFileDebugConfig = new DailyRotateFile({
  level: 'debug',
  filename: `logs/%DATE%/debug.log`,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
});
export const transportDailyFileWarnConfig = new DailyRotateFile({
  level: 'warn',
  filename: `logs/%DATE%/warn.log`,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
});
export const transportHttpConfig = new winston.transports.Http({
  level: 'http',
  host: 'locahost',
  port: 4000,
  silent: true,
  path: 'app-log',
});
export const transportMaxSize = new winston.transports.File({
  silent: false,
  filename: 'logs/logs_size/logs.log',
});
export const transportConsoleConfig = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.cli(),
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    }),
  ),
});
