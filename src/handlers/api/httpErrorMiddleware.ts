import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { apiGateway } from "./apiGateway";

export const httpErrorMiddleware = <T>(handler: APIGatewayProxyHandlerV2<T>): APIGatewayProxyHandlerV2<T> => {
  const wrappedHandler: APIGatewayProxyHandlerV2<T> = async (...args) => {
    try {
      return await handler.call(undefined, ...args);
    } catch (e) {
      const result = apiGateway.createFromError(e);
      return result;
    }
  };

  return wrappedHandler;
};
