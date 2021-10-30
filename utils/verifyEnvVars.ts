interface EnvVarsObjectI {
  [key: string]: string | undefined;
}

export const verifyEnvVars = (
  object: EnvVarsObjectI
): EnvVarsObjectI | Error => {
  try {
    for (const property in object) {
      if (object[property] === undefined) {
        throw new Error(
          `Value for ${property} Environment Variable is missing in the .env.local file`
        );
      }
    }
    return object;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
};
