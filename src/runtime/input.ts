import { Vector2 } from 'three';

const walkKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']);
const paceKeys = new Set(['ShiftLeft', 'ShiftRight']);

type Callbacks = {
  active: () => boolean;
  invalidate: () => void;
  look: (dx: number, dy: number) => void;
  hover: (x: number, y: number) => void;
  pick: (x: number, y: number) => void;
  inspect: () => void;
  reset: () => void;
};

export class IslandInput {
  readonly axes = new Vector2();
  private readonly held = new Set<string>();
  private readonly joystick = new Vector2();
  private readonly events = new AbortController();
  private pacePointer: number | null = null;

  get walkHeld() {
    return this.pacePointer !== null || this.held.has('ShiftLeft') || this.held.has('ShiftRight');
  }

  constructor(canvas: HTMLCanvasElement, private readonly stick: HTMLElement,
    private readonly paceButton: HTMLButtonElement, actions: Callbacks) {
    const options = { signal: this.events.signal };
    const pressed = (...keys: string[]) => keys.some((key) => this.held.has(key));
    const read = () => {
      const right = Number(pressed('KeyD', 'ArrowRight')) - Number(pressed('KeyA', 'ArrowLeft'));
      const down = Number(pressed('KeyS', 'ArrowDown')) - Number(pressed('KeyW', 'ArrowUp'));
      this.axes.set(right + this.joystick.x, down + this.joystick.y);
      if (this.axes.lengthSq() > 1) this.axes.normalize();
      actions.invalidate();
    };

    canvas.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing || !actions.active()) return;
      if (walkKeys.has(event.code) || paceKeys.has(event.code)) {
        event.preventDefault();
        this.held.add(event.code);
        read();
      } else if (!event.repeat && event.code === 'KeyE') {
        event.preventDefault();
        actions.inspect();
      } else if (!event.repeat && event.code === 'KeyR') {
        event.preventDefault();
        actions.reset();
      }
    }, options);

    window.addEventListener('keyup', (event) => {
      if (this.held.delete(event.code)) read();
    }, options);
    canvas.addEventListener('blur', () => { this.held.clear(); read(); }, options);
    window.addEventListener('blur', () => this.clear(), options);

    paceButton.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || this.pacePointer !== null || !actions.active()) return;
      event.preventDefault();
      this.pacePointer = event.pointerId;
      paceButton.setPointerCapture(event.pointerId);
      paceButton.setAttribute('data-held', '');
      actions.invalidate();
    }, options);
    const releasePace = (event: PointerEvent) => {
      if (this.pacePointer !== event.pointerId) return;
      this.pacePointer = null;
      paceButton.removeAttribute('data-held');
      actions.invalidate();
    };
    paceButton.addEventListener('pointerup', releasePace, options);
    paceButton.addEventListener('pointercancel', releasePace, options);
    paceButton.addEventListener('lostpointercapture', releasePace, options);

    let drag: { id: number; startX: number; startY: number; lastX: number; lastY: number; moving: boolean } | null = null;
    canvas.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || drag || !actions.active()) return;
      drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY,
        lastX: event.clientX, lastY: event.clientY, moving: false };
      canvas.setPointerCapture(event.pointerId);
    }, options);
    canvas.addEventListener('pointermove', (event) => {
      if (!actions.active()) return;
      if (!drag) {
        if (event.pointerType === 'mouse') actions.hover(event.clientX, event.clientY);
        return;
      }
      if (drag.id !== event.pointerId) return;
      if (!drag.moving && Math.hypot(drag.startX - event.clientX, drag.startY - event.clientY) < 5) return;
      drag.moving = true;
      actions.look(event.clientX - drag.lastX, event.clientY - drag.lastY);
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
    }, options);
    canvas.addEventListener('pointerup', (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      if (!drag.moving && actions.active()) actions.pick(event.clientX, event.clientY);
      drag = null;
    }, options);
    const stopDrag = (event: PointerEvent) => {
      if (drag?.id === event.pointerId) drag = null;
    };
    canvas.addEventListener('pointercancel', stopDrag, options);
    canvas.addEventListener('lostpointercapture', stopDrag, options);
    canvas.addEventListener('pointerleave', () => canvas.removeAttribute('data-inspectable'), options);

    const thumb = stick.querySelector('span')!;
    let stickPointer = -1;
    const steer = (event: PointerEvent) => {
      const rect = stick.getBoundingClientRect();
      const radius = rect.width * .32;
      this.joystick.set(
        (event.clientX - rect.left - rect.width / 2) / radius,
        (event.clientY - rect.top - rect.height / 2) / radius,
      );
      if (this.joystick.lengthSq() > 1) this.joystick.normalize();
      thumb.style.transform = `translate(${this.joystick.x * radius}px, ${this.joystick.y * radius}px)`;
      read();
    };
    stick.addEventListener('pointerdown', (event) => {
      if (stickPointer !== -1 || !actions.active()) return;
      event.preventDefault();
      stickPointer = event.pointerId;
      stick.setPointerCapture(stickPointer);
      steer(event);
    }, options);
    stick.addEventListener('pointermove', (event) => {
      if (event.pointerId === stickPointer && actions.active()) steer(event);
    }, options);
    const stopStick = (event: PointerEvent) => {
      if (stickPointer !== event.pointerId) return;
      stickPointer = -1;
      this.joystick.set(0, 0);
      thumb.style.removeProperty('transform');
      read();
    };
    stick.addEventListener('pointerup', stopStick, options);
    stick.addEventListener('pointercancel', stopStick, options);
    stick.addEventListener('lostpointercapture', stopStick, options);
  }

  clear() {
    this.held.clear();
    this.joystick.set(0, 0);
    this.axes.set(0, 0);
    this.stick.querySelector('span')!.style.removeProperty('transform');
    const pointer = this.pacePointer;
    this.pacePointer = null;
    this.paceButton.removeAttribute('data-held');
    if (pointer !== null && this.paceButton.hasPointerCapture(pointer)) {
      this.paceButton.releasePointerCapture(pointer);
    }
  }

  dispose() {
    this.events.abort();
  }
}
