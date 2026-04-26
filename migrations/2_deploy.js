const Ex1 = artifacts.require("Ex1_Addition");
const Ex2 = artifacts.require("Ex2_Converter");
const Ex3 = artifacts.require("Ex3_GestionChaines");
const Ex4 = artifacts.require("Ex4_Positif");
const Ex5 = artifacts.require("Ex5_Parite");
const Ex6 = artifacts.require("Ex6_Tableau");
const Ex7 = artifacts.require("Ex7_Rectangle");
const Ex8 = artifacts.require("Ex8_Payment");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Ex1);
  await deployer.deploy(Ex2);
  await deployer.deploy(Ex3);
  await deployer.deploy(Ex4);
  await deployer.deploy(Ex5);
  await deployer.deploy(Ex6);
  await deployer.deploy(Ex7, 0, 0, 10, 5);
  await deployer.deploy(Ex8, accounts[0]);
};