import { useState, useEffect } from "react";
import { Crypto } from "../../data/global.models";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalCryptoContext";
import { ToolBar } from "./ToolBar/ToolBar";
import { CryptoCard } from "./CryptoCard";
import { replaceUpdatedCrypto } from "../../utilities/helpers";
import { updateSingleCrypto } from "../../data/api";
import { Pagination } from "@mui/material";

const CryptosWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  .cryptosContainer {
    flex: 8;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
  }
`;

export const CryptosContainer = () => {
  const { cryptos, user, setUser, togglePageLoading, handleBannerMessage } =
    useGlobalContext();
  const [organizedCryptos, setOrganizedCryptos] = useState<Crypto[]>([]);

  const [page, setPage] = useState(1);
  let ranges = [
    [0, 4],
    [4, 8],
    [8, 12],
    [12, 16],
    [16, 20],
    [20, 24],
    [24, 28],
    [28, 32],
  ];

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

  useEffect(() => {
    if (cryptos.length) {
      setOrganizedCryptos(cryptos);
    }
  }, [cryptos]);

  return (
    <CryptosWrapper>
      <ToolBar
        user={user}
        cryptos={cryptos}
        organizedCryptos={organizedCryptos}
        setOrganizedCryptos={setOrganizedCryptos}
      />
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
        count={Math.ceil(organizedCryptos.length / 4)}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ flex: 1, padding: "10px 0" }}
      />
    </CryptosWrapper>
  );
};