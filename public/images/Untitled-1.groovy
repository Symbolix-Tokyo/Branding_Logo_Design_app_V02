/app
  /new/page.tsx
  /preview/[projectId]/page.tsx
  /print/[projectId]/page.tsx         ← PDF生成用（クライアントで分割して描画）
  /api
    /generate/route.ts
    /project/route.ts                 ← project JSON取得
    /pdf/route.ts                     ← Playwrightで印刷
/components
  /pdf
    PdfPage.tsx
    PdfHeader.tsx
    PdfFooter.tsx
    Watermark.tsx
    CoverImageGrid.tsx
    CoverPage.tsx
    Concept01Pages.tsx                ← 本文自動改ページ + 最終ページに5要素
/design
  tokens.ts
  spec.ts
/public
  watermark.png
  /assets/cover/
    hero_main.jpg
    hero_secondary.jpg
    work_process.jpg
    people_scene.jpg
    place_space.jpg
    detail_texture.jpg
    

export const tokens = {
  // A4横（XDのアートボードpx）
  page: {
    w: 4092.36,
    h: 2893.59
  },

  color: {
    text: "#707070",
    gold: "#D3A254",
    line: "#DCDCDC",
    white: "#FFFFFF",
    pillBg: "#6B6B6B"
  },

  font: {
    jp: `"Noto Sans JP", system-ui, sans-serif`,
    din: `"DIN 2014", system-ui, sans-serif`
  },

  // P02（確定）
  p02: {
    heading: {
      left: 313,
      top: 292,
      width: 995,
      height: 80,
      fontSize: 60,
      letterSpacing: 3
    },
    bodyBox: {
      left: 151,
      top: 455,
      width: 3730,
      // ★ここが「本文は無制限」でも崩れない要
      // ここに収まる分だけ本文を入れて、溢れたら本文だけ次ページへ
      maxHeight: 772
    },
    elementsBlock: {
      left: 407,
      top: 1207,
      width: 3474,
      height: 935
    },
    bottomSafe: 120,

    pill: {
      maxLines: 2,
      fontSize: 28, // ※必要なら後で調整
      lineHeight: 1.4,
      paddingY: 14,
      paddingX: 24,
      radius: 999
    }
  },

  // スタンプ（確定）
  stamp: {
    size: 400,
    top: 359,
    left: 3575,
    text: {
      fontSize: 80,
      letterSpacing: 16
    }
  },

  // P01はあとであなたのP01 “specs” から値を入れ替える前提で枠だけ用意
  p01: {
    grid: {
      // 6画像グリッド（ここはP01の数値で確定させてください）
      left: 313,
      top: 520,
      width: 1500,
      height: 1900,
      gap: 40,
      radius: 40
    }
  }
} as const;

export type CoverImageRole =
  | "hero_main"
  | "hero_secondary"
  | "work_process"
  | "people_scene"
  | "place_space"
  | "detail_texture";

export type ElementKey = "value" | "promise" | "proof" | "tone" | "nature";

export type ElementItem = {
  key: ElementKey;
  no: number;
  title: string;
  bullets: string[];
  pill: string;
};

export type PdfData = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  projectTitleLines: string[]; // ["HOFU style","ブランドロゴデザイン","のご提案"]
  projectSubtitle: string;

  stampText: string;

  conceptHeading: string;
  conceptBody: string;

  elements: ElementItem[];

  coverImages: Array<{ role: CoverImageRole; src: string; alt?: string }>;
};

import { tokens } from "@/design/tokens";

export default function PdfPage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: tokens.page.w,
        height: tokens.page.h,
        background: tokens.color.white,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {children}
    </div>
  );
}

export default function Watermark({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.06, zIndex: 50, pointerEvents: "none" }}>
      <img src="/watermark.png" alt="watermark" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}

import { tokens } from "@/design/tokens";

const ROLE_ORDER = [
  "hero_main",
  "hero_secondary",
  "work_process",
  "place_space",
  "people_scene",
  "detail_texture"
] as const;

