// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    // Structure to hold campaign details
    struct Campaign {
        address owner; // Address of the campaign creator
        string title; // Title of the campaign
        string description; // Description of the campaign
        uint256 target; // Target amount in WEI
        uint256 deadline; // Deadline as a Unix timestamp
        uint256 amountCollected; // Amount collected so far
        string image; // URL for the campaign image
        address[] donators; // Array of donator addresses
        uint256[] donations; // Array of donation amounts
    }

    // Mapping from campaign ID to Campaign struct
    mapping(uint256 => Campaign) public campaigns;

    // Counter for the number of campaigns
    uint256 public numberOfCampaigns = 0;

    // Event emitted when a new campaign is created
    event CampaignCreated(
        uint256 id,
        address indexed owner,
        string title,
        uint256 target,
        uint256 deadline
    );

    // Event emitted when a donation is made
    event Donated(
        uint256 indexed campaignId,
        address indexed donator,
        uint256 amount
    );

    // Function to create a new campaign
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        // Create a new campaign in memory
        Campaign storage newCampaign = campaigns[numberOfCampaigns];

        // Ensure all conditions are met
        require(
            newCampaign.deadline < block.timestamp, "The deadline should be a date in the future."
        );

        // Assign values to the new campaign
        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.image = _image;
        newCampaign.amountCollected = 0;

        // Emit the event
        emit CampaignCreated(
            numberOfCampaigns,
            _owner,
            _title,
            _target,
            _deadline
        );

        // Increment the campaign counter
        numberOfCampaigns++;

        // Return the ID of the new campaign
        return numberOfCampaigns - 1;
    }

    // Function to donate to a campaign
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        // Check if the campaign exists
        require(campaign.owner != address(0), "Campaign does not exist.");
        // Check if the deadline has not passed
        require(block.timestamp < campaign.deadline, "Campaign has ended.");
        // Ensure some ETH is sent
        require(amount > 0, "Donation amount must be greater than 0.");

        // Record the donation
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        campaign.amountCollected += amount;

        // Emit the event
        emit Donated(_id, msg.sender, amount);
    }

    // Function to get donators of a campaign
    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // Function to get all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}