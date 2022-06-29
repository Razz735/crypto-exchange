import React from "react";
import { FormControl, InputLabel } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import styled from "styled-components";
import { SortFilterOptions } from "../../data/global.models";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const FilterWrapper = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => (theme === "light" ? "white" : "black")};
`;

interface Props {
  setSortFilterOptions: React.Dispatch<React.SetStateAction<SortFilterOptions>>;
  loggedIn: boolean;
  theme: "light" | "dark";
}

export const SortFilterBar: React.FC<Props> = ({
  setSortFilterOptions,
  loggedIn,
  theme,
}) => {
  let disableIfNotLoggedIn = loggedIn ? {} : { disabled: true };

  const handleFilterOption = (event: SelectChangeEvent<string>) => {
    switch (event.target.value) {
      case "owned":
        setSortFilterOptions((prevState) => {
          return { ...prevState, filter: "owned" };
        });
        break;
      case "bookmarked":
        setSortFilterOptions((prevState) => {
          return { ...prevState, filter: "bookmarked" };
        });
        break;
      default:
        setSortFilterOptions((prevState) => {
          return { ...prevState, filter: "none" };
        });
    }
  };

  const handleSortOption = (event: SelectChangeEvent<string>) => {
    switch (event.target.value) {
      case "price-ascending":
        setSortFilterOptions((prevState) => {
          return { ...prevState, sort: "price-ascending" };
        });
        break;
      case "price-descending":
        setSortFilterOptions((prevState) => {
          return { ...prevState, sort: "price-descending" };
        });
        break;
      default:
        setSortFilterOptions((prevState) => {
          return { ...prevState, sort: "popular" };
        });
    }
  };

  return (
    <FilterWrapper theme={theme}>
      <FilterListIcon sx={{ fontSize: "35px" }} />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel htmlFor="grouped-native-select">Filter By:</InputLabel>
        <Select
          native
          defaultValue="None"
          id="grouped-native-select"
          label="Grouping"
          name="filter"
          onChange={handleFilterOption}
        >
          <option aria-label="popular" value="None">
            None
          </option>
          <option value="owned" {...disableIfNotLoggedIn}>
            Owned
          </option>
          <option value="bookmarked" {...disableIfNotLoggedIn}>
            Bookmarked
          </option>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel htmlFor="grouped-native-select">Sort By:</InputLabel>
        <Select
          native
          defaultValue="Popular"
          id="grouped-native-select"
          label="Grouping"
          onChange={handleSortOption}
          name="sort"
        >
          <option aria-label="Popular" value="Popular">
            Popular
          </option>
          <optgroup label="Price">
            <option value="price-ascending">Ascending</option>
            <option value="price-descending">Descending</option>
          </optgroup>
        </Select>
      </FormControl>
    </FilterWrapper>
  );
};
