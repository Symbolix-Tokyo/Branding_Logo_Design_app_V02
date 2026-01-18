export default function TestWatermark() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Watermark Test</h1>

      <p>/static/watermark.png</p>
      <img
        src="/static/watermark.png"
        alt="wm"
        style={{ width: 600, border: "1px solid #ccc" }}
      />

      <p>/static/credit_for_symbolix.png</p>
      <img
        src="/static/credit_for_symbolix.png"
        alt="credit"
        style={{ width: 600, border: "1px solid #ccc" }}
      />
    </div>
  );
}