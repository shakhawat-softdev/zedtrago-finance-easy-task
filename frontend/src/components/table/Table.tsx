import React from "react";

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Array<Column<T>>;
  data: T[];
  emptyText?: string;
};

export function Table<T extends object>({
  columns,
  data,
  emptyText = "No records",
}: TableProps<T>) {
  if (!data.length) {
    return <div className="card">{emptyText}</div>;
  }

  return (
    <div className="table-wrap card">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={
                typeof (row as { id?: unknown }).id === "string"
                  ? ((row as { id?: string }).id ?? index)
                  : index
              }
            >
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render
                    ? col.render(row)
                    : String(
                        (row as Record<string, unknown>)[String(col.key)] ?? "",
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
