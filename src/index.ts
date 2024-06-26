import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import posts from "./blogs/blogs";

const app = new Hono();
app.route("/posts", posts);

// app.use("*", prettyJSON());

export default app;
