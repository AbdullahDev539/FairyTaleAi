// server.js (Mock Kit v1 — Runtime API Prop/Stub)
const express = require("express");
const multer = require("multer"); // to parse multipart/form-data
const upload = multer();
const app = express();

app.use(express.json());

// Utils: simulate elapsed-time story status
const storyStartTimes = {};
function getStoryStatus(storyId) {
  const start = storyStartTimes[storyId] || Date.now();
  const elapsed = (Date.now() - start) / 1000;

  if (elapsed < 2) {
    return { status: "initializing", progress_pct: 0 };
  } else if (elapsed < 5) {
    return { status: "buffering", progress_pct: 20 };
  } else if (elapsed < 30) {
    return { status: "streaming", progress_pct: 60 };
  } else {
    return {
      status: "complete",
      progress_pct: 100,
      ready_for_download: true,
      download_url: `https://cdn.lunebi.com/stories/mock/story_mock_001/final/story.m4a`,
    };
  }
}

// ------------------- Endpoints -------------------

// POST /runtime/voices/enroll
app.post("/runtime/voices/enroll", upload.single("audio"), (req, res) => {
  if (req.body.consent !== "true") {
    return res.status(400).json({ error: "consent_required" });
  }
  res.status(201).json({ voice_id: "voice_demo_alex_en" });
});

// DELETE /runtime/voices/{id}
app.delete("/runtime/voices/:id", (req, res) => {
  res.status(202).json({ ok: true });
});

// POST /runtime/stories/prepare
app.post("/runtime/stories/prepare", (req, res) => {
  const storyId = "story_mock_001";
  storyStartTimes[storyId] = Date.now();
  res.status(201).json({
    story_id: storyId,
    hls_url: `https://cdn.lunebi.com/stories/mock/${storyId}/playlist.m3u8`,
  });
});

// POST /runtime/stories/{story_id}
app.post("/runtime/stories/:story_id", (req, res) => {
  res.status(202).json({ ok: true });
});

// GET /runtime/stories/{story_id}/status
app.get("/runtime/stories/:story_id/status", (req, res) => {
  const storyId = req.params.story_id;
  const status = getStoryStatus(storyId);
  res.json({
    story_id: storyId,
    ...status,
  });
});

// ------------------- Run -------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Mock Runtime API running at http://localhost:${PORT}`)
);
