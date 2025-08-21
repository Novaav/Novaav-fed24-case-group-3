import type { Education } from "../models/Education";

export type educationsState = {
  loading: boolean;
  error: string | null;
  educations: Education[];
}

export type EducationActionType =
  | { type: "FETCH_EDUCATION_REQUEST" }
  | { type: "FETCH_EDUCATION_SUCCESS"; payload: Education[] }
  | { type: "FETCH_EDUCATION_FAILURE"; payload: string };

export const educationReducer = (
    state: educationsState,
    action: EducationActionType
  ): educationsState => {
    switch (action.type) {
      case "FETCH_EDUCATION_REQUEST":
        return { ...state, loading: true, error: null };
      case "FETCH_EDUCATION_SUCCESS":
        return { ...state, loading: false, educations: action.payload };
      case "FETCH_EDUCATION_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
