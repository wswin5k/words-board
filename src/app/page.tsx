"use client";
import * as React from "react";
import wordsData from "./wordsData";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const innerTheme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});

function WordEntry({ word, tdKey }) {
  //const url = `https://www.merriam-webster.com/dictionary/${word}`;
  const url = `https://onelook.com/?w=${word}`;

  return (
    <td key={tdKey} style={{ padding: "10px" }}>
      <a href={url}>{word}</a>
    </td>
  );
}

function RowEntry({ words, trKey }) {
  return (
    <tr key={trKey}>
      {words.map((word, idx) => {
        return <WordEntry word={word} key={idx} tdKey={idx} />;
      })}
    </tr>
  );
}

export default function Home() {
  const columnCount = 5;
  const rowCount = 20;

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const words = wordsData.map((wordObj) => wordObj.word);

  const rowEntries = [];
  const rowStart = (page - 1) * rowCount;
  for (let row = rowStart; row < rowStart + rowCount; row++) {
    rowEntries.push(
      <RowEntry
        words={words.slice(row * columnCount, (row + 1) * columnCount)}
        trKey={row}
        key={row}
      />,
    );
  }

  return (
    <Stack spacing={2}>
      <div>
        <table>
          <tbody>{rowEntries}</tbody>
        </table>
      </div>

      <ThemeProvider theme={innerTheme}>
        <Pagination
          count={10}
          page={page}
          color="primary"
          onChange={handleChange}
        />
      </ThemeProvider>
    </Stack>
  );
}
