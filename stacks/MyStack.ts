import * as sst from "@serverless-stack/resources";
import { HttpJwtAuthorizer } from "@aws-cdk/aws-apigatewayv2-authorizers";
import { ApiAuthorizationType } from "@serverless-stack/resources";
import { ENVIRONMENT_VARIABLES } from "../config/environmentVariables";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const authAuthorizer = new HttpJwtAuthorizer({
      jwtIssuer: `${ENVIRONMENT_VARIABLES.FIREBASE_ADMIN_ISSUER}/${ENVIRONMENT_VARIABLES.FIREBASE_ADMIN_PROJECT_ID}`,
      jwtAudience: [`${ENVIRONMENT_VARIABLES.FIREBASE_ADMIN_PROJECT_ID}`],
    });

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultAuthorizationType: ApiAuthorizationType.JWT,
      defaultAuthorizer: authAuthorizer,
      defaultFunctionProps: {
        environment: {
          ...ENVIRONMENT_VARIABLES,
        },
      },
      routes: {
        "GET /": "src/lambda.handler",
        "GET /register": {
          authorizationType: ApiAuthorizationType.NONE,
          function: {
            handler: "src/register.handler",
          },
        },
      },
    });

    const site = new sst.NextjsSite(this, "Site", {
      path: "frontend",
      environment: {
        REGION: scope.region,
        ...ENVIRONMENT_VARIABLES,
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
      siteUrl: site.url,
    });
  }
}
