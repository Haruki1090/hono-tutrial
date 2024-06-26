import { Hono } from "hono";
import posts from "./blogs/blogs";

const app = new Hono();
app.route("/posts", posts);

export default app;
