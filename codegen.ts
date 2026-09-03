import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const config: CodegenConfig = {
  schema: "../cms-backend/src/schema.gql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "./src/gql_generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
          gqlTagName: "gql",
      },
    },
  },
};

export default config;
