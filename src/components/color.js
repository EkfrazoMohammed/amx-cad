const colorMap = [
    { aci: 0, hex: "#000000", rgb: "rgb(0,0,0)" },
    { aci: 1, hex: "#FF0000", rgb: "rgb(255,0,0)" },
    { aci: 2, hex: "#FFFF00", rgb: "rgb(255,255,0)" },
    { aci: 3, hex: "#00FF00", rgb: "rgb(0,255,0)" },
    { aci: 4, hex: "#00FFFF", rgb: "rgb(0,255,255)" },
    { aci: 5, hex: "#0000FF", rgb: "rgb(0,0,255)" },
    { aci: 6, hex: "#FF00FF", rgb: "rgb(255,0,255)" },
    { aci: 7, hex: "#FFFFFF", rgb: "rgb(255,255,255)" },
  ];
  
  export const getByACI = (aci) => colorMap.find((c) => c.aci === aci) || { rgb: "rgb(255,255,255)" };