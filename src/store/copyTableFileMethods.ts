import { ONE, TWO, ZERO } from "src/models/constants";
import { getCopyRow } from "src/models/intials";
import { CopyColumnModel, CopyRowModel } from "src/models/types";


export const copyTableToCSV: (rows: CopyRowModel[], columns: CopyColumnModel[]) => string = (rows, columns) => {
  let ret = "";
  ret += columns.map(column => column.targetBlockId).join(",") + "\r\n";
  ret += columns.map(column => `"${column.label.replace(/\n/g, "%2F")}"`).join(",") + "\r\n";
  rows.map(row => {
    ret +=  row.cells.map(cell => `"${cell.value.replace(/\n/g, "%2F")}"`).join(",") + "\r\n";
  });
  return ret;
};

export const CSVToCopyTable: (csv: string, copyColumns: CopyColumnModel[]) => CopyRowModel[] | null = (csv, copyColumns) => {
  const firstRow:string[] = csv.split("\n")[0].split(",");
  //check if all csv columns have corresponding copyColumn
  const csvFRString = firstRow.sort().join(",").trim();
  const localColumnsString = firstRow.sort().join(",").trim();
  if(csvFRString !== localColumnsString) {
    console.error(csvFRString + " !== " + localColumnsString);
    return null;    
  }
  //loop all rows and create new rows with needed cell values
  function parseCSV (str: string) {
    const arr:string[][] = [];
    let quote = false;
    for (let row = 0, col = 0, c = 0; c < str.length; c++) {
      const cc = str[c], nc = str[c + ONE];
      arr[row] = arr[row] || [];
      arr[row][col] = arr[row][col]?.replace(/(%2F)/g, "\n") || "";
      if (cc === "\"" && quote && nc === "\"") { arr[row][col] += cc; ++c; continue; }
      if (cc === "\"") { quote = !quote; continue; }
      if (cc === "," && !quote) { ++col; continue; }
      if (cc === "\r" && nc === "\n" && !quote) { ++row; col = ZERO; ++c; continue; }
      if (cc === "\n" && !quote) { ++row; col = ZERO; continue; }
      if (cc === "\r" && !quote) { ++row; col = ZERO; continue; }
      arr[row][col] += cc;
    }
    return arr;
  }

  const rows:string[][] = parseCSV(csv).slice(TWO);
  return rows.filter(row => !!row.length).map(row => {
    const cellValues = firstRow.map((targetBlockId, i) => {
      return {
        columnId: copyColumns.find(col => col.targetBlockId.trim() === targetBlockId.trim())?.uuid || "",
        value: row[i]
      };
    });
    return getCopyRow(copyColumns, cellValues);
  });
};


export const exportAsCSV = (textToSave: string, fileName: string) => {
  const link = document.createElement("a") as HTMLAnchorElement;
  document.body.appendChild(link);
  link.setAttribute("style", "display: none");
  const url = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(textToSave);
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const importCopyRows: (copyColumns: CopyColumnModel[], file: Blob, callBack: (result: CopyRowModel[] | null) => void) => void = (copyColumns, file, callBack) => {
  const fr = new FileReader();
  fr.onloadend = () => {
    const fileText = fr.result as string;
    const rows = CSVToCopyTable(fileText, copyColumns);
    callBack(rows);
  };
  fr.readAsText(file);
};