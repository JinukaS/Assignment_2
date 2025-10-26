import { PrismaClient } from '@prisma/client';

// This declaration extends the global NodeJS object.
// This is necessary to store the Prisma Client on the global object during development.
declare global {
    // We use 'var' to declare a global variable that persists across module reloads.
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// This is the main logic.
// It checks if a Prisma Client instance already exists on the global object.
// If it does, it reuses it. If not, it creates a new one.
// This prevents creating a new database connection every time your code changes in development.
const prisma = global.prisma || new PrismaClient();

// In a development environment, we attach the created Prisma Client to the global object.
// This ensures that on the next hot reload, the existing client is found and reused.
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

// Export the single, reusable prisma client instance.
// You will import this into all your API route files.
export default prisma;