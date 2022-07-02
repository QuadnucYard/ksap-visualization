# 东南大学考试周可视化

展示考试周每个场次每个科目的人数分布和教室安排情况。

使用 $\texttt{Vite}+\texttt{高贵的 vanilla.js}+\texttt{Apache Echarts}$ 搭建。

数据来自官方考试信息，不包括部分未正式安排的考试。由于作者不了解其他校区的教室，这里只展示了湖区教学楼的考场情况。

（旧）`assets/ksap.json` 为已安排考试数据。用拼音首字母是为了尊重学校系统而非作者不懂英语。  
（新）`assets/ksap.dat` 为使用 $\texttt{pako.js}$ 压缩后的所有考试数据，查看时需解压。

默认按空格键启动动画。可在 `src/scripts/config.ts` 编辑几个参数：
- `KSDM`：采用的考试代码，对应 `ksap.json`。
- `startkey`：动画开始按键。动画结束前再次按无效。
- `endKey`：动画停止按键。
- `timeout`：动画初始延迟。
- `interval`：动画切换间隔。

图表配置见 `***-chart.ts`。

已配置好打包相关参数，可部署（未经部署测试）。

因为没装 $\texttt{jQuery}$ 或 $\texttt{Vue}$，就不做 UI 了