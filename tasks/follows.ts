import { task } from 'hardhat/config';
import { LensHub__factory, FollowNFT__factory } from '../typechain-types';
import { getAddrs, initEnv, waitForTx } from './helpers/utils';

task('follow', 'follows a profile').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['LensHub Proxy'], user);

  await waitForTx(lensHub.follow([67], [[]]));

  const followNFTAddr = await lensHub.getFollowNFT(67);
  const followNFT = FollowNFT__factory.connect(followNFTAddr, governance);

  const totalSupply = await followNFT.totalSupply();
  const ownerOf = await followNFT.ownerOf(1);

  console.log(`Follow NFT total supply (should be 1): ${totalSupply}`);
  console.log(
    `Follow NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}`
  );
});