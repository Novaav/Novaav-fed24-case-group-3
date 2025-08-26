import type { ResponseData } from "../models/Education";

export const filterForLocation = (
  data: ResponseData[],
  filterLocation: string[]
) => {
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

export const filterForPaceOfStudy = (
  data: ResponseData[],
  filterPaceOfStudy: string[]
) => {
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
