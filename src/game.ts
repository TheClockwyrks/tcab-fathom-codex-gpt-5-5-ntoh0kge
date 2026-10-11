import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import {
  ACTIONS,
  ALERT_TIME,
  BINDINGS,
  BRIGHT_HALFLIFE,
  BRIGHT_HOLD,
  BRIGHT_PER_EAT,
  CUES,
  DEN_RELEASE_GAP,
  DIVE_LABEL,
  DRIFTER_INTERVAL,
  DRIFTER_MAX,
  DRIFTER_SPEED,
  FATHOM_DEBUG_VERSION,
  FLARE_BLOOM,
  FLARE_CHARGE,
  FLARE_INTERVAL,
  FLARE_RADIUS,
  FORAGER_SPEED,
  GAMEOVER_ITEMS,
  GLOAMFIN_CHASE_SPEED,
  GLOAMFIN_CORNER_SPEED,
  GLOAMFIN_GIVEUP,
  GLOAMFIN_HEAR,
  GLOAMFIN_PING_INTERVAL,
  GLOAMFIN_PING_MIN_GAP,
  GLOAMFIN_PING_RANGE,
  GLOAMFIN_RAMP_TIME,
  GLOAMFIN_SEARCH_DELAY,
  GRID_COLS,
  GRID_ORIGIN_X,
  GRID_ORIGIN_Y,
  GRID_ROWS,
  INK_COOLDOWN,
  INK_LIFE,
  INK_RADIUS,
  KINDLE_VISION_GAIN,
  KINDLE_VISION_MIN,
  LANTERN_RANGE_BASE,
  LANTERN_RANGE_GAIN,
  LINGER_TIME,
  PAUSE_ITEMS,
  PLANKTON_DOT,
  PREDATOR_SPEED,
  ROSTER_ADD_ORDER,
  ROSTER_CAP_DEPTH,
  SCORE_CLEAR,
  SCORE_DRIFTER,
  SCORE_PLANKTON,
  SONAR_COOLDOWN,
  SONAR_MARK_TIME,
  SONAR_RANGE_BASE,
  SONAR_RANGE_MIN,
  SONAR_WAVE_SPEED,
  STAGE_H,
  STAGE_W,
  START_LIVES,
  TAGLINE_TEXT,
  TILE,
  TICK_DT,
  TITLE_ITEMS,
  TITLE_TEXT,
  VISION_GAIN,
  VISION_MIN,
  type ActionName,
  type PredatorKind,
} from "./constants";

export const BACKGROUND = "#020811";

export type Direction = "up" | "down" | "left" | "right";
export type Screen =
  | "title"
  | "howto"
  | "countdown"
  | "playing"
  | "paused"
  | "cleared"
  | "gameover";
export type PredatorMode = "den" | "wander" | "chase" | "search";

export interface GridState {
  readonly cols: number;
  readonly rows: number;
  readonly tile: number;
  readonly originX: number;
  readonly originY: number;
}

export interface ForagerState {
  readonly x: number;
  readonly y: number;
  readonly tx: number;
  readonly ty: number;
  readonly dir: Direction;
  readonly moving: boolean;
}

export interface DrifterState {
  readonly x: number;
  readonly y: number;
  readonly tx: number;
  readonly ty: number;
  readonly dir: Direction;
  readonly lit: boolean;
  readonly mind: boolean;
  readonly travel: boolean;
}

export interface PredatorState {
  readonly kind: PredatorKind;
  readonly x: number;
  readonly y: number;
  readonly tx: number;
  readonly ty: number;
  readonly dir: Direction;
  readonly state: PredatorMode;
  readonly released: boolean;
  readonly mind: boolean;
  readonly travel: boolean;
  readonly speed: number;
  readonly alert: boolean;
  readonly lit: boolean;
  readonly detectRange: number | null;
  readonly hearingRange: number | null;
  readonly hearingLock: boolean | null;
  readonly flareCharging: boolean | null;
  readonly flaring: boolean | null;
  readonly flareRadius: number | null;
  readonly releaseAt: number;
  readonly fixTx: number | null;
  readonly fixTy: number | null;
  readonly linger: number;
  readonly alertTime: number;
  readonly markTime: number;
  readonly pingTimer: number;
  readonly pingGap: number;
  readonly chaseSpeed: number;
  readonly searchTime: number;
  readonly searchPinged: boolean;
  readonly flareTimer: number;
  readonly flareCharge: number;
  readonly flareBloom: number;
  readonly flareFade: number;
}

export interface PulseState {
  readonly source: "forager" | "gloamfin";
  readonly tint: "cyan" | "violet" | "orange";
  readonly ox: number;
  readonly oy: number;
  readonly front: number;
  readonly range: number;
  readonly reached: readonly string[];
  readonly caster: number | null;
  readonly caught: boolean;
}

export interface InkCloudState {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly remaining: number;
}

export interface SpriteAssets {
  readonly glimmerfin: readonly (ImageBitmap | null)[];
  readonly lanternjaw: readonly (ImageBitmap | null)[];
  readonly gloamfin: readonly (ImageBitmap | null)[];
  readonly flarefish: readonly (ImageBitmap | null)[];
  readonly drifter: readonly (ImageBitmap | null)[];
  readonly flareBloom: readonly (ImageBitmap | null)[];
  readonly trenchWalls: readonly (ImageBitmap | null)[];
}

export interface FathomState {
  readonly screen: Screen;
  readonly menuIndex: number | null;
  readonly titleIndex: number;
  readonly depth: number;
  readonly score: number;
  readonly lives: number;
  readonly muted: boolean;
  readonly planktonRemaining: number;
  readonly drifterIn: number;
  readonly brightness: number;
  readonly brightHold: number;
  readonly visionRadius: number;
  readonly windowRadius: number;
  readonly sonar: {
    readonly ready: boolean;
    readonly cooldown: number;
    readonly range: number;
  };
  readonly ink: { readonly ready: boolean; readonly cooldown: number };
  readonly grid: GridState;
  readonly tiles: readonly string[];
  readonly plankton: readonly string[];
  readonly visibility: readonly string[];
  readonly forager: ForagerState;
  readonly drifters: readonly DrifterState[];
  readonly predators: readonly PredatorState[];
  readonly pulses: readonly PulseState[];
  readonly inkClouds: readonly InkCloudState[];
  readonly simTime: number;
  readonly accumulator: number;
  readonly desiredDir: Direction | null;
  readonly startTx: number;
  readonly startTy: number;
  readonly releaseClock: number;
  readonly countdown: number;
  readonly clearedTimer: number;
  readonly rng: number;
  readonly pointerDownItem: number | null;
  readonly assets: SpriteAssets;
}

export interface FathomSnapshot {
  readonly version: 1;
  readonly screen: Screen;
  readonly menuIndex: number | null;
  readonly titleIndex: number;
  readonly depth: number;
  readonly score: number;
  readonly lives: number;
  readonly muted: boolean;
  readonly planktonRemaining: number;
  readonly drifterIn: number;
  readonly brightness: number;
  readonly brightHold: number;
  readonly visionRadius: number;
  readonly windowRadius: number;
  readonly sonar: {
    readonly ready: boolean;
    readonly cooldown: number;
    readonly range: number;
  };
  readonly ink: { readonly ready: boolean; readonly cooldown: number };
  readonly grid: GridState;
  readonly tiles: readonly string[];
  readonly plankton: readonly string[];
  readonly visibility: readonly string[];
  readonly forager: ForagerState;
  readonly drifters: readonly Omit<DrifterState, "dir">[];
  readonly predators: readonly Omit<
    PredatorState,
    | "releaseAt"
    | "fixTx"
    | "fixTy"
    | "linger"
    | "alertTime"
    | "markTime"
    | "pingTimer"
    | "pingGap"
    | "chaseSpeed"
    | "searchTime"
    | "searchPinged"
    | "flareTimer"
    | "flareCharge"
    | "flareBloom"
    | "flareFade"
  >[];
  readonly pulses: readonly Omit<PulseState, "reached" | "caster" | "caught">[];
  readonly inkClouds: readonly InkCloudState[];
  readonly simTime: number;
}

