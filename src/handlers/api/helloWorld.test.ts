import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { handler } from "./helloWorld";

describe("helloWorld handler", () => {
  const mockEvent = {} as APIGatewayProxyEventV2;
  const mockContext = {} as Context;

  it("should return a 200 status code with 'Hello world!' message", (done) => {
    handler(mockEvent, mockContext, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      const response = result as APIGatewayProxyStructuredResultV2;
      expect(response.statusCode).toBe(200);
      expect(response.headers).toEqual({ "content-type": "application/json" });
      expect(JSON.parse(response.body!)).toEqual({ message: "Hello world!" });
      done();
    });
  });

  it("should return a response that matches the responsePayloadSchema", (done) => {
    handler(mockEvent, mockContext, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      const response = result as APIGatewayProxyStructuredResultV2;
      const body = JSON.parse(response.body!);
      expect(typeof body.message).toBe("string");
      expect(body).toHaveProperty("message");
      done();
    });
  });
});