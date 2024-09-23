export function getMapPreview(lat, lng) {
    return `https://tile.openstreetmap.org/${Math.round(14)}/${Math.round((lng + 180) / 360 * (1 << 14))}/${Math.round((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * (1 << 14))}.png`;

    
  }
  