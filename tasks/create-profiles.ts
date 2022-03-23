import { task } from 'hardhat/config';
import { MockProfileCreationProxy__factory, LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';

task('create-profile', 'creates a profile').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const mockHub = MockProfileCreationProxy__factory.connect(
    addrs['MockProfileCreationProxy'],
    governance
  );
  const lensHub = LensHub__factory.connect(addrs['LensHub Proxy'], governance);

  // await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

  const inputStruct: CreateProfileDataStruct = {
    to: governance.address,
    handle: 'bojo',
    imageURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    followModule: ZERO_ADDRESS,
    followModuleData: [],
    followNFTURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  };
  console.log('user wallet - ', governance.address);

  await waitForTx(mockHub.connect(governance).proxyCreateProfile(inputStruct));

  // console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
  // console.log(
  //   `Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`
  // );
  console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('wizg0t')}`);
  console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('bojo')}`);
  console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('blando')}`);
});
 