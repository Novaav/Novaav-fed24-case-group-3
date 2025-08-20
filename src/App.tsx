import { SelectFilter } from "./components/SelectFilter";
import "./css/App.css";

function App() {
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
      <h1>Case 1, grupp 3</h1>
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
}

export default App;
