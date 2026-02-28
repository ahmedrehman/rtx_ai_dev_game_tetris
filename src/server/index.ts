import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3131;

// Serve static files from the built client
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

// API routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", game: "Tetris" });
});

// V2 Modern route
app.get("/modern", (_req, res) => {
  res.sendFile(path.join(clientPath, "modern", "index.html"));
});
app.get("/modern/*", (_req, res) => {
  res.sendFile(path.join(clientPath, "modern", "index.html"));
});

// SPA fallback (V1)
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Tetris server running on http://localhost:${PORT}`);
});
