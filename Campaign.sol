pragma solidity ^0.4.17;

contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool isComplete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minContri) public{
        manager = msg.sender;
        minimumContribution = minContri;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
    }

    function createRequest(string description, uint value, address recipient) public restricted{

        Request memory req = Request({
            description: description,
            value: value,
            recipient: recipient,
            isComplete: false,
            approvalCount: 0
        });
        requests.push(req);
    }
}
