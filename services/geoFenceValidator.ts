export function isWithinVotingZone(userLocation: {lat: number, lng: number}, zone: {center: {lat:number,lng:number}, radiusKm: number}) {
  const toRad = (x: number) => x * Math.PI / 180;
  const R = 6371; // km
  const dLat = toRad(zone.center.lat - userLocation.lat);
  const dLng = toRad(zone.center.lng - userLocation.lng);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(userLocation.lat)) * Math.cos(toRad(zone.center.lat)) * Math.sin(dLng/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c) <= zone.radiusKm;
}
