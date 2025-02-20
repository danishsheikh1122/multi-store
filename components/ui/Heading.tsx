import React from "react";
interface Props {
  title: string;
  description: string;
}
const Heading: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-light ">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
