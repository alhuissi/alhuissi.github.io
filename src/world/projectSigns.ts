import { Box3, CanvasTexture, Group, Mesh, MeshBasicMaterial, PlaneGeometry, SRGBColorSpace, TextureLoader } from 'three';
import type { DestinationId } from '../destinations';
import type { Collisions } from './collision';
import { box, lanternMaterial, standard, volume } from './geometry';
import { heightAt } from './land';

const signs = [
  { id: 'dream-ocean', logo: 'dream-ocean-logo.webp', aspect: 680 / 277,
    x: -11.86, z: -.78, yaw: .30, width: 3.46, height: 1.63, lift: .65,
    frame: '#677d8e', panel: '#cadde5', lamp: 0x9bd4e7, category: 'game' },
  { id: 'pocket-orbit', logo: 'pocket-orbit-logo.webp', aspect: 680 / 375,
    x: 9.14, z: -3.09, yaw: -.19, width: 3.16, height: 1.85, lift: .57,
    frame: '#a69c8b', panel: '#272a42', lamp: 0xf3ac67, category: 'game' },
  { id: 'hanzizap', logo: 'hanzizap-logo.svg', aspect: 290 / 69,
    x: 10.02, z: 12.03, yaw: .13, width: 3.44, height: 1.01, lift: .79,
    frame: '#b4814c', panel: '#4c3435', lamp: 0xffc478, category: 'app' },
] as const satisfies readonly { id: DestinationId; logo: string; aspect: number; x: number; z: number;
  yaw: number; width: number; height: number; lift: number; frame: string; panel: string; lamp: number;
  category: Category }[];

type Category = 'game' | 'app';

// The same strokes as the game and phone symbols in index.html (24-unit viewBox).
const symbols: Record<Category, { paths: string[]; label: string }> = {
  game: {
    label: 'VIDEO GAME',
    paths: ['M7.5 7h9a5 5 0 0 1 4.9 6l-.8 3.8a2.4 2.4 0 0 1-4.1 1.1L14.6 16H9.4l-1.9 1.9a2.4 2.4 0 0 1-4.1-1.1L2.6 13a5 5 0 0 1 4.9-6Z',
      'M7.5 10v4M5.5 12h4M15.5 11.2h.01M17.8 13h.01'],
  },
  app: {
    label: 'iOS APP',
    paths: ['M9.1 2.5h5.8a2.6 2.6 0 0 1 2.6 2.6v13.8a2.6 2.6 0 0 1-2.6 2.6H9.1a2.6 2.6 0 0 1-2.6-2.6V5.1a2.6 2.6 0 0 1 2.6-2.6Z',
      'M10.5 18.5h3'],
  },
};

/** A small enamel plaque naming the project's category: a symbol and a word. */
function plaqueTexture(category: Category, accent: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const context = canvas.getContext('2d')!;
  context.fillStyle = '#16202c';
  context.beginPath();
  context.roundRect(6, 6, 500, 148, 30);
  context.fill();
  context.lineWidth = 6;
  context.strokeStyle = accent;
  context.stroke();
  context.save();
  context.translate(40, 26);
  context.scale(4.4, 4.4);
  context.lineWidth = 1.6;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = '#e9e1cf';
  for (const path of symbols[category].paths) context.stroke(new Path2D(path));
  context.restore();
  context.fillStyle = '#e9e1cf';
  context.font = '700 52px Geist, system-ui, sans-serif';
  context.textBaseline = 'middle';
  context.fillText(symbols[category].label, 168, 84, 310);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function buildProjectSigns(root: Group, collisions: Collisions, invalidate: () => void) {
  const loader = new TextureLoader();
  return signs.map(({ id, logo, aspect, x, z, yaw, width, height, lift, frame, panel, lamp, category }) => {
    const post = new Group();
    const y = heightAt(x, z);
    post.position.set(x, y, z);
    post.rotation.y = yaw;
    root.add(post);

    const trim = standard(frame, .65, .16);
    const backing = standard(panel, .81);
    const edgeLight = lanternMaterial(lamp, .52);
    const center = lift + height * .5;
    const w = width * .5;
    const h = height * .5;
    const cut = .15;
    volume(post, trim, [[-w + cut, -h], [w - cut, -h], [w, -h + cut], [w, h - cut],
      [w - cut, h], [-w + cut, h], [-w, h - cut], [-w, -h + cut]], .24, 0, center, 0, .027);
    box(post, backing, width - .22, height - .20, .31, 0, center, 0);
    for (const side of [-1, 1]) {
      box(post, trim, .20, lift + .31, .25, side * width * .34, lift * .40, 0);
      box(post, backing, .39, .15, .49, side * width * .34, .035, 0);
      box(post, edgeLight, .40, .035, .055, side * (w - .39), lift + .071, .164);
      box(post, edgeLight, .40, .035, .055, side * (w - .39), lift + .071, -.164);
    }

    const artWidth = Math.min(width - .50, (height - .34) * aspect);
    const logoSurface = new PlaneGeometry(artWidth, artWidth / aspect);
    const texture = loader.load(`./island-media/${logo}`, invalidate);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    const print = new MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false });
    // HanziZap's cream lettering sits right at the bloom threshold; keep it lit, not glowing.
    if (id === 'hanzizap') print.color.setScalar(.8);
    for (const side of [-1, 1]) {
      const face = new Mesh(logoSurface, print);
      face.position.set(0, center, side * .166);
      face.rotation.y = side < 0 ? Math.PI : 0;
      post.add(face);
    }

    // The category plaque hangs beneath the board, between its legs.
    const plaque = new MeshBasicMaterial({ map: plaqueTexture(category, frame), toneMapped: false });
    plaque.color.setScalar(.82);
    const plaqueHeight = .44;
    const plaqueWidth = plaqueHeight * 512 / 160;
    const plaqueY = lift - .3;
    box(post, trim, plaqueWidth + .08, plaqueHeight + .08, .06, 0, plaqueY, 0);
    for (const side of [-1, 1]) box(post, trim, .025, .14, .025, side * plaqueWidth * .32, plaqueY + plaqueHeight * .5 + .1, 0);
    const plaqueFace = new PlaneGeometry(plaqueWidth, plaqueHeight);
    for (const side of [-1, 1]) {
      const face = new Mesh(plaqueFace, plaque);
      face.position.set(0, plaqueY, side * .032);
      face.rotation.y = side < 0 ? Math.PI : 0;
      post.add(face);
    }

    collisions.add(x, z, width, .38, y - .20, height + lift + .28, yaw);
    return { id, box: new Box3().setFromObject(post) };
  });
}
