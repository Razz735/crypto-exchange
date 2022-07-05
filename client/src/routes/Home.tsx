import { useGlobalContext } from "../context/GlobalCryptoContext";
import { CryptoCard } from "../components/Home/CryptoCard";
import { Crypto, SortFilterOptions } from "../data/global.models";
import React, { useState, useEffect } from "react";
import {
  processFilterSortOptions,
  replaceUpdatedCrypto,
  determineThemeBackground,
} from "../utilities/helpers";
import { SortFilterBar } from "../components/Home/SortFilterBar";
import { updateSingleCrypto } from "../data/api";
import { useTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

export const Home = () => {
  const { cryptos, user, togglePageLoading, setUser, handleBannerMessage } =
    useGlobalContext();
  const [organizedCryptos, setOrganizedCryptos] = useState<Crypto[]>([]);
  const [sortFilterOptions, setSortFilterOptions] = useState<SortFilterOptions>(
    { sort: "popular", filter: "none" }
  );
  const [page, setPage] = useState(1);
  let ranges = [
    [0, 9],
    [9, 18],
    [18, 27],
    [27, 36],
  ];

  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearch = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value) {
      setOrganizedCryptos(
        organizedCryptos.filter((curCrypto) => curCrypto.name.includes(value))
      );
    } else {
      setOrganizedCryptos(cryptos);
    }
  };

  useEffect(() => {
    togglePageLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (cryptos.length) {
      togglePageLoading();
      setOrganizedCryptos(cryptos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptos]);

  useEffect(() => {
    setOrganizedCryptos(
      processFilterSortOptions(
        cryptos,
        sortFilterOptions,
        user ? user.portfolio : [],
        user ? user.bookmarks : []
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortFilterOptions, user?.bookmarks]);

  const handleUpdateSingleCrypto = async (name: string) => {
    togglePageLoading();
    try {
      const updatedCrypto = await updateSingleCrypto(name);
      setOrganizedCryptos((prevState) => {
        return replaceUpdatedCrypto(prevState, updatedCrypto);
      });
      togglePageLoading();
    } catch (error) {
      togglePageLoading();
      handleBannerMessage("error", "Error updating crypto information");
    }
  };

  return (
    <div
      className="Home"
      style={{
        backgroundColor: `${determineThemeBackground(theme.palette.mode)}`,
      }}
    >
      <div className="toolBar">
        <SortFilterBar
          setSortFilterOptions={setSortFilterOptions}
          loggedIn={user ? true : false}
          theme={theme.palette.mode}
        />
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={organizedCryptos.map((crypto) => crypto.name)}
          renderInput={(params) => <TextField {...params} label="Search..." />}
          sx={{ minWidth: "200px" }}
          size="small"
          onChange={(e, value) => handleSearch(e, value)}
        />
      </div>
      <div className="cryptosContainer">
        {organizedCryptos
          .slice(ranges[page - 1][0], ranges[page - 1][1])
          .map((crypto) => {
            return (
              <CryptoCard
                key={crypto.ticker}
                crypto={crypto}
                user={user}
                handleUpdateSingleCrypto={handleUpdateSingleCrypto}
                setUser={setUser}
                togglePageLoading={togglePageLoading}
                bookmarks={user ? user.bookmarks : []}
              />
            );
          })}
      </div>
      <Pagination
        count={Math.ceil(organizedCryptos.length / 9)}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};
