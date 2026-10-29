# Dat-feel. ETH Lisbon Hackaton

**Dat-feel turns a DAO's proposals on Tally or Snapshot into a bounty board, so contributors can apply, deliver and get validated on-chain.**

- Problem: DAOs pass proposals but have no smooth way to turn them into work a new contributor can pick up.
- For: DAOs onboarding contributors, and contributors who want tokens, XP, reputation and validated tasks on their profile.
- What it is: one yarn workspace with a Next.js frontend, Hardhat contracts and a subgraph.
- Try it: [dat-feel.vercel.app](https://dat-feel.vercel.app/) or the four-terminal setup below. Early experiment from the ETH Lisbon hackathon, October 2021.


Create your DAO's bounty board from proposals using Tally/Snapshot. On-board more contributors and make coordination easier. Smooth application, delivery and validation – Contributors gain tokens, XP, reputation and get’s on-chain validated tasks on their profile!

## Get Started

1. Install

```sh
yarn install
```

On the root folder, open 4 terminals.

### Terminal #1

Run hardhat local node

```sh
yarn chain
```

### Terminal #2

Run the frontend application

```sh
yarn dev:frontend
```

### Terminal #3

Run the graph node `(Requires docker)`

```sh
yarn graph-run-node
```

### Terminal #4

Deploy the contracts and the graph

```sh
yarn deploy-and-graph
```

That's it!

- The frontend application will be reached on `http://localhost:3000`
- The graphql playground will be reached on `http://localhost:8000/subgraphs/name/dat-feel/master/graphql`

## Other commands

1. Deploy only the graph

```sh
yarn graph-ship-local
```

## Development on subgraph

On the root folder run the following commands after doing the changes to the contract

1. Generate the subgraph .yml file and the generated graphql files

```sh
yarn graph-codegen
```

### Deployed Addresses

| Network | Contract           | Address                                      |
| ------- | ------------------ | -------------------------------------------- |
| Goerli  | `StandardBounties` | `0x43A4860EF71E0BB19982240187ce981423B42AcA` |
| Rinkeby | `StandardBounties` | `0x005BAD45C0886643b3D5A6684D8caD3d66F60761` |
