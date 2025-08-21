import { JobsContextProvider } from "./JobsContext";
import { EducationContextProvider } from "./EducationsContext";

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <JobsContextProvider>
    <EducationContextProvider>{children}</EducationContextProvider>
  </JobsContextProvider>
);
