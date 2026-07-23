import React from 'react';

interface RadarAxis {
  label: string;
  val: number;
  max: number;
}

interface RadarTabProps {
  radarAxes: RadarAxis[];
}

export function RadarTab({ radarAxes }: Readonly<RadarTabProps>) {
  // SVG Radar Points calculation
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const totalAxes = radarAxes.length;

  const getCoordinates = (index: number, valuePercent: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (valuePercent / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const radarPoints = radarAxes.map((axis, i) => {
    const coords = getCoordinates(i, axis.val);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6 animate-fade-in">
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Concentric Grid Circles */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((level) => (
            <circle
              key={level}
              cx={center}
              cy={center}
              r={radius * level}
              fill="none"
              stroke="#e2e8f0"
              strokeDasharray="3 3"
            />
          ))}

          {/* Radial Axis Lines */}
          {radarAxes.map((_, i) => {
            const coords = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={coords.x}
                y2={coords.y}
                stroke="#cbd5e1"
                strokeWidth="1"
              />
            );
          })}

          {/* Polygon Data Fill */}
          <polygon
            points={radarPoints}
            fill="rgba(249, 115, 22, 0.25)"
            stroke="#f97316"
            strokeWidth="2.5"
            className="transition-all duration-500"
          />

          {/* Data Points */}
          {radarAxes.map((axis, i) => {
            const coords = getCoordinates(i, axis.val);
            return (
              <circle
                key={i}
                cx={coords.x}
                cy={coords.y}
                r="4"
                fill="#f97316"
                stroke="#ffffff"
                strokeWidth="2"
              />
            );
          })}

          {/* Axis Labels */}
          {radarAxes.map((axis, i) => {
            const coords = getCoordinates(i, 118);
            return (
              <text
                key={i}
                x={coords.x}
                y={coords.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[11px] font-bold fill-slate-700"
              >
                {axis.label} ({axis.val})
              </text>
            );
          })}
        </svg>
      </div>

      {/* Metric Breakdown Table */}
      <div className="w-full md:w-1/2 space-y-3">
        <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
          📊 สรุปดรรชนีสมรรถนะ Shoelab Spider Metric
        </h4>
        <div className="space-y-2">
          {radarAxes.map((axis) => (
            <div key={axis.label} className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">{axis.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-orange-500 h-full rounded-full"
                    style={{ width: `${axis.val}%` }}
                  />
                </div>
                <span className="font-extrabold text-slate-800 w-8 text-right">{axis.val}/100</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
