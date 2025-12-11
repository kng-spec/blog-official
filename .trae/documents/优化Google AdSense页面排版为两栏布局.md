## 优化计划：将5个content-section在电脑端设置为两栏布局

### 分析当前结构
1. 当前`main-content`容器包含5个垂直堆叠的`content-section`
2. 每个`content-section`占据100%宽度，包含标题和内容
3. 已有的响应式设计需要保留

### 实现方案
1. **修改main-content容器**：将其改为弹性布局或网格布局
2. **设置content-section宽度**：在电脑端设置为约48%宽度，预留间距
3. **添加响应式设计**：确保在移动端仍为单列布局
4. **调整间距和对齐**：优化两栏布局的美观度

### 具体修改点
1. **CSS样式修改**：
   - 为`main-content`添加`display: grid`或`display: flex`
   - 添加`grid-template-columns: 1fr 1fr`或`flex-wrap: wrap`
   - 为`content-section`添加`width: 48%`或`flex: 0 0 48%`
   - 添加`gap`或`margin`控制间距
   - 添加媒体查询确保移动端单列

2. **HTML结构调整**：
   - 无需修改HTML结构，仅通过CSS实现布局变化

### 预期效果
- 电脑端：5个content-section呈两栏布局，前4个各占一行两列，第5个独占一行
- 移动端：保持原有单列布局
- 保持现有样式和响应式设计不变

### 实施步骤
1. 查看当前`main-content`和`content-section`的CSS样式
2. 添加两栏布局的CSS规则
3. 测试响应式效果
4. 调整间距和对齐方式
5. 确保所有内容正常显示