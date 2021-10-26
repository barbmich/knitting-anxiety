import * as sst from "@serverless-stack/resources";
import { HttpJwtAuthorizer } from "@aws-cdk/aws-apigatewayv2-authorizers";
import { ApiAuthorizationType } from "@serverless-stack/resources";

import { DotenvParseOutput } from "dotenv";

interface MyStackProps extends sst.AppProps {
  env_vars: DotenvParseOutput;
}

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: MyStackProps) {
    super(scope, id, props);
    const { env_vars } = props;

    const authAuthorizer = new HttpJwtAuthorizer({
      jwtIssuer: `${env_vars.FIREBASE_ADMIN_ISSUER}/${env_vars.FIREBASE_ADMIN_PROJECT_ID}`,
      jwtAudience: [`${env_vars.FIREBASE_ADMIN_PROJECT_ID}`],
    });

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultAuthorizationType: ApiAuthorizationType.JWT,
      defaultAuthorizer: authAuthorizer,
      routes: {
        "GET /": "src/lambda.handler",
      },
    });

    const site = new sst.NextjsSite(this, "Site", {
      path: "frontend",
      environment: {
        REGION: scope.region,
        ...env_vars,
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
      siteUrl: site.url,
    });
  }
}
