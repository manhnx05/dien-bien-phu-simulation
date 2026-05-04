/**
 * ═══════════════════════════════════════════════════════════════
 * ROUTES DATA - Các tuyến đường tiến công
 * ═══════════════════════════════════════════════════════════════
 */

const ROUTES = [
  // Đợt 1: Tiến công phía Bắc
  {
    phase: 1,
    color: '#f6e05e',
    w: 3,
    label: 'ĐĐ 312→Him Lam',
    pts: [
      { x: 7, z: -9 },
      { x: 5.5, z: -8 },
      { x: 4.5, z: -7 },
      { x: 4, z: -6.5 }
    ]
  },
  {
    phase: 1,
    color: '#f6e05e',
    w: 2.5,
    label: 'ĐĐ 308→Độc Lập',
    pts: [
      { x: -4, z: -11 },
      { x: -2, z: -9.5 },
      { x: -1, z: -8 }
    ]
  },
  {
    phase: 1,
    color: '#f6e05e',
    w: 2,
    label: '→Bản Kéo',
    pts: [
      { x: -8, z: -7 },
      { x: -6.5, z: -6.5 },
      { x: -5, z: -5.5 }
    ]
  },
  {
    phase: 1,
    color: '#9ca3af',
    w: 1.5,
    dash: true,
    label: 'Pháp rút lui',
    pts: [
      { x: -5, z: -5.5 },
      { x: -3, z: -4 },
      { x: -1.5, z: -2 },
      { x: -1.5, z: 0.5 }
    ]
  },
  
  // Đợt 2: Tiến công phía Đông
  {
    phase: 2,
    color: '#fb923c',
    w: 3,
    label: '→A1,C1',
    pts: [
      { x: 10, z: 0 },
      { x: 7, z: 0.5 },
      { x: 5.5, z: 1 },
      { x: 4, z: 1.5 }
    ]
  },
  {
    phase: 2,
    color: '#fb923c',
    w: 2.5,
    label: '→E1,D3',
    pts: [
      { x: 9, z: -2 },
      { x: 6.5, z: -1.5 },
      { x: 5, z: -1 },
      { x: 3.8, z: -0.5 }
    ]
  },
  {
    phase: 2,
    color: '#fb923c',
    w: 2,
    label: '→D1',
    pts: [
      { x: 8, z: -3 },
      { x: 6, z: -2.5 },
      { x: 5, z: -2 },
      { x: 4.5, z: -1.5 }
    ]
  },
  {
    phase: 2,
    color: '#a855f7',
    w: 1.5,
    dash: true,
    label: 'Hào vây lấn',
    pts: [
      { x: 8, z: -1 },
      { x: 6, z: 0 },
      { x: 5.5, z: 1 },
      { x: 5, z: 2.5 },
      { x: 4.5, z: 3.5 }
    ]
  },
  {
    phase: 2,
    color: '#a855f7',
    w: 1.5,
    dash: true,
    pts: [
      { x: 6, z: -3 },
      { x: 5, z: -2 },
      { x: 4.8, z: -1 },
      { x: 4.5, z: -0.5 }
    ]
  },
  
  // Đợt 3: Tổng công kích
  {
    phase: 3,
    color: '#ef4444',
    w: 3.5,
    label: 'Tổng công kích→De Castries',
    pts: [
      { x: 4, z: 1.5 },
      { x: 3, z: 1.2 },
      { x: 1.5, z: 0.8 },
      { x: 0, z: 0.6 },
      { x: -1.5, z: 0.5 }
    ]
  },
  {
    phase: 3,
    color: '#ef4444',
    w: 3,
    label: 'Từ A1 vượt sông',
    pts: [
      { x: 4.2, z: 0.8 },
      { x: 2.5, z: 0.7 },
      { x: 0.5, z: 0.6 },
      { x: -1.5, z: 0.5 }
    ]
  },
  {
    phase: 3,
    color: '#ef4444',
    w: 2.5,
    label: 'Phía Bắc xuống',
    pts: [
      { x: 0, z: -4 },
      { x: -0.5, z: -2 },
      { x: -1, z: -0.5 },
      { x: -1.5, z: 0.5 }
    ]
  },
  {
    phase: 3,
    color: '#ef4444',
    w: 2,
    label: 'Phía Nam lên',
    pts: [
      { x: -1, z: 4 },
      { x: -1.2, z: 2.5 },
      { x: -1.5, z: 1.5 },
      { x: -1.5, z: 0.5 }
    ]
  },
  {
    phase: 3,
    color: '#f87171',
    w: 2.5,
    label: 'Bao vây Hồng Cúm',
    pts: [
      { x: -3, z: 14 },
      { x: -1, z: 13 },
      { x: 1, z: 12 }
    ]
  },
  {
    phase: 3,
    color: '#f87171',
    w: 2,
    pts: [
      { x: 5, z: 14 },
      { x: 3, z: 13 },
      { x: 1, z: 12 }
    ]
  },
  {
    phase: 3,
    color: '#f87171',
    w: 2,
    pts: [
      { x: 2, z: 8 },
      { x: 1.5, z: 10 },
      { x: 1, z: 12 }
    ]
  }
];
