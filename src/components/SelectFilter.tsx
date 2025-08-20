import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import { useState } from "react";

interface SelectFilterProps {
  buttonText: string;
  label: string;
  legend: string;
  listItems: { id: string; label: string }[];
  callback: () => void;
}

export const SelectFilter = (p: SelectFilterProps) => {
  const [list, setList] = useState<string[]>([]);
  const filter = (e) => {
    if (e.detail.isChecked === true) {
      setList([...list, e.detail.id]);
    } else {
      const newList = list.filter((id) => id !== e.detail.id);
      setList(newList);
    }
  };

  return (
    <>
      <DigiFormFilter
        onAfChangeFilter={filter}
        afFilterButtonText={p.label}
        afSubmitButtonText={p.buttonText}
        afName={p.legend}
        afListItems={p.listItems}
        onAfSubmitFilter={p.callback}
      />
    </>
  );
};
