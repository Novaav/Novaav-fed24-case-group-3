import {
  FormInputVariation,
  FormInputType,
  FormInputValidation,
  FormInputMode,
} from "@digi/arbetsformedlingen";
import { DigiFormInput } from "@digi/arbetsformedlingen-react";
import type { Dispatch, SetStateAction } from "react";
import "../css/searchField.css";

interface SearchFieldProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  onSearch: (query: string) => void;
}

export const SearchField = (p: SearchFieldProps) => {
  // typningshsit från af
  // const handleInput = (e: CustomEvent<HTMLDigiFormInputElement>) =>
  //   p.setSearchText(e.detail.value.toString());
  const handleInput = (e: CustomEvent<HTMLDigiFormInputElement>) => {
    const value = e.detail.value.toString();
    p.setSearchText(value);
    p.onSearch(value);
  };

  return (
    <>
      <DigiFormInput
        af-label="Etikett"
        afVariation={FormInputVariation.MEDIUM}
        afType={FormInputType.TEXT}
        afValidation={FormInputValidation.NEUTRAL}
        afInputmode={FormInputMode.TEXT}
        onAfOnChange={handleInput}
        className="DigiFormInput"
      ></DigiFormInput>
    </>
  );
};
