type User = { id: string; email: string; firstName: string; lastName: string; password: string };

export const users = new Map<string, User>();
