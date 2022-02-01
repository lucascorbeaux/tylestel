/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  const basePath = "systems/tylestel/templates";
  // Define template paths to load
  const templates = [
    "part/heros-headers.html",
    "part/heros-attributs.html",
    "part/heros-metiers.html",
    "part/heros-divinites.html",
    "part/metier-value.html",
    "part/attribut-value.html",
    "part/dieu-value.html",
    "part/item-headers.html",
    "part/select-attribut.html",
    "part/select-metier.html"
  ];

  const templatesPath = templates.map((t) => `${basePath}/${t}`);

  console.log(`Tylestel | Initializing templates`, templatesPath);

  // Load the template parts
  return loadTemplates(templatesPath);
};
