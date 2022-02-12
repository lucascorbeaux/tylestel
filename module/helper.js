export const getPouvoir = (baseData) =>
  baseData.items.filter((item) => item.type === "pouvoir");
export const getActions = (baseData) =>
  baseData.items.filter((item) => item.type === "actions");
export const getReactions = (baseData) =>
  baseData.items.filter((item) => item.type === "reactions");
export const getItems = (baseData, itemType) =>
  baseData.items.filter((item) => item.type === itemType);
export const getActiveActions = (baseData) =>
  getActions(baseData).filter((item) => item.data.actif);
export const getActiveReactions = (baseData) =>
  getReactions(baseData).filter((item) => item.data.actif);

export function encodeToLitObject(data) {
  return encodeURIComponent(JSON.stringify(data));
}