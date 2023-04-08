import {TargetEnvironment} from "./targetEnvironment"

export interface StackConfig {
    readonly targetEnvironment: TargetEnvironment
}


const targetEnvironmentContextKey = "targetEnvironment";


export const getStackConfig = (tryGetContext: (key: string) => string): StackConfig => {
    const targetEnvironment = tryGetContext(targetEnvironmentContextKey);
    if (
        targetEnvironment != TargetEnvironment.Development &&
        targetEnvironment != TargetEnvironment.Staging &&
        targetEnvironment != TargetEnvironment.Production
    ) {
        throw new Error(`invalid target environment ${targetEnvironment}`);
    }

    return {
        targetEnvironment: targetEnvironment,
    };
};
