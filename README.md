# voting-dApp

1) you need to install the packages using
```shell
npm install
```

2) the project is ready, the only thing in it is to create a new contract every time using the command (npx hardhat run --network volta scripts/deploy.js) at the root of the voting contract project (you can change the contract lifetime using voting/scripts/deploy.js)
add the created contract address to 2 files: (.env) and (constant.js located in the react project react-app/src/Constant/constant.js )
```shell
npx hardhat compile
npx hardhat run --network volta scripts/deploy.js
```

3) The react project is launched from the root folder using the command 
```shell
npm start
```
