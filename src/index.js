import suites from "./suites";
import {logger, start} from "./helpers";


start(suites).then(() => logger.debug("All tests completed"));
