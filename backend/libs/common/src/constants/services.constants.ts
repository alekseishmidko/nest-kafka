export const SERVICES = {
  API_GATEWAY: 'api-gateway',
  AUTH_SERVICE: 'auth-service',
  USERS_SERVICE: 'users-service',
  EVENTS_SERVICE: 'events-service',
  TICKETS_SERVICE: 'tickets-service',
  PAYMENTS_SERVICE: 'payments-service',
  NOTIFICATIONS_SERVICE: 'notifications-service',
} as const;

export const SERVICES_PORTS = {
  API_GATEWAY: 3200,
  AUTH_SERVICE: 3201,
  USERS_SERVICE: 3202,
  EVENTS_SERVICE: 3203,
  TICKETS_SERVICE: 3204,
  PAYMENTS_SERVICE: 3205,
  NOTIFICATIONS_SERVICE: 3206,
} as const;
