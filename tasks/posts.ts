import { task } from 'hardhat/config';
import { MockProfileCreationProxy__factory, LensHub__factory } from '../typechain-types';
import { PostDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';

task('posts', 'creates a post').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const emptyCollectModuleAddr = addrs['EmptyCollectModule'];
  const lensHub = LensHub__factory.connect(addrs['LensHub Proxy'], governance);
  // await waitForTx(lensHub.whitelistCollectModule(emptyCollectModuleAddr, true));

  console.log('user wallet - ', user.address);

  const inputStruct: PostDataStruct = {
    profileId: 65,
    contentURI: 'https://loties.mypinata.cloud/ipfs/QmVmd9FjHda3aqzXcRkN8WQMRL7SSLVY9uFFFmXtENE1tF',
    collectModule: emptyCollectModuleAddr,
    collectModuleData: [],
    referenceModule: ZERO_ADDRESS,
    referenceModuleData: [],
  };
  await waitForTx(lensHub.connect(user).post(inputStruct));
  console.log(await lensHub.getPub(1, 1));
});
