import { createContext, useReducer } from "react";
import type { Education, ResponseData } from "../models/Education";
import { educationReducer } from "../reducer/educationReducer";
import { fetchEducations } from "../api/api";

export interface IEducationContext {
  educations: ResponseData[];
  loading: boolean;
  error: string | null;
  fetchEducations: (query: string) => Promise<void>;
}

export const EducationContext = createContext<IEducationContext>({
  educations: [],
  loading: false,
  error: null,
  fetchEducations: async () => {},
});

export const EducationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
      value={{ ...state, fetchEducations: fetchEducationsHandler }}
    >
      {children}
    </EducationContext.Provider>
  );
};
