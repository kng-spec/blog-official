## 解决方案：调整移动端内容容器宽度

### 问题分析

当前在移动端（屏幕宽度≤768px），内容容器没有占满整个页面宽度，主要原因是`.main-content`类在移动端设置了左右内边距（padding-left和padding-right各20px），导致其内部的`.content-container`无法完全伸展。

### 解决方案

修改`krak.html`文件中`max-width: 768px`媒体查询内的`.main-content`样式，将左右内边距调整为0，同时保留上下内边距以维持页面布局。

### 具体修改

1. 找到文件中`@media (max-width: 768px)`媒体查询部分
2. 将`.main-content`的`padding`属性从`30px 20px 50px`修改为`30px 0 50px`

### 预期效果

* 移动端下，`.content-container`将占满整个页面宽度

* 由于`.content-container`本身仍保留`padding: 30px`，内部内容会保持适当的间距，不会紧贴屏幕边缘

* 页面整体布局更加紧凑，符合移动端用户体验

