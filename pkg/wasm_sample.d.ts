/* tslint:disable */
/* eslint-disable */
/**
* @param {number} frame_count
* @param {number} arc_count
* @param {boolean} ball
* @param {boolean} fast_inside
* @param {number} arc_1_speed
* @param {number} arc_2_speed
* @param {number} gradient_mod
* @param {number} color_add
* @param {number} color_change_speed
*/
export function arcs(frame_count: number, arc_count: number, ball: boolean, fast_inside: boolean, arc_1_speed: number, arc_2_speed: number, gradient_mod: number, color_add: number, color_change_speed: number): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly arcs: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
