// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// EX1
contract Ex1_Addition {
    uint public a = 5;
    uint public b = 10;

    function addition1() public view returns (uint) {
        return a + b;
    }

    function addition2(uint x, uint y) public pure returns (uint) {
        return x + y;
    }
}

// EX2
contract Ex2_Converter {
    function etherEnWei(uint montantEther) public pure returns (uint) {
        return montantEther * 1 ether;
    }

    function weiEnEther(uint montantWei) public pure returns (uint) {
        return montantWei / 1 ether;
    }
}

// EX3
contract Ex3_GestionChaines {
    string public message;

    function setMessage(string memory _msg) public {
        message = _msg;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function concatener(string memory a, string memory b) public pure returns (string memory) {
        return string.concat(a, b);
    }

    function concatenerAvec(string memory other) public view returns (string memory) {
        return string.concat(message, other);
    }

    function longueur(string memory s) public pure returns (uint) {
        return bytes(s).length;
    }

    function comparer(string memory a, string memory b) public pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}

// EX4
contract Ex4_Positif {
    function estPositif(int x) public pure returns (bool) {
        return x > 0;
    }
}

// EX5
contract Ex5_Parite {
    function estPair(uint x) public pure returns (bool) {
        return x % 2 == 0;
    }
}

// EX6
contract Ex6_Tableau {
    uint[] public nombres;

    constructor() {
        nombres.push(1);
        nombres.push(2);
    }

    function ajouterNombre(uint x) public {
        nombres.push(x);
    }

    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index invalide");
        return nombres[index];
    }

    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    function calculerSomme() public view returns (uint somme) {
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
    }
}

// EX7
abstract contract Forme {
    uint public x;
    uint public y;

    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }

    function deplacerForme(uint dx, uint dy) public {
        x += dx;
        y += dy;
    }

    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }

    function afficheInfos() public pure virtual returns (string memory) {
        return "Je suis une forme";
    }

    function surface() public view virtual returns (uint);
}

contract Ex7_Rectangle is Forme {
    uint public lo;
    uint public la;

    constructor(uint _x, uint _y, uint _lo, uint _la) Forme(_x, _y) {
        lo = _lo;
        la = _la;
    }

    function surface() public view override returns (uint) {
        return lo * la;
    }

    function afficheInfos() public pure override returns (string memory) {
        return "Je suis Rectangle";
    }

    function afficheLoLa() public view returns (uint, uint) {
        return (lo, la);
    }
}

// EX8
contract Ex8_Payment {
    address public recipient;

    constructor(address _recipient) {
        recipient = _recipient;
    }

    function receivePayment() public payable {
        require(msg.value > 0, "Envoyer ETH");
    }

    function withdraw() public {
        require(msg.sender == recipient, "Non autorise");
        payable(recipient).transfer(address(this).balance);
    }
}