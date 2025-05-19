/**
 * @description
 * This file is used to register modules with side effects to guarantee that they are loaded
 * This executes module-level code that isn't imported or called somewhere else
 * example: IIFES (()=>{})()
 * example use-case: calling openApiBuilder.addSchema() as a top-level statement
 */

import "../features/health/docs.js";
import "../features/user/docs.js";
import "./env.js";
