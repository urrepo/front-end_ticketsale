const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    '',
  
  'https://goerli.infura.io/v3/c5bafaa916374662a77b5d3372898972'
      
);
/*const provider2 = new HDWalletProvider(
    'thrive buffalo royal develop relax program minor winter equal guard lake hedgehog',
    // remember to change this to your own phrase!
    'https://sepolia.infura.io/v3/c5bafaa916374662a77b5d3372898972'
    // remember to change this to your own endpoint!
  );*/
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

let ticketsale = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [100000,0],})
    .send({ from: accounts[0], gasPrice: 800000000, gas: 4000000});

  console.log('Contract deployed to', ticketsale.options.address);
  provider.engine.stop();
};
deploy();
