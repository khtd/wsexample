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
    "wilton/Channel",
    "wilton/Logger",
    "wilton/wiltoncall",
    "./conf",
    "moment"
], function(module, Channel, Logger, wiltoncall, conf, moment) {
    "use strict";
    
    var logger = new Logger(module.id);
    var chan = Channel.lookup("receiveChannel");

    return {
        GET: function(req) {
            logger.info("Receiving request ...");
            var json = wiltoncall("request_send_later", {
                requestHandle: req.handle
            });
            var obj = JSON.parse(json);
            logger.info("Enqueing request ...");
            var ttl
            switch (conf.type) {
                case "now":
                    ttl = 60000/15;
                    break;
                case "future":
                    ttl = 60000/150;
                    break;
            };
            chan.send({
                writerHandle: obj.responseWriterHandle,
                ttl: ttl,
                time: moment().valueOf()
            });
            logger.info("Request enqueued");
        }
    };
});
