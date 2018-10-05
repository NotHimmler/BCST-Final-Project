    "use strict";
    let merge = require("./merge.js");
    let EventBase = require("./event-base.js");

    class OptionBase extends EventBase {
        constructor() {
            super();
            this.option = null;
        }

        defaultOption() {
            return {};
        }
        setOption() {
            this.option = this.getOption.apply(this, arguments);
            return this;
        }
        getOption() {
            let option = this.option;
            // default option from class self
            let defOption = this.defaultOption();
            // merge option
            if (arguments.length && arguments[0]) {
                // new option form custom
                let newOption = arguments[0];
                // if append the option to current option
                if (arguments[1]) {
                    defOption = this.option;
                }
                option = merge(defOption, newOption);
            }
            return option || defOption;
        }
    }

    module.exports = OptionBase;