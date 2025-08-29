import {
  FormInputSearchVariation,
  FormInputType,
} from "@digi/arbetsformedlingen";
import { DigiFormInputSearch } from "@digi/arbetsformedlingen-react";
import { useNavigate, useLocation } from "react-router";

interface SearchFieldProps {
  searchText: string;
  setSearchText: (val: string) => void;
}

export const SearchField = ({
  searchText,
  setSearchText,
}: SearchFieldProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: any) => {
    const value = (e.target as HTMLInputElement)?.value ?? "";
    setSearchText(value);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!(searchText ?? "").trim()) return;

    const targetUrl = `/educations?query=${encodeURIComponent(
      (searchText ?? "").trim()
    )}`;
    if (location.pathname === "/educations") {
      navigate(targetUrl, { replace: true });
    } else {
      navigate(targetUrl);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <DigiFormInputSearch
        afLabel="Sök utbildning..."
        afVariation={FormInputSearchVariation.MEDIUM}
        afType={FormInputType.SEARCH}
        afButtonText="Sök"
        value={searchText}
        onAfOnChange={handleChange}
        className="DigiFormInputSearch"
      />
    </form>
  );
};
