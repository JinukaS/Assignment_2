import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client'; // Import Prisma types for better error handling

/**
 * Handles GET requests to /api/outputs
 * @description Retrieves a list of all saved outputs from the database.
 */
export async function GET() {
    try {
        const outputs = await prisma.savedOutput.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(outputs);

    } catch (error) {
        // --- IMPROVED ERROR LOGGING ---
        // Log the specific error message to the server terminal.
        console.error("Error fetching outputs:", error instanceof Error ? error.message : error);

        // Send back a more informative error message in the response body.
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : "An unknown error occurred"
            },
            { status: 500 }
        );
    }
}


/**
 * Handles POST requests to /api/outputs
 * @description Saves a new HTML output to the database.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { htmlContent } = body;

        if (!htmlContent) {
            return NextResponse.json({ error: "htmlContent is required" }, { status: 400 });
        }

        const newOutput = await prisma.savedOutput.create({
            data: { htmlContent },
        });

        return NextResponse.json(newOutput, { status: 201 });

    } catch (error) {
        // --- IMPROVED ERROR LOGGING ---
        console.error("Error creating output:", error instanceof Error ? error.message : error);

        // Handle potential known errors from Prisma, like a unique constraint violation.
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: "Database Error", code: error.code }, { status: 400 });
        }

        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : "An unknown error occurred"
            },
            { status: 500 }
        );
    }
}