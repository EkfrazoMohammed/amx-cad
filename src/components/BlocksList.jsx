import React from "react";

function BlocksList({ blocks, toggleBlock, toggleAll, changeBlockColor }) {
  return (
    <div className="blocks-list">
      <button onClick={() => toggleAll(true)}>Show All Blocks</button>
      <button onClick={() => toggleAll(false)}>Hide All Blocks</button>
      <ul>
        {blocks.map((block) => (
          <li key={block.name} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                checked={block.isVisible}
                onChange={() => toggleBlock(block, !block.isVisible)}
              />
              {block.name}
            </label>
            <input
              type="color"
              value={rgbToHex(block.rgbColor)}
              onChange={(e) => changeBlockColor(block, hexToRgb(e.target.value))}
              style={{ width: "30px", height: "20px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const rgbToHex = (rgb) => {
  if (!rgb || !rgb.startsWith("rgb")) return "#FFFFFF";
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

export default BlocksList;