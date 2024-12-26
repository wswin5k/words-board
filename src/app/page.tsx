import * as React from "react";
import styles from "./page.module.css";
import wordsData from "./wordsData";

function WordEntry({ word, key }) {
  //const url = `https://www.merriam-webster.com/dictionary/${word}`;
  const url = `https://onelook.com/?w=${word}`;

  return (
    <td key={key} style={{ padding: "10px" }}>
      <a href={url}>{word}</a>
    </td>
  );
}

function RowEntry({ words, key }) {
  return (
    <tr key={key}>
      {words.map((word, idx) => {
        return <WordEntry word={word} key={idx} />;
      })}
    </tr>
  );
}

export default function Home() {
  const columnCount = 5;
  const rowCount = 20;

  const words = wordsData.map((wordObj) => wordObj.word);

  const rowEntries = [];
  for (let row = 0; row < rowCount; row++) {
    rowEntries.push(
      <RowEntry
        words={words.slice(row * columnCount, (row + 1) * columnCount)}
        key={row}
      />,
    );
  }

  return (
    <div className={styles.page}>
      <table>
        <tbody>{rowEntries}</tbody>
      </table>
    </div>
  );
}
