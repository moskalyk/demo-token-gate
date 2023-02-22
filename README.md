# demo-token-gate

Token gating is a popular way to access services built on the decentralized web using ERC20/ERC721/ERC1155. It promotes the ability to define roles & create exclusivity globally with the use of an NFT. Builders can create portals to purchase NFTs which then can be referenced directly via the contract address in the dapp code.

By pairing hosting of the static single page application with an IPFS solution, users can have high up-time, while creating a privacy layer for all users in their ecosystem.

## sequence indexer solution

With a few lines of code using the [sequence](https://sequence.xyz/) [indexer](https://docs.sequence.xyz/indexer) one can query a balance with high up-time to create custom experience for users.

Examples that can be built
- chat
- videostreaming
- event ticketing
- games & in-game adventures

## run dapp

```
# create a frontend repository for the app to be placed in, devs can also use react
$ npx degit solidjs/templates/ts . 

# add sequence indexer module
$ yarn add @0xsequence/indexer@^0.43.18

# run application
$ yarn dev

# build application
$ yarn build
```

### deploy dapp with fleek
1. sign up with [fleek.co](fleek.co) using your github
2. create a new site and connect with github
3. add a repository with a [.fleek.json]() file
4. deploy your code automatically with fleek CI/CD with a `git push`
5. access in the browser: `https://ipfs.cf-ipfs.com/ipfs/<CID>`

note: you can deploy your own gateway, or share amongst a group of people

#### fixes
Note: `^0.43.18` of `@0xsequence/indexer` will fix a `Vite 'global is not defined'` problem within the package. This will not be present with react and normal `@0xsequence/indexer`

## tools used
- sequence
- solid-js
- fleek