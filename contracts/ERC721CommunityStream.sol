// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721CommunityStream is ERC721, Ownable {
    constructor() ERC721("ERC721CommunityStream", "MTK") {}
}