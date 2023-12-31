// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
contract ticketsale {
 // <contract_variables>
  uint tickets;
  uint ticketPrice;
  address public manager;
  address public partner;
  int public revenue;

  struct Tickets{
    bool isNotavailable;
    bool beingOffer;
    // "takes" is the amount of attempts user has taken
    bool takes;
  }
  mapping (uint => Tickets) public ticketslist;
  mapping(address => uint) public ticketOf;
 // </contract_variables>
 constructor(uint numTickets, uint price)  {
    tickets = numTickets;
    ticketPrice = price;
    revenue = 0;
    manager = msg.sender;

 }
 function buyTicket(uint ticketId) public payable {
    require(ticketId >= 0 && ticketId <= tickets,"Invalid Ticket");
    require(ticketslist[ticketId].isNotavailable == false, "sorry ticket sold");
    require(msg.value == ticketPrice, "Incorrect payment amount");

    revenue += int256(ticketPrice);
      payable(manager).transfer(msg.value);
    ticketslist[ticketId] =  Tickets(true,false,true);
    ticketOf[msg.sender] = ticketId;
 }
 function getTicketOf(address person) public view returns (uint) {
      return ticketOf[person];
 }
 /*function offerSwap(address partner) public {
 // TODO
 }*/

 function offerSwap(uint ticketId) public {
   require(ticketOf[msg.sender] >0,"you must own a ticket");

    ticketslist[ticketId].beingOffer = true;
 }
 /*function acceptSwap(address partner) public {
 // TODO
 }*/


 function acceptSwap(uint ticketId) public {
   require(ticketslist[ticketId].takes == true, "You must own a ticket");
        require(ticketslist[ticketId].beingOffer == true, "Ticket not offered for swap");

        uint partnerTicketId = ticketOf[msg.sender];
        require(partnerTicketId >= 0 && partnerTicketId != ticketId, "Invalid partner ticket");

        Tickets memory temp = ticketslist[partnerTicketId];
        ticketslist[partnerTicketId] = ticketslist[ticketId];
        ticketslist[ticketId] = temp;

        ticketslist[partnerTicketId].beingOffer = false;
 }
 function returnTicket(uint ticketId) public{
    require(ticketId >= 0 && ticketId <= tickets,"Invalid Ticket");
    require(ticketslist[ticketId].isNotavailable == true, "your are required a ticket");

    uint remanderAfterServiceFee = ticketPrice - (ticketPrice / 10);
    revenue -= int(remanderAfterServiceFee);
    ticketslist[ticketId] = Tickets(false, false, false);
        ticketOf[msg.sender] = 0;
        payable(msg.sender).transfer(remanderAfterServiceFee);
// TODO
 }
}