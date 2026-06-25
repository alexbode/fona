/* 
  Copy from https://github.com/catdad/canvas-confetti
  But converted to typescript with following changes:

  - ESM Imports/Exports: Removed the legacy immediately-invoked function expression (IIFE) and Node.js-style module.exports, replacing them with standard modern TypeScript ES6 import/export.

  - Strict Typing: Introduced comprehensive interfaces like ConfettiOptions, FettiPhysics, ShapeData, etc. This replaces the loose dynamic Object typings.

  - Variable Declarations: Completely stripped var usages and moved to block-scoped const and let.

  - Worker Initialization Logic: Creating Web Workers via Function.prototype.toString() to stringify modules inline doesn't transpile cleanly in modern build pipelines like Vite or Webpack (variables get minified/mangled and scope logic breaks). I removed the legacy inline stringification method. If you need it running in a Worker thread today, you'd typically instantiate a standard Worker module (e.g. new Worker(new URL('./confetti-worker.ts', import.meta.url))).

  - Modern Browser APIs: Retained full capability for OffscreenCanvas, Path2D, and DOMMatrix matching modern DOM typings.
*/

export interface Origin {
  x: number;
  y: number;
}

export interface ColorRgb {
  r: number;
  g: number;
  b: number;
}

export interface ShapeData {
  type: 'path' | 'bitmap' | 'circle' | 'star' | 'square';
  path?: string;
  matrix?: number[];
  bitmap?: ImageBitmap;
}

export interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  x?: number;
  y?: number;
  shapes?: Array<'square' | 'circle' | 'star' | ShapeData>;
  zIndex?: number;
  colors?: string[];
  disableForReducedMotion?: boolean;
  scalar?: number;
  flat?: boolean;
  origin?: Partial<Origin>;
}

export interface GlobalOptions {
  resize?: boolean;
  useWorker?: boolean;
  disableForReducedMotion?: boolean;
}

export interface FettiPhysics {
  x: number;
  y: number;
  wobble: number;
  wobbleSpeed: number;
  velocity: number;
  angle2D: number;
  tiltAngle: number;
  color: ColorRgb;
  shape: ShapeData | string;
  tick: number;
  totalTicks: number;
  decay: number;
  drift: number;
  random: number;
  tiltSin: number;
  tiltCos: number;
  wobbleX: number;
  wobbleY: number;
  gravity: number;
  ovalScalar: number;
  scalar: number;
  flat: boolean;
}

const canUseWorker = !!(
  typeof Worker !== 'undefined' &&
  typeof Blob !== 'undefined' &&
  typeof Promise !== 'undefined' &&
  typeof OffscreenCanvas !== 'undefined' &&
  typeof OffscreenCanvasRenderingContext2D !== 'undefined' &&
  typeof HTMLCanvasElement !== 'undefined' &&
  typeof HTMLCanvasElement.prototype.transferControlToOffscreen !== 'undefined' &&
  typeof URL !== 'undefined' &&
  typeof URL.createObjectURL !== 'undefined'
);

const canUsePaths = typeof Path2D === 'function' && typeof DOMMatrix === 'function';

const canDrawBitmap = ((): boolean => {
  if (typeof OffscreenCanvas === 'undefined') {
    return false;
  }
  try {
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    ctx.fillRect(0, 0, 1, 1);
    const bitmap = canvas.transferToImageBitmap();
    ctx.createPattern(bitmap, 'no-repeat');
  } catch (e) {
    return false;
  }
  return true;
})();

function noop() {}

function promise(func: (resolve: () => void, reject: () => void) => void): Promise<void> | null {
  if (typeof Promise === 'function') {
    return new Promise(func);
  }
  func(noop, noop);
  return null;
}

const bitmapMapper = ((skipTransform: boolean, map: Map<ImageBitmap, OffscreenCanvas>) => {
  return {
    transform: function (bitmap: ImageBitmap): ImageBitmap | OffscreenCanvas {
      if (skipTransform) {
        return bitmap;
      }
      if (map.has(bitmap)) {
        return map.get(bitmap)!;
      }
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(bitmap, 0, 0);
      map.set(bitmap, canvas);
      return canvas;
    },
    clear: function () {
      map.clear();
    },
  };
})(canDrawBitmap, new Map<ImageBitmap, OffscreenCanvas>());

