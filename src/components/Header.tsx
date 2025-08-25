import {
  ButtonSize,
  ButtonVariation,
  LayoutColumnsElement,
} from "@digi/arbetsformedlingen";
import {
  DigiButton,
  DigiIconCopy,
  DigiLayoutColumns,
  type DigiMediaImage,
} from "@digi/arbetsformedlingen-react";
import { FilterContainer } from "./FilterContainer";
import { SearchField } from "./SearchField";
import "../css/searchField.css";

export const Header = () => {
  return (
    <>
      <DigiLayoutColumns
        afElement={LayoutColumnsElement.DIV}
        // className="LayoutColumn"
      >
        <h2>Header Logo</h2>
        <SearchField
          searchText=""
          setSearchText={() => {}}
          onSearch={() => {}}
        />
        <FilterContainer />
        <DigiButton
          // afSize={ButtonSize.small}
          afVariation={ButtonVariation.SECONDARY}
          afFullWidth={false}
          af-size="small"
          af-variation="primary"
          af-full-width="false"
          af-padding="25px"
        >
          <DigiIconCopy slot="icon" />
          Sök
        </DigiButton>
        <digi-button
          af-size="small"
          af-variation="primary"
          af-full-width="false"
        >
          Primär knapp
        </digi-button>
      </DigiLayoutColumns>
    </>
  );
};
