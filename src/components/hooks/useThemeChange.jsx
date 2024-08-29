export default function useThemeChange() {
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const darkColors = {
    [hexToRgb("#1E1F25")]: hexToRgb("#FBFAFF"),
    [hexToRgb("#131517")]: hexToRgb("#F3F4F8"),
    [hexToRgb("#FFFFFF")]: hexToRgb("#000000"),
    [hexToRgb("#374151")]: hexToRgb("#000000"),
  };

  function changeColours() {
    const allElements = document.querySelectorAll("*");
    console.log("switching theme");
    allElements.forEach((element) => {
      const computedStyle = getComputedStyle(element);

      Object.entries(darkColors).forEach(([dark, light]) => {
        console.log("Color is: ", computedStyle.color);
        if (computedStyle.color === dark) {
          element.style.color = light;
        }
        if (computedStyle.backgroundColor === dark) {
          element.style.backgroundColor = light;
        }
      });
    });
  }

  return changeColours;
}
