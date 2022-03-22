/* eslint-disable import/prefer-default-export */
import Web3 from 'web3';

import contractBear from '../contracts/BearABI.json';
import contractStaking from '../contracts/StakingABI.json';
import contractToken from '../contracts/TokenABI.json';
import contractBerriesStaking from '../contracts/BerriesStakingABI.json';
import contractLPStaking from '../contracts/LPStakingABI.json';
import contractLPToken from '../contracts/LPTokenABI.json';
import contractSingleStaking from '../contracts/BerriesSingleStakingABI.json';
import contractBerriesToken from '../contracts/BerriesTokenABI.json';
import contractRoll from '../contracts/RollABI.json';
import contractAngel from '../contracts/AngelABI.json';
import {
  ANGEL_REWARD_CONTRACT,
  BEAR_CONTRACT,
  BERRIES_SINGLE_STAKING_CONTRACT,
  BERRIES_STAKING_CONTRACT,
  BERRIES_TOKEN_CONTRACT,
  INFURA_ENDPOINT,
  LP_STAKING_CONTRACT,
  LP_TOKEN,
  ROLL_CONTRACT,
  STAKE_CONTRACT,
  TOKEN_CONTRACT,
} from './constants';

export const getContractBear = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractBear.abi;

  const contractAddress = BEAR_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractStake = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractBerriesStaking.abi;

  const contractAddress = BERRIES_STAKING_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractStakeOld = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractStaking.abi;

  const contractAddress = STAKE_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractNapaToken = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractToken.abi;

  const contractAddress = TOKEN_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractNoWallet = async () => {
  const networkAddress = INFURA_ENDPOINT;
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  const contractAbi: any = contractBear.abi;

  const contractAddress = BEAR_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractBerriesStake = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractBerriesStaking.abi;

  const contractAddress = BERRIES_STAKING_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractStakeLP = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractLPStaking.abi;

  const contractAddress = LP_STAKING_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractLPToken = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractLPToken.abi;

  const contractAddress = LP_TOKEN;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractSingleStaking = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractSingleStaking.abi;

  const contractAddress = BERRIES_SINGLE_STAKING_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractBerriesToken = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractBerriesToken.abi;

  const contractAddress = BERRIES_TOKEN_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractRoll = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractRoll.abi;

  const contractAddress = ROLL_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractAngel = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractAngel.abi;

  const contractAddress = ANGEL_REWARD_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};
