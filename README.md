# Fathom

Fathom is a bioluminescent deep-sea maze chase that runs entirely in the browser.
You guide a small glimmerfin through a dark trench, eat plankton to grow brighter,
and use sonar and ink to survive three hunters that read the maze in different
ways.

This is the Kindle dive: explored ground is remembered, but anything outside the
forager's circular vision window sinks back into black until you return to it.

## Install

```sh
npm ci
```

## Development

```sh
npm run dev
```

The dev server serves the game with hot reload. Open the URL Vite prints.

## Production Build

```sh
npm run build
```

The complete static site is emitted to `dist/`, with `dist/index.html` as the
entry point. The directory can be served from a static file server at the root or
under a sub-path.

## Controls

- Move: Arrow keys or WASD
- Sonar pulse: Space
- Ink cloud: Left or Right Shift
- Confirm menu item: Enter or Space
- Back / pause: Escape
- Pause: P
- Mute: M

## Checks

```sh
npm run typecheck
npm run lint
npm run format
npm test
```
