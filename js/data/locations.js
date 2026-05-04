/**
 * ═══════════════════════════════════════════════════════════════
 * LOCATION DATA - Các địa điểm lịch sử
 * ═══════════════════════════════════════════════════════════════
 */

const LOCATIONS = [
  // Sở chỉ huy
  {
    id: 'HQ',
    name: 'Hầm De Castries (Sở chỉ huy)',
    desc: 'Trung tâm chỉ huy tập đoàn cứ điểm. Bờ Tây sông Nậm Rốm. Thất thủ 7/5/1954 lúc 17:30.',
    x: -1.5,
    z: 0.5,
    h: -1.8,
    type: 'hq',
    color: '#e53e3e',
    size: 10
  },
  
  // Cứ điểm phía Đông
  {
    id: 'E1',
    name: 'Đồi E1 (Eliane 1)',
    desc: 'Cứ điểm bờ Đông sông Nậm Rốm. Bị tiến công đợt 2.',
    x: 3.8,
    z: -0.5,
    h: 0.5,
    type: 'fp',
    color: '#dd6b20',
    size: 7
  },
  {
    id: 'D1',
    name: 'Đồi D1 (Dominique 1)',
    desc: 'Phía Đông Bắc trung tâm. Bị đánh chiếm đêm 30/3.',
    x: 4.5,
    z: -1.5,
    h: 0.8,
    type: 'fp',
    color: '#dd6b20',
    size: 7
  },
  {
    id: 'D3',
    name: 'Đồi D3 (Dominique 3)',
    desc: 'Cứ điểm Đông Bắc. Bị chiếm cùng đợt D1.',
    x: 3.5,
    z: -1.8,
    h: 0.5,
    type: 'fp',
    color: '#dd6b20',
    size: 6
  },
  {
    id: 'C1',
    name: 'Đồi C1 (Eliane 4)',
    desc: 'Chiến đấu ác liệt đợt 2. Giằng co 20 ngày.',
    x: 4.2,
    z: 0.8,
    h: 0.6,
    type: 'fp',
    color: '#dd6b20',
    size: 7
  },
  {
    id: 'A1',
    name: 'Đồi A1 (Eliane 2) – "Tử huyệt"',
    desc: 'Cứ điểm quan trọng nhất phía Đông. Chiến đấu 30 ngày. Thất thủ rạng sáng 7/5.',
    x: 4.0,
    z: 1.5,
    h: 0.9,
    type: 'fp',
    color: '#c05030',
    size: 8
  },
  {
    id: 'A2',
    name: 'Đồi A2',
    desc: 'Cứ điểm phía Đông Nam.',
    x: 2.8,
    z: 2.2,
    h: 0.3,
    type: 'fp',
    color: '#dd6b20',
    size: 6
  },
  {
    id: 'A3',
    name: 'Đồi A3',
    desc: 'Gần trung tâm Mường Thanh, phía Đông.',
    x: 2.0,
    z: 1.5,
    h: 0.2,
    type: 'fp',
    color: '#dd6b20',
    size: 6
  },
  {
    id: 'D2',
    name: 'Đồi D2 (Dominique 2)',
    desc: 'Án ngữ phía Đông sân bay.',
    x: 2.5,
    z: -0.8,
    h: 0.4,
    type: 'fp',
    color: '#dd6b20',
    size: 6
  },
  
  // Cứ điểm phía Bắc
  {
    id: 'HL',
    name: 'Him Lam (Béatrice)',
    desc: 'Cứ điểm đầu tiên bị tiêu diệt. Đêm 13/3/1954. Đại đoàn 312 tiến công.',
    x: 4,
    z: -6.5,
    h: 2.2,
    type: 'fp',
    color: '#dd6b20',
    size: 8
  },
  {
    id: 'DL',
    name: 'Đồi Độc Lập (Gabrielle)',
    desc: 'Bị tiêu diệt ngày 15/3/1954. Đại đoàn 308.',
    x: -1,
    z: -8,
    h: 2.0,
    type: 'fp',
    color: '#dd6b20',
    size: 8
  },
  {
    id: 'BK',
    name: 'Bản Kéo (Anne-Marie)',
    desc: 'Lính người Thái bỏ ngũ rút lui 17/3/1954.',
    x: -5,
    z: -5.5,
    h: 1.5,
    type: 'fp',
    color: '#dd6b20',
    size: 7
  },
  
  // Phân khu Nam
  {
    id: 'HC',
    name: 'Hồng Cúm (Isabelle)',
    desc: 'Phân khu Nam. Sân bay phụ. Bị bao vây và tiêu diệt đợt 3.',
    x: 1,
    z: 12,
    h: -1.5,
    type: 'fp',
    color: '#dd6b20',
    size: 8
  },
  
  // Sân bay
  {
    id: 'APM',
    name: 'Sân bay Mường Thanh',
    desc: 'Sân bay chính – tê liệt hoàn toàn từ đợt 1.',
    x: -1,
    z: -2,
    h: -1.85,
    type: 'airport',
    color: '#718096',
    size: 5
  },
  {
    id: 'APH',
    name: 'Sân bay Hồng Cúm',
    desc: 'Sân bay phụ – tiếp tế cuối cùng của Pháp.',
    x: 1.5,
    z: 10.5,
    h: -1.6,
    type: 'airport',
    color: '#718096',
    size: 4
  },
  
  // Làng mạc
  {
    id: 'MT',
    name: 'Mường Thanh',
    desc: 'Trung tâm thung lũng.',
    x: -1.2,
    z: 0,
    h: -1.85,
    type: 'village',
    color: '#a0aec0',
    size: 4
  },
  {
    id: 'BB',
    name: 'Bản Ban',
    desc: 'Làng phía Tây.',
    x: -4,
    z: 1,
    h: -1.5,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  {
    id: 'BHL',
    name: 'Bản Hồng Lại',
    desc: 'Làng phía Đông Nam.',
    x: 4.5,
    z: 3,
    h: -0.5,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  {
    id: 'BT',
    name: 'Bản Ten',
    desc: 'Làng phía Đông Nam.',
    x: 2,
    z: 6,
    h: -1.2,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  {
    id: 'BMe',
    name: 'Bản Me',
    desc: 'Làng phía Tây Nam.',
    x: -5,
    z: 5,
    h: -0.8,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  {
    id: 'BLN',
    name: 'Bản Long Nhai',
    desc: 'Làng phía Nam.',
    x: -2,
    z: 8,
    h: -1.3,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  {
    id: 'BNK',
    name: 'Bản Na Khua',
    desc: 'Làng phía Tây Nam.',
    x: -6,
    z: 7,
    h: -0.5,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  {
    id: 'BMo',
    name: 'Bản Mơ',
    desc: 'Làng phía Nam gần Hồng Cúm.',
    x: -3,
    z: 11,
    h: -1.0,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  {
    id: 'BSo',
    name: 'Bản Sơm',
    desc: 'Làng phía Nam.',
    x: 3,
    z: 13,
    h: -0.8,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  {
    id: 'BTP',
    name: 'Bản Ta Po',
    desc: 'Làng phía Bắc.',
    x: 1,
    z: -9,
    h: 0.5,
    type: 'village',
    color: '#a0aec0',
    size: 3
  },
  
  // Vị trí quân ta
  {
    id: 'VN1',
    name: 'Đại đoàn 312 – Him Lam',
    desc: 'Tiến công Him Lam đêm 13/3.',
    x: 7,
    z: -9,
    h: 2,
    type: 'viet',
    color: '#3b82f6',
    size: 6
  },
  {
    id: 'VN2',
    name: 'Đại đoàn 308 – Độc Lập',
    desc: 'Tiến công Độc Lập ngày 15/3.',
    x: -5,
    z: -11,
    h: 2.5,
    type: 'viet',
    color: '#3b82f6',
    size: 6
  },
  {
    id: 'VN3',
    name: 'Đại đoàn 316 – Hướng Đông',
    desc: 'Tiến công các đồi phía Đông đợt 2–3.',
    x: 10,
    z: 1,
    h: 3,
    type: 'viet',
    color: '#3b82f6',
    size: 6
  },
  {
    id: 'VN4',
    name: 'Đại đoàn 304 – Hướng Nam',
    desc: 'Bao vây Hồng Cúm, tiêu diệt đợt 3.',
    x: 0,
    z: 15,
    h: 1,
    type: 'viet',
    color: '#3b82f6',
    size: 6
  },
  {
    id: 'VN5',
    name: 'Đại đoàn 351 – Pháo binh',
    desc: 'Pháo binh và công binh trên các điểm cao.',
    x: -9,
    z: -3,
    h: 4,
    type: 'viet',
    color: '#3b82f6',
    size: 5
  }
];
