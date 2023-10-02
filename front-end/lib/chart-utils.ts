export const gradientFunction = (context: any) => {
  if (!context.chart.chartArea) return;
  const {
    ctx,
    data,
    chartArea: { top, bottom },
  } = context.chart;
  const gradient = ctx.createLinearGradient(0, top, 0, bottom);
  gradient.addColorStop(0, "#552586");
  gradient.addColorStop(1, "#B589D600");
  return gradient;
};
