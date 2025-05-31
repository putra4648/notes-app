import fastifyEnv from "@fastify/env";
import fastify from "fastify";
import { ENV } from "./src/types/env";

const server = fastify({});

server.register(fastifyEnv);

server.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

server
  .listen({
    port: server.getEnvs<ENV>().PORT,
  })
  .then(() => {
    console.log("Server running");
  });
