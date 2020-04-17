import log4js from "log4js";

log4js.configure({
  appenders: {out: {type: 'stdout', layout: {type: 'pattern', pattern: '[%c - %p] %m%n'}}},
  categories: {default: {appenders: ['out'], level: 'debug'}}
});
const logger = log4js.getLogger("Benchmarks");

logger.level = "debug";


export default logger;
