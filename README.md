# Dat-feel

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
