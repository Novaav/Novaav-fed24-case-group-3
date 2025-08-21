import { useContext, useEffect, useState } from "react";
import { SelectFilter } from "./SelectFilter";
import type { ResponseData } from "../models/Education";
import { EducationContext } from "../context/EducationsContext";

export const FilterContainer = () => {
  const [locationData, setLocationData] = useState<
    { id: string; label: string }[]
  >([]);
  const [paceOfStudy, setPaceOfStudy] = useState<
    { id: string; label: string }[]
  >([]);
  // const [realData, setRealData] = useState<ApiResponse | null>();
  const { educations, loading, error, fetchEducations } =
    useContext(EducationContext);

  const [filterPaceOfStudy, setFilterPaceOfStudy] = useState<string[]>();
  const [filterLocation, setFilterLocation] = useState<string[]>();

  //   detta är funktionen som hittar studietakter utifrån datan vi får från fetchen. behöver datan från context
  const getPaceOfStudies = (data: ResponseData[]) => {
    let paceOfStudyList: { id: string; label: string }[] = [];
    //startvärde 0 pga kom upp dubliceringar utav procentenheterna
    data.forEach((item) => {
      const paceOfStudy = item.eventSummary?.paceOfStudyPercentage?.[0];
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
  }, []);

  //   fetch(
  //     " https://jobed-connect-api.jobtechdev.se/v1/educations?query=förskollärare"
  //   )
  //     .then((data) => {
  //       return data.json();
  //     })
  //     .then((data) => {
  //       getPaceOfStudies(data);
  //       setRealData(data);
  //     });
  // }, []);

  // TODO: vad ska stå i strängen??
  useEffect(() => {
    fetchEducations("förskolelärare");
  }, []);

  // test
  useEffect(() => {
    console.log("Educations i context:", educations);
  }, []);

  const filterForPaceOfStudy = (data: ResponseData[]) => {
    if (filterPaceOfStudy && filterPaceOfStudy.length) {
      const filteredData = data.filter((item) => {
        const percentage = item.eventSummary?.paceOfStudyPercentage?.[0];
        const exist = filterPaceOfStudy?.find((i) => Number(i) === percentage);
        if (exist) {
          return item;
        }
      });
      return filteredData;
    } else {
      return data;
    }
  };

  const filterForLocation = (data: ResponseData[]) => {
    if (filterLocation && filterLocation.length) {
      const filteredData = data.filter((item /**TODO: fix typing */) => {
        const locations = item.eventSummary?.regionCode;
        let existing = false;
        filterLocation?.forEach((i) => {
          const exist = locations?.find((item: string) => item === i);
          if (exist) {
            existing = true;
          }
        });
        if (existing) return item;
      });
      return filteredData;
    } else {
      return data;
    }
  };

  const filterData = (data: ResponseData[]) => {
    const filter1 = filterForPaceOfStudy(data);
    const filteredData = filterForLocation(filter1);
    return filteredData;
  };

  const filteredData = filterData(educations);
  console.log("data som är filtrerad", filteredData);

  return (
    <>
      <SelectFilter
        buttonText="Filtrera"
        legend="Filtrera område"
        label="Plats"
        listItems={locationData}
        onReset={() => setFilterLocation([])}
        onSubmit={(list: string[]) => setFilterLocation(list)}
      />
      <SelectFilter
        buttonText="Filtrera"
        legend="Välj på heltid/deltid"
        label="Studietakt"
        listItems={paceOfStudy}
        onReset={() => setFilterPaceOfStudy([])}
        onSubmit={(list: string[]) => setFilterPaceOfStudy(list)}
      />
      {filteredData &&
        filteredData.map((p, i) => <p key={i}>{p.education?.code}</p>)}
    </>
  );
};
