module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
