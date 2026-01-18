import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

export type ProjectDataP08 = {
  clientName: string;
  clientNameRomaji: string;  // ローマ字クライアント名（ベロ文字用）
  dateText: string;
  docTitleRight: string;

  // セクション（P07と同系）
  sectionJp: string;     // 例：封筒デザイン
  sectionEn: string;     // 例：NEW LOGO VISUAL
  designLabel: string;   // 例：VISUAL DESIGN-02
  pageNoText: string;    // "P08"

  // ブランドカラー（P07から流用）
  colorPrimary: string;   // 例："#556B2F"
  colorSecondary: string; // 例："#7A4B2A"

  // 使用画像（public/images）
  logoTop: string;        // ① 例："/images/finish_03.png"
  // ⑥：ロゴ敷き詰め（仮で futo_logo.png。後で差し替え）
  logoPattern: string;    // 例："/images/futo_logo.png"
};

export default function VisualDesign02Page({
  data,
  watermark,
}: {
  data: ProjectDataP08;
  watermark: boolean;
}) {
  // =========================================================
  // ✅ P08：封筒テンプレ（触るのは TUNE 定数だけ）
  // =========================================================
  const PAGE = { W: 297, H: 210 }; // A4ヨコ

  // 最後の追い込み（全体を 1〜2mm 動かす時だけ）
  const SHIFT = { allY: -7 };

  // 見出し（P07の思想踏襲）
  const SECTION = {
    leftX: 22.67,
    topY: 33.26,
    headingFontPt: 10,

    goldLineW: 0.72,
    goldLineH: 14.12,
    goldToTextGap: 3.0,

    jpTopOffset: 8.44,
    jpFontPt: 14,
    enTopOffset: 8.5,
    enFontPt: 10,
  };

  // =========================================================
  // ✅ ここだけ触れば「スクショに合わせる」：TUNE（mm）
  // =========================================================
  const TUNE = {
    // A4上の配置
    envX: 40,      // ←A4内の左位置（好みで）
    envY: 48,      // ←A4内の上位置（好みで）

    // ★基準：黒罫線PNGを 100% 表示する幅（＝W218mm）
    baseLineW: 218,

    // 黒罫線PNGの実寸（画像が「235mm用」なら 235）
    // ※ 218で表示したいので「縮尺」を計算するために必要
    // 分からなければとりあえず 218 を入れても動きます（縮尺=1扱い）
    baseLineDesignW: 218,

    // ⑥⑦帯（W208×H52）…黒罫線と同じ縮尺で重ねる
    bandW: 208,
    bandH: 50,
    bandX: 10,    // ←ここは「黒罫線の左上を(0,0)とした相対座標(mm)」
    bandY: 8,    // ←同上

    // ④黒罫線（基準）
    blackLineX: -0.2,
    blackLineY: 0,

    // ⑤白マスク（同位置）
    whiteMaskX: 0,
    whiteMaskY: 0,

    // ①ロゴ（finish_03）…相対座標 + サイズは「設計mm」でOK（縮尺で縮む）
    logoW: 40,
    logoX: 24,   // ←黒罫線左上基準の相対mm
    logoY: 106,

    // ②ベロ文字（逆さ）
    flapTextX: 0,          // 0=センター
    flapTextY: 28,         // ←相対mm
    flapTextFontPt: 12,
    flapTextWeight: 500,

    // ③下のクライアント名
    frontTextX: 86,
    frontTextY: 124,        // ←相対mm
    frontTextFontPt: 10,
    frontTextWeight: 500,
    frontTextColor: "#333",

    // 寸法線（外側）
    dimLeftOffsetX: 5,
    dimBottomOffsetY: 4.5,
    envHForDim: 136.69
    , // 寸法線表示用に「見た目高さ」を設定（後で微調整OK）
  };

  // =========================================================
  // 位置計算：封筒のページ座標
  // =========================================================
  const envLeft = TUNE.envX;
  const envTop = TUNE.envY + SHIFT.allY;

  // ラベル（おもて面）
  const labelY = envTop - -6;

  // =========================================================
  // 見出し（左上）
  // =========================================================
  const headingStyle: React.CSSProperties = {
    position: "absolute",
    left: `${SECTION.leftX}mm`,
    top: `${SECTION.topY + SHIFT.allY}mm`,
    fontSize: `${SECTION.headingFontPt}pt`,
    letterSpacing: "0.06em",
    color: "#6a6a6a",
    fontWeight: 500,
    whiteSpace: "nowrap",
    zIndex: 10,
  };

  const sectionTopY = SECTION.topY + SECTION.jpTopOffset;

  const goldLineStyle: React.CSSProperties = {
    position: "absolute",
    left: `${SECTION.leftX}mm`,
    top: `${sectionTopY + SHIFT.allY}mm`,
    width: `${SECTION.goldLineW}mm`,
    height: `${SECTION.goldLineH}mm`,
    background: "#C9A15A",
    zIndex: 10,
  };

  const sectionTextX = SECTION.leftX + SECTION.goldLineW + SECTION.goldToTextGap;

  const jpTitleStyle: React.CSSProperties = {
    position: "absolute",
    left: `${sectionTextX}mm`,
    top: `${sectionTopY - 0.3 + SHIFT.allY}mm`,
    fontSize: `${SECTION.jpFontPt}pt`,
    fontWeight: 700,
    color: "#6a6a6a",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    zIndex: 10,
  };

  const enTitleStyle: React.CSSProperties = {
    position: "absolute",
    left: `${sectionTextX}mm`,
    top: `${sectionTopY + SECTION.enTopOffset + SHIFT.allY}mm`,
    fontSize: `${SECTION.enFontPt}pt`,
    fontWeight: 400,
    color: "#6a6a6a",
    letterSpacing: "0.18em",
    whiteSpace: "nowrap",
    zIndex: 10,
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: `${PAGE.W}mm`,
        height: `${PAGE.H}mm`,
        background: "#fff",
      }}
    >
      {watermark && <Watermark enabled={watermark} />}

      {/* ヘッダー共通 */}
      <P02HeaderBand
        clientName={data.clientName}
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* 見出しブロック */}
      <div style={headingStyle}>{data.designLabel}</div>
      <div style={goldLineStyle} />
      <div style={jpTitleStyle}>{data.sectionJp}</div>
      <div style={enTitleStyle}>{data.sectionEn}</div>

      {/* ===== ラベル：おもて面 ===== */}
      <div
        style={{
          position: "absolute",
          left: `${envLeft}mm`,
          top: `${labelY}mm`,
          width: `${TUNE.baseLineW}mm`,
          textAlign: "center",
          fontSize: "10pt",
          color: "#9a9a9a",
          letterSpacing: "0.06em",
          zIndex: 20,
        }}
      >
        おもて面
      </div>

      {/* ===== ENVELOPE：黒罫線PNG(W218)を基準に縮小表示 ===== */}
      {(() => {
        // 縮尺（設計幅→表示幅）
        const scale =
          TUNE.baseLineDesignW > 0 ? TUNE.baseLineW / TUNE.baseLineDesignW : 1;

        // キャンバス（黒罫線の表示サイズ）
        // ※ 高さは「帯などがはみ出ない」範囲で後で微調整してください
        const canvasW = TUNE.baseLineW;
        const canvasH = 120 * scale; // いったん封筒高さ120mm想定で縮尺適用

        return (
          <div
            style={{
              position: "absolute",
              left: `${TUNE.envX}mm`,
              top: `${TUNE.envY + SHIFT.allY}mm`,
              width: `${canvasW}mm`,
              height: `${canvasH}mm`,
              // デバッグしたい時だけ枠をON
              // border: "0.2mm solid rgba(0,0,0,0.15)",
              boxSizing: "border-box",
              overflow: "visible",
            }}
          >
            {/* ここから中は「設計mm」を縮尺でまとめて縮小 */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `${TUNE.baseLineDesignW}mm`,
                height: `120mm`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {/* ⑦ グラデーション（最背面） */}
              <div
                style={{
                  position: "absolute",
                  left: `${TUNE.bandX}mm`,
                  top: `${TUNE.bandY}mm`,
                  width: `${TUNE.bandW}mm`,
                  height: `${TUNE.bandH}mm`,
                  background: `linear-gradient(90deg, ${data.colorPrimary}, ${data.colorSecondary})`,
                  zIndex: 1,
                }}
              />

              {/* ⑥ ロゴ敷き詰め画像 */}
              <img
                src={data.logoPattern}
                alt="pattern"
                style={{
                  position: "absolute",
                  left: `${TUNE.bandX}mm`,
                  top: `${TUNE.bandY}mm`,
                  width: `${TUNE.bandW}mm`,
                  height: `${TUNE.bandH}mm`,
                  objectFit: "cover",
                  mixBlendMode: "screen",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              {/* ④ 黒罫線（基準画像：W=designW で描画され、外側divで scale される） */}
              <img
                src="/images/futo_black_line.png"
                alt="black-line"
                style={{
                  position: "absolute",
                  left: `${TUNE.blackLineX}mm`,
                  top: `${TUNE.blackLineY}mm`,
                  width: `${TUNE.baseLineDesignW}mm`,
                  height: "auto",
                  objectFit: "contain",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />

              {/* ⑤ 白マスク */}
              <img
                src="/images/futo_white.png"
                alt="white-mask"
                style={{
                  position: "absolute",
                  left: `${TUNE.whiteMaskX}mm`,
                  top: `${TUNE.whiteMaskY}mm`,
                  width: `${TUNE.baseLineDesignW}mm`,
                  height: "auto",
                  objectFit: "contain",
                  zIndex: 4,
                  pointerEvents: "none",
                }}
              />

              {/* ② ベロ中央：逆さ文字 */}
              <div
                style={{
                  position: "absolute",
                  left: "0mm",
                  top: `${TUNE.flapTextY}mm`,
                  width: "100%",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                  transformOrigin: "center",
                  color: "#fff",
                  fontSize: `${TUNE.flapTextFontPt}pt`,
                  fontWeight: TUNE.flapTextWeight as any,
                  letterSpacing: "0.06em",
                  zIndex: 5,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {data.clientNameRomaji}
              </div>

              {/* ① ロゴ（W40mmは設計値。scaleで縮む） */}
              <img
                src={data.logoTop}
                alt="logo-top"
                style={{
                  position: "absolute",
                  left: `${TUNE.logoX}mm`,
                  top: `${TUNE.logoY}mm`,
                  width: `${TUNE.logoW}mm`,
                  height: `${TUNE.logoW}mm`,
                  objectFit: "contain",
                  zIndex: 6,
                  pointerEvents: "none",
                }}
              />

              {/* ③ 下のクライアント名 */}
              <div
                style={{
                  position: "absolute",
                  left: `${TUNE.frontTextX}mm`,
                  top: `${TUNE.frontTextY}mm`,
                  width: "auto",
                  textAlign: "left",
                  color: TUNE.frontTextColor,
                  fontSize: `${TUNE.frontTextFontPt}pt`,
                  fontWeight: TUNE.frontTextWeight as any,
                  letterSpacing: "0.06em",
                  zIndex: 6,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {data.clientName}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ===== 寸法線（外側）===== */}
      <img
        src="/images/futo_line_120.png"
        alt="dim-120"
        style={{
          position: "absolute",
          left: `${TUNE.envX + TUNE.dimLeftOffsetX}mm`,
          top: "64.5mm",
          height: `${TUNE.envHForDim}mm`,
          width: "5.153mm",
          objectFit: "contain",
          opacity: 0.95,
          pointerEvents: "none",
        }}
      />
      <img
        src="/images/futo_line_235.png"
        alt="dim-235"
        style={{
          position: "absolute",
          left: `${TUNE.envX + 16}mm`,

          top: `${TUNE.envY + SHIFT.allY + TUNE.envHForDim + TUNE.dimBottomOffsetY}mm`,
          width: "183.969mm",
          height: "8mm",
          objectFit: "contain",
          opacity: 0.95,
          pointerEvents: "none",
        }}
      />

      {/* フッター共通（P08表記） */}
      <P02Footer pageNo={data.pageNoText} />
    </div>
  );
}