const MyERC721Token = artifacts.require("MyERC721Token");

contract("MyERC721Token", (accounts) => {
    let token;

    beforeEach(async () => {
        token = await MyERC721Token.new({ from: accounts[0] });
    });

    it("should have the correct name and symbol", async () => {
        const name = await token.name();
        const symbol = await token.symbol();

        assert.equal(name, "MyERC721Token");
        assert.equal(symbol, "MTK");
    });

    it("should allow the owner to pause and unpause the contract", async () => {
        const isPaused = await token.paused();

        assert.equal(isPaused, false);

        await token.pause({ from: accounts[0] });
        const isPausedAfterPause = await token.paused();
        assert.equal(isPausedAfterPause, true);

        await token.unpause({ from: accounts[0] });
        const isPausedAfterUnpause = await token.paused();
        assert.equal(isPausedAfterUnpause, false);
    });

    it("should allow the owner to mint a new token", async () => {
        const uri = "https://example.com/token.json";
        const tokenId = 1;

        await token.safeMint(accounts[0], tokenId, uri, { from: accounts[0] });

        const owner = await token.ownerOf(tokenId);
        const tokenUri = await token.tokenURI(tokenId);

        assert.equal(owner, accounts[0]);
        assert.equal(tokenUri, uri);
    });

    it("should allow transfer of tokens", async () => {
        const uri = "https://example.com/token.json";
        const tokenId = 1;

        await token.safeMint(accounts[0], tokenId, uri, { from: accounts[0] });

        const ownerBefore = await token.ownerOf(tokenId);

        await token.safeTransferFrom(accounts[0], accounts[1], tokenId, {
            from: accounts[0],
        });

        const ownerAfter = await token.ownerOf(tokenId);

        assert.equal(ownerBefore, accounts[0]);
        assert.equal(ownerAfter, accounts[1]);
    });

});
