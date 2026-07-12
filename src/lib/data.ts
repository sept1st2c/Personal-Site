// Barrel re-export. Content now lives in src/lib/data/* split by domain
// (person, experience, projects, skills, achievements, education) so
// different areas of the site can be worked on independently without
// touching the same file.
export * from "./data/person";
export * from "./data/experience";
export * from "./data/projects";
export * from "./data/skills";
export * from "./data/achievements";
export * from "./data/education";
export * from "./data/about";
