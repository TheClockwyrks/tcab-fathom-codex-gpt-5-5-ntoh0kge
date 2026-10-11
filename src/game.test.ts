import { createCanvas } from "@napi-rs/canvas";
import { ConstantClock, createEngine } from "@clockwyrks/simple-2d";
import { describe, expect, it } from "vitest";
import { STAGE_H, STAGE_W } from "./constants";
import {
  BACKGROUND,
  game,
  type FathomDebugApi,
  type FathomState,
} from "./game";

function makeEngine() {
  const canvas = createCanvas(STAGE_W, STAGE_H) as unknown as HTMLCanvasElement;
  const events = new EventTarget();
  return createEngine<FathomState, FathomDebugApi>({
    canvas,
    width: STAGE_W,
    height: STAGE_H,
    game,
    background: BACKGROUND,
    clock: new ConstantClock(1000 / 60),
    surface: {
      cssWidth: () => STAGE_W,
      cssHeight: () => STAGE_H,
      dpr: () => 1,
      events: () => events,
    },
  });
}

describe("Fathom simulation", () => {
  it("initializes the title state and debug snapshot", async () => {
    const engine = makeEngine();
    await engine.initialize();

    const snap = engine.debug.snapshot(engine.state);
    expect(snap.version).toBe(1);
    expect(snap.screen).toBe("title");
    expect(snap.grid.cols).toBe(36);
    expect(snap.predators.map((p) => p.kind)).toEqual([
      "lanternjaw",
      "gloamfin",
      "flarefish",
    ]);
    expect(snap.planktonRemaining).toBeGreaterThan(200);
    engine.destroy();
  });

  it("poses depth, cooldowns, and the menu surface", async () => {
    const engine = makeEngine();
    await engine.initialize();

    engine.apply((s) => engine.debug.setDepth(s, 4));
    engine.apply((s) => engine.debug.setSonarCooldown(s, 1));
    engine.apply((s) => engine.debug.setScreen(s, "paused"));

    const snap = engine.debug.snapshot(engine.state);
    expect(snap.sonar.range).toBe(6);
    expect(snap.predators).toHaveLength(6);
    expect(snap.menuIndex).toBe(0);
    expect(engine.debug.menuItemRect(engine.state, 1)?.w).toBeGreaterThan(100);
    engine.destroy();
  });

  it("advances the fixed-step core and reveals fog during countdown", async () => {
    const engine = makeEngine();
    await engine.initialize();
    engine.apply((s) => engine.debug.setScreen(s, "countdown"));

    await engine.advance(130);

    const snap = engine.debug.snapshot(engine.state);
    expect(snap.screen).toBe("playing");
    expect(snap.simTime).toBeCloseTo(13 / 6, 3);
    expect(snap.visibility.join("")).toContain("l");
    engine.destroy();
  });

  it("handles posed contact as a lost life", async () => {
    const engine = makeEngine();
    await engine.initialize();
    engine.apply((s) => engine.debug.setScreen(s, "playing"));
    engine.apply((s) => engine.debug.setForagerTile(s, 1, 15));
    engine.apply((s) => engine.debug.clearPredators(s));
    engine.apply((s) => engine.debug.addPredator(s, "flarefish", 1, 15));

    await engine.advance(1);

    const snap = engine.debug.snapshot(engine.state);
    expect(snap.screen).toBe("countdown");
    expect(snap.lives).toBe(2);
    engine.destroy();
  });
});
