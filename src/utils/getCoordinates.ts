
export const getCoordinates = async(locationName: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();    
      
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      console.error("Address not found.");
      return null;
    }
  } catch (error) {
    console.error("Geocoding request failed:", error);
    return null;
  }
}