# Evenity: Host Events in a Decentralized Way

### Prerequisites
- Ensure [Node.js](https://nodejs.org/en/) `>= 16` and [`dfx`](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.14` are installed.

- Follow the steps mentioned in the backend canister first: [[https://github.com/jintukumardas/evenity-management-canister](https://github.com/jintukumardas/evenity-backend-canister)](https://github.com/jintukumardas/evenity-backend-canister)


### Setup
1. Clone the repository: `git clone https://github.com/jintukumardas/evenity.git`
2. Install dependencies and setup the project: `npm run setup`
3. Start the development server: `npm run start`  (make sure canister id env is set)

Make sure canister id is exported as mentioned in the previous steps, dfx is installed and backend canister is running.

- Copy the declarations folder from `evenity-management-canister/src/declarations to evenity/src`
- Export CANISTER ID if not already : `export CANISTER_ID_EVENTS=<CANISTER ID>`[IMPORTANT]
- Run `npm i --force` (force is needed) [IMPORTANT]
- Run `npm run frontend` (App should be running in 3000 port) [Now use can use the app]


### Deployment
- Deploy to the Internet Computer: `dfx deploy --network ic`

## Technology Stack
- [Vite](https://vitejs.dev/): High-performance tooling for front-end web development
- [React](https://reactjs.org/): A component-based UI library
- [TypeScript](https://www.typescriptlang.org/): JavaScript extended with syntax for types
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework
- [Motoko](https://github.com/dfinity/motoko#readme): A safe and simple programming language for the Internet Computer
- [Mops](https://mops.one): An on-chain community package manager for Motoko
- [mo-dev](https://github.com/dfinity/motoko-dev-server#readme): A live reload development server for Motoko

## Documentation
- [Vite developer docs](https://vitejs.dev/guide/)
- [React quick start guide](https://react.dev/learn)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)
- [Motoko developer docs](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/)
- [Mops usage instructions](https://j4mwm-bqaaa-aaaam-qajbq-cai.ic0.app/#/docs/install)


Thank you :)
