import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { z } from "zod";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { httpErrorMiddleware } from "./httpErrorMiddleware";
import {apiGateway} from "./apiGateway";
import {serviceContainer} from "../../services/serviceContainer";

const helloWorld: APIGatewayProxyHandlerV2<APIGatewayProxyStructuredResultV2> = async (event, context) => {

  // const user = await serviceContainer.cradle.userRepository.findUserById();
  // const message = `Welcome ${userName}`
  const responsePayload = responsePayloadSchema.parse({
    message:"",
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
