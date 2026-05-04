/**
 * ═══════════════════════════════════════════════════════════════
 * NARRATION DATA - Nội dung giọng kể
 * ═══════════════════════════════════════════════════════════════
 */

const NARRATIONS = {
  0: {
    phase: 'TOÀN CẢNH CHIẾN TRƯỜNG',
    sentences: [
      'Thung lũng Mường Thanh — một lòng chảo hình bầu dục dài hai mươi kilômét, rộng sáu kilômét, nằm giữa vùng núi rừng hiểm trở của Tây Bắc Việt Nam.',
      'Đây là nơi thực dân Pháp xây dựng tập đoàn cứ điểm mạnh nhất Đông Dương, với 49 cứ điểm, hơn 16.000 quân tinh nhuệ, pháo binh, xe tăng và máy bay.',
      'Tướng Nava tự hào gọi đây là "pháo đài bất khả xâm phạm". Nhưng họ đã lầm.',
      'Đại tướng Võ Nguyên Giáp đã đưa ra quyết định lịch sử: đánh chắc, tiến chắc — mở màn một chiến dịch kéo dài 55 ngày đêm bất tử.'
    ]
  },
  1: {
    phase: 'ĐỢT 1 · 13/3 – 17/3/1954',
    sentences: [
      'Đúng 17 giờ 5 phút ngày 13 tháng 3 năm 1954 — bốn mươi khẩu pháo cỡ nòng từ 75 đến 120 ly đồng loạt nhả đạn vào Him Lam.',
      'Him Lam — hay Béatrice theo tên Pháp — là cứ điểm kiên cố nhất cửa ngõ phía Bắc. Tiểu đoàn 3 Lê dương tinh nhuệ trấn giữ nơi đây.',
      'Đại đoàn 312 dũng mãnh tiến công. Đến 23 giờ đêm, Him Lam hoàn toàn im tiếng súng địch. Lá cờ đỏ sao vàng tung bay trên cứ điểm.',
      'Ngày 15 tháng 3, Đồi Độc Lập thất thủ. Ngày 17 tháng 3, lính người Thái ở Bản Kéo bỏ ngũ, rút về Mường Thanh. Phân khu Bắc bị xóa sổ hoàn toàn.',
      'Pirốt — Tư lệnh pháo binh Pháp — bất lực trước uy lực pháo binh của ta, đã dùng lựu đạn tự sát. Mường Thanh bắt đầu run rẩy.'
    ]
  },
  2: {
    phase: 'ĐỢT 2 · 30/3 – 30/4/1954',
    sentences: [
      'Đêm 30 tháng 3 năm 1954 — những mũi tiến công của Đại đoàn 316 đồng loạt đánh vào dãy đồi phía Đông: Eliane, Dominique, những điểm cao quyết định.',
      'Đây là đợt tấn công dai dẳng nhất, quyết liệt nhất, gay go nhất của toàn chiến dịch. Ta và địch giành giật nhau từng tấc đất, từng đoạn giao thông hào.',
      'Tại Đồi C1, quân ta và địch giằng co nhau tới 20 ngày. Tại Đồi A1 — điểm cao then chốt — cuộc chiến kéo dài tới 30 ngày đêm không dứt.',
      'Hệ thống chiến hào của ta bò dần từ chân núi, ngày qua ngày, siết chặt vòng vây, cắt đứt mọi đường tiếp tế của quân Pháp.',
      'Sân bay Mường Thanh tê liệt hoàn toàn. Quân địch rơi vào tình trạng bị động, mất tinh thần. Tướng Nava tuyệt vọng cầu cứu Washington và Paris.'
    ]
  },
  3: {
    phase: 'ĐỢT 3 · 1/5 – 7/5/1954 · TOÀN THẮNG',
    sentences: [
      'Ngày 1 tháng 5 năm 1954 — 17 giờ, tất cả các cỡ pháo của ta đồng loạt nhả đạn vào nhiều khu vực của tập đoàn cứ điểm. Một kho đạn 3.000 viên của địch nổ tung.',
      'Đêm 6 tháng 5, bộ đội ta kích nổ một khối thuốc nổ lớn đặt sâu dưới lòng Đồi A1. Tiếng nổ vang trời — rạng sáng 7 tháng 5, A1 hoàn toàn về tay ta.',
      'Những đường hào thọc sâu trên cánh đồng phía Tây nhắm thẳng về hầm De Castries. Tập đoàn cứ điểm bị dồn lại trong cái ô vuông cuối cùng.',
      'Chiều 7 tháng 5 năm 1954 — 17 giờ 30 phút — Tướng De Castries cùng toàn bộ Bộ Tham mưu ra hàng. Lá cờ đỏ sao vàng tung bay trên nóc hầm chỉ huy.',
      'Năm mươi lăm ngày đêm kiên cường chiến đấu kết thúc. Chín nghìn tù binh Pháp. Chiến thắng Điện Biên Phủ — chấn động địa cầu — mãi mãi là niềm tự hào bất diệt của dân tộc Việt Nam!'
    ]
  }
};

// Keywords để highlight trong narrator
const NARRATOR_KEYWORDS = [
  'Him Lam',
  'Độc Lập',
  'Bản Kéo',
  'De Castries',
  'Đồi A1',
  'Võ Nguyên Giáp',
  'Điện Biên Phủ',
  'lá cờ đỏ sao vàng',
  'Tổng tấn công',
  '55 ngày đêm',
  '17 giờ 30 phút'
];
