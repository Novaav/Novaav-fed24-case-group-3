import { useEffect, useState } from "react";
import { SelectFilter } from "./SelectFilter";

export const FilterContainer = () => {
  const [locationData, setLocationData] = useState<any>();
  const [paceOfStudy, setPaceOfStudy] = useState<any>();
  const [realData, setRealData] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>();
  const [paceOfStudyFilter, setPaceOfStudyFilter] = useState<any>();
  const [locationFilter, setLocationFilter] = useState<any>();

  //   detta är funktionen som hittar studietakter utifrån datan vi får från fetchen. behöver datan från context
  const getPaceOfStudies = (data) => {
    let paceOfStudyList = [];

    data.result.forEach((item) => {
      const paceOfStudy = item.eventSummary.paceOfStudyPercentage[0];
      const exist = paceOfStudyList.find(
        (i) => i.id === JSON.stringify(paceOfStudy)
      );
      if (!exist) {
        paceOfStudyList.push({
          id: JSON.stringify(paceOfStudy),
          label: JSON.stringify(paceOfStudy) + "%",
        });
      }
    });
    setPaceOfStudy(paceOfStudyList);
  };

  useEffect(() => {
    fetch("https://jobed-connect-api.jobtechdev.se/v1/searchparameters/regions")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const newData = data.map((item) => {
          return { id: item.key, label: item.value };
        });
        setLocationData(newData);
      });

    fetch(
      " https://jobed-connect-api.jobtechdev.se/v1/educations?query=förskollärare"
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        getPaceOfStudies(data);
        setRealData(data);
      });
  }, []);

  const filterPaceOfStudy = (data) => {
    const checked = data.detail.checked;
    const allData = realData.result;
    const filteredData = allData.filter((item) => {
      const percentage = item.eventSummary.paceOfStudyPercentage[0];
      const exist = checked.find((i) => Number(i) === percentage);
      if (exist) {
        return item;
      }
    });
    console.log(filteredData);
    setFilteredData(filteredData);
  };

  const filterLocation = (data) => {
    const checked = data.detail.checked;
    const allData = realData.result;
    const filteredData = allData.filter((item) => {
      const locations = item.eventSummary.regionCode;
      let existing = false;
      checked.forEach((i) => {
        const exist = locations.find((item) => item === i);
        if (exist) {
          existing = true;
        }
      });
      if (existing) return item;
    });
    console.log("filtrerad data", filteredData);
    console.log("all data", allData);
  };

  return (
    <>
      <SelectFilter
        buttonText="Filtrera"
        legend="Filtrera område"
        label="Plats"
        listItems={locationData}
        callback={filterLocation}
      />
      <SelectFilter
        buttonText="Filtrera"
        legend="Välj på heltid/deltid"
        label="Studietakt"
        listItems={paceOfStudy}
        callback={filterPaceOfStudy}
      />
    </>
  );
};
