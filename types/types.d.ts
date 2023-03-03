import type { Builder } from "../src/Builder.js";

declare global {
    interface IsBuildable {
        build(builder: Builder): this;
    }
    class BuilderError extends Error {}
}