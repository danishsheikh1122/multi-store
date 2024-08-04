import React from "react";
import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar, Tooltip } from "recharts";

interface Props {
  data: any[];
}

const OverView: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey={"name"}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey={"total"} fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OverView;
