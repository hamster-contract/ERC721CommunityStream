const ERC721CommunityStream = artifacts.require("ERC721CommunityStream");

contract("ERC721CommunityStream", (accounts) => {
    let contractInstance;

    beforeEach(async () => {
        contractInstance = await ERC721CommunityStream.new({ from: accounts[0] });
    });

    it("should deploy the contract properly", async () => {
        assert.equal(await contractInstance.name(), "ERC721CommunityStream");
        assert.equal(await contractInstance.symbol(), "MTK");
    });
});
