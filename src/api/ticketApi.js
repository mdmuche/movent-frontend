import api from "./axios";

const ticketUrl = "/v1/ticket";

export const getMyTicketsRequest = (params) =>
  api.get(`${ticketUrl}/my-tickets`, {
    params,
  });

// CANCEL TICKET
export const cancelTicketRequest = (ticketId) =>
  api.patch(`${ticketUrl}/cancel/${ticketId}`);
