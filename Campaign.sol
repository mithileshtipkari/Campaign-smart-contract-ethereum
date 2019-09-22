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

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public contributorsCount;

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
        contributorsCount++;
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

    function approveRequest(uint index) public  {
        Request storage requestToBeApproved = requests[index];

        //check if the person calling this function is a contributor to our Campaignn
        require(approvers[msg.sender]);

        //check is request is not complete yet
        require(!requestToBeApproved.isComplete);

        //check is that person has not already approved this perticular Request
        require(!requestToBeApproved.approvals[msg.sender]);

        requestToBeApproved.approvals[msg.sender] = true;
        requestToBeApproved.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage requestToBeFinalized = requests[index];

        //check is request is not complete yet
        require(!requestToBeFinalized.isComplete);

        //request approvers should be greater than half of the contributors
        require(requestToBeFinalized.approvalCount > (contributorsCount/2));

        //send the money to the vendor
        requestToBeFinalized.recipient.transfer(requestToBeFinalized.value);

        //make request as complete
        requestToBeFinalized.isComplete = true;
    }
}
