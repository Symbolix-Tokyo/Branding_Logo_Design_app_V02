import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>ブランドロゴデザイン提案書アプリ</h1>
      <p>PDF形式のブランドロゴデザイン提案書を生成するアプリケーションです。</p>
      
      <div style={{ marginTop: "2rem" }}>
        <h2>機能</h2>
        <ul>
          <li>カバーページの生成</li>
          <li>コンセプトページの動的分割</li>
          <li>ブランド要素の表示</li>
          <li>PDF出力（透かし対応）</li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>プレビュー</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link 
            href="/print/sample" 
            style={{ 
              padding: "0.5rem 1rem", 
              backgroundColor: "#0070f3", 
              color: "white", 
              textDecoration: "none",
              borderRadius: "4px"
            }}
          >
            サンプルプレビュー
          </Link>
          <Link 
            href="/print/sample?watermark=1" 
            style={{ 
              padding: "0.5rem 1rem", 
              backgroundColor: "#666", 
              color: "white", 
              textDecoration: "none",
              borderRadius: "4px"
            }}
          >
            透かし付きプレビュー
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>PDF生成</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link 
            href="/api/pdf?projectId=sample" 
            style={{ 
              padding: "0.5rem 1rem", 
              backgroundColor: "#28a745", 
              color: "white", 
              textDecoration: "none",
              borderRadius: "4px"
            }}
          >
            PDF ダウンロード
          </Link>
          <Link 
            href="/api/pdf?projectId=sample&watermark=1" 
            style={{ 
              padding: "0.5rem 1rem", 
              backgroundColor: "#17a2b8", 
              color: "white", 
              textDecoration: "none",
              borderRadius: "4px"
            }}
          >
            透かし付きPDF
          </Link>
        </div>
      </div>
    </div>
  );
}