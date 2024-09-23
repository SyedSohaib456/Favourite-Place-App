export function getMapPreview(lat, lng) {
    return `https://tile.openstreetmap.org/${Math.round(14)}/${Math.round((lng + 180) / 360 * (1 << 14))}/${Math.round((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * (1 << 14))}.png`;

  }


    export async function getAddress(lat,lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      const data = await response.json();
      return data.address;
    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    }
     
  }