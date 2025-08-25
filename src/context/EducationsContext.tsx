import {
  createContext,
  useReducer,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ResponseData } from "../models/Education";
import { educationReducer } from "../reducer/educationReducer";
import { fetchEducations } from "../api/api";

export interface IEducationContext {
  educations: ResponseData[];
  loading: boolean;
  error: string | null;
  fetchEducations: (query: string) => Promise<void>;
  setFilterLocation: Dispatch<SetStateAction<string[]>>;
  setFilterPaceOfStudy: Dispatch<SetStateAction<string[]>>;
  filterLocation: string[];
  filterPaceOfStudy: string[];
}

export const EducationContext = createContext<IEducationContext>({
  educations: [],
  loading: false,
  error: null,
  fetchEducations: async () => {},
  setFilterLocation: () => {},
  setFilterPaceOfStudy: () => {},
  filterLocation: [],
  filterPaceOfStudy: [],
});

export const EducationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [filterPaceOfStudy, setFilterPaceOfStudy] = useState<string[]>([]);
  const [state, dispatch] = useReducer(educationReducer, {
    educations: [],
    loading: false,
    error: null,
  });

  const fetchEducationsHandler = async (query: string) => {
    dispatch({ type: "FETCH_EDUCATION_REQUEST" });

    try {
      const educations: ResponseData[] = await fetchEducations(query);
      dispatch({ type: "FETCH_EDUCATION_SUCCESS", payload: educations });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "FETCH_EDUCATION_FAILURE", payload: message });
    }
  };

  return (
    <EducationContext.Provider
      value={{
        ...state,
        fetchEducations: fetchEducationsHandler,
        filterLocation,
        setFilterLocation,
        filterPaceOfStudy,
        setFilterPaceOfStudy,
      }}
    >
      {children}
    </EducationContext.Provider>
  );
};