const raf = (function () {
  const TIME = Math.floor(1000 / 60);
  let frame: (cb: (time?: number) => void) => number;
  let cancel: (id: number) => void;
  const frames: Record<number, number> = {};
  let lastFrameTime = 0;

  if (typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function') {
    frame = function (cb: (time?: number) => void) {
      const id = Math.random();
      frames[id] = requestAnimationFrame(function onFrame(time) {
        if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
          lastFrameTime = time;
          delete frames[id];
          cb(time);
        } else {
          frames[id] = requestAnimationFrame(onFrame);
        }
      });
      return id;
    };
    cancel = function (id: number) {
      if (frames[id]) {
        cancelAnimationFrame(frames[id]);
      }
    };
  } else {
    frame = function (cb: () => void) {
      return window.setTimeout(cb, TIME);
    };
    cancel = function (timer: number) {
      return window.clearTimeout(timer);
    };
  }

  return { frame, cancel };
})();

const defaults: ConfettiOptions = {
  particleCount: 50,
  angle: 90,
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  ticks: 200,
  x: 0.5,
  y: 0.5,
  shapes: ['square', 'circle'],
  zIndex: 100,
  colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
  disableForReducedMotion: false,
  scalar: 1,
};

function convert<T, U>(val: T, transform?: (val: T) => U): T | U {
  return transform ? transform(val) : val;
}

function isOk<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

function prop<T extends keyof ConfettiOptions>(
  options: ConfettiOptions | undefined,
  name: T,
  transform?: (val: any) => any,
): any {
  const val = options && isOk(options[name]) ? options[name] : defaults[name];
  return convert(val, transform);
}

