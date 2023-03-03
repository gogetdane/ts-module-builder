import Builder from "./Builder.js";
import SomeModule from "./SomeModule.js";

const built = Builder.build(SomeModule);
console.log(built.doAThing())