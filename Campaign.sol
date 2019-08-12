pragma solidity ^0.4.17;

contract Campaign{
  struct Request{
        string discription;
        uint value;
        address recipient;
        bool isComplete;
    }
  address public manager;
  uint public minimumContribution;
  address[] public approvers;

  function Campaign(uint minContri) public{
      manager = msg.sender;
      minimumContribution = minContri;
  }

  function contribute() public payable{
      require(msg.value > minimumContribution);
      approvers.push(msg.sender);
  }
}
