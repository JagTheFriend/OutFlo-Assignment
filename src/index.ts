import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { campaignRoute } from "./routes/campaign.js";
import { personalizedMessage } from "./routes/personalized-message.js";

const app = new Hono();

app.route("/campaign", campaignRoute);
app.route("/personalized-message", personalizedMessage);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT ?? "3000"),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