export interface Rect {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

export interface FathomDebugApi {
  readonly version: 1;
  reset(state: DeepReadonly<FathomState>): FathomState;
  snapshot(state: DeepReadonly<FathomState>): FathomSnapshot;
  reconcile(state: DeepReadonly<FathomState>): FathomState;
  setScreen(state: DeepReadonly<FathomState>, screen: Screen): FathomState;
  setMenuIndex(state: DeepReadonly<FathomState>, index: number): FathomState;
  setTitleIndex(state: DeepReadonly<FathomState>, index: number): FathomState;
  menuItemRect(state: DeepReadonly<FathomState>, index: number): Rect | null;
  setScore(state: DeepReadonly<FathomState>, points: number): FathomState;
  setLives(state: DeepReadonly<FathomState>, n: number): FathomState;
  setDepth(state: DeepReadonly<FathomState>, d: number): FathomState;
  setMaze(
    state: DeepReadonly<FathomState>,
    rows: readonly string[],
  ): FathomState;
  setPlankton(
    state: DeepReadonly<FathomState>,
    tx: number,
    ty: number,
    present: boolean,
  ): FathomState;
  clearPlankton(state: DeepReadonly<FathomState>): FathomState;
  clearFog(state: DeepReadonly<FathomState>): FathomState;
  setForagerTile(
    state: DeepReadonly<FathomState>,
    tx: number,
    ty: number,
  ): FathomState;
  setForagerDir(state: DeepReadonly<FathomState>, dir: Direction): FathomState;
  setBrightness(state: DeepReadonly<FathomState>, g: number): FathomState;
  setBrightHold(state: DeepReadonly<FathomState>, seconds: number): FathomState;
  clearPredators(state: DeepReadonly<FathomState>): FathomState;
  addPredator(
    state: DeepReadonly<FathomState>,
    kind: PredatorKind,
    tx: number,
    ty: number,
  ): FathomState;
  setPredatorTile(
    state: DeepReadonly<FathomState>,
    index: number,
    tx: number,
    ty: number,
  ): FathomState;
  setPredatorDir(
    state: DeepReadonly<FathomState>,
    index: number,
    dir: Direction,
  ): FathomState;
  setPredatorState(
    state: DeepReadonly<FathomState>,
    index: number,
    value: Exclude<PredatorMode, "search">,
  ): FathomState;
  setPredatorReleased(
    state: DeepReadonly<FathomState>,
    index: number,
    released: boolean,
  ): FathomState;
  setPredatorMind(
    state: DeepReadonly<FathomState>,
    index: number,
    enabled: boolean,
  ): FathomState;
  setPredatorTravel(
    state: DeepReadonly<FathomState>,
    index: number,
    enabled: boolean,
  ): FathomState;
  spawnDrifter(
    state: DeepReadonly<FathomState>,
    tx: number,
    ty: number,
  ): FathomState;
  clearDrifters(state: DeepReadonly<FathomState>): FathomState;
  setDrifterMind(
    state: DeepReadonly<FathomState>,
    index: number,
    enabled: boolean,
  ): FathomState;
  setDrifterTravel(
    state: DeepReadonly<FathomState>,
    index: number,
    enabled: boolean,
  ): FathomState;
  setDrifterIn(state: DeepReadonly<FathomState>, seconds: number): FathomState;
  setSonarCooldown(
    state: DeepReadonly<FathomState>,
    seconds: number,
  ): FathomState;
  setInkCooldown(
    state: DeepReadonly<FathomState>,
    seconds: number,
  ): FathomState;
}

const GRID: GridState = {
  cols: GRID_COLS,
  rows: GRID_ROWS,
  tile: TILE,
  originX: GRID_ORIGIN_X,
  originY: GRID_ORIGIN_Y,
};
const COUNTDOWN_TIME = 2;
const CLEARED_TIME = 2;
const MENU_W = 360;
const MENU_H = 58;
const MENU_GAP = 14;
const DIRS: readonly Direction[] = ["up", "right", "down", "left"];
const DELTA: Readonly<Record<Direction, readonly [number, number]>> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};
const OPPOSITE: Readonly<Record<Direction, Direction>> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};
const EMPTY_ASSETS: SpriteAssets = {
  glimmerfin: [],
  lanternjaw: [],
  gloamfin: [],
  flarefish: [],
  drifter: [],
  flareBloom: [],
  trenchWalls: [],
};

function centerOf(tx: number, ty: number): { x: number; y: number } {
  return {
    x: GRID_ORIGIN_X + tx * TILE + TILE / 2,
    y: GRID_ORIGIN_Y + ty * TILE + TILE / 2,
  };
}

function tileOf(x: number, y: number): { tx: number; ty: number } {
  return {
    tx: Math.max(
      0,
      Math.min(GRID_COLS - 1, Math.floor((x - GRID_ORIGIN_X) / TILE)),
    ),
    ty: Math.max(
      0,
      Math.min(GRID_ROWS - 1, Math.floor((y - GRID_ORIGIN_Y) / TILE)),
    ),
  };
}

function k(tx: number, ty: number): string {
  return `${tx},${ty}`;
}

function read(rows: readonly string[], tx: number, ty: number): string {
  return rows[ty]?.[tx] ?? "#";
}

