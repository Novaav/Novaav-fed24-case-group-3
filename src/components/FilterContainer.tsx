import { SelectFilter } from "./SelectFilter";

export const FilterContainer = () => {
  const locationList = [
    { id: "stockholm", label: "Stockholm" },
    { id: "malmo", label: "Malmö" },
    { id: "goteborg", label: "Göteborg" },
  ];
  const paceOfStudy = [
    { id: "100", label: "Heltid" },
    { id: "50", label: "Deltid" },
  ];
  return (
    <>
      <SelectFilter
        buttonText="Filtrera"
        legend="Filtrera område"
        label="Plats"
        listItems={locationList}
      />
      <SelectFilter
        buttonText="Filtrera"
        legend="Välj på heltid/deltid"
        label="Studietakt"
        listItems={paceOfStudy}
      />
    </>
  );
};
