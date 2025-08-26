import type {
  DigiFormFilterCustomEvent,
  FilterChange,
} from "@digi/arbetsformedlingen";
import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import { useState } from "react";

interface SelectFilterProps {
  buttonText: string;
  label: string;
  legend: string;
  listItems: { id: string; label: string }[];
  onSubmit: (arg: string[]) => void;
  onReset: () => void;
}

export const SelectFilter = (p: SelectFilterProps) => {
  const [listOfFilters, setListOfFilters] = useState<string[]>([]);

  const handleSetFilter = (
    item: DigiFormFilterCustomEvent<
      FilterChange & {
        filterName?: string;
      }
    >
  ) => {
    const isChecked = item.detail.isChecked;
    if (isChecked) {
      setListOfFilters([...listOfFilters, item.detail.id]);
    } else {
      const newList = listOfFilters.filter((i) => i !== item.detail.id);
      setListOfFilters(newList);
    }
  };

  const handleSubmitFilter = () => {
    p.onSubmit(listOfFilters);
  };
  const handleResetFilter = () => {
    p.onReset();
  };

  return (
    <>
      <DigiFormFilter
        onAfChangeFilter={handleSetFilter}
        afFilterButtonText={p.label}
        afSubmitButtonText={p.buttonText}
        afName={p.legend}
        afListItems={p.listItems}
        onAfSubmitFilter={handleSubmitFilter}
        onAfResetFilter={handleResetFilter}
      />
    </>
  );
};
