import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { chromium as pwChromium } from "playwright-core";

export const runtime = "nodejs";          // ★必須（Edgeだと落ちます）
export const dynamic = "force-dynamic";   // ★PDFは動的生成なので

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");
    const watermark = url.searchParams.get("watermark") === "1";

    if (!projectId) {
      return NextResponse.json({ error: "projectId required" }, { status: 400 });
    }

    // ★ Vercel/Lambda向けのChromium設定
    const executablePath = await chromium.executablePath();

    const browser = await pwChromium.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage({
      viewport: { width: 1400, height: 900 }
    });

    // 本番環境ではVercelのURLを使用
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : "http://localhost:3000";
    const targetUrl = `${baseUrl}/print/${projectId}?watermark=${watermark ? "1" : "0"}`;

    await page.goto(targetUrl, { waitUntil: "networkidle" });

    // Printページの分割レンダリング完了待ち
    await page.waitForFunction(() => (window as any).__PRINT_READY__ === true);

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" }
    });

    await page.close();
    await browser.close();

    return new NextResponse(pdfBuffer, {
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