import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { isHttpError } from "http-errors";
import _ from "lodash";
import { serviceContainer } from "../../services/serviceContainer";

const logger = serviceContainer.cradle.loggerFactory.getLogger(__filename);

export const apiGateway = {
  create: (args: { statusCode: number; payload?: Record<string, any> }): APIGatewayProxyStructuredResultV2 => {
    const { statusCode, payload = {} } = args;

    let result: APIGatewayProxyStructuredResultV2 = {
      statusCode,
      headers: { "content-type": "application/json" },
    };

    if (!_.isEmpty(payload)) {
      result.body = JSON.stringify(payload);
    }

    return result;
  },
  createFromError: (error: unknown): APIGatewayProxyStructuredResultV2 => {
    let statusCode = 500;
    let payload = {
      message: "System error",
    };

    if (isHttpError(error)) {
      statusCode = error.statusCode;
      payload = {
        message: error.message,
      };
    }

    if (statusCode === 500) {
      logger.error("Uncaught system error: %O", error);
    }

    return {
      statusCode,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    };
  },
};
