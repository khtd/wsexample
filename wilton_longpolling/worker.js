/*
 * Copyright 2018, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "module",
    "lodash/filter",
    "lodash/forEach",
    "lodash/isNil",
    "lodash/isNumber",
    "moment",
    "wilton/Channel",
    "wilton/Logger",
    "wilton/wiltoncall"
], function(module, filter, forEach, isNil, isNumber, moment, Channel, Logger, wiltoncall) {
    "use strict";

    var logger = new Logger(module.id);
    // better data structure may be used
    var queue = [];
    var chan = Channel.lookup("receiveChannel");
    var data = {
        "data":[
          [
            "977124",
            "2018-04-18 13:02:52",
            "before",
            "695208",
            "Калышенко Григорий Петрович",
            "20-12-1954",
            "X5 АГРО-Авто ",
            "147",
            "106",
            "83",
            "0.0",
            "False",
            "None",
            "34498",
            "АгроАвто х5 СПБ Адамант2",
            "",
            "Да",
            "-1",
            "1524056428",
            "1524056571"
          ]                    
        ]
      }
    return {
        run: function() {
            logger.info("Starting worker ...");
            logger.info("Worker started");
            var start = moment().valueOf();
            logger.info(start)
            for (;;) {
                var delta = moment().valueOf() - start;
                var timeout = delta < 1000 ? delta : 1000;
                /*
                if (1000 === timeout) {
                    queue = filter(queue, function(el) {
                        if (moment().valueOf() - el.time >= el.ttl) {
                            logger.info("Sending response ...");
                            wiltoncall("request_send_with_response_writer", {
                                responseWriterHandle: el.writerHandle,
                                data: JSON.stringify(data)
                            });
                            logger.info("Response sent");
                            return false;
                        }
                        return true;
                    });
                }
                */
                var msg = chan.receive(timeout);
                if (!isNil(msg)) {
                    if (!isNil(msg.poisoned)) {
                        logger.info("Stopping worker ...");
                        forEach(queue, function(el) {
                            wiltoncall("request_send_with_response_writer", {
                                responseWriterHandle: el.writerHandle,
                                data: "Server shutdown!"
                            });
                        });
                        break;
                    }
                    if (!isNumber(msg.ttl) || !isNumber(msg.writerHandle)) {
                        logger.error("Invalid message received: [" + JSON.stringify(msg, null, 4) + "]");
                    }
                    logger.info("Message received");
                    queue.push(msg);
                }
                queue = filter(queue, function(el) {
                    if (moment().valueOf() - el.time >= el.ttl) {
                        logger.info("Sending response ...");
                        wiltoncall("request_send_with_response_writer", {
                            responseWriterHandle: el.writerHandle,
                            data: JSON.stringify(data)
                        });
                        logger.info("Response sent");
                        return false;
                    }
                    return true;
                });
            }
            logger.info("Worker stopped");
        }
    };
});