function replace(
  rows: readonly string[],
  tx: number,
  ty: number,
  char: string,
): string[] {
  return rows.map((row, y) =>
    y === ty ? `${row.slice(0, tx)}${char}${row.slice(tx + 1)}` : row,
  );
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

function vRadius(g: number): number {
  return VISION_MIN + VISION_GAIN * g;
}

function wRadius(g: number): number {
  return KINDLE_VISION_MIN + KINDLE_VISION_GAIN * g;
}

function sRange(depth: number): number {
  return Math.max(SONAR_RANGE_MIN, SONAR_RANGE_BASE - (depth - 1));
}

function dRange(kind: PredatorKind, g: number): number | null {
  return kind === "gloamfin"
    ? null
    : LANTERN_RANGE_BASE + LANTERN_RANGE_GAIN * g;
}

function pSpeed(
  p: Pick<PredatorState, "kind" | "state" | "chaseSpeed">,
): number {
  if (p.state === "den") return PREDATOR_SPEED;
  if (p.kind === "lanternjaw")
    return p.state === "chase" ? PREDATOR_SPEED : DRIFTER_SPEED;
  if (p.kind === "gloamfin")
    return p.state === "chase" ? p.chaseSpeed : PREDATOR_SPEED;
  return PREDATOR_SPEED;
}

function makeMaze(): { rows: string[]; startTx: number; startTy: number } {
  const verticals = new Set([2, 6, 10, 14, 21, 25, 29, 33]);
  const rows = Array.from({ length: GRID_ROWS }, (_, ty) =>
    Array.from({ length: GRID_COLS }, (_, tx) => {
      if (ty === 0 || ty === GRID_ROWS - 1 || tx === 0 || tx === GRID_COLS - 1)
        return "#";
      return ty % 2 === 1 || verticals.has(tx) ? "." : "#";
    }).join(""),
  );
  for (let ty = 7; ty <= 9; ty += 1) {
    for (let tx = 16; tx <= 19; tx += 1)
      rows[ty] = replace(rows, tx, ty, "d")[ty] ?? rows[ty];
  }
  for (const [tx, ty] of [
    [15, 7],
    [20, 7],
    [15, 8],
    [20, 8],
    [15, 9],
    [20, 9],
    [16, 6],
    [18, 6],
    [19, 6],
    [16, 10],
    [17, 10],
    [18, 10],
    [19, 10],
  ]) {
    rows[ty] = replace(rows, tx, ty, "#")[ty] ?? rows[ty];
  }
  rows[6] = replace(rows, 17, 6, "g")[6] ?? rows[6];
  rows[5] = replace(rows, 17, 5, ".")[5] ?? rows[5];
  rows[15] =
    replace(replace(rows, 0, 15, "."), GRID_COLS - 1, 15, ".")[15] ?? rows[15];
  return { rows, startTx: 17, startTy: 15 };
}

function corridor(rows: readonly string[], tx: number, ty: number): boolean {
  return read(rows, tx, ty) === ".";
}

function predatorOpen(
  rows: readonly string[],
  tx: number,
  ty: number,
): boolean {
  return [".", "g", "d"].includes(read(rows, tx, ty));
}

function openFor(
  rows: readonly string[],
  tx: number,
  ty: number,
  predator: boolean,
): boolean {
  return predator ? predatorOpen(rows, tx, ty) : corridor(rows, tx, ty);
}

function neighbor(
  rows: readonly string[],
  tx: number,
  ty: number,
  dir: Direction,
): { tx: number; ty: number } {
  if (tx === 0 && dir === "left" && corridor(rows, GRID_COLS - 1, ty))
    return { tx: GRID_COLS - 1, ty };
  if (tx === GRID_COLS - 1 && dir === "right" && corridor(rows, 0, ty))
    return { tx: 0, ty };
  const [dx, dy] = DELTA[dir];
  return { tx: tx + dx, ty: ty + dy };
}

function openDirs(
  rows: readonly string[],
  tx: number,
  ty: number,
  predator: boolean,
): Direction[] {
  return DIRS.filter((dir) => {
    const n = neighbor(rows, tx, ty, dir);
    return openFor(rows, n.tx, n.ty, predator);
  });
}

function rand(seed: number): { seed: number; value: number } {
  const next = (seed * 1664525 + 1013904223) >>> 0;
  return { seed: next, value: next / 0x100000000 };
}

function pick<T>(
  items: readonly T[],
  seed: number,
): { seed: number; value: T } {
  const r = rand(seed);
  return {
    seed: r.seed,
    value: items[Math.floor(r.value * items.length)] ?? items[0],
  };
}

function count(rows: readonly string[], char: string): number {
  return rows.reduce(
    (sum, row) => sum + [...row].filter((c) => c === char).length,
    0,
  );
}

function planktonLayer(rows: readonly string[]): string[] {
  return rows.map((row) =>
    [...row].map((char) => (char === "." ? "*" : "-")).join(""),
  );
}

function blankFog(): string[] {
  return Array.from({ length: GRID_ROWS }, () => "u".repeat(GRID_COLS));
}

function roster(depth: number): PredatorKind[] {
  const out: PredatorKind[] = ["lanternjaw", "gloamfin", "flarefish"];
  if (depth >= ROSTER_CAP_DEPTH)
    return [
      "lanternjaw",
      "gloamfin",
      "flarefish",
      "gloamfin",
      "lanternjaw",
      "flarefish",
    ];
  for (let d = 2; d <= depth; d += 1) out.push(ROSTER_ADD_ORDER[d - 2]);
  return out;
}

function denSpot(index: number): { tx: number; ty: number } {
  const spots = [
    [16, 7],
    [17, 7],
    [18, 7],
    [19, 7],
    [16, 8],
    [17, 8],
    [18, 8],
    [19, 8],
    [16, 9],
    [17, 9],
    [18, 9],
    [19, 9],
  ];
  const [tx, ty] = spots[index % spots.length] ?? [17, 8];
  return { tx, ty };
}

function reconcilePredator(
  predator: PredatorState,
  brightness: number,
): PredatorState {
  return {
    ...predator,
    speed: pSpeed(predator),
    alert: predator.kind !== "lanternjaw" && predator.alertTime > 0,
    detectRange: dRange(predator.kind, brightness),
    hearingRange: predator.kind === "gloamfin" ? GLOAMFIN_HEAR : null,
    hearingLock:
      predator.kind === "gloamfin" ? Boolean(predator.hearingLock) : null,
    flareCharging:
      predator.kind === "flarefish" ? predator.flareCharge > 0 : null,
    flaring: predator.kind === "flarefish" ? predator.flareBloom > 0 : null,
    flareRadius:
      predator.kind === "flarefish" && predator.flareBloom > 0
        ? FLARE_RADIUS
        : predator.kind === "flarefish"
          ? 0
          : null,
  };
}

function makePredator(
  kind: PredatorKind,
  index: number,
  depth: number,
): PredatorState {
  const spot = denSpot(index);
  const c = centerOf(spot.tx, spot.ty);
  return reconcilePredator(
    {
      kind,
      ...c,
      tx: spot.tx,
      ty: spot.ty,
      dir: "up",
      state: "den",
      released: false,
      mind: true,
      travel: true,
      speed: PREDATOR_SPEED,
      alert: false,
      lit: false,
      detectRange: null,
      hearingRange: null,
      hearingLock: kind === "gloamfin" ? false : null,
      flareCharging: kind === "flarefish" ? false : null,
      flaring: kind === "flarefish" ? false : null,
      flareRadius: kind === "flarefish" ? 0 : null,
      releaseAt: index * DEN_RELEASE_GAP,
      fixTx: null,
      fixTy: null,
      linger: 0,
      alertTime: 0,
      markTime: 0,
      pingTimer: GLOAMFIN_PING_INTERVAL,
      pingGap: GLOAMFIN_PING_MIN_GAP,
      chaseSpeed: GLOAMFIN_CHASE_SPEED,
      searchTime: 0,
      searchPinged: false,
      flareTimer: FLARE_INTERVAL + depth * 0.23,
      flareCharge: 0,
      flareBloom: 0,
      flareFade: 0,
    },
    0,
  );
}

function makeRoster(depth: number): PredatorState[] {
  return roster(depth).map((kind, index) => makePredator(kind, index, depth));
}

function reconcile(state: DeepReadonly<FathomState>): FathomState {
  const brightness = clamp01(state.brightness);
  const ft = tileOf(state.forager.x, state.forager.y);
  return {
    ...state,
    brightness,
    visionRadius: vRadius(brightness),
    windowRadius: wRadius(brightness),
    planktonRemaining: count(state.plankton, "*"),
    sonar: {
      ready: state.sonar.cooldown <= 0,
      cooldown: Math.max(0, state.sonar.cooldown),
      range: sRange(state.depth),
    },
    ink: {
      ready: state.ink.cooldown <= 0,
      cooldown: Math.max(0, state.ink.cooldown),
    },
    forager: { ...state.forager, tx: ft.tx, ty: ft.ty },
    drifters: state.drifters.map((d) => ({ ...d, ...tileOf(d.x, d.y) })),
    predators: state.predators.map((p) =>
      reconcilePredator({ ...p, ...tileOf(p.x, p.y) }, brightness),
    ),
  };
}

function makeState(
  assets: SpriteAssets,
  overrides: Partial<FathomState> = {},
): FathomState {
  const maze = makeMaze();
  const plankton = planktonLayer(maze.rows);
  const c = centerOf(maze.startTx, maze.startTy);
  return reconcile({
    screen: "title",
    menuIndex: 0,
    titleIndex: 0,
    depth: 1,
    score: 0,
    lives: START_LIVES,
    muted: false,
    planktonRemaining: count(plankton, "*"),
    drifterIn: DRIFTER_INTERVAL,
    brightness: 0,
    brightHold: 0,
    visionRadius: VISION_MIN,
    windowRadius: KINDLE_VISION_MIN,
    sonar: { ready: true, cooldown: 0, range: SONAR_RANGE_BASE },
    ink: { ready: true, cooldown: 0 },
    grid: GRID,
    tiles: maze.rows,
    plankton,
    visibility: blankFog(),
    forager: {
      ...c,
      tx: maze.startTx,
      ty: maze.startTy,
      dir: "left",
      moving: false,
    },
    drifters: [],
    predators: makeRoster(1),
    pulses: [],
    inkClouds: [],
    simTime: 0,
    accumulator: 0,
    desiredDir: null,
    startTx: maze.startTx,
    startTy: maze.startTy,
    releaseClock: 0,
    countdown: COUNTDOWN_TIME,
    clearedTimer: CLEARED_TIME,
    rng: 0xf47a0b,
    pointerDownItem: null,
    assets,
    ...overrides,
  });
}

function startDive(state: DeepReadonly<FathomState>): FathomState {
  return makeState(state.assets, {
    screen: "countdown",
    menuIndex: null,
    titleIndex: state.titleIndex,
    muted: state.muted,
  });
}

function resetAttempt(state: FathomState, lives: number): FathomState {
  const c = centerOf(state.startTx, state.startTy);
  return reconcile({
    ...state,
    screen: "countdown",
    menuIndex: null,
    lives,
    brightness: 0,
    brightHold: 0,
    forager: {
      ...state.forager,
      ...c,
      tx: state.startTx,
      ty: state.startTy,
      moving: false,
    },
    predators: makeRoster(state.depth),
    drifters: [],
    pulses: [],
    inkClouds: [],
    sonar: { ready: true, cooldown: 0, range: sRange(state.depth) },
    ink: { ready: true, cooldown: 0 },
    drifterIn: DRIFTER_INTERVAL,
    releaseClock: 0,
    countdown: COUNTDOWN_TIME,
    desiredDir: null,
  });
}

function nextMaze(state: FathomState): FathomState {
  return makeState(state.assets, {
    screen: "countdown",
    menuIndex: null,
    titleIndex: state.titleIndex,
    muted: state.muted,
    score: state.score,
    lives: state.lives,
    depth: state.depth + 1,
    predators: makeRoster(state.depth + 1),
    sonar: { ready: true, cooldown: 0, range: sRange(state.depth + 1) },
  });
}

function dist(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function lineBlocked(
  rows: readonly string[],
  ax: number,
  ay: number,
  bx: number,
  by: number,
  targetRockOk: boolean,
): boolean {
  const steps = Math.max(
    1,
    Math.ceil(dist({ x: ax, y: ay }, { x: bx, y: by }) / 8),
  );
  const target = tileOf(bx, by);
  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps;
    const tile = tileOf(ax + (bx - ax) * t, ay + (by - ay) * t);
    if (
      read(rows, tile.tx, tile.ty) === "#" &&
      !(targetRockOk && tile.tx === target.tx && tile.ty === target.ty)
    )
      return true;
  }
  return false;
}

function inkBlocks(
  clouds: readonly InkCloudState[],
  ax: number,
  ay: number,
  bx: number,
  by: number,
): boolean {
  return clouds.some((cloud) => {
    if (dist(cloud, { x: ax, y: ay }) <= cloud.radius) return true;
    const vx = bx - ax;
    const vy = by - ay;
    const len = vx * vx + vy * vy;
    const t =
      len === 0
        ? 0
        : Math.max(
            0,
            Math.min(1, ((cloud.x - ax) * vx + (cloud.y - ay) * vy) / len),
          );
    return dist(cloud, { x: ax + vx * t, y: ay + vy * t }) <= cloud.radius;
  });
}

function pulseMap(
  rows: readonly string[],
  ox: number,
  oy: number,
  range: number,
): Map<string, number> {
  const queue = [{ tx: ox, ty: oy, d: 0 }];
  const seen = new Map([[k(ox, oy), 0]]);
  for (let i = 0; i < queue.length; i += 1) {
    const item = queue[i];
    if (!item || item.d >= range) continue;
    for (const dir of DIRS) {
      const n = neighbor(rows, item.tx, item.ty, dir);
      if (!predatorOpen(rows, n.tx, n.ty) || seen.has(k(n.tx, n.ty))) continue;
      seen.set(k(n.tx, n.ty), item.d + 1);
      queue.push({ tx: n.tx, ty: n.ty, d: item.d + 1 });
    }
  }
  return seen;
}

function atCenter(body: {
  x: number;
  y: number;
  tx: number;
  ty: number;
}): boolean {
  const c = centerOf(body.tx, body.ty);
  return Math.abs(body.x - c.x) < 0.4 && Math.abs(body.y - c.y) < 0.4;
}

function move<
  T extends { x: number; y: number; tx: number; ty: number; dir: Direction },
>(
  body: T,
  rows: readonly string[],
  desired: Direction | null,
  speed: number,
  dt: number,
  predator: boolean,
): T & { moving: boolean } {
  let { x, y, dir } = body;
  const { tx, ty } = body;
  const center = centerOf(tx, ty);
  if (desired && (atCenter(body) || desired === OPPOSITE[dir])) {
    const n = neighbor(rows, tx, ty, desired);
    if (openFor(rows, n.tx, n.ty, predator)) dir = desired;
  }
  const n = neighbor(rows, tx, ty, dir);
  if (!openFor(rows, n.tx, n.ty, predator))
    return { ...body, x: center.x, y: center.y, dir, moving: false };
  const [dx, dy] = DELTA[dir];
  x += dx * speed * dt;
  y += dy * speed * dt;
  const target = centerOf(n.tx, n.ty);
  const passed =
    (dx > 0 && x >= target.x) ||
    (dx < 0 && x <= target.x) ||
    (dy > 0 && y >= target.y) ||
    (dy < 0 && y <= target.y);
  if (passed) {
    x = target.x;
    y = target.y;
  }
  if (x < GRID_ORIGIN_X) x = GRID_ORIGIN_X + (GRID_COLS - 0.5) * TILE;
  if (x > GRID_ORIGIN_X + (GRID_COLS - 0.5) * TILE)
    x = GRID_ORIGIN_X + TILE / 2;
  const tile = tileOf(x, y);
  return { ...body, x, y, tx: tile.tx, ty: tile.ty, dir, moving: true };
}

function shortest(
  rows: readonly string[],
  fromTx: number,
  fromTy: number,
  toTx: number,
  toTy: number,
  predator: boolean,
): Direction | null {
  const queue: { tx: number; ty: number; first: Direction | null }[] = [
    { tx: fromTx, ty: fromTy, first: null },
  ];
  const seen = new Set([k(fromTx, fromTy)]);
  for (let i = 0; i < queue.length; i += 1) {
    const item = queue[i];
    if (!item) continue;
    for (const dir of DIRS) {
      const n = neighbor(rows, item.tx, item.ty, dir);
      const nk = k(n.tx, n.ty);
      if (!openFor(rows, n.tx, n.ty, predator) || seen.has(nk)) continue;
      const first = item.first ?? dir;
      if (n.tx === toTx && n.ty === toTy) return first;
      seen.add(nk);
      queue.push({ tx: n.tx, ty: n.ty, first });
    }
  }
  return null;
}

function wander(
  rows: readonly string[],
  body: { tx: number; ty: number; dir: Direction },
  predator: boolean,
  seed: number,
): { dir: Direction; seed: number } {
  let dirs = openDirs(rows, body.tx, body.ty, predator).filter(
    (dir) => dir !== OPPOSITE[body.dir],
  );
  if (dirs.length === 0) dirs = openDirs(rows, body.tx, body.ty, predator);
  if (dirs.length === 0) return { dir: body.dir, seed };
  const choice = pick(dirs, seed);
  return { dir: choice.value, seed: choice.seed };
}

function acquire(
  p: PredatorState,
  tx: number,
  ty: number,
  alert: boolean,
): PredatorState {
  const fresh = p.state !== "chase";
  return reconcilePredator(
    {
      ...p,
      state: "chase",
      fixTx: tx,
      fixTy: ty,
      linger: LINGER_TIME,
      alertTime: alert && fresh ? ALERT_TIME : p.alertTime,
      chaseSpeed: p.kind === "gloamfin" ? GLOAMFIN_CHASE_SPEED : p.chaseSpeed,
      searchTime: 0,
      searchPinged: false,
      flareCharge: p.kind === "flarefish" ? 0 : p.flareCharge,
      flareBloom: p.kind === "flarefish" ? 0 : p.flareBloom,
    },
    0,
  );
}

function seesLight(
  state: DeepReadonly<FathomState>,
  p: PredatorState,
): boolean {
  const range = dRange(p.kind, state.brightness);
  if (range === null || dist(p, state.forager) > range) return false;
  if (inkBlocks(state.inkClouds, p.x, p.y, state.forager.x, state.forager.y))
    return false;
  return !lineBlocked(
    state.tiles,
    p.x,
    p.y,
    state.forager.x,
    state.forager.y,
    false,
  );
}

function lightTile(
  state: DeepReadonly<FathomState>,
  tx: number,
  ty: number,
): boolean {
  const c = centerOf(tx, ty);
  return (
    dist(c, state.forager) <= state.visionRadius &&
    !lineBlocked(state.tiles, state.forager.x, state.forager.y, c.x, c.y, true)
  );
}

function castPulse(
  state: FathomState,
  source: "forager" | "gloamfin",
  tint: "cyan" | "violet" | "orange",
  ox: number,
  oy: number,
  range: number,
  caster: number | null,
): FathomState {
  return {
    ...state,
    pulses: [
      ...state.pulses,
      {
        source,
        tint,
        ox,
        oy,
        front: 0,
        range,
        reached: [],
        caster,
        caught: false,
      },
    ],
  };
}

function updateVisibility(state: FathomState): FathomState {
  const lit = new Set<string>();
  for (let ty = 0; ty < GRID_ROWS; ty += 1) {
    for (let tx = 0; tx < GRID_COLS; tx += 1) {
      if (lightTile(state, tx, ty)) lit.add(k(tx, ty));
    }
  }
  for (const flare of state.predators) {
    if (flare.kind !== "flarefish" || !flare.flaring) continue;
    for (let ty = 0; ty < GRID_ROWS; ty += 1) {
      for (let tx = 0; tx < GRID_COLS; tx += 1) {
        if (dist(centerOf(tx, ty), flare) <= FLARE_RADIUS) lit.add(k(tx, ty));
      }
    }
  }
  for (const pulse of state.pulses) {
    if (pulse.source === "forager")
      for (const tile of pulse.reached) lit.add(tile);
  }
  return {
    ...state,
    visibility: state.visibility.map((row, ty) =>
      [...row]
        .map((old, tx) => (lit.has(k(tx, ty)) ? "l" : old === "u" ? "u" : "r"))
        .join(""),
    ),
  };
}

function tickForager(state: FathomState): FathomState {
  const body = move(
    state.forager,
    state.tiles,
    state.desiredDir,
    FORAGER_SPEED,
    TICK_DT,
    false,
  );
  let next = reconcile({ ...state, forager: { ...body, moving: body.moving } });
  if (read(next.plankton, next.forager.tx, next.forager.ty) === "*") {
    const plankton = replace(
      next.plankton,
      next.forager.tx,
      next.forager.ty,
      "-",
    );
    const remaining = count(plankton, "*");
    next = reconcile({
      ...next,
      plankton,
      score: next.score + SCORE_PLANKTON + (remaining === 0 ? SCORE_CLEAR : 0),
      brightness: clamp01(next.brightness + BRIGHT_PER_EAT),
      brightHold: BRIGHT_HOLD,
      screen: remaining === 0 ? "cleared" : next.screen,
      clearedTimer: remaining === 0 ? CLEARED_TIME : next.clearedTimer,
    });
  }
  const eaten = next.drifters.filter(
    (d) => d.tx === next.forager.tx && d.ty === next.forager.ty,
  ).length;
  if (eaten > 0) {
    next = {
      ...next,
      drifters: next.drifters.filter(
        (d) => d.tx !== next.forager.tx || d.ty !== next.forager.ty,
      ),
      score: next.score + eaten * SCORE_DRIFTER,
    };
  }
  return next;
}

function findGate(rows: readonly string[]): { tx: number; ty: number } | null {
  for (let ty = 0; ty < GRID_ROWS; ty += 1) {
    const tx = rows[ty]?.indexOf("g") ?? -1;
    if (tx >= 0) return { tx, ty };
  }
  return null;
}

function tickDrifters(state: FathomState): FathomState {
  let rng = state.rng;
  let drifters = state.drifters.map((drifter) => {
    let dir = drifter.dir;
    if (drifter.mind && atCenter(drifter)) {
      const choice = wander(state.tiles, drifter, false, rng);
      dir = choice.dir;
      rng = choice.seed;
    }
    return drifter.travel
      ? {
          ...drifter,
          ...move(
            { ...drifter, dir },
            state.tiles,
            dir,
            DRIFTER_SPEED,
            TICK_DT,
            false,
          ),
        }
      : { ...drifter, dir };
  });
  let drifterIn = Math.max(0, state.drifterIn - TICK_DT);
  const gate = findGate(state.tiles);
  if (drifterIn <= 0) {
    if (gate && state.planktonRemaining > 0 && drifters.length < DRIFTER_MAX) {
      const c = centerOf(gate.tx, gate.ty);
      drifters = [
        ...drifters,
        {
          ...c,
          tx: gate.tx,
          ty: gate.ty,
          dir: "left",
          lit: false,
          mind: true,
          travel: true,
        },
      ];
    }
    drifterIn = DRIFTER_INTERVAL;
  }
  return { ...state, drifters, drifterIn, rng };
}

function tickPulses(state: FathomState): FathomState {
  let predators = state.predators;
  const pulses: PulseState[] = [];
  for (const pulse of state.pulses) {
    const front = pulse.front + SONAR_WAVE_SPEED * TICK_DT;
    const reached = new Set(pulse.reached);
    let caught = pulse.caught;
    for (const [tile, d] of pulseMap(
      state.tiles,
      pulse.ox,
      pulse.oy,
      pulse.range,
    )) {
      if (d > front || reached.has(tile)) continue;
      const [txRaw, tyRaw] = tile.split(",");
      const tx = Number(txRaw);
      const ty = Number(tyRaw);
      if (pulse.source === "forager") {
        reached.add(tile);
        for (const dir of DIRS) {
          const n = neighbor(state.tiles, tx, ty, dir);
          if (read(state.tiles, n.tx, n.ty) === "#") reached.add(k(n.tx, n.ty));
        }
        predators = predators.map((p) => {
          if (p.tx !== tx || p.ty !== ty) return p;
          if (p.kind === "gloamfin")
            return acquire(
              { ...p, markTime: SONAR_MARK_TIME },
              state.forager.tx,
              state.forager.ty,
              true,
            );
          if (p.kind === "flarefish")
            return { ...p, markTime: SONAR_MARK_TIME };
          return p;
        });
      } else if (
        !caught &&
        state.forager.tx === tx &&
        state.forager.ty === ty
      ) {
        caught = true;
        predators = predators.map((p, index) =>
          index === pulse.caster ? acquire(p, tx, ty, true) : p,
        );
      } else {
        reached.add(tile);
      }
    }
    if (front <= pulse.range + 0.4)
      pulses.push({ ...pulse, front, reached: [...reached], caught });
  }
  return { ...state, predators, pulses };
}

function tickPredators(state: FathomState): FathomState {
  let rng = state.rng;
  let next = state;
  const predators = state.predators.map((predator, index) => {
    let p = reconcilePredator(
      {
        ...predator,
        alertTime: Math.max(0, predator.alertTime - TICK_DT),
        markTime: Math.max(0, predator.markTime - TICK_DT),
        pingGap: Math.max(0, predator.pingGap - TICK_DT),
        flareFade: Math.max(0, predator.flareFade - TICK_DT),
      },
      state.brightness,
    );
    if (!p.released && state.releaseClock >= p.releaseAt)
      p = { ...p, released: true };
    if (p.state === "den") {
      const gate = findGate(state.tiles);
      if (!p.released || !gate || !p.travel) return p;
      const dir: Direction | null =
        p.tx === gate.tx && p.ty === gate.ty
          ? "up"
          : shortest(state.tiles, p.tx, p.ty, gate.tx, gate.ty, true);
      if (p.tx === gate.tx && p.ty === gate.ty)
        p = { ...p, state: "wander", dir: "up" };
      else if (dir)
        p = {
          ...p,
          ...move(
            { ...p, dir },
            state.tiles,
            dir,
            PREDATOR_SPEED,
            TICK_DT,
            true,
          ),
        };
      return reconcilePredator(p, state.brightness);
    }
    if (p.mind) {
      if (p.kind !== "gloamfin") {
        if (seesLight(state, p))
          p = acquire(
            p,
            state.forager.tx,
            state.forager.ty,
            p.kind === "flarefish",
          );
        else if (p.state === "chase") {
          const linger = Math.max(0, p.linger - TICK_DT);
          p =
            linger <= 0
              ? {
                  ...p,
                  state: "wander",
                  fixTx: null,
                  fixTy: null,
                  linger,
                  flareTimer: FLARE_INTERVAL,
                }
              : { ...p, linger };
        }
      } else {
        const hearing = dist(p, state.forager) <= GLOAMFIN_HEAR;
        p = hearing
          ? acquire(
              { ...p, hearingLock: true },
              state.forager.tx,
              state.forager.ty,
              true,
            )
          : { ...p, hearingLock: false };
        p = { ...p, pingTimer: Math.max(0, p.pingTimer - TICK_DT) };
        if (!p.hearingLock && p.pingTimer <= 0 && p.pingGap <= 0) {
          next = castPulse(
            next,
            "gloamfin",
            "violet",
            p.tx,
            p.ty,
            GLOAMFIN_PING_RANGE,
            index,
          );
          p = {
            ...p,
            pingTimer: GLOAMFIN_PING_INTERVAL,
            pingGap: GLOAMFIN_PING_MIN_GAP,
          };
        }
        if (p.state === "chase") {
          p = {
            ...p,
            chaseSpeed: Math.min(
              GLOAMFIN_CHASE_SPEED,
              p.chaseSpeed +
                ((GLOAMFIN_CHASE_SPEED - GLOAMFIN_CORNER_SPEED) /
                  GLOAMFIN_RAMP_TIME) *
                  TICK_DT,
            ),
          };
          if (p.fixTx === p.tx && p.fixTy === p.ty && !p.hearingLock)
            p = { ...p, state: "search", searchTime: 0, searchPinged: false };
        } else if (p.state === "search") {
          p = { ...p, searchTime: p.searchTime + TICK_DT };
          if (
            !p.searchPinged &&
            p.searchTime >= GLOAMFIN_SEARCH_DELAY &&
            p.pingGap <= 0
          ) {
            next = castPulse(
              next,
              "gloamfin",
              "orange",
              p.tx,
              p.ty,
              GLOAMFIN_PING_RANGE,
              index,
            );
            p = {
              ...p,
              searchPinged: true,
              pingTimer: GLOAMFIN_PING_INTERVAL,
              pingGap: GLOAMFIN_PING_MIN_GAP,
            };
          }
          if (p.searchTime >= GLOAMFIN_GIVEUP)
            p = { ...p, state: "wander", fixTx: null, fixTy: null };
        }
      }
      if (p.kind === "flarefish" && p.state === "wander") {
        if (p.flareCharge > 0)
          p = {
            ...p,
            flareCharge: Math.max(0, p.flareCharge - TICK_DT),
            flareBloom: p.flareCharge <= TICK_DT ? FLARE_BLOOM : 0,
          };
        else if (p.flareBloom > 0) {
          p =
            dist(p, state.forager) <= FLARE_RADIUS &&
            !inkBlocks(
              state.inkClouds,
              p.x,
              p.y,
              state.forager.x,
              state.forager.y,
            )
              ? acquire(p, state.forager.tx, state.forager.ty, true)
              : {
                  ...p,
                  flareBloom: Math.max(0, p.flareBloom - TICK_DT),
                  flareTimer:
                    p.flareBloom <= TICK_DT ? FLARE_INTERVAL : p.flareTimer,
                  flareFade: p.flareBloom <= TICK_DT ? 0.6 : p.flareFade,
                };
        } else if (p.flareTimer <= 0) p = { ...p, flareCharge: FLARE_CHARGE };
        else p = { ...p, flareTimer: p.flareTimer - TICK_DT };
      }
    }
    let desired: Direction | null;
    if (p.state === "chase" && p.fixTx !== null && p.fixTy !== null) {
      desired = shortest(state.tiles, p.tx, p.ty, p.fixTx, p.fixTy, true);
      if (
        p.kind === "gloamfin" &&
        desired &&
        desired !== p.dir &&
        desired !== OPPOSITE[p.dir]
      )
        p = { ...p, chaseSpeed: GLOAMFIN_CORNER_SPEED };
    } else if (atCenter(p)) {
      const choice = wander(state.tiles, p, true, rng);
      desired = choice.dir;
      rng = choice.seed;
    } else desired = p.dir;
    if (desired && p.travel)
      p = {
        ...p,
        ...move(
          { ...p, dir: desired },
          state.tiles,
          desired,
          pSpeed(p),
          TICK_DT,
          true,
        ),
      };
    return reconcilePredator(p, state.brightness);
  });
  return { ...next, predators, rng };
}

function tickLit(state: FathomState): FathomState {
  const predators = state.predators.map((p) => {
    const inLight =
      dist(p, state.forager) <= state.visionRadius &&
      !lineBlocked(
        state.tiles,
        state.forager.x,
        state.forager.y,
        p.x,
        p.y,
        false,
      );
    const inFlare = state.predators.some(
      (f) => f.kind === "flarefish" && f.flaring && dist(f, p) <= FLARE_RADIUS,
    );
    return reconcilePredator(
      { ...p, lit: p.alert || p.markTime > 0 || inLight || inFlare },
      state.brightness,
    );
  });
  const drifters = state.drifters.map((d) => ({
    ...d,
    lit:
      (dist(d, state.forager) <= state.visionRadius &&
        !lineBlocked(
          state.tiles,
          state.forager.x,
          state.forager.y,
          d.x,
          d.y,
          false,
        )) ||
      predators.some(
        (p) =>
          p.kind === "flarefish" && p.flaring && dist(p, d) <= FLARE_RADIUS,
      ),
  }));
  return { ...state, predators, drifters };
}

function tickPlaying(state: FathomState): FathomState {
  let next = reconcile(state);
  next =
    next.brightHold > 0
      ? { ...next, brightHold: Math.max(0, next.brightHold - TICK_DT) }
      : {
          ...next,
          brightness: next.brightness * 0.5 ** (TICK_DT / BRIGHT_HALFLIFE),
        };
  next = reconcile({
    ...next,
    releaseClock: next.releaseClock + TICK_DT,
    sonar: {
      ...next.sonar,
      cooldown: Math.max(0, next.sonar.cooldown - TICK_DT),
    },
    ink: {
      cooldown: Math.max(0, next.ink.cooldown - TICK_DT),
      ready: next.ink.cooldown <= TICK_DT,
    },
    inkClouds: next.inkClouds
      .map((c) => ({ ...c, remaining: c.remaining - TICK_DT }))
      .filter((c) => c.remaining > 0),
  });
  next = tickForager(next);
  next = tickDrifters(next);
  next = tickPulses(next);
  next = tickPredators(next);
  next = tickLit(reconcile(next));
  next = updateVisibility(next);
  if (
    next.screen === "playing" &&
    next.predators.some(
      (p) =>
        p.state !== "den" &&
        p.tx === next.forager.tx &&
        p.ty === next.forager.ty,
    )
  ) {
    next =
      next.lives > 0
        ? resetAttempt(next, next.lives - 1)
        : { ...next, screen: "gameover", menuIndex: 0 };
  }
  return reconcile(next);
}

function step(state: FathomState): FathomState {
  let next: FathomState = { ...state, simTime: state.simTime + TICK_DT };
  if (next.screen === "countdown") {
    next = updateVisibility({
      ...next,
      countdown: Math.max(0, next.countdown - TICK_DT),
    });
    if (next.countdown <= 0)
      next = { ...next, screen: "playing", releaseClock: 0 };
  } else if (next.screen === "playing") next = tickPlaying(next);
  else if (next.screen === "cleared") {
    next =
      next.clearedTimer <= TICK_DT
        ? nextMaze(next)
        : { ...next, clearedTimer: next.clearedTimer - TICK_DT };
  }
  return next;
}

function menuCount(screen: Screen): number {
  if (screen === "title") return TITLE_ITEMS.length;
  if (screen === "paused") return PAUSE_ITEMS.length;
  if (screen === "gameover") return GAMEOVER_ITEMS.length;
  return 0;
}

function rect(screen: Screen, index: number): Rect | null {
  if (index < 0 || index >= menuCount(screen)) return null;
  const top = screen === "title" ? 405 : screen === "paused" ? 310 : 390;
  return {
    x: STAGE_W / 2 - MENU_W / 2,
    y: top + index * (MENU_H + MENU_GAP),
    w: MENU_W,
    h: MENU_H,
  };
}

function itemAt(screen: Screen, x: number, y: number): number | null {
  for (let i = 0; i < menuCount(screen); i += 1) {
    const r = rect(screen, i);
    if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) return i;
  }
  return null;
}

