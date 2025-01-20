"use client";
import * as React from "react";
import wordsData from "./wordsData";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const innerTheme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});

const MW_LINK = `https://www.merriam-webster.com/dictionary/`;
const OL_LINK = `https://onelook.com/?w=`;

function WordEntry({ word, tdKey, baseLink }) {
  return (
    <td key={tdKey} style={{ padding: "10px" }}>
      <a href={baseLink + word}>{word}</a>
    </td>
  );
}

function RowEntry({ words, trKey, baseLink }) {
  return (
    <tr key={trKey}>
      {words.map((word, idx) => {
        return (
          <WordEntry word={word} key={idx} tdKey={idx} baseLink={baseLink} />
        );
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

  const [baseLink, setBaseLink] = React.useState(MW_LINK);
  const handleBaseLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseLink((event.target as HTMLInputElement).value);
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
        baseLink={baseLink}
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

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={baseLink}
            onChange={handleBaseLinkChange}
          >
            <FormControlLabel
              value={MW_LINK}
              control={<Radio />}
              label="Merriam Webster"
            />
            <FormControlLabel
              value={OL_LINK}
              control={<Radio />}
              label="Onelook"
            />
          </RadioGroup>
        </FormControl>
      </ThemeProvider>
    </Stack>
  );
}
