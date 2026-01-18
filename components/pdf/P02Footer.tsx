import React from "react";

export function P02Footer({ pageNo = "P02" }: { pageNo?: string }) {
  return (
    <>
      {/* 左下ページ番号 */}
      <div
        style={{
          position: "absolute",
          left: "12mm",
          bottom: "8mm",
          fontSize: "8pt",
          color: "#666",
        }}
      >
        {pageNo}
      </div>

      {/* 既存のフッター右側（そのまま） */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          bottom: "8mm",
          width: "100%",
          textAlign: "center",
          fontSize: "8pt",
          color: "#666",
          letterSpacing: "0.02em",
        }}
      >
        Symbolix Design Estate for DX　www.symbolix.co.jp　©2026 Symbolix Inc.
      </div>
    </>
  );
}