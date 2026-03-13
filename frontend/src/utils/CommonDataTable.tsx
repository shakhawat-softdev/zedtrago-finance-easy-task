import { useEffect, useState, type ReactNode } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
};

type CommonDataTableProps<T> = {
  columns: Array<Column<T>>;
  data: T[];
  emptyText?: string;
};

const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      borderBottom: "1px solid rgba(15, 23, 42, 0.12)",
      minHeight: "52px",
    },
  },
  headCells: {
    style: {
      fontSize: "0.8rem",
      fontWeight: 700,
      textTransform: "uppercase" as const,
      letterSpacing: "0.04em",
      color: "#334155",
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  rows: {
    style: {
      minHeight: "48px",
      borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
    },
  },
  cells: {
    style: {
      color: "#0f172a",
      fontSize: "0.93rem",
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};

export function CommonDataTable<T extends object>({
  columns,
  data,
  emptyText = "No records",
}: CommonDataTableProps<T>) {
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    function onResize() {
      const width = window.innerWidth;
      setIsCompact(width <= 1180);
      setIsSmallScreen(width <= 820);
    }

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!data.length) {
    return <div className="card">{emptyText}</div>;
  }

  const mappedColumns: TableColumn<T>[] = columns.map((col) => {
    const isActionsColumn =
      String(col.key).toLowerCase() === "actions" ||
      col.header.toLowerCase() === "actions";

    return {
      name: col.header,
      selector: (row: T) => {
        if (col.render) return "";
        const value = (row as Record<string, unknown>)[String(col.key)];
        return value == null ? "" : String(value);
      },
      cell: col.render ? (row: T) => col.render?.(row) : undefined,
      sortable: !isActionsColumn,
      center: isActionsColumn,
      wrap: true,
    };
  });

  return (
    <div className="table-wrap card">
      <DataTable
        columns={mappedColumns}
        data={data}
        customStyles={customStyles}
        pagination
        dense={isCompact}
        paginationPerPage={isSmallScreen ? 5 : 10}
        paginationRowsPerPageOptions={isSmallScreen ? [5, 10] : [10, 15, 20]}
        highlightOnHover
        responsive
        noDataComponent={emptyText}
      />
    </div>
  );
}
