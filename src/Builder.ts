import find from "lodash/find.js";

// Declare dependency types here.
// This stops any IsBuildable trying to import something we don't have.
// Example:
// SomeModule has a dependency on find from lodash. The type is set in that module. If we try to import something that isn't
// defined here as typeof find we'll get an error in compilation.
type Dependencies = {
    find: typeof find,
    other: number
}

class Builder {

    // We'll create and store dependencies here.
    private _dependencies: Dependencies = {
        find,
        other: 1
    };

    // Enables Singleton pattern.
    private static _instance: Builder;

    // This is a generic type. So we're saying we will only return the matching
    // type from Dependencies when we check on the key. So, if you ask for 'find'
    // the type we return here is defined on line 9 (typeof find).
    get<K extends keyof Dependencies>(dependency: K): Dependencies[K] {
        if  (!this._dependencies[dependency]){
            throw new BuilderError(`Dependency ${dependency} not found`);
        }
        return this._dependencies[dependency];
    };

    // We expect an implementation of IsBuildable. This is a type we define in types/types.d.ts
    // We return the concrete implementation of the argument.
    build<Type extends IsBuildable>(module:Type): Type {
        return module.build(this);
    }

    static getInstance(): Builder {
        if (!Builder._instance) {
            Builder._instance = new Builder();
        }
        return Builder._instance;
    }
} 

export default Builder.getInstance();

export type {Builder}