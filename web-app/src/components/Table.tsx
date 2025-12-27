import React from "react";

export const Table = ({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate/10 bg-white">
      <table className="min-w-full divide-y divide-slate/10 text-sm">
        <thead className="bg-slate/5 text-left text-xs font-semibold uppercase tracking-wide text-slate/60">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate/10">
          {rows.map((row, index) => (
            <tr key={index} className="text-slate">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
