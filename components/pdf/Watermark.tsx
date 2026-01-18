export default function Watermark({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: "rotate(-30deg)",
          opacity: 0.06,
          fontSize: "22pt",
          fontWeight: 700,
          color: "#000",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div style={{ whiteSpace: "nowrap" }}>Symbolix Design Estate for DX</div>
      </div>
    </div>
  );
}