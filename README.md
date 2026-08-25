# DueDate

A customizable web countdown application for tracking important dates, events, and deadlines.

## Stack

- Tauri
- React
- localStorage
- GitHub Actions

## Layout

```
src/
  app/           # root React app
  components/    # UI pieces
  lib/           # countdown + localStorage
  styles/        # global CSS
src-tauri/       # desktop shell
```

## Setup

Needs:

- Node.js
- Rust (`rustup`)
- Visual Studio Build Tools (C++ workload) on Windows

```bash
npm install
```

## Run

Browser UI:

```bash
npm run dev
```

Desktop window:

```bash
npm run desktop
```

## Test

```bash
npm test
npm run lint
```

## License

For personal and educational use.