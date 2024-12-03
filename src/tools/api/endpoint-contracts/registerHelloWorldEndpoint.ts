import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { responsePayloadSchema } from "../../../handlers/api/helloWorld";

export const registerHelloWorldEndpoint = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/hello",
    tags: ["API"],
    operationId: "HelloWorld",
    description: "Hello world",
    security: [],
    responses: {
      200: {
        description: "Hello",
        content: {
          "application/json": {
            schema: responsePayloadSchema,
          },
        },
      },
    },
  });
};