function arrive(state: FathomState, screen: Screen): FathomState {
  return {
    ...state,
    screen,
    menuIndex:
      screen === "title"
        ? state.titleIndex
        : screen === "paused" || screen === "gameover"
          ? 0
          : null,
  };
}

function confirm(state: FathomState): FathomState {
  const i = state.menuIndex ?? 0;
  if (state.screen === "title")
    return i === 0
      ? startDive({ ...state, titleIndex: i })
      : arrive({ ...state, titleIndex: i }, "howto");
  if (state.screen === "paused") {
    if (i === 0) return arrive(state, "playing");
    if (i === 1) return startDive(state);
    return makeState(state.assets, {
      muted: state.muted,
      titleIndex: state.titleIndex,
    });
  }
  if (state.screen === "gameover")
    return i === 0
      ? startDive(state)
      : makeState(state.assets, {
          muted: state.muted,
          titleIndex: state.titleIndex,
        });
  return state;
}

function input(state: FathomState, api: UpdateApi): FathomState {
  let next = state;
  if (api.input.pressed("mute")) api.audio.setMuted(!api.audio.muted());
  if (next.screen === "playing") {
    for (const dir of DIRS)
      if (api.input.value(dir) > 0) next = { ...next, desiredDir: dir };
    if (api.input.pressed("pause")) next = arrive(next, "paused");
    if (api.input.pressed("a") && next.sonar.cooldown <= 0) {
      api.audio.play(CUES.sonar);
      next = castPulse(
        {
          ...next,
          sonar: { ...next.sonar, cooldown: SONAR_COOLDOWN, ready: false },
        },
        "forager",
        "cyan",
        next.forager.tx,
        next.forager.ty,
        next.sonar.range,
        null,
      );
    }
    if (api.input.pressed("b") && next.ink.cooldown <= 0) {
      api.audio.play(CUES.ink);
      next = {
        ...next,
        ink: { ready: false, cooldown: INK_COOLDOWN },
        inkClouds: [
          ...next.inkClouds,
          {
            x: next.forager.x,
            y: next.forager.y,
            radius: INK_RADIUS,
            remaining: INK_LIFE,
          },
        ],
      };
    }
  } else if (next.screen === "howto") {
    if (
      api.input.pressed("confirm") ||
      api.input.pressed("back") ||
      api.input.pointerReleased()
    )
      next = arrive(next, "title");
  } else if (menuCount(next.screen) > 0) {
    if (
      next.screen === "paused" &&
      (api.input.pressed("pause") || api.input.pressed("back"))
    )
      return arrive(next, "playing");
    const countItems = menuCount(next.screen);
    if (api.input.pressed("up") && next.menuIndex !== null)
      next = {
        ...next,
        menuIndex: (next.menuIndex + countItems - 1) % countItems,
      };
    if (api.input.pressed("down") && next.menuIndex !== null)
      next = { ...next, menuIndex: (next.menuIndex + 1) % countItems };
    if (api.input.pressed("back") && next.screen === "gameover")
      next = makeState(next.assets, {
        muted: next.muted,
        titleIndex: next.titleIndex,
      });
    else if (api.input.pressed("confirm")) next = confirm(next);
    const pointer = api.input.pointer();
    const hover = itemAt(next.screen, pointer.x, pointer.y);
    if (hover !== null) next = { ...next, menuIndex: hover };
    if (api.input.pointerPressed()) next = { ...next, pointerDownItem: hover };
    if (api.input.pointerReleased()) {
      const up = itemAt(next.screen, pointer.x, pointer.y);
      next =
        up !== null && up === next.pointerDownItem
          ? confirm({ ...next, menuIndex: up, pointerDownItem: null })
          : { ...next, pointerDownItem: null };
    }
  }
  return next;
}

