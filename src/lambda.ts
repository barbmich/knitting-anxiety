import {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  Context,
} from "aws-lambda";
import { adminAuth } from "../lib/initFirebaseAdmin";

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2,
  context: Context
) => {
  try {
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        message: `Hello, World! Your request was received at ${event.requestContext.time}.`,
      }),
    };
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message }),
    };
  }
};
