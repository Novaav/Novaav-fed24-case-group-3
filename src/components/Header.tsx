import { DigiHeader } from "@digi/arbetsformedlingen-react";
import { SearchField } from "./SearchField";
import { FilterContainer } from "./FilterContainer";
import "../css/searchField.css";

export const Header = () => {
  return (
    <DigiHeader
      afSystemName="Vår app..."
      afHideSystemName={false}
      afMenuButtonText="Meny"
    >
      <a slot="header-logo" aria-label="Startsida" href="/" />
      <div slot="header-content">
        <SearchField />
        <FilterContainer />
      </div>
    </DigiHeader>
  );
};
