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
  API_GATEWAY: 6000,
  AUTH_SERVICE: 6001,
  USERS_SERVICE: 6002,
  EVENTS_SERVICE: 6003,
  TICKETS_SERVICE: 6004,
  PAYMENTS_SERVICE: 6005,
  NOTIFICATIONS_SERVICE: 6006,
} as const;
