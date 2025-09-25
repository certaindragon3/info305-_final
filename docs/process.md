### Hero Section照片选择
我为你预留了5个照片位置，你需要将照片放在以下路径：

  public/images/gallery/
  ├── dining-hall.jpg      # 传统用餐大厅
  ├── chef-work.jpg        # 厨师工作场景
  ├── chef-portrait.jpg    # 厨师肖像
  ├── interior.jpg         # 餐厅内饰
  └── cooking-process.jpg  # 烹饪过程

  照片建议尺寸：
  - 宽高比：4:5 (portrait orientation)
  - 推荐尺寸：800x1000px 或更高分辨率
  - 格式：JPG 或 PNG

### Photo Gallery Section 图片指南
本段落使用 Parallax Scroll 组件，需准备独立于 Hero Section 的素材，并按照以下说明放置：

  public/images/gallery/exhibition/
  ├── acheng-dining-room-01.jpg          # 用餐区氛围，展示桌椅与灯光
  ├── acheng-open-kitchen-01.jpg         # 开放式厨房或刀工细节
  ├── acheng-prep-station-01.jpg         # 备菜台与器具摆放
  ├── acheng-chef-action-01.jpg          # 主厨动态操作瞬间
  ├── acheng-family-table-01.jpg         # 家庭式圆桌共享场景
  ├── acheng-night-exterior-01.jpg       # 餐馆夜间外立面
  ├── acheng-dish-plating-01.jpg         # 菜品装盘特写
  ├── acheng-lotus-lanterns-01.jpg       # 苏式装饰或灯笼细节
  └── acheng-water-town-approach-01.jpg  # 水乡环境或街道氛围

素材建议：
- 保持 3:2 或 4:3 横向构图，单张 ≥ 1800px 宽，确保大屏展示清晰。
- 统一色调（暖色灯光 + 厨房不锈钢冷色调）以便滚动时形成叙事节奏。
- 文件命名固定，便于替换占位图时直接覆盖，无需改动代码。
- 如果暂缺完整 9 张，可先放置占位图，但应确保与 Hero Section 所用照片不重复。
- 上传后运行 `npm run dev`，确认滚动视差动画生效且图片加载正常。
