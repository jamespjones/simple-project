import { APIGatewayProxyResultV2 } from "aws-lambda";
import { NotFound } from "http-errors";
import { apiGateway } from "./apiGateway";

describe("create", () => {
  it("should return an APIGatewayProxyResultV2 with the correct statusCode, headers, and body", () => {
    const args = {
      statusCode: 200,
      payload: { message: "Hello World" },
    };
    const expected: APIGatewayProxyResultV2 = {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(args.payload),
    };
    const result = apiGateway.create(args);
    expect(result).toEqual(expected);
  });

  it("should handle a payload that is an empty object", () => {
    const args = {
      statusCode: 200,
      payload: {},
    };
    const expected: APIGatewayProxyResultV2 = {
      statusCode: 200,
      headers: { "content-type": "application/json" },
    };
    const result = apiGateway.create(args);
    expect(result).toEqual(expected);
  });

  it("should return an APIGatewayProxyResultV2 with a default payload when none is provided", () => {
    const args = {
      statusCode: 404,
    };
    const expected: APIGatewayProxyResultV2 = {
      statusCode: 404,
      headers: { "content-type": "application/json" },
    };
    const result = apiGateway.create(args);
    expect(result).toEqual(expected);
  });
});

describe("create from error", () => {
  it("should return a 500 status code and 'System error' message for generic error", () => {
    const error = new Error("Generic error");
    const result = apiGateway.createFromError(error);
    expect(result.statusCode).toBe(500);
    expect(result.headers).toEqual({ "content-type": "application/json" });
    expect(result.body).toEqual(JSON.stringify({ message: "System error" }));
  });

  it("should return the status code and message from HttpError", () => {
    const error = new NotFound();
    const result = apiGateway.createFromError(error);
    expect(result.statusCode).toBe(404);
    expect(result.headers).toEqual({ "content-type": "application/json" });
    expect(result.body).toEqual(JSON.stringify({ message: "Not Found" }));
  });

  it("should return a 500 status code and 'System error' message if HttpError does not have a status code", () => {
    const error = new Error("Custom message");
    const result = apiGateway.createFromError(error);
    expect(result.statusCode).toBe(500);
    expect(result.headers).toEqual({ "content-type": "application/json" });
    expect(result.body).toEqual(JSON.stringify({ message: "System error" }));
  });

  it("should return a 500 status code and 'System error' message if error is null", () => {
    const error = null;
    const result = apiGateway.createFromError(error);
    expect(result.statusCode).toBe(500);
    expect(result.headers).toEqual({ "content-type": "application/json" });
    expect(result.body).toEqual(JSON.stringify({ message: "System error" }));
  });

  it("should return a 500 status code and 'System error' message if error is undefined", () => {
    const error = undefined;
    const result = apiGateway.createFromError(error);
    expect(result.statusCode).toBe(500);
    expect(result.headers).toEqual({ "content-type": "application/json" });
    expect(result.body).toEqual(JSON.stringify({ message: "System error" }));
  });

  it("should return a 500 status code and 'System error' message if error is not an instance of Error or HttpError", () => {
    const error = "Invalid error";
    const result = apiGateway.createFromError(error);
    expect(result.statusCode).toBe(500);
    expect(result.headers).toEqual({ "content-type": "application/json" });
    expect(result.body).toEqual(JSON.stringify({ message: "System error" }));
  });
});
