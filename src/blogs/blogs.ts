import { Hono } from "hono";

const app = new Hono();

let blogPosts = [
  {
    id: 1,
    title: "Blog1",
    content: "Blog1 content",
  },
  {
    id: 2,
    title: "Blog2",
    content: "Blog2 content",
  },
  {
    id: 3,
    title: "Blog3",
    content: "Blog3 content",
  },
];

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/", (c) => c.json({ posts: blogPosts }));

app.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const post = blogPosts.find((p) => p.id === id);

  if (post) {
    return c.json(post);
  } else {
    return c.json({ message: "not found this page" }, 404);
  }
});

app.post("/", async (c) => {
  const { title, content } = await c.req.json<{
    title: string;
    content: string;
  }>();
  const newPost = { id: Number(blogPosts.length + 1), title, content };
  blogPosts = [...blogPosts, newPost];
  return c.json(newPost, 201);
});

app.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const postIndex = blogPosts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return c.json({ message: "not found this page" }, 404);
  }

  const { title, content } = await c.req.json<{
    title: string;
    content: string;
  }>();
  blogPosts[postIndex] = { ...blogPosts[postIndex], title, content };

  return c.json(blogPosts[postIndex]);
});

app.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const postIndex = blogPosts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return c.json({ message: "not found this page" }, 404);
  }

  blogPosts = blogPosts.filter((p) => p.id !== id);

  return c.json({ message: "Blog Post deleted" });
});

export default app;