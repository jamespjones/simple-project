import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { z } from "zod";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { httpErrorMiddleware } from "./httpErrorMiddleware";
import {apiGateway} from "./apiGateway";

const helloWorld: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = async (event, context) => {

  const responsePayload = responsePayloadSchema.parse({
    message: "Hello world!",
  });

  return apiGateway.create({
    statusCode: 200,
    payload: responsePayload,
  });
};

export const responsePayloadSchema = z.object({
  message: z.string(),
});

export const handler = httpErrorMiddleware(helloWorld);
