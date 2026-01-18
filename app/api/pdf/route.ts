import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");
    const watermark = url.searchParams.get("watermark") === "1";

    if (!projectId) {
      return NextResponse.json({ error: "projectId required" }, { status: 400 });
    }

    const executablePath = await chromium.executablePath();

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    // ★ env不要：このリクエスト自身の origin を使う
    const baseUrl = url.origin;
    const targetUrl = `${baseUrl}/print/${projectId}?watermark=${watermark ? "1" : "0"}`;

    await page.goto(targetUrl, { waitUntil: "networkidle0" });

    // Printページの分割レンダリング完了待ち
    await page.waitForFunction(() => (window as any).__PRINT_READY__ === true);

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    await page.close();
    await browser.close();

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=proposal_${projectId}.pdf`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "PDF generation failed", detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}