// var Web3 = require('web3');
// var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
const EtherWallet = artifacts.require('EtherWallet')
contract('EtherWallet', (accounts) => {
    it('Address', async () => {
        const etherWallet = await EtherWallet.deployed();
        console.log(etherWallet.address);
        assert(etherWallet.address !== '');
    })
    
    it('Testing balance', async () =>{
       
        const wallet = await EtherWallet.deployed();
        console.log("Address: " + wallet.address );
        
        let balance = web3.eth.getBalance(wallet.address);
        console.log("balance: " + balance)
     
    })

    it('Testing deposit function', async () => {
        const wallet_ =  await EtherWallet.deployed();
        const Deposit = web3.utils.toBN(web3.utils.toWei("0.5", "ether"));
        let address = accounts[1];
        // deposit action
        await wallet_.deposit(Deposit, {from: address, value: Deposit});
        console.log(Deposit);
        
    })

    it('Testing withdraw function', async () => {
        const Etherwallet = await EtherWallet.deployed();
        const withdrawalAmount = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));
        const owner = await Etherwallet.owner();
        const initialUserBalance = web3.utils.toBN(await web3.eth.getBalance(owner));
        const initialContractBalance = web3.utils.toBN(await web3.eth.getBalance(Etherwallet.address));
        // withdrawal action
       
        await Etherwallet.Withdraw(withdrawalAmount, { from: owner });


        const newUserBalance = web3.utils.toBN(await web3.eth.getBalance(owner));
        const newContractBalance = web3.utils.toBN(await web3.eth.getBalance(Etherwallet.address));

        assert.isTrue(newUserBalance.sub(initialUserBalance).eq(withdrawalAmount), "User balance not updated correctly");
        assert.isTrue(initialContractBalance.sub(newContractBalance).eq(withdrawalAmount), "Contract balance not updated correctly");
        // await Etherwallet.Withdraw(withdraw, {from: address, value: withdraw});
        // console.log(withdraw);
    })
       
})