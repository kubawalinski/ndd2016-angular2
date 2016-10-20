/*eslint no-console: 0*/
// we allow console.error in this file as it is used to load angular, so $log is not available
import "core-js/modules/es6.function.name";

const registrator = angularApp => {
    const registerFunction = functionToRegister => {
        if (functionToRegister.angularType && functionToRegister.angularName) {
            if (functionToRegister.angularType === "directive" && functionToRegister.directiveFactory) {
                angularApp[functionToRegister.angularType](functionToRegister.angularName, functionToRegister.directiveFactory);
            } else {
                angularApp[functionToRegister.angularType](functionToRegister.angularName, functionToRegister);
            }
        } else {
            console.error("Registrator error, component lacking required properties.");
            if (!functionToRegister.angularName) {
                console.error("angularName property not specified for component:", functionToRegister.name);
            }
            if (!functionToRegister.angularType) {
                console.error("angularType property not specified for component:",
                              functionToRegister.angularName ? functionToRegister.angularName : functionToRegister.name);
            }
        }
    };

    return {
        register(...stuffToRegister) {
            stuffToRegister.forEach(thingToRegister => {
                if (typeof thingToRegister === "function") {
                    registerFunction(thingToRegister);
                } else { //it's a module with functions in properties
                    Object.keys(thingToRegister).forEach(prop => {
                        registerFunction(thingToRegister[prop]);
                    });
                }
            });
        }
    };
};

export default registrator;
