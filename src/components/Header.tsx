import { DigiHeader } from "@digi/arbetsformedlingen-react";
import { SearchField } from "./SearchField";
import { FilterContainer } from "./FilterContainer";
import "../css/searchField.css";

export const Header = () => {
  return (
    <DigiHeader
      afSystemName="Vår app..."
      afHideSystemName={true}
      afMenuButtonText="Meny"
    >
      <a slot="header-logo" aria-label="Designsystemets startsida" href="/" />
      <div slot="header-content">
        <SearchField />
        <FilterContainer />
      </div>
    </DigiHeader>
  );
};
