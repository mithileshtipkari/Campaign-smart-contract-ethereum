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
      approvers.push(msg.sender);
  }

  function createRequest(string description, uint value, address recipient) public restricted{
        Request req = Request({
            description: description,
            value: value,
            recipient: recipient,
            isComplete: false
        });
        requests.push(req);
    }

    function getRequestAtIndex(uint index) public restricted returns(Request){
        return requests[index];
    }
}
