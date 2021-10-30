import {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  Context,
} from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2,
  context: Context
) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify({ message: "Hello from register.handler" }),
  };
};
