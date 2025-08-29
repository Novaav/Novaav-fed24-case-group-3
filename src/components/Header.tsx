import {
  DigiHeader,
  DigiHeaderNavigation,
  DigiHeaderNavigationItem,
} from "@digi/arbetsformedlingen-react";
import { SearchField } from "./SearchField";
import { FilterContainer } from "./FilterContainer";
import "../css/Header.css";
import { useState } from "react";

export const Header = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <DigiHeader
      afSystemName="Karriär Kompassen"
      afHideSystemName={false}
      afMenuButtonText="Meny"
    >
      <a slot="header-logo" aria-label="Startsida" href="/" />
      <div slot="header-navigation">
        <DigiHeaderNavigation
          afCloseButtonText="Stäng"
          afCloseButtonAriaLabel="Stäng meny"
          afNavAriaLabel="Huvudmeny"
        >
          <DigiHeaderNavigationItem afCurrentPage={true}>
            <SearchField
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </DigiHeaderNavigationItem>
          <DigiHeaderNavigationItem>
            <FilterContainer />
          </DigiHeaderNavigationItem>
        </DigiHeaderNavigation>
      </div>
    </DigiHeader>
  );
};
