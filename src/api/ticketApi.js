import api from "./axios";

const ticketUrl = "/v1/ticket";

export const getMyTicketsRequest = (params) =>
  api.get(`${ticketUrl}/my-tickets`, {
    params,
  });
