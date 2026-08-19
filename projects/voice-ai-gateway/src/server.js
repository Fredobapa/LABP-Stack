import { createServer } from "node:http";
import { processVoiceEvent } from "./gateway.js";

export function buildServer() {
  return createServer((request, response) => {
    if (request.method === "GET" && request.url === "/health") {
      return sendJson(response, 200, { status: "ok" });
    }

    if (request.method === "POST" && request.url === "/v1/events") {
      return readJson(request)
        .then((body) => sendJson(response, 200, processVoiceEvent(body)))
        .catch((error) => sendJson(response, 400, { error: error.message }));
    }

    return sendJson(response, 404, { error: "Not found" });
  });
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) request.destroy();
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new TypeError("Request body must be valid JSON"));
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const port = Number(process.env.PORT ?? 3000);
  buildServer().listen(port, "127.0.0.1", () => {
    console.log(`Voice AI Gateway simulator listening on http://127.0.0.1:${port}`);
  });
}