export default function CoverImageGrid({
  images
}: {
  images: { role: string; src: string; alt?: string }[];
}) {
  const map = new Map(images.map((i) => [i.role, i]));
  const ordered = ROLE_ORDER.map((r) => map.get(r)).filter(Boolean) as typeof images;

  const g = tokens.p01.grid;

  return (
    <div
      style={{
        position: "absolute",
        left: g.left,
        top: g.top,
        width: g.width,
        height: g.height,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gap: g.gap
      }}
    >
      {ordered.map((img, i) => (
        <div key={i} style={{ borderRadius: g.radius, overflow: "hidden" }}>
          <img src={img.src} alt={img.alt ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}

import { tokens } from "@/design/tokens";
import type { PdfData } from "@/design/spec";
import CoverImageGrid from "./CoverImageGrid";

export default function CoverPage({ data }: { data: PdfData }) {
  return (
    <div style={{ position: "relative", width: tokens.page.w, height: tokens.page.h, color: tokens.color.text }}>
      {/* 左：6ロールグリッド */}
      <CoverImageGrid images={data.coverImages} />

      {/* 右：タイトルブロック（位置・サイズはP01 specsで詰める） */}
      <div style={{ position: "absolute", left: 2150, top: 900, width: 1600 }}>
        <div style={{ fontFamily: tokens.font.din, fontSize: 120, fontWeight: 700, color: tokens.color.text }}>
          {data.projectTitleLines[0]}
        </div>
        <div style={{ marginTop: 24, fontFamily: tokens.font.jp, fontSize: 140, fontWeight: 700, lineHeight: 1.1 }}>
          {data.projectTitleLines.slice(1).join("")}
        </div>
        <div style={{ marginTop: 48, whiteSpace: "pre-wrap", fontSize: 46, lineHeight: 1.7 }}>
          {data.projectSubtitle}
        </div>
      </div>

      {/* スタンプ（確定） */}
      <div
        style={{
          position: "absolute",
          left: tokens.stamp.left,
          top: tokens.stamp.top,
          width: tokens.stamp.size,
          height: tokens.stamp.size,
          borderRadius: 9999,
          border: `6px solid ${tokens.color.gold}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: tokens.color.gold
        }}
      >
        <div
          style={{
            fontFamily: tokens.font.jp,
            fontWeight: 700,
            fontSize: tokens.stamp.text.fontSize,
            letterSpacing: tokens.stamp.text.letterSpacing
          }}
        >
          {data.stampText}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { tokens } from "@/design/tokens";
import type { PdfData } from "@/design/spec";

function clamp2LinesStyle() {
  return {
    display: "-webkit-box",
    WebkitLineClamp: tokens.p02.pill.maxLines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
}

function splitByParagraphs(text: string) {
  // 改行を尊重しつつ、段落単位で分割
  return text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
}

export default function Concept01Pages({ data }: { data: PdfData }) {
  const [bodyPages, setBodyPages] = useState<string[]>([]);

  // 計測用（画面に見えないが、同じ幅/フォント/行間で高さを測る）
  const measureRef = useRef<HTMLDivElement | null>(null);

  const paragraphs = useMemo(() => splitByParagraphs(data.conceptBody), [data.conceptBody]);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const maxH = tokens.p02.bodyBox.maxHeight;

    const pages: string[] = [];
    let current: string[] = [];

    const flush = () => {
      pages.push(current.join("\n\n"));
      current = [];
    };

    const tryAdd = (p: string) => {
      const next = [...current, p].join("\n\n");
      el.textContent = next; // whiteSpace: pre-wrap で改行反映
      const h = el.scrollHeight;

      if (h <= maxH) {
        current.push(p);
        return;
      }

      // 1段落だけでも溢れる場合（超長文） → 文字で分割（安全策）
      if (current.length === 0) {
        // ラフに文字数で分割しつつ高さに収める
        let chunk = "";
        for (const ch of p) {
          const test = chunk + ch;
          el.textContent = test;
          if (el.scrollHeight > maxH) {
            pages.push(chunk);
            chunk = ch;
          } else {
            chunk = test;
          }
        }
        if (chunk) pages.push(chunk);
        return;
      }

      // 現ページを確定して次へ
      flush();
      // 次ページにこの段落を入れる
      current.push(p);
    };

    for (const p of paragraphs) tryAdd(p);
    if (current.length) flush();

    setBodyPages(pages);
  }, [paragraphs]);

  // 最終ページに5要素を出すため：
  // - 本文ページが1枚以上：最後の本文ページと同じページに要素を置く（固定領域なので衝突しない）
  // - 本文が空：要素ページだけ出す
  const pagesToRender = bodyPages.length ? bodyPages : [""];

  return (
    <>
      {/* 計測用ボックス（非表示） */}
      <div
        ref={measureRef}
        style={{
          position: "fixed",
          left: -99999,
          top: -99999,
          width: tokens.p02.bodyBox.width,
          fontFamily: tokens.font.jp,
          fontSize: 46,
          lineHeight: 1.8,
          whiteSpace: "pre-wrap"
        }}
      />

      {pagesToRender.map((bodyText, idx) => {
        const isLast = idx === pagesToRender.length - 1;

        return (
          <div
            key={idx}
            style={{
              position: "relative",
              width: tokens.page.w,
              height: tokens.page.h,
              color: tokens.color.text
            }}
          >
            {/* 見出し */}
            <div
              style={{
                position: "absolute",
                left: tokens.p02.heading.left,
                top: tokens.p02.heading.top,
                width: tokens.p02.heading.width,
                height: tokens.p02.heading.height,
                fontFamily: tokens.font.din,
                fontWeight: 700,
                fontSize: tokens.p02.heading.fontSize,
                letterSpacing: tokens.p02.heading.letterSpacing
              }}
            >
              {data.conceptHeading}
            </div>

            {/* 本文（可変：ただし maxHeight で分割済み） */}
            <div
              style={{
                position: "absolute",
                left: tokens.p02.bodyBox.left,
                top: tokens.p02.bodyBox.top,
                width: tokens.p02.bodyBox.width,
                maxHeight: tokens.p02.bodyBox.maxHeight,
                fontFamily: tokens.font.jp,
                fontSize: 46,
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
                overflow: "hidden"
              }}
            >
              {bodyText}
            </div>

            {/* 5エレメントは「最後のページだけ」 */}
            {isLast && (
              <div
                style={{
                  position: "absolute",
                  left: tokens.p02.elementsBlock.left,
                  top: tokens.p02.elementsBlock.top,
                  width: tokens.p02.elementsBlock.width,
                  height: tokens.p02.elementsBlock.height
                }}
              >
                {/* ここはあなたの既存デザインに合わせて構造化していく領域 */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 40 }}>
                  {data.elements.map((el) => (
                    <div key={el.key} style={{ textAlign: "center" }}>
                      {/* 番号丸 */}
                      <div
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 9999,
                          background: tokens.color.gold,
                          color: "white",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 34
                        }}
                      >
                        {el.no}
                      </div>

                      {/* 見出し */}
                      <div style={{ marginTop: 28, fontWeight: 700, fontSize: 52 }}>{el.title}</div>

                      {/* 箇条書き */}
                      <div style={{ marginTop: 24, textAlign: "left", fontSize: 36, lineHeight: 1.7 }}>
                        {el.bullets.map((b, i) => (
                          <div key={i}>・{b}</div>
                        ))}
                      </div>

                      {/* pill（最大2行） */}
                      <div
                        style={{
                          marginTop: 28,
                          padding: `${tokens.p02.pill.paddingY}px ${tokens.p02.pill.paddingX}px`,
                          background: tokens.color.pillBg,
                          color: "white",
                          borderRadius: tokens.p02.pill.radius,
                          fontWeight: 700,
                          fontSize: tokens.p02.pill.fontSize,
                          lineHeight: tokens.p02.pill.lineHeight,
                          ...clamp2LinesStyle()
                        }}
                      >
                        {el.pill}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 下余白は “置かない” ことで確保（bottomSafe） */}
                <div style={{ height: tokens.p02.bottomSafe }} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import PdfPage from "@/components/pdf/PdfPage";
import Watermark from "@/components/pdf/Watermark";
import CoverPage from "@/components/pdf/CoverPage";
import Concept01Pages from "@/components/pdf/Concept01Pages";
import type { PdfData } from "@/design/spec";

export default function PrintPage({ params, searchParams }: any) {
  const [data, setData] = useState<PdfData | null>(null);
  const watermark = searchParams?.watermark === "1";

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/project?projectId=${params.projectId}`, { cache: "no-store" });
      const json = await res.json();
      setData(json.data as PdfData);
      // Playwright待機用
      (window as any).__PRINT_READY__ = true;
    })();
  }, [params.projectId]);

  if (!data) return null;

  return (
    <div>
      <PdfPage>
        <Watermark enabled={watermark} />
        <CoverPage data={data} />
      </PdfPage>

      {/* P02は本文の長さ次第で複数ページになる */}
      <Concept01Pages data={data} />
    </div>
  );
}

import { NextResponse } from "next/server";
import { chromium } from "playwright";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");
  const watermark = url.searchParams.get("watermark") === "1";

  if (!projectId) return new NextResponse("projectId required", { status: 400 });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 900 } // 印刷自体はA4指定なので任意
  });

  const target = `http://localhost:3000/print/${projectId}?watermark=${watermark ? "1" : "0"}`;

  await page.goto(target, { waitUntil: "networkidle" });

  // Printページの分割レンダリング完了待ち
  await page.waitForFunction(() => (window as any).__PRINT_READY__ === true);

  const pdf = await page.pdf({
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" }
  });

  await browser.close();

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=proposal_${projectId}.pdf`
    }
  });
}

import { NextResponse } from "next/server";
import { readFileSync } from "fs";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ error: "projectId required" }, { status: 400 });

  const raw = readFileSync(`.tmp/projects/${projectId}.json`, "utf-8");
  return NextResponse.json({ data: JSON.parse(raw) });
}


