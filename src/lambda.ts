import {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  Context,
} from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2,
  context: Context
) => {
  console.log(event.requestContext.authorizer?.jwt.claims);
  console.log(context);
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, World! Your request was received at ${event.requestContext.time}.`,
  };
};
