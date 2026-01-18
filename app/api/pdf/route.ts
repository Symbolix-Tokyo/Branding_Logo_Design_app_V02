import { NextResponse } from "next/server";
import { chromium } from "playwright";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");
  const watermark = url.searchParams.get("watermark") === "1";

  if (!projectId) return new NextResponse("projectId required", { status: 400 });

  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 1400, height: 900 } // 印刷自体はA4指定なので任意
  });

  const target = `http://localhost:3000/print/${projectId}?watermark=${watermark ? "1" : "0"}`;

  await page.goto(target, { waitUntil: "networkidle" });

  // Printページの分割レンダリング完了待ち
  await page.waitForFunction(() => (window as any).__PRINT_READY__ === true);

  const pdf = await page.pdf({
    path: "output.pdf",
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" }
  });

  await browser.close();

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=proposal_${projectId}.pdf`
    }
  });
}