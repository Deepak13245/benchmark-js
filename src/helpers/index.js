import logger from "./logger";
import Benchmark from "benchmark";

async function run(suite) {
  return new Promise((resolve) => {
    logger.debug("Running suite", suite.name);
    const array = {complete: [], cycle: []};
    suite
      .on('complete', () => {
        array.complete.push(`Fastest is  ${suite.filter('fastest').map((data) => data.name).join(",")}`);
        resolve(array);
      })
      .on('cycle', (event) => {
        array.complete.push(String(event.target));
      })
      .run({async: false});
  });
}

async function start(suites) {
  logger.debug("Running on", Benchmark.platform.toString());
  logger.debug("*********************************************");
  const keys = Object.keys(suites);
  const result = {};
  for (let key of keys) {
    logger.debug(".........................................");
    logger.debug("Running suites for", key);
    result[key] = {};
    for (let suite of suites[key]) {
      result[key][suite.name] = await run(suite);
    }
    logger.debug(".........................................");
  }
  logger.debug("*********************************************");
  prepareReport(result);
}

function prepareReport(obj) {
  const tests = Object.keys(obj);
  tests.forEach((test) => {
    const suites = Object.keys(obj[test]);
    logger.info("========================SUITE START==============================");
    logger.debug("Suite For:", test);
    suites.forEach((suite) => {
      logger.info("====================================================================");
      logger.debug("Suite :", suite);
      const {complete, cycle} = obj[test][suite];
      cycle.forEach((c) => {
        logger.info(c);
      });
      complete.forEach((c) => {
        logger.info(c);
      });
      logger.info("====================================================================");
    });
    logger.info("=========================SUITE END=================================");
  });
}

export {logger, start, run};
