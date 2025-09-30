import hre from "hardhat";

async function main() {
  // This is the new way to deploy a contract
  const crowdFunding = await hre.ethers.deployContract("CrowdFunding");

  // This is the new function to wait for deployment
  await crowdFunding.waitForDeployment();

  // This is the new way to get the address
  console.log(
    `CrowdFunding contract deployed to: ${await crowdFunding.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});