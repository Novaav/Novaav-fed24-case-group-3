import { FilterContainer } from "./FilterContainer";

export const Header = () => {
  return (
    <>
      <header>
        <h2>Header Logo</h2>
        <nav>
          <FilterContainer />
        </nav>
      </header>
    </>
  );
};
