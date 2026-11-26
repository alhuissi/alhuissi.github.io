export type Point = readonly [x: number, z: number];
export type DestinationId = 'dream-ocean' | 'pocket-orbit' | 'hanzizap' | 'workshop' | 'observatory';

type Destination = {
  id: DestinationId;
  name: string;
  landmark: Point;
  approach: Point;
  signHeight: number;
  hit: readonly [width: number, height: number, depth: number];
};

export const arrival: Point = [2, 16];

export const destinations: Record<DestinationId, Destination> = {
  'dream-ocean': {
    id: 'dream-ocean', name: 'Dream Ocean', landmark: [-15.7, -2.8], approach: [-14.7, 1.15],
    signHeight: 6.8, hit: [5.7, 6.6, 2.7],
  },
  'pocket-orbit': {
    id: 'pocket-orbit', name: 'Pocket Orbit', landmark: [12.5, -6.4], approach: [12.3, -2.1],
    signHeight: 5.9, hit: [6.8, 4.4, 6.8],
  },
  hanzizap: {
    id: 'hanzizap', name: 'HanziZap', landmark: [13.15, 9.8], approach: [13.2, 13.7],
    signHeight: 5.13, hit: [5.8, 5.25, 4.4],
  },
  workshop: {
    id: 'workshop', name: 'Workshop', landmark: [-.4, -.4], approach: [.88, 6.05],
    signHeight: 8.2, hit: [8.5, 7.9, 6.4],
  },
  observatory: {
    id: 'observatory', name: 'Observatory', landmark: [-3.8, -13.5], approach: [-4.35, -10.2],
    signHeight: 6.9, hit: [4.4, 6.35, 4.65],
  },
};

export const routeBranches: readonly (readonly Point[])[] = [
  [[1.9, 19], arrival, [1.4, 11.6], [.15, 7.4], destinations.workshop.approach],
  [[.15, 7.4], [-4.8, 6.85], [-9.1, 4.65], [-11.9, 3.25], destinations['dream-ocean'].approach],
  [[.15, 7.4], [5.7, 6.6], [9.05, 3.95], [10.7, 1.1], destinations['pocket-orbit'].approach],
  [[5.7, 6.6], [7.35, 10.55], [10, 13.4], destinations.hanzizap.approach],
  [[-4.8, 6.85], [-6.95, 3.8], [-7.35, -.6], [-7.7, -4.4], [-7.2, -8.15], destinations.observatory.approach],
];
