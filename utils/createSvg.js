export function createSvg(pathString) {
  const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgIcon.setAttribute('width', '24px');
  svgIcon.setAttribute('height', '24px');
  svgIcon.setAttribute('fill', '#5f6368');
  svgIcon.setAttribute('viewBox', '0 -960 960 960');

  const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath.setAttribute(
    'd',
    `${pathString}`
  );

  svgIcon.appendChild(svgPath);

  return svgIcon;
}