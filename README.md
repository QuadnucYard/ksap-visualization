# 东南大学考试周可视化

展示考试周每个场次每个科目的人数分布和教室安排情况。

使用 $\texttt{Vite}+\texttt{高贵的vanilla.js}+\texttt{Apache Echarts}$ 搭建。

数据来自官方考试信息，不包括部分未正式安排的考试。由于作者不了解其他校区的教室，这里只展示了湖区教学楼的考场情况。

`assets/ksap.json` 为已安排考试数据。用拼音首字母是为了尊重学校系统而非作者不懂英语。

默认按空格键启动动画（请勿尝试反复按）。可在 `src/scripts/config.ts` 编辑几个参数：
- `KSDM`：采用的考试代码，对应 `ksap.json`。
- `timeout`：初始延迟。
- `interval`：切换间隔。

图表配置见 `***-chart.ts`。