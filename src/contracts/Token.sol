pragma solidity 0.8.10;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract Token is ERC721, Ownable {
    struct Monster {
        uint16 health;
        uint8 attack;
        uint8 skill;
        uint8 defense;
        uint8 resistence;
        uint8 speed;
        uint8 luck;
        uint8 rating;
        uint256 lastMeal;
        uint256 stamina;
        string img;
    }

    uint256 private _nextId = 0;

    mapping(uint256 => Monster) private _tokenDetials;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function mint(
        uint16 health,
        uint8 attack,
        uint8 skill,
        uint8 defense,
        uint8 resistence,
        uint8 speed,
        uint8 luck,
        uint8 rating
    ) public onlyOwner {
        uint nextId = _getNextId();
        _tokenDetials[nextId] = Monster(
            health,
            attack,
            skill,
            defense,
            resistence,
            speed,
            luck,
            rating,
            block.timestamp,
            rating * 100, 
            ""
        );
        _safeMint(msg.sender, nextId);
    }

    function getMonsterDetails(uint256 tokenId)
        public
        view
        returns (Monster memory)
    {
        return _tokenDetials[tokenId];
    }

    function feed(uint256 tokenId, uint256 food) public {
        Monster storage mon = _tokenDetials[tokenId];
        require(mon.stamina + mon.lastMeal > block.timestamp);
        mon.lastMeal = block.timestamp;
    }

    function getTotalSupply() public view returns (uint256) {
        return _nextId;
    }

    function _getNextId() private returns (uint256) {
        return _nextId++;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        Monster storage mon = _tokenDetials[tokenId];
        require(mon.stamina + mon.lastMeal > block.timestamp); // Check that the Monster is alive
    }
}
