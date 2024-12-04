import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { z } from "zod";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { httpErrorMiddleware } from "./httpErrorMiddleware";
import {apiGateway} from "./apiGateway";

const helloWorld: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = (event, context, callback) => {
  try {
    const responsePayload = responsePayloadSchema.parse({
      message: "Hello world!",
    });

    const response = apiGateway.create({
      statusCode: 200,
      payload: responsePayload,
    });

    callback(null, response);
  } catch (error) {
    callback(error as Error);
  }
};

export const responsePayloadSchema = z.object({
  message: z.string(),
});

export const handler = httpErrorMiddleware(helloWorld);
