
module.exports = async (taskArgs,hre) => {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0];

    console.log("deployer address:",deployer.address);

    let proxy = await hre.deployments.get("MapoServiceProxyV3");

    console.log("mos address:", proxy.address);

    let mos = await ethers.getContractAt('MapoServiceV3',proxy.address);

    let ids = taskArgs.chains.split(",");

    for (let i = 0; i < ids.length; i++){
        await (await mos.connect(deployer).registerChain(
            taskArgs.token,
            ids[i],
            taskArgs.enable
        )).wait();

        console.log(`mos register token ${taskArgs.token} to chain ${ids[i]} success`);
    }

    console.log("mos registerChain success");
}
