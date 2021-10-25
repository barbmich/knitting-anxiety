import * as sst from "@serverless-stack/resources";
import {
  HttpLambdaAuthorizer,
  HttpLambdaResponseType,
  HttpJwtAuthorizer,
} from "@aws-cdk/aws-apigatewayv2-authorizers";
import { ApiAuthorizationType } from "@serverless-stack/resources";

import { DotenvParseOutput } from "dotenv";

interface MyStackProps extends sst.AppProps {
  env_vars: DotenvParseOutput;
}

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: MyStackProps) {
    super(scope, id, props);
    const { env_vars } = props;

    // const lamdaAuthorizer = new sst.Function(this, "LambdaAuthorizer", {
    //   handler: "src/lambdaAuthorizer.handler",
    // });

    // const httpLambdaAuthorizer = new HttpLambdaAuthorizer({
    //   authorizerName: "LambdaAuthorizer",
    //   handler: lamdaAuthorizer,
    //   responseTypes: [HttpLambdaResponseType.SIMPLE],
    // });

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

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
