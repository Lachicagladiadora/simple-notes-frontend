import { ReactNode } from "react";

type ButtonsForSectionProps = {
  text: string;
  icon: ReactNode;
};
export const ButtonForSection = ({ text, icon }: ButtonsForSectionProps) => {
  return (
    <button className="border py-1 px-2 rounded-full bg-purple-800 text-fuchsia-50 capitalize text-base flex gap-1 items-center justify-center hover:bg-fuchsia-50 hover:text-purple-800 hover:border-purple-800">
      {icon}
      {text}
    </button>
  );
};
