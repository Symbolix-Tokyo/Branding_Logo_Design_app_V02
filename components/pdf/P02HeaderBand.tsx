import React from "react";

export function P02HeaderBand({
  clientName,
  dateText,
  docTitleRight,
}: {
  clientName: string;
  dateText: string;
  docTitleRight?: string;
}) {
  const X = {
    left: 22.67, // ← 指示画像どおり
    right: 12,
  };

  const Y = {
    topLineY: 7.5,   // ★ 確定値
    bandHeight: 11,
  };

  return (
    <>
      {/* 日付（上線より上） */}
      <div
        style={{
          position: "absolute",
          top: "3mm",              // 上線(7.5mm)より十分上
          right: `${X.right}mm`,
          fontSize: "9pt",
          letterSpacing: "0.02em",
          color: "#555",
          whiteSpace: "nowrap",
          zIndex: 50,
        }}
      >
        {dateText}
      </div>

      {/* 上部帯（2本線＋クライアント名） */}
      <div
        style={{
          position: "absolute",
          left: `${X.left}mm`,
          right: `${X.right}mm`,
          top: `${Y.topLineY}mm`,
          height: `${Y.bandHeight}mm`,
          borderTop: "1pt solid #111",
          borderBottom: "1pt solid #111",
          display: "flex",
          alignItems: "center",
          paddingLeft: "3mm",
          fontSize: "11pt",
          letterSpacing: "0.03em",
          color: "#111",
          zIndex: 40,
        }}
      >
        {clientName} 御中
      </div>

      {/* 右：タイトル（任意） */}
      {docTitleRight && (
        <div
          style={{
            position: "absolute",
            top: "19mm",
            right: `${X.right}mm`,
            fontSize: "8pt",
            letterSpacing: "0.02em",
            color: "#555",
            whiteSpace: "nowrap",
            zIndex: 50,
          }}
        >
          {docTitleRight}
        </div>
      )}
    </>
  );
}