function onlyPositiveInt(number: number): number {
  return number < 0 ? 0 : Math.floor(number);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function toDecimal(str: string): number {
  return parseInt(str, 16);
}

function hexToRgb(str: string): ColorRgb {
  let val = String(str).replace(/[^0-9a-f]/gi, '');
  if (val.length < 6) {
    val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
  }
  return {
    r: toDecimal(val.substring(0, 2)),
    g: toDecimal(val.substring(2, 4)),
    b: toDecimal(val.substring(4, 6)),
  };
}

function colorsToRgb(colors: string[]): ColorRgb[] {
  return colors.map(hexToRgb);
}

function getOrigin(options?: ConfettiOptions): Origin {
  const origin = prop(options, 'origin') || {};
  return {
    x: typeof origin.x === 'number' ? origin.x : 0.5,
    y: typeof origin.y === 'number' ? origin.y : 0.5,
  };
}

function setCanvasWindowSize(canvas: HTMLCanvasElement): void {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function setCanvasRectSize(canvas: HTMLCanvasElement): void {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

function getCanvas(zIndex: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = zIndex.toString();
  return canvas;
}

function ellipse(
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
  rotation: number,
  startAngle: number,
  endAngle: number,
  antiClockwise: boolean = false,
): void {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.scale(radiusX, radiusY);
  context.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
  context.restore();
}

function randomPhysics(opts: any): FettiPhysics {
  const radAngle = opts.angle * (Math.PI / 180);
  const radSpread = opts.spread * (Math.PI / 180);

  return {
    x: opts.x,
    y: opts.y,
    wobble: Math.random() * 10,
    wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
    velocity: opts.startVelocity * 0.5 + Math.random() * opts.startVelocity,
    angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
    tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
    color: opts.color,
    shape: opts.shape,
    tick: 0,
    totalTicks: opts.ticks,
    decay: opts.decay,
    drift: opts.drift,
    random: Math.random() + 2,
    tiltSin: 0,
    tiltCos: 0,
    wobbleX: 0,
    wobbleY: 0,
    gravity: opts.gravity * 3,
    ovalScalar: 0.6,
    scalar: opts.scalar,
    flat: opts.flat,
  };
}

function updateFetti(
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  fetti: FettiPhysics,
): boolean {
  fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
  fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
  fetti.velocity *= fetti.decay;

  if (fetti.flat) {
    fetti.wobble = 0;
    fetti.wobbleX = fetti.x + 10 * fetti.scalar;
    fetti.wobbleY = fetti.y + 10 * fetti.scalar;
    fetti.tiltSin = 0;
    fetti.tiltCos = 0;
    fetti.random = 1;
  } else {
    fetti.wobble += fetti.wobbleSpeed;
    fetti.wobbleX = fetti.x + 10 * fetti.scalar * Math.cos(fetti.wobble);
    fetti.wobbleY = fetti.y + 10 * fetti.scalar * Math.sin(fetti.wobble);
    fetti.tiltAngle += 0.1;
    fetti.tiltSin = Math.sin(fetti.tiltAngle);
    fetti.tiltCos = Math.cos(fetti.tiltAngle);
    fetti.random = Math.random() + 2;
  }

  const progress = fetti.tick++ / fetti.totalTicks;
  const x1 = fetti.x + fetti.random * fetti.tiltCos;
  const y1 = fetti.y + fetti.random * fetti.tiltSin;
  const x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
  const y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;

  context.fillStyle = `rgba(${fetti.color.r}, ${fetti.color.g}, ${fetti.color.b}, ${1 - progress})`;
  context.beginPath();

  const shapeType = typeof fetti.shape === 'object' ? fetti.shape.type : fetti.shape;

  if (
    canUsePaths &&
    shapeType === 'path' &&
    typeof (fetti.shape as ShapeData).path === 'string' &&
    Array.isArray((fetti.shape as ShapeData).matrix)
  ) {
    context.fill(
      transformPath2D(
        (fetti.shape as ShapeData).path!,
        (fetti.shape as ShapeData).matrix!,
        fetti.x,
        fetti.y,
        Math.abs(x2 - x1) * 0.1,
        Math.abs(y2 - y1) * 0.1,
        (Math.PI / 10) * fetti.wobble,
      ),
    );
  } else if (shapeType === 'bitmap' && (fetti.shape as ShapeData).bitmap) {
    const rotation = (Math.PI / 10) * fetti.wobble;
    const scaleX = Math.abs(x2 - x1) * 0.1;
    const scaleY = Math.abs(y2 - y1) * 0.1;
    const bitmap = (fetti.shape as ShapeData).bitmap!;
    const width = bitmap.width * fetti.scalar;
    const height = bitmap.height * fetti.scalar;

    const matrix = new DOMMatrix([
      Math.cos(rotation) * scaleX,
      Math.sin(rotation) * scaleX,
      -Math.sin(rotation) * scaleY,
      Math.cos(rotation) * scaleY,
      fetti.x,
      fetti.y,
    ]);

    if ((fetti.shape as ShapeData).matrix) {
      matrix.multiplySelf(new DOMMatrix((fetti.shape as ShapeData).matrix));
    }

    const pattern = context.createPattern(
      bitmapMapper.transform(bitmap) as CanvasImageSource,
      'no-repeat',
    );
    if (pattern) {
      pattern.setTransform(matrix);
      context.globalAlpha = 1 - progress;
      context.fillStyle = pattern;
      context.fillRect(fetti.x - width / 2, fetti.y - height / 2, width, height);
      context.globalAlpha = 1;
    }
  } else if (shapeType === 'circle') {
    if (context.ellipse) {
      context.ellipse(
        fetti.x,
        fetti.y,
        Math.abs(x2 - x1) * fetti.ovalScalar,
        Math.abs(y2 - y1) * fetti.ovalScalar,
        (Math.PI / 10) * fetti.wobble,
        0,
        2 * Math.PI,
      );
    } else {
      ellipse(
        context,
        fetti.x,
        fetti.y,
        Math.abs(x2 - x1) * fetti.ovalScalar,
        Math.abs(y2 - y1) * fetti.ovalScalar,
        (Math.PI / 10) * fetti.wobble,
        0,
        2 * Math.PI,
      );
    }
  } else if (shapeType === 'star') {
    let rot = (Math.PI / 2) * 3;
    const innerRadius = 4 * fetti.scalar;
    const outerRadius = 8 * fetti.scalar;
    let x = fetti.x;
    let y = fetti.y;
    let spikes = 5;
    const step = Math.PI / spikes;

    while (spikes--) {
      x = fetti.x + Math.cos(rot) * outerRadius;
      y = fetti.y + Math.sin(rot) * outerRadius;
      context.lineTo(x, y);
      rot += step;

      x = fetti.x + Math.cos(rot) * innerRadius;
      y = fetti.y + Math.sin(rot) * innerRadius;
      context.lineTo(x, y);
      rot += step;
    }
  } else {
    context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
    context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
    context.lineTo(Math.floor(x2), Math.floor(y2));
    context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
  }

  context.closePath();
  context.fill();

  return fetti.tick < fetti.totalTicks;
}

function animate(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  fettis: FettiPhysics[],
  resizer: (canvas: any) => void,
  size: { width: number; height: number },
  done: () => void,
) {
  let animatingFettis = fettis.slice();
  const context = canvas.getContext('2d') as
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D;
  let animationFrame: number | null = null;
  let destroy: (() => void) | null = null;

  const prom = promise((resolve) => {
    function onDone() {
      animationFrame = null;
      destroy = null;
      context.clearRect(0, 0, size.width, size.height);
      bitmapMapper.clear();
      done();
      resolve();
    }

    function update() {
      if (!size.width && !size.height) {
        resizer(canvas);
        size.width = canvas.width;
        size.height = canvas.height;
      }

      context.clearRect(0, 0, size.width, size.height);

      animatingFettis = animatingFettis.filter((fetti) => updateFetti(context, fetti));

      if (animatingFettis.length) {
        animationFrame = raf.frame(update);
      } else {
        onDone();
      }
    }

    animationFrame = raf.frame(update);
    destroy = onDone;
  });

  return {
    addFettis: function (newFettis: FettiPhysics[]) {
      animatingFettis = animatingFettis.concat(newFettis);
      return prom;
    },
    canvas: canvas,
    promise: prom,
    reset: function () {
      if (animationFrame) raf.cancel(animationFrame);
      if (destroy) destroy();
    },
  };
}

export function createConfetti(canvas: HTMLCanvasElement | null, globalOpts?: GlobalOptions) {
  const isLibCanvas = !canvas;
  const allowResize = !!(globalOpts && globalOpts.resize);
  let hasResizeEventRegistered = false;
  const globalDisableForReducedMotion =
    globalOpts && globalOpts.disableForReducedMotion !== undefined
      ? globalOpts.disableForReducedMotion
      : !!defaults.disableForReducedMotion;
  const resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
  let initialized = false;
  const preferLessMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion)').matches;
  let animationObj: any;

  function fireLocal(
    options: ConfettiOptions,
    size: { width: number; height: number },
    done: () => void,
  ) {
    let particleCount = prop(options, 'particleCount', onlyPositiveInt);
    const angle = prop(options, 'angle', Number);
    const spread = prop(options, 'spread', Number);
    const startVelocity = prop(options, 'startVelocity', Number);
    const decay = prop(options, 'decay', Number);
    const gravity = prop(options, 'gravity', Number);
    const drift = prop(options, 'drift', Number);
    const colors = prop(options, 'colors', colorsToRgb);
    const ticks = prop(options, 'ticks', Number);
    const shapes = prop(options, 'shapes');
    const scalar = prop(options, 'scalar');
    const flat = !!prop(options, 'flat');
    const origin = getOrigin(options);

    const fettis: FettiPhysics[] = [];
    const startX = canvas!.width * origin.x;
    const startY = canvas!.height * origin.y;

    while (particleCount--) {
      fettis.push(
        randomPhysics({
          x: startX,
          y: startY,
          angle: angle,
          spread: spread,
          startVelocity: startVelocity,
          color: colors[particleCount % colors.length],
          shape: shapes[randomInt(0, shapes.length)],
          ticks: ticks,
          decay: decay,
          gravity: gravity,
          drift: drift,
          scalar: scalar,
          flat: flat,
        }),
      );
    }

    if (animationObj) {
      return animationObj.addFettis(fettis);
    }

    animationObj = animate(canvas!, fettis, resizer, size, done);
    return animationObj.promise;
  }

  function fire(options?: ConfettiOptions): Promise<void> | null {
    const opts = options || {};
    const disableForReducedMotion =
      globalDisableForReducedMotion || prop(opts, 'disableForReducedMotion', Boolean);
    const zIndex = prop(opts, 'zIndex', Number);

    if (disableForReducedMotion && preferLessMotion) {
      return promise((resolve) => resolve());
    }

    if (isLibCanvas && animationObj) {
      canvas = animationObj.canvas;
    } else if (isLibCanvas && !canvas) {
      canvas = getCanvas(zIndex);
      document.body.appendChild(canvas);
    }

    if (allowResize && !initialized) {
      resizer(canvas!);
    }

    const size = {
      width: canvas!.width,
      height: canvas!.height,
    };

    initialized = true;

    function onResize() {
      size.width = 0;
      size.height = 0;
    }

    function done() {
      animationObj = null;
      if (allowResize) {
        hasResizeEventRegistered = false;
        window.removeEventListener('resize', onResize);
      }
      if (isLibCanvas && canvas) {
        if (document.body.contains(canvas)) {
          document.body.removeChild(canvas);
        }
        canvas = null;
        initialized = false;
      }
    }

    if (allowResize && !hasResizeEventRegistered) {
      hasResizeEventRegistered = true;
      window.addEventListener('resize', onResize, false);
    }

    return fireLocal(opts, size, done);
  }

  fire.reset = function () {
    if (animationObj) {
      animationObj.reset();
    }
  };

  return fire;
}

let defaultFire: any;
function getDefaultFire() {
  if (!defaultFire) {
    defaultFire = createConfetti(null, { resize: true });
  }
  return defaultFire;
}

export function transformPath2D(
  pathString: string,
  pathMatrix: number[],
  x: number,
  y: number,
  scaleX: number,
  scaleY: number,
  rotation: number,
): Path2D {
  const path2d = new Path2D(pathString);
  const t1 = new Path2D();
  t1.addPath(path2d, new DOMMatrix(pathMatrix));

  const t2 = new Path2D();
  t2.addPath(
    t1,
    new DOMMatrix([
      Math.cos(rotation) * scaleX,
      Math.sin(rotation) * scaleX,
      -Math.sin(rotation) * scaleY,
      Math.cos(rotation) * scaleY,
      x,
      y,
    ]),
  );

  return t2;
}

export function shapeFromPath(pathData: string | { path: string; matrix?: number[] }): ShapeData {
  if (!canUsePaths) {
    throw new Error('Path confetti are not supported in this browser');
  }

  let path: string;
  let matrix: number[] | undefined;

  if (typeof pathData === 'string') {
    path = pathData;
  } else {
    path = pathData.path;
    matrix = pathData.matrix;
  }

  const path2d = new Path2D(path);
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!matrix && tempCtx) {
    const maxSize = 1000;
    let minX = maxSize,
      minY = maxSize,
      maxX = 0,
      maxY = 0;

    for (let x = 0; x < maxSize; x += 2) {
      for (let y = 0; y < maxSize; y += 2) {
        if (tempCtx.isPointInPath(path2d, x, y, 'nonzero')) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    const width = maxX - minX;
    const height = maxY - minY;
    const maxDesiredSize = 10;
    const scale = Math.min(maxDesiredSize / width, maxDesiredSize / height);

    matrix = [
      scale,
      0,
      0,
      scale,
      -Math.round(width / 2 + minX) * scale,
      -Math.round(height / 2 + minY) * scale,
    ];
  }

  return { type: 'path', path, matrix };
}

export function shapeFromText(
  textData: string | { text: string; scalar?: number; fontFamily?: string; color?: string },
): ShapeData {
  let text: string;
  let scalar = 1;
  let color = '#000000';
  let fontFamily =
    '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';

  if (typeof textData === 'string') {
    text = textData;
  } else {
    text = textData.text;
    if (textData.scalar !== undefined) scalar = textData.scalar;
    if (textData.fontFamily !== undefined) fontFamily = textData.fontFamily;
    if (textData.color !== undefined) color = textData.color;
  }

  const fontSize = 10 * scalar;
  const font = `${fontSize}px ${fontFamily}`;

  let canvas = new OffscreenCanvas(fontSize, fontSize);
  let ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('OffscreenCanvas context not supported');

  ctx.font = font;
  const size = ctx.measureText(text);
  let width = Math.ceil(size.actualBoundingBoxRight + size.actualBoundingBoxLeft);
  let height = Math.ceil(size.actualBoundingBoxAscent + size.actualBoundingBoxDescent);

  const padding = 2;
  const x = size.actualBoundingBoxLeft + padding;
  const y = size.actualBoundingBoxAscent + padding;
  width += padding * 2;
  height += padding * 2;

  canvas = new OffscreenCanvas(width, height);
  ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('OffscreenCanvas context not supported');

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);

  const scale = 1 / scalar;

  return {
    type: 'bitmap',
    bitmap: canvas.transferToImageBitmap(),
    matrix: [scale, 0, 0, scale, (-width * scale) / 2, (-height * scale) / 2],
  };
}

const confetti = function (this: any, ...args: any[]) {
  return getDefaultFire().apply(this, args);
};

confetti.reset = function () {
  getDefaultFire().reset();
};
confetti.create = createConfetti;
confetti.shapeFromPath = shapeFromPath;
confetti.shapeFromText = shapeFromText;

export default confetti;
