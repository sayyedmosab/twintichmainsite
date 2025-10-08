# TwinScience Content Upload Guide

## Directory Structure

Upload your content files using this exact directory structure:

```
public/content/
├── en/                          # English content
│   ├── chapter1/
│   │   ├── episode1/
│   │   │   ├── article/         # Wiki-style articles
│   │   │   │   ├── content.md   # Main article content
│   │   │   │   ├── meta.json    # Title, description, contributors
│   │   │   │   └── history.json # Edit history
│   │   │   ├── podcast/         # Audio content
│   │   │   │   ├── audio.mp3    # Main audio file
│   │   │   │   ├── transcript.md # Audio transcript
│   │   │   │   ├── notes.md     # Episode notes
│   │   │   │   └── meta.json    # Title, description, duration
│   │   │   ├── video/           # Video content
│   │   │   │   ├── video.mp4    # Main video file
│   │   │   │   ├── transcript.md # Video transcript
│   │   │   │   ├── materials.md # Related materials
│   │   │   │   └── meta.json    # Title, description, duration
│   │   │   └── study-guide/     # Interactive study materials
│   │   │       ├── questions.json # Quiz questions
│   │   │       ├── answers.json   # Correct answers
│   │   │       └── meta.json      # Title, description, difficulty
│   │   └── episode2/
│   │       ├── article/
│   │       ├── podcast/
│   │       ├── video/
│   │       └── study-guide/
│   ├── chapter2/
│   └── chapter3/
└── ar/                          # Arabic content (same structure)
    ├── chapter1/
    ├── chapter2/
    └── chapter3/
```

## File Format Examples

### meta.json (for all content types)
```json
{
  "title": "Introduction to Quantum Physics",
  "description": "Learn the basics of quantum mechanics and wave-particle duality",
  "lastUpdated": "2025-01-15",
  "difficulty": "beginner",
  "estimatedTime": "15 minutes"
}
```

### questions.json (for study-guide)
```json
{
  "questions": [
    {
      "id": 1,
      "type": "multiple-choice",
      "question": "What is the speed of light?",
      "options": ["3×10⁸ m/s", "2×10⁸ m/s", "4×10⁸ m/s", "5×10⁸ m/s"],
      "correct": 0,
      "explanation": "The speed of light in vacuum is approximately 3×10⁸ meters per second."
    }
  ]
}
```

## Content Types

1. **Article** - Wiki-style collaborative articles with editing capabilities
2. **Podcast** - Audio discussions with transcripts and notes
3. **Video** - Video presentations with transcripts and materials
4. **Study Guide** - Interactive quizzes and knowledge testing

## Upload Instructions

1. Create the directory structure as shown above
2. Place your content files in the appropriate folders
3. Ensure all meta.json files are properly formatted
4. Test your content by accessing the TwinScience page
5. Content will automatically load based on the file structure

## File Naming Conventions

- Use lowercase, hyphenated names: `quantum-mechanics.md`
- Audio files: `audio.mp3` or `audio.wav`
- Video files: `video.mp4` or `video.webm`
- Always include a `meta.json` file for each content item