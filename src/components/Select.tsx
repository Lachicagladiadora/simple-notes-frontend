export type SelectedOptionType = {
  label: string;
  value: string;
};

type SelectProps = {
  selectedOption: SelectedOptionType | null;
  options: SelectedOptionType[];
  onChange: (newValue: string) => void;
};
export const Select = ({ selectedOption, options, onChange }: SelectProps) => {
  return (
    <select
      name="tags"
      id="tag"
      value={selectedOption?.value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="border-[2px] border-purple-600 rounded-lg py-1 px-2 text-purple-950 focus:outline-none focus:border-[3px] focus-visible:border-violet-500"
    >
      {options.map((cur, idx) => (
        <option key={idx} value={cur.value}>
          {cur.label}
        </option>
      ))}
    </select>
  );
};
