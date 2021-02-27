import { connectDatabase } from "./database/index";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/index";

const PORT = 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  server.applyMiddleware({ app, path: "/api" });

  app.listen(PORT);

  console.log(`App is Running on http://localohost:${PORT}`);
};

mount(express());
