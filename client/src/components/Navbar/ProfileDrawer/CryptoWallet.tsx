import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material/";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { WalletRow } from "./WalletRow";
import { getCrypto } from "../../../data/helpers";

export const CryptoWallet = () => {
  const { user, cryptos } = useGlobalContext();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="tableHeaders">Crypto Coin</TableCell>
            <TableCell className="tableHeaders" align="right">
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user?.portfolio.map((row) => (
            <WalletRow
              key={row.crypto}
              row={row}
              cryptoInfo={getCrypto(cryptos, row.crypto)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};