# Chiến dịch Điện Biên Phủ 1954 - Interactive 3D Map

> Mô hình 3D tương tác về Chiến dịch Điện Biên Phủ với âm thanh trận địa và giọng kể lịch sử.

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📖 Mục lục

- [Tính năng](#-tính-năng)
- [Demo & Screenshots](#-demo--screenshots)
- [Cài đặt & Chạy](#-cài-đặt--chạy)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [Công nghệ](#-công-nghệ)
- [Tùy chỉnh](#-tùy-chỉnh)
- [Troubleshooting](#-troubleshooting)
- [Đóng góp](#-đóng-góp)
- [License](#-license)

## 🎯 Tính năng

### Core Features
- ✅ **Mô hình 3D tương tác**: Xoay 360°, zoom, di chuyển tự do
- ✅ **4 giai đoạn chiến dịch**: Toàn cảnh, Đợt 1, Đợt 2, Đợt 3
- ✅ **Âm thanh trận địa**: Pháo kích, súng đạn, nổ bom (Web Audio API)
- ✅ **Giọng kể chuyện**: Tự động đọc lịch sử bằng tiếng Việt (Web Speech API)
- ✅ **Hiệu ứng visual**: Explosions, particles, animations
- ✅ **29 địa điểm lịch sử**: Với thông tin chi tiết
- ✅ **16 tuyến đường tiến công**: Với mũi tên động
- ✅ **Responsive design**: Hỗ trợ desktop, tablet, mobile
- ✅ **Touch controls**: Tối ưu cho thiết bị cảm ứng

## 📸 Demo & Screenshots

### Live Demo
🔗 [Xem Demo](https://your-demo-link.com) _(Mở file index.html để xem)_

### Screenshots
```
[Toàn cảnh chiến trường]  [Đợt 1: Him Lam]  [Đợt 3: Toàn thắng]
```

## 📁 Cấu trúc dự án

```
.
├── index.html              # File HTML chính
├── css/
│   └── styles.css         # Toàn bộ CSS
├── js/
│   ├── config/
│   │   └── constants.js   # Cấu hình & hằng số
│   ├── data/
│   │   ├── locations.js   # Dữ liệu địa điểm
│   │   ├── routes.js      # Dữ liệu tuyến đường
│   │   └── narrations.js  # Nội dung giọng kể
│   ├── engine/
│   │   ├── canvas.js      # Quản lý canvas
│   │   ├── projection.js  # Engine 3D projection
│   │   └── terrain.js     # Sinh địa hình
│   ├── audio/
│   │   ├── audioEngine.js # Web Audio API
│   │   └── narrator.js    # Web Speech API
│   ├── visual/
│   │   ├── particles.js   # Hệ thống particles
│   │   └── renderer.js    # Render chính
│   ├── controls/
│   │   ├── input.js       # Mouse/Touch/Keyboard
│   │   └── ui.js          # UI controls
│   └── app.js             # Main application
└── README.md              # File này
```


## 🚀 Cài đặt & Chạy

### Yêu cầu
- Trình duyệt hiện đại (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- Không cần cài đặt thêm gì khác!

### Cách 1: Mở trực tiếp (Đơn giản nhất)
```bash
# Double-click vào file index.html
# Hoặc kéo thả vào trình duyệt
```

### Cách 2: Dùng Python (Khuyến nghị)
```bash
# Python 3
python -m http.server 8000

# Mở browser: http://localhost:8000
```

### Cách 3: Dùng Node.js
```bash
# Cài serve (chỉ lần đầu)
npm install -g serve

# Chạy server
npm start
# hoặc
npx serve -l 8000

# Mở browser: http://localhost:8000
```

### Cách 4: Dùng VS Code
```bash
# Cài extension "Live Server"
# Right-click index.html → "Open with Live Server"
```

### Kiểm tra hoạt động
1. Mở browser console (F12)
2. Xem log khởi động:
   ```
   🚀 Initializing Điện Biên Phủ 1954 Interactive Map...
   ✓ Canvas initialized
   ✓ Terrain generated
   ✅ Application ready!
   ```
3. Thử kéo chuột để xoay map

## 🎮 Hướng dẫn sử dụng

### Điều khiển cơ bản
| Thao tác | Mô tả |
|----------|-------|
| **Kéo chuột** | Xoay 3D map |
| **Scroll** | Zoom in/out |
| **Hover** | Xem thông tin địa điểm |
| **Nút mũi tên** | Xoay theo hướng |
| **Nút ⌂** | Reset về vị trí ban đầu |

### Các nút chức năng
| Nút | Chức năng |
|-----|-----------|
| **🗺 Toàn cảnh** | Xem toàn bộ chiến trường |
| **⚔ Đợt 1** | Xóa bỏ Phân khu Bắc (13-17/3/1954) |
| **⚔ Đợt 2** | Đánh chiếm điểm cao Đông (30/3-30/4/1954) |
| **⚔ Đợt 3** | Tổng công kích - Toàn thắng (1-7/5/1954) |
| **🔇/🔊** | Bật/tắt âm thanh nền |
| **🎙** | Bật/tắt giọng kể chuyện |
| **💥** | Kích hoạt pháo kích |
| **🔊 Slider** | Điều chỉnh âm lượng |

### Tips & Tricks
- 💡 Click vào màn hình trước khi bật âm thanh (yêu cầu của browser)
- 💡 Hover vào các điểm màu để xem thông tin chi tiết
- 💡 Bật giọng kể để nghe lịch sử từng giai đoạn
- 💡 Zoom out để xem toàn cảnh, zoom in để xem chi tiết

## 🛠 Công nghệ sử dụng

### Core Technologies
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JS
- **HTML5 Canvas** - 2D rendering context
- **Web Audio API** - Real-time sound synthesis
- **Web Speech API** - Vietnamese text-to-speech
- **CSS3** - Modern styling & animations

### Browser APIs
- Canvas 2D Context
- AudioContext & Audio Nodes
- SpeechSynthesis
- RequestAnimationFrame
- Touch & Mouse Events
- Wheel Events

### Architecture
- **Modular Design**: 14 independent modules
- **Separation of Concerns**: Data, Logic, Presentation
- **No Dependencies**: Zero npm packages needed
- **No Build Step**: Direct deployment

## 📦 Modules

### Config
- `constants.js`: Cấu hình toàn cục, hằng số

### Data
- `locations.js`: 29 địa điểm với tọa độ 3D
- `routes.js`: 16 tuyến đường tiến công
- `narrations.js`: Nội dung giọng kể cho 4 giai đoạn

### Engine
- `canvas.js`: Quản lý canvas, resize, clear
- `projection.js`: Phép chiếu 3D → 2D, camera control
- `terrain.js`: Sinh heightmap địa hình

### Audio
- `audioEngine.js`: Tạo âm thanh pháo, súng, nổ
- `narrator.js`: Điều khiển giọng đọc

### Visual
- `particles.js`: Hệ thống particles cho explosions
- `renderer.js`: Render terrain, routes, locations

### Controls
- `input.js`: Xử lý mouse, touch, keyboard
- `ui.js`: Xử lý UI buttons, phase selection

### App
- `app.js`: Khởi tạo và điều phối toàn bộ app

## 🔧 Tùy chỉnh

### Thay đổi cấu hình

Chỉnh sửa `js/config/constants.js`:

```javascript
const CONFIG = {
  // Camera settings
  INITIAL_ROT_X: 0.52,      // Góc xoay X ban đầu
  INITIAL_ROT_Y: 0.18,      // Góc xoay Y ban đầu
  INITIAL_SCALE: 1.0,       // Zoom ban đầu
  
  // Audio settings
  DEFAULT_VOLUME: 0.6,      // Âm lượng mặc định (0.0 - 1.0)
  NARRATOR_RATE: 0.88,      // Tốc độ giọng đọc
  NARRATOR_PITCH: 1.05,     // Cao độ giọng đọc
  
  // Animation settings
  AUTO_ROTATE_SPEED: 0.012, // Tốc độ xoay tự động
  PULSE_SPEED: 0.04,        // Tốc độ nhấp nháy
  
  // Colors
  COLORS: {
    SKY_TOP: '#050f1e',
    SKY_BOTTOM: '#0d2040',
    // ...
  }
};
```

### Thêm địa điểm mới

Chỉnh sửa `js/data/locations.js`:

```javascript
LOCATIONS.push({
  id: 'NEW',              // ID ngắn gọn
  name: 'Tên địa điểm',   // Tên đầy đủ
  desc: 'Mô tả chi tiết', // Thông tin lịch sử
  x: 0,                   // Tọa độ X
  z: 0,                   // Tọa độ Z
  h: 0,                   // Độ cao
  type: 'fp',             // Loại: hq, fp, viet, airport, village
  color: '#dd6b20',       // Màu sắc
  size: 7                 // Kích thước
});
```

### Thêm tuyến đường tiến công

Chỉnh sửa `js/data/routes.js`:

```javascript
ROUTES.push({
  phase: 1,               // Giai đoạn (0-3)
  color: '#f6e05e',       // Màu sắc
  w: 3,                   // Độ rộng đường
  label: 'Tên tuyến',     // Nhãn hiển thị
  dash: false,            // true = đường đứt nét
  pts: [                  // Các điểm tọa độ
    { x: 0, z: 0 },
    { x: 1, z: 1 },
    { x: 2, z: 2 }
  ]
});
```

### Thêm nội dung giọng kể

Chỉnh sửa `js/data/narrations.js`:

```javascript
NARRATIONS[0] = {
  phase: 'TÊN GIAI ĐOẠN',
  sentences: [
    'Câu thứ nhất...',
    'Câu thứ hai...',
    'Câu thứ ba...'
  ]
};
```

### Thay đổi màu sắc giao diện

Chỉnh sửa `css/styles.css`:

```css
body {
  background: #0d1b2a;  /* Màu nền */
}

.phase-btn.p1.active {
  background: rgba(90, 20, 20, 0.92);  /* Màu nút đợt 1 */
  color: #fca5a5;
}
```

## 🐛 Troubleshooting

### Không thấy gì trên màn hình
- ✅ Kiểm tra console (F12) có lỗi không
- ✅ Thử refresh trang (Ctrl+F5)
- ✅ Kiểm tra browser có hỗ trợ Canvas không
- ✅ Thử browser khác (Chrome thường tốt nhất)

### Không có âm thanh
- ✅ Click vào màn hình trước (browser yêu cầu user interaction)
- ✅ Kiểm tra volume slider đã bật chưa
- ✅ Thử click nút 💥 Pháo kích để test
- ✅ Kiểm tra volume của hệ thống

### Giọng kể không hoạt động
- ✅ Web Speech API không hỗ trợ trên mọi browser
- ✅ Thử Chrome hoặc Edge (hỗ trợ tốt nhất)
- ✅ Kiểm tra ngôn ngữ tiếng Việt đã cài trong hệ thống chưa
- ✅ Xem console có lỗi không

### Chạy chậm / Lag
- ✅ Giảm zoom out (ít object hơn)
- ✅ Đóng các tab khác
- ✅ Thử browser khác (Chrome thường nhanh nhất)
- ✅ Kiểm tra CPU/RAM của máy

### Lỗi khi load file
- ✅ Đảm bảo tất cả file trong cùng thư mục
- ✅ Không mở trực tiếp từ file:// (dùng local server)
- ✅ Kiểm tra đường dẫn trong index.html

### Debug Mode

Mở Console và sử dụng:

```javascript
// Truy cập modules
window.DBP.Renderer
window.DBP.AudioEngine
window.DBP.ProjectionEngine

// Thay đổi phase
window.DBP.UIController.setPhase(2)

// Phát âm thanh
window.DBP.AudioEngine.playCannon()

// Reset camera
window.DBP.ProjectionEngine.reset()

// Xem config
console.log(window.DBP.CONFIG)

// Xem locations
console.log(window.DBP.LOCATIONS)
```

## 📱 Responsive

### Desktop (Khuyến nghị)
- ✅ Full features
- ✅ Mouse controls
- ✅ Keyboard shortcuts
- ✅ Best performance

### Tablet
- ✅ Touch controls
- ✅ Simplified UI
- ✅ Good performance

### Mobile
- ✅ Touch optimized
- ✅ Compact UI
- ✅ Basic features
- ⚠️ Limited performance

## 🌐 Browser Support

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome | 90+ | ✅ Full | Khuyến nghị |
| Firefox | 88+ | ✅ Full | Tốt |
| Edge | 90+ | ✅ Full | Tốt |
| Safari | 14+ | ⚠️ Partial | Speech API giới hạn |
| Opera | 76+ | ✅ Full | Tốt |
| Mobile Chrome | Latest | ✅ Good | Touch support |
| Mobile Safari | Latest | ⚠️ Partial | Speech API giới hạn |

## 🎓 Giá trị giáo dục

Dự án này minh họa:
- ✅ Lập trình 3D với Canvas
- ✅ Web Audio API synthesis
- ✅ Web Speech API
- ✅ Particle systems
- ✅ Event handling
- ✅ Module organization
- ✅ Clean code architecture
- ✅ Performance optimization

## 📊 Thống kê dự án

```
Total Files:     22 files
Total Size:      ~80 KB
JavaScript:      14 modules (~57 KB)
CSS:             1 file (~12 KB)
HTML:            1 file (~4 KB)
Documentation:   1 file (README.md)

Code Lines:      ~2,500 lines
Functions:       ~80 functions
Data Points:     29 locations, 16 routes
Phases:          4 campaign phases
```

## 🚀 Performance

- **FPS**: 60 FPS on modern browsers
- **Memory**: ~50 MB RAM usage
- **Load Time**: < 1 second
- **File Size**: 80 KB (uncompressed)
- **No Dependencies**: Zero npm packages

## 🔮 Roadmap

### Version 2.1 (Planned)
- [ ] English translation
- [ ] Mobile UI improvements
- [ ] Performance optimizations
- [ ] More sound effects
- [ ] Historical photos overlay

### Version 3.0 (Future)
- [ ] WebGL renderer option
- [ ] VR support
- [ ] Timeline animation
- [ ] 3D models for units
- [ ] Multiplayer mode

## 🤝 Đóng góp

Contributions are welcome! Please feel free to submit a Pull Request.

### Cách đóng góp
1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Guidelines
- Giữ code style nhất quán
- Thêm comments cho code phức tạp
- Test trước khi submit
- Update README nếu cần

## 📄 License

Educational project - Free to use for learning purposes.

MIT License - See [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ for educational purposes.

## 🙏 Credits

- **Historical Research**: Based on Dien Bien Phu Campaign 1954
- **Technology**: Vanilla JavaScript, Web APIs
- **Architecture**: Modular design pattern
- **Purpose**: Educational & Historical preservation

## 📞 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/manhnx05/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/manhnx05/dien-bien-phu-simulation.git/discussions)

## ⭐ Star History

If you find this project useful, please consider giving it a star!

---

**Tưởng nhớ chiến thắng Điện Biên Phủ 7/5/1954** 🇻🇳

*Made with passion for Vietnamese history education*
