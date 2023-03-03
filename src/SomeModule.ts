
import type { Builder } from "./Builder.js";
import type find from "lodash/find.js";

// Defining our types here protects us from getting the wrong
// thing from the builder.
type Dependencies = {
    find: typeof find
}

class SomeModule implements IsBuildable {

    // We'll store our dependencies here.
    private _dependencies: Dependencies = {
        find: null
    }

    build(builder: Builder): this {
        // We define our dependencies for this module above and iterate here.
        // We call builder.get() to get the dependency and assign it to the
        // property on this._dependencies.
        Object.keys(this._dependencies).forEach((dependency: keyof Dependencies) => {
            this._dependencies[dependency] = builder.get(dependency);
        });
        return this;
    }

    // Demo
    doAThing() {
        return this._dependencies.find([{a: 1}, {a:2}], ['a', 2]);
    }
}
export default new SomeModule();