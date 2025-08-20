import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import { useState } from "react";

interface SelectFilterProps {
  buttonText: string;
  label: string;
  legend: string;
  listItems: { id: string; label: string }[];
}

export const SelectFilter = (p: SelectFilterProps) => {
  const [list, setList] = useState<string[]>([]);
  const filter = (e) => {
    // let list = [];

    if (e.detail.isChecked === true) {
      setList([...list, e.detail.id]);
    }
    console.log(e.detail.isChecked);
    console.log("Här är den:", list);
  };

  return (
    <>
      <DigiFormFilter
        onAfChangeFilter={filter}
        afFilterButtonText={p.label}
        afSubmitButtonText={p.buttonText}
        afName={p.legend}
        afListItems={p.listItems}
      />
    </>
  );
};
