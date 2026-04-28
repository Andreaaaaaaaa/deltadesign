import { defaults as tsjPreset } from "ts-jest/presets";

const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  // 别名设置
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/components/$1",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // 测试文件
  testMatch: ["<rootDir>/tests/unit/*.spec.ts?(x)"],

  transform: {
    ...tsjPreset.transform,
    "^.+\\.vue$": "@vue/vue3-jest",
  },
};
