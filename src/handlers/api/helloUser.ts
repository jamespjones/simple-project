import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { z } from "zod";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { httpErrorMiddleware } from "./httpErrorMiddleware";
import {apiGateway} from "./apiGateway";
import {serviceContainer} from "../../services/serviceContainer";
import {ObjectId} from "mongodb";
import {BadRequest} from "http-errors";

const helloWorld: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = async (event, context) => {
  let pathParameters: z.infer<typeof requestPathParamsSchema>;

  try {
    pathParameters = requestPathParamsSchema.parse(event.pathParameters);
  } catch (e) {
    throw new BadRequest(e.message || "Invalid parameter");
  }

  const user = await serviceContainer.cradle.userRepository.findUserById(pathParameters.user_id);
  const message = `Welcome ${user?.name || "unknown"}!`
  const responsePayload = responsePayloadSchema.parse({
    message,
  });

  return apiGateway.create({
    statusCode: 200,
    payload: responsePayload,
  });
};

export const requestPathParamsSchema = z.object({
  user_id: z.string().refine((idStr) => ObjectId.isValid(idStr), "Invalid User Id")
});


export const responsePayloadSchema = z.object({
  message: z.string(),
});

export const handler = httpErrorMiddleware(helloWorld);
