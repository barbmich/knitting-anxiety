import MyStack from "./MyStack";
import * as sst from "@serverless-stack/resources";
import { config } from "dotenv";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  try {
    const { parsed } = config({ path: ".env.local" });
    if (!parsed || !Object.keys(parsed).length) {
      throw new Error("No Environment Variables available");
    }

    for (const key in parsed) {
      if (!parsed[key]) {
        throw new Error(
          `Value for ${key} Environment Variable is missing in the .env.local file`
        );
      }
    }

    new MyStack(app, "my-stack", { env_vars: parsed });

    // Add more stacks
  } catch (error) {
    console.error(error);
  }
}
