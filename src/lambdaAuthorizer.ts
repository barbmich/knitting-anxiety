import {
  APIGatewayAuthorizerEvent,
  APIGatewayAuthorizerHandler,
  APIGatewayAuthorizerResult,
} from "aws-lambda";
import { adminAuth } from "../lib/initFirebaseAdmin";
export const handler: APIGatewayAuthorizerHandler = async (
  event: APIGatewayAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  return {
    principalId: "pog",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "allow",
          Resource: "test",
        },
      ],
    },
  };
  //   const { headers } = event;
  //   if (!headers.Authorization) {
  //     return {
  //       statusCode: 401,
  //       body: JSON.stringify({ message: "User unauthenticated." }),
  //     }
  //   }
  //   const user = await adminAuth.verifyIdToken(headers.Authorization);
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ user }),
  //   };
  // } catch (error) {
  // if (error instanceof Error) {
  //   return {
  //     statusCode: 403,
  //     body: JSON.stringify({ message: error.message }),
  //   };
  // }
  // return {
  //   statusCode: 500,
  //   body: JSON.stringify({ message: "There was an error" }),
  // };
  // }
};
