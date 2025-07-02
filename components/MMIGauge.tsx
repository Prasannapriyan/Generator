import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface MMIGaugeProps {
  value: number;
}

const MMIGauge: React.FC<MMIGaugeProps> = ({ value }) => {
  const data = [
    { name: 'Fear', value: 50 },
    { name: 'Greed', value: 50 },
  ];

  const needleValue = value;
  const totalValue = 100;

  const needleAngle = 180 * (needleValue / totalValue);

  const getMood = (val: number) => {
    if (val < 30) return 'Extreme Fear';
    if (val < 50) return 'Fear';
    if (val < 70) return 'Greed';
    return 'Extreme Greed';
  }

  const mood = getMood(value);
  const moodColor = mood.includes('Fear') ? 'text-brand-red' : 'text-brand-green';

  return (
    <div className="relative w-64 h-48 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="#F87171" />
            <Cell fill="#34D399" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        className="absolute bottom-14 w-0.5 h-16 bg-brand-black origin-bottom transform transition-transform duration-1000"
        style={{ transform: `rotate(${needleAngle - 90}deg)` }}
      >
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-brand-black rounded-full"></div>
      </div>
       <div className="absolute bottom-8 text-center">
         <div className={`text-4xl font-bold font-heading text-brand-black`}>{value}%</div>
         <div className={`text-lg font-semibold font-heading ${moodColor}`}>{mood}</div>
       </div>
    </div>
  );
};

export default MMIGauge;