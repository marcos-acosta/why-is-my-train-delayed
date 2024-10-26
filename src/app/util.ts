export const combineClassNames = (...classNames: (string | boolean)[]) =>
  classNames.filter(Boolean).join(" ");

export const ROUTE_TO_TRUNK_LINE: { [key: string]: any } = {
  A: "IND Eighth Av",
  C: "IND Eighth Av",
  E: "IND Eighth Av",
  B: "IND Sixth Av",
  D: "IND Sixth Av",
  F: "IND Sixth Av",
  M: "IND Sixth Av",
  G: "IND Crosstown",
  L: "BMT Canarsie",
  JZ: "BMT Nassau",
  N: "BMT Broadway",
  Q: "BMT Broadway",
  R: "BMT Broadway",
  W: "BMT Broadway",
  "1": "IRT Broadway",
  "2": "IRT Broadway",
  "3": "IRT Broadway",
  "4": "IRT Lexington",
  "5": "IRT Lexington",
  "6": "IRT Lexington",
  "7": "IRT Flushing",
  H: "Other",
};

export const TRUNK_TO_COLOR: { [key: string]: any } = {
  "IND Eighth Av": "#0039a6",
  "IND Sixth Av": "#ff6319",
  "IND Crosstown": "#6cbe45",
  "BMT Canarsie": "#a7a9ac",
  "BMT Nassau": "#996633",
  "BMT Broadway": "#fccc0a",
  "IRT Broadway": "#ee352e",
  "IRT Lexington": "#00933c",
  "IRT Flushing": "#b933ad",
  Other: "#808183",
};
