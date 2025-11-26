import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { RESUME } from '../data';

export const SkillRadar = () => {
  const data = RESUME.skills;

  return (
    <div className="w-full h-full min-h-[300px] relative font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#86868b', fontSize: 12, fontWeight: 500 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Proficiency"
            dataKey="level"
            stroke="#2997ff"
            strokeWidth={3}
            fill="#2997ff"
            fillOpacity={0.2}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(10px)' }}
            itemStyle={{ color: '#fff' }}
            cursor={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};