async function frames(
  api: InitApi<FathomState>,
  folder: string,
  n: number,
): Promise<(ImageBitmap | null)[]> {
  return Promise.all(
    Array.from({ length: n }, (_, i) =>
      api.assets.loadImage(`${folder}/${i}.png`).catch(() => null),
    ),
  );
}

async function loadAssets(api: InitApi<FathomState>): Promise<SpriteAssets> {
  const [
    glimmerfin,
    lanternjaw,
    gloamfin,
    flarefish,
    drifter,
    flareBloom,
    trenchWalls,
  ] = await Promise.all([
    frames(api, "glimmerfin", 8),
    frames(api, "lanternjaw", 16),
    frames(api, "gloamfin", 8),
    frames(api, "flarefish", 8),
    frames(api, "drifter", 8),
    frames(api, "flare-bloom", 8),
    frames(api, "trench-walls", 19),
  ]);
  return {
    glimmerfin,
    lanternjaw,
    gloamfin,
    flarefish,
    drifter,
    flareBloom,
    trenchWalls,
  };
}

function debugApi(): FathomDebugApi {
  const whole = (name: string, value: number, min: number): void => {
    if (!Number.isInteger(value) || value < min)
      throw new RangeError(`${name} is invalid`);
  };
  const checkTile = (
    state: DeepReadonly<FathomState>,
    tx: number,
    ty: number,
    predator = false,
  ): void => {
    whole("tx", tx, 0);
    whole("ty", ty, 0);
    if (
      tx >= GRID_COLS ||
      ty >= GRID_ROWS ||
      !openFor(state.tiles, tx, ty, predator)
    )
      throw new RangeError("tile is not open");
  };
  const pred = (
    state: DeepReadonly<FathomState>,
    index: number,
    fn: (p: PredatorState) => PredatorState,
  ): FathomState => {
    whole("index", index, 0);
    if (index >= state.predators.length)
      throw new RangeError("predator index is invalid");
    return reconcile({
      ...(state as FathomState),
      predators: state.predators.map((p, i) => (i === index ? fn(p) : p)),
    });
  };
  return {
    version: FATHOM_DEBUG_VERSION,
    reset: (state) => makeState(state.assets, { muted: state.muted }),
    snapshot: (state) => ({
      version: 1,
      screen: state.screen,
      menuIndex: state.menuIndex,
      titleIndex: state.titleIndex,
      depth: state.depth,
      score: state.score,
      lives: state.lives,
      muted: state.muted,
      planktonRemaining: state.planktonRemaining,
      drifterIn: state.drifterIn,
      brightness: state.brightness,
      brightHold: state.brightHold,
      visionRadius: state.visionRadius,
      windowRadius: state.windowRadius,
      sonar: state.sonar,
      ink: state.ink,
      grid: state.grid,
      tiles: [...state.tiles],
      plankton: [...state.plankton],
      visibility: [...state.visibility],
      forager: state.forager,
      drifters: state.drifters.map(({ dir: _dir, ...d }) => d),
      predators: state.predators.map(
        ({
          releaseAt: _a,
          fixTx: _b,
          fixTy: _c,
          linger: _d,
          alertTime: _e,
          markTime: _f,
          pingTimer: _g,
          pingGap: _h,
          chaseSpeed: _i,
          searchTime: _j,
          searchPinged: _k,
          flareTimer: _l,
          flareCharge: _m,
          flareBloom: _n,
          flareFade: _o,
          ...p
        }) => p,
      ),
      pulses: state.pulses.map(
        ({ reached: _a, caster: _b, caught: _c, ...p }) => p,
      ),
      inkClouds: state.inkClouds,
      simTime: state.simTime,
    }),
    reconcile,
    setScreen: (state, screen) => arrive(state as FathomState, screen),
    setMenuIndex: (state, index) => {
      whole("index", index, 0);
      if (index >= menuCount(state.screen) || menuCount(state.screen) === 0)
        throw new RangeError("menu index is invalid");
      return { ...(state as FathomState), menuIndex: index };
    },
    setTitleIndex: (state, index) => {
      whole("index", index, 0);
      if (index >= TITLE_ITEMS.length)
        throw new RangeError("title index is invalid");
      return { ...(state as FathomState), titleIndex: index };
    },
    menuItemRect: (state, index) => rect(state.screen, index),
    setScore: (state, points) => {
      whole("points", points, 0);
      return { ...(state as FathomState), score: points };
    },
    setLives: (state, n) => {
      whole("lives", n, 0);
      return { ...(state as FathomState), lives: n };
    },
    setDepth: (state, d) => {
      whole("depth", d, 1);
      return reconcile({
        ...(state as FathomState),
        depth: d,
        predators: makeRoster(d),
        sonar: { ...state.sonar, range: sRange(d) },
      });
    },
    setMaze: (state, rows) => {
      if (
        rows.length !== GRID_ROWS ||
        rows.some((row) => row.length !== GRID_COLS || /[^.#gd]/.test(row))
      )
        throw new Error("maze is invalid");
      const gates = rows.reduce(
        (sum, row) => sum + [...row].filter((c) => c === "g").length,
        0,
      );
      if ((gates > 0 || rows.some((row) => row.includes("d"))) && gates !== 1)
        throw new Error("maze needs exactly one gate");
      return reconcile({ ...(state as FathomState), tiles: [...rows] });
    },
    setPlankton: (state, tx, ty, present) => {
      checkTile(state, tx, ty);
      return reconcile({
        ...(state as FathomState),
        plankton: replace(state.plankton, tx, ty, present ? "*" : "-"),
      });
    },
    clearPlankton: (state) =>
      reconcile({
        ...(state as FathomState),
        plankton: state.plankton.map((row) => row.replace(/\*/g, "-")),
      }),
    clearFog: (state) => ({
      ...(state as FathomState),
      visibility: blankFog(),
    }),
    setForagerTile: (state, tx, ty) => {
      checkTile(state, tx, ty);
      const c = centerOf(tx, ty);
      return reconcile({
        ...(state as FathomState),
        forager: { ...state.forager, ...c, tx, ty, moving: false },
      });
    },
    setForagerDir: (state, dir) => ({
      ...(state as FathomState),
      forager: { ...state.forager, dir, moving: false },
    }),
    setBrightness: (state, g) => {
      if (g < 0 || g > 1) throw new RangeError("brightness is invalid");
      return reconcile({ ...(state as FathomState), brightness: g });
    },
    setBrightHold: (state, seconds) => {
      if (seconds < 0 || seconds > BRIGHT_HOLD)
        throw new RangeError("bright hold is invalid");
      return { ...(state as FathomState), brightHold: seconds };
    },
    clearPredators: (state) => ({ ...(state as FathomState), predators: [] }),
    addPredator: (state, kind, tx, ty) => {
      checkTile(state, tx, ty);
      const c = centerOf(tx, ty);
      return {
        ...(state as FathomState),
        predators: [
          ...state.predators,
          reconcilePredator(
            {
              ...makePredator(kind, state.predators.length, state.depth),
              ...c,
              tx,
              ty,
              state: "wander",
              released: true,
            },
            state.brightness,
          ),
        ],
      };
    },
    setPredatorTile: (state, index, tx, ty) => {
      checkTile(state, tx, ty, true);
      const c = centerOf(tx, ty);
      return pred(state, index, (p) => ({ ...p, ...c, tx, ty }));
    },
    setPredatorDir: (state, index, dir) =>
      pred(state, index, (p) => ({ ...p, dir })),
    setPredatorState: (state, index, value) =>
      pred(state, index, (p) => ({
        ...p,
        state: value,
        fixTx: value === "chase" ? state.forager.tx : null,
        fixTy: value === "chase" ? state.forager.ty : null,
      })),
    setPredatorReleased: (state, index, released) =>
      pred(state, index, (p) => ({ ...p, released })),
    setPredatorMind: (state, index, enabled) =>
      pred(state, index, (p) => ({ ...p, mind: enabled })),
    setPredatorTravel: (state, index, enabled) =>
      pred(state, index, (p) => ({ ...p, travel: enabled })),
    spawnDrifter: (state, tx, ty) => {
      checkTile(state, tx, ty);
      const c = centerOf(tx, ty);
      return {
        ...(state as FathomState),
        drifters: [
          ...state.drifters,
          { ...c, tx, ty, dir: "left", lit: false, mind: true, travel: true },
        ],
      };
    },
    clearDrifters: (state) => ({ ...(state as FathomState), drifters: [] }),
    setDrifterMind: (state, index, enabled) => {
      whole("index", index, 0);
      if (index >= state.drifters.length)
        throw new RangeError("drifter index is invalid");
      return {
        ...(state as FathomState),
        drifters: state.drifters.map((d, i) =>
          i === index ? { ...d, mind: enabled } : d,
        ),
      };
    },
    setDrifterTravel: (state, index, enabled) => {
      whole("index", index, 0);
      if (index >= state.drifters.length)
        throw new RangeError("drifter index is invalid");
      return {
        ...(state as FathomState),
        drifters: state.drifters.map((d, i) =>
          i === index ? { ...d, travel: enabled } : d,
        ),
      };
    },
    setDrifterIn: (state, seconds) => {
      if (seconds < 0 || seconds > DRIFTER_INTERVAL)
        throw new RangeError("drifter cadence is invalid");
      return { ...(state as FathomState), drifterIn: seconds };
    },
    setSonarCooldown: (state, seconds) => {
      if (seconds < 0) throw new RangeError("sonar cooldown is invalid");
      return reconcile({
        ...(state as FathomState),
        sonar: { ...state.sonar, cooldown: seconds },
      });
    },
    setInkCooldown: (state, seconds) => {
      if (seconds < 0) throw new RangeError("ink cooldown is invalid");
      return reconcile({
        ...(state as FathomState),
        ink: { ...state.ink, cooldown: seconds },
      });
    },
  };
}

function register(api: InitApi<FathomState>): void {
  for (const action of ACTIONS)
    api.input.register(action, { keys: [...BINDINGS[action as ActionName]] });
  api.audio.define(CUES.eat, {
    wave: "triangle",
    freq: 740,
    freqTo: 980,
    gain: 0.12,
    durationMs: 90,
  });
  api.audio.define(CUES.sonar, {
    wave: "sine",
    freq: 220,
    freqTo: 660,
    gain: 0.16,
    durationMs: 220,
  });
  api.audio.define(CUES.ink, {
    wave: "sawtooth",
    freq: 150,
    freqTo: 80,
    gain: 0.1,
    durationMs: 180,
  });
  api.audio.define(CUES.predatorPing, {
    wave: "square",
    freq: 360,
    freqTo: 260,
    gain: 0.1,
    durationMs: 170,
  });
  api.audio.define(CUES.flare, {
    wave: "triangle",
    freq: 520,
    freqTo: 180,
    gain: 0.18,
    durationMs: 260,
  });
  api.audio.define(CUES.caught, {
    wave: "sawtooth",
    freq: 110,
    freqTo: 55,
    gain: 0.2,
    durationMs: 320,
  });
  api.audio.define(CUES.descend, {
    wave: "sine",
    freq: 260,
    freqTo: 90,
    gain: 0.16,
    durationMs: 360,
  });
  api.diagnostics.register("screen", (s) => s.screen);
  api.diagnostics.register("depth", (s) => s.depth);
  api.diagnostics.register("score", (s) => s.score);
  api.diagnostics.register("lives", (s) => s.lives);
  api.diagnostics.register("brightness", (s) =>
    Number(s.brightness.toFixed(2)),
  );
  api.diagnostics.register("vision", (s) => Math.round(s.visionRadius));
  api.diagnostics.register("window", (s) => Math.round(s.windowRadius));
  api.diagnostics.register("sonar", (s) => Number(s.sonar.cooldown.toFixed(2)));
  api.diagnostics.register("ink", (s) => Number(s.ink.cooldown.toFixed(2)));
  api.diagnostics.register("plankton", (s) => s.planktonRemaining);
  api.diagnostics.register(
    "forager",
    (s) => `${s.forager.tx},${s.forager.ty} ${s.forager.dir}`,
  );
  for (let i = 0; i < 6; i += 1) {
    api.diagnostics.register(`predator ${i}`, (s) => {
      const p = s.predators[i];
      return p
        ? `${p.kind} ${p.state} ${p.tx},${p.ty} ${Math.round(p.speed)} ${p.alert ? "!" : ""}`
        : "-";
    });
  }
}

function image(
  ctx: CanvasRenderingContext2D,
  frame: ImageBitmap | null | undefined,
  x: number,
  y: number,
  size = TILE,
): void {
  if (frame) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(frame, x - size / 2, y - size / 2, size, size);
  } else {
    ctx.fillRect(x - size / 4, y - size / 4, size / 2, size / 2);
  }
}

function creatureFrame(dir: Direction, moving: boolean, time: number): number {
  const base = dir === "down" ? 0 : dir === "up" ? 2 : dir === "left" ? 4 : 6;
  return base + (moving ? Math.floor(time * 8) % 2 : 0);
}

function drawWorld(
  state: DeepReadonly<FathomState>,
  ctx: CanvasRenderingContext2D,
): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(state.forager.x, state.forager.y, state.windowRadius, 0, Math.PI * 2);
  ctx.clip();
  for (let ty = 0; ty < GRID_ROWS; ty += 1) {
    for (let tx = 0; tx < GRID_COLS; tx += 1) {
      const x = GRID_ORIGIN_X + tx * TILE;
      const y = GRID_ORIGIN_Y + ty * TILE;
      const vis = read(state.visibility, tx, ty);
      if (vis === "u") {
        image(ctx, state.assets.trenchWalls[17], x + TILE / 2, y + TILE / 2);
        continue;
      }
      ctx.globalAlpha = vis === "l" ? 1 : 0.35;
      const tile = read(state.tiles, tx, ty);
      if (tile === "#") {
        let mask = 0;
        if (read(state.tiles, tx, ty - 1) === "#") mask += 1;
        if (read(state.tiles, tx + 1, ty) === "#") mask += 2;
        if (read(state.tiles, tx, ty + 1) === "#") mask += 4;
        if (read(state.tiles, tx - 1, ty) === "#") mask += 8;
        image(ctx, state.assets.trenchWalls[mask], x + TILE / 2, y + TILE / 2);
      } else {
        image(ctx, state.assets.trenchWalls[16], x + TILE / 2, y + TILE / 2);
        if (tile === "g")
          image(ctx, state.assets.trenchWalls[18], x + TILE / 2, y + TILE / 2);
      }
      if (read(state.plankton, tx, ty) === "*") {
        ctx.fillStyle = vis === "l" ? "#9dfff4" : "#2f6569";
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, PLANKTON_DOT / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }
  const glow = ctx.createRadialGradient(
    state.forager.x,
    state.forager.y,
    8,
    state.forager.x,
    state.forager.y,
    state.windowRadius,
  );
  glow.addColorStop(0, "rgba(93,255,238,0.18)");
  glow.addColorStop(1, "rgba(93,255,238,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, STAGE_W, STAGE_H);
  ctx.restore();
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.68)";
  ctx.beginPath();
  ctx.rect(GRID_ORIGIN_X, GRID_ORIGIN_Y, GRID_COLS * TILE, GRID_ROWS * TILE);
  ctx.arc(state.forager.x, state.forager.y, state.windowRadius, 0, Math.PI * 2);
  ctx.fill("evenodd");
  ctx.restore();
}

function drawEffects(
  state: DeepReadonly<FathomState>,
  ctx: CanvasRenderingContext2D,
): void {
  for (const cloud of state.inkClouds) {
    const grad = ctx.createRadialGradient(
      cloud.x,
      cloud.y,
      2,
      cloud.x,
      cloud.y,
      cloud.radius,
    );
    grad.addColorStop(0, `rgba(0,0,0,${0.55 * (cloud.remaining / INK_LIFE)})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  for (const p of state.predators) {
    if (
      p.kind === "flarefish" &&
      (p.flaring || p.flareCharging || p.flareFade > 0)
    ) {
      const frame = p.flareCharging
        ? Math.min(2, Math.floor((1 - p.flareCharge / FLARE_CHARGE) * 3))
        : p.flaring
          ? 3 + Math.min(2, Math.floor((1 - p.flareBloom / FLARE_BLOOM) * 3))
          : 6;
      ctx.globalAlpha = p.flaring ? 0.9 : 0.55;
      image(ctx, state.assets.flareBloom[frame], p.x, p.y, FLARE_RADIUS * 2);
      ctx.globalAlpha = 1;
    }
    if (p.alert) {
      ctx.strokeStyle = p.kind === "gloamfin" ? "#b67cff" : "#ff9d57";
      ctx.lineWidth = 4;
      ctx.globalAlpha = p.alertTime / ALERT_TIME;
      ctx.beginPath();
      ctx.arc(
        p.x,
        p.y,
        38 * (1 - p.alertTime / ALERT_TIME + 0.2),
        0,
        Math.PI * 2,
      );
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }
  for (const pulse of state.pulses) {
    ctx.strokeStyle =
      pulse.tint === "cyan"
        ? "rgba(97,255,244,0.8)"
        : pulse.tint === "violet"
          ? "rgba(183,110,255,0.75)"
          : "rgba(255,154,62,0.8)";
    ctx.lineWidth = 4;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 14;
    for (const [tile, d] of pulseMap(
      state.tiles,
      pulse.ox,
      pulse.oy,
      pulse.range,
    )) {
      if (Math.abs(d - pulse.front) > 0.55) continue;
      const [tx, ty] = tile.split(",").map(Number);
      const c = centerOf(tx ?? 0, ty ?? 0);
      ctx.beginPath();
      ctx.arc(c.x, c.y, TILE * 0.33, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }
}

function drawCreatures(
  state: DeepReadonly<FathomState>,
  ctx: CanvasRenderingContext2D,
): void {
  for (const d of state.drifters) {
    ctx.fillStyle = "#ffb84d";
    ctx.shadowColor = "#ffb84d";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(d.x, d.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    if (d.lit)
      image(
        ctx,
        state.assets.drifter[Math.floor(state.simTime * 8) % 8],
        d.x,
        d.y,
      );
  }
  for (const p of state.predators) {
    if (p.kind === "lanternjaw" && p.state !== "den") {
      ctx.fillStyle = "#ffb84d";
      ctx.shadowColor = "#ffb84d";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    if (!p.lit || p.state === "den") continue;
    if (p.kind === "lanternjaw")
      image(
        ctx,
        state.assets.lanternjaw[
          p.state === "wander"
            ? 8 + (Math.floor(state.simTime * 8) % 8)
            : creatureFrame(p.dir, true, state.simTime)
        ],
        p.x,
        p.y,
      );
    else if (p.kind === "gloamfin")
      image(
        ctx,
        state.assets.gloamfin[creatureFrame(p.dir, true, state.simTime)],
        p.x,
        p.y,
      );
    else
      image(
        ctx,
        state.assets.flarefish[creatureFrame(p.dir, true, state.simTime)],
        p.x,
        p.y,
      );
  }
  ctx.fillStyle = "#8ffff0";
  ctx.shadowColor = "#58ffee";
  ctx.shadowBlur = 22;
  image(
    ctx,
    state.assets.glimmerfin[
      creatureFrame(state.forager.dir, state.forager.moving, state.simTime)
    ],
    state.forager.x,
    state.forager.y,
  );
  ctx.shadowBlur = 0;
}

function drawHud(
  state: DeepReadonly<FathomState>,
  ctx: CanvasRenderingContext2D,
): void {
  ctx.fillStyle = "rgba(2,8,17,0.94)";
  ctx.fillRect(0, 0, STAGE_W, GRID_ORIGIN_Y);
  ctx.fillRect(0, GRID_ORIGIN_Y + GRID_ROWS * TILE, STAGE_W, STAGE_H);
  ctx.font = "48px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "#dffcff";
  ctx.fillText(String(state.score).padStart(6, "0"), 64, 54);
  ctx.font = "18px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "#3d8790";
  ctx.fillText(DIVE_LABEL, 594, 32);
  ctx.fillStyle = "#9dfaf4";
  ctx.fillText(`DEPTH ${state.depth}`, 64, 696);
  for (let i = 0; i < state.lives; i += 1)
    image(ctx, state.assets.glimmerfin[6], 220 + i * 34, 687, 26);
  const gauge = (
    x: number,
    label: string,
    ratio: number,
    color: string,
  ): void => {
    ctx.strokeStyle = "#1b5360";
    ctx.strokeRect(x, 676, 160, 18);
    ctx.fillStyle = color;
    ctx.fillRect(x + 2, 678, 156 * clamp01(ratio), 14);
    ctx.fillStyle = "#dffcff";
    ctx.fillText(label, x, 670);
  };
  gauge(
    760,
    "SONAR",
    state.sonar.ready ? 1 : 1 - state.sonar.cooldown / SONAR_COOLDOWN,
    "#61fff4",
  );
  gauge(
    970,
    "INK",
    state.ink.ready ? 1 : 1 - state.ink.cooldown / INK_COOLDOWN,
    "#6e7b95",
  );
  if (state.muted) {
    ctx.fillStyle = "#ff9d57";
    ctx.fillText("MUTED", 1110, 44);
  }
}

function drawMenu(
  state: DeepReadonly<FathomState>,
  ctx: CanvasRenderingContext2D,
): void {
  const items =
    state.screen === "title"
      ? TITLE_ITEMS
      : state.screen === "paused"
        ? PAUSE_ITEMS
        : GAMEOVER_ITEMS;
  for (let i = 0; i < items.length; i += 1) {
    const r = rect(state.screen, i);
    if (!r) continue;
    const selected = state.menuIndex === i;
    ctx.fillStyle = selected ? "rgba(97,255,244,0.18)" : "rgba(7,25,39,0.82)";
    ctx.strokeStyle = selected ? "#61fff4" : "#245465";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.strokeRect(r.x, r.y, r.w, r.h);
    ctx.font = "26px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = selected ? "#eaffff" : "#8bb7c0";
    ctx.fillText(items[i] ?? "", r.x + r.w / 2, r.y + 38);
  }
  ctx.textAlign = "left";
}

function overlays(
  state: DeepReadonly<FathomState>,
  ctx: CanvasRenderingContext2D,
): void {
  if (state.screen === "title") {
    ctx.fillStyle = "rgba(2,8,17,0.5)";
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    ctx.textAlign = "center";
    ctx.font = "96px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "#dffcff";
    ctx.fillText(TITLE_TEXT, STAGE_W / 2, 210);
    ctx.font = "24px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "#61fff4";
    ctx.fillText(TAGLINE_TEXT, STAGE_W / 2, 258);
    drawMenu(state, ctx);
  } else if (state.screen === "howto") {
    ctx.fillStyle = "rgba(2,8,17,0.95)";
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    ctx.fillStyle = "#dffcff";
    ctx.font = "50px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillText("HOW TO PLAY", 92, 116);
    ctx.font = "24px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    [
      "Arrow keys or WASD swim the glimmerfin through the trench.",
      "Space sends sonar through corridors. Shift releases ink.",
      "Lanternjaw hunts light. Gloamfin hunts sound. Flarefish hunts by flare.",
      "Eat plankton to brighten your light and grow the circle you can read.",
      "The maze remembers revealed ground, but outside the circle it goes black.",
      "Press Enter, Space, Escape, or click to return.",
    ].forEach((line, index) => ctx.fillText(line, 92, 190 + index * 54));
  } else if (state.screen === "paused") {
    ctx.fillStyle = "rgba(0,0,0,0.58)";
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    ctx.textAlign = "center";
    ctx.font = "54px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "#dffcff";
    ctx.fillText("PAUSED", STAGE_W / 2, 245);
    drawMenu(state, ctx);
  } else if (state.screen === "gameover") {
    ctx.fillStyle = "rgba(2,8,17,0.92)";
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    ctx.textAlign = "center";
    ctx.font = "58px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "#ff9d57";
    ctx.fillText("GAME OVER", STAGE_W / 2, 230);
    ctx.font = "28px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "#dffcff";
    ctx.fillText(
      `SCORE ${state.score}   DEPTH ${state.depth}`,
      STAGE_W / 2,
      292,
    );
    drawMenu(state, ctx);
  } else if (state.screen === "countdown") {
    ctx.fillStyle = "rgba(2,8,17,0.45)";
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    ctx.textAlign = "center";
    ctx.font = "72px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "#dffcff";
    ctx.fillText(
      `DIVE ${Math.max(1, Math.ceil(state.countdown))}`,
      STAGE_W / 2,
      STAGE_H / 2,
    );
  } else if (state.screen === "cleared") {
    ctx.fillStyle = "rgba(2,8,17,0.48)";
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    ctx.textAlign = "center";
    ctx.font = "54px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "#dffcff";
    ctx.fillText(`DEPTH ${state.depth} CLEARED`, STAGE_W / 2, STAGE_H / 2);
  }
  ctx.textAlign = "left";
}

export const game: Game<FathomState, FathomDebugApi> = {
  async initialize(api: InitApi<FathomState>) {
    register(api);
    const assets = await loadAssets(api).catch(() => EMPTY_ASSETS);
    return [makeState(assets), debugApi()];
  },

  update(
    state: DeepReadonly<FathomState>,
    api: UpdateApi,
    dt: number,
  ): FathomState {
    let next = input(state as FathomState, api);
    let accumulator = Math.min(0.25, next.accumulator + dt);
    while (accumulator >= TICK_DT) {
      const beforeScore = next.score;
      const beforeScreen = next.screen;
      next = step({ ...next, muted: api.audio.muted(), accumulator: 0 });
      if (next.score > beforeScore) api.audio.play(CUES.eat);
      if (beforeScreen !== "cleared" && next.screen === "cleared")
        api.audio.play(CUES.descend);
      if (beforeScreen === "playing" && next.screen === "gameover")
        api.audio.play(CUES.caught);
      accumulator -= TICK_DT;
    }
    return reconcile({ ...next, accumulator, muted: api.audio.muted() });
  },

  render(state: DeepReadonly<FathomState>, api: RenderApi): void {
    const ctx = api.ctx;
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    drawWorld(state, ctx);
    drawEffects(state, ctx);
    drawCreatures(state, ctx);
    if (["countdown", "playing", "paused", "cleared"].includes(state.screen))
      drawHud(state, ctx);
    overlays(state, ctx);
  },
};
