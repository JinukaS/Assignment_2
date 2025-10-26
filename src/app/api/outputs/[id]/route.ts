import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> } // params is now async
) {
    console.log("✅✅✅ API ROUTE [id] HAS BEEN UPDATED! ✅✅✅");

    try {
        const { id } = await context.params; // <-- await here
        const output = await prisma.savedOutput.findUnique({ where: { id } });

        if (!output) {
            return NextResponse.json({ error: "Output not found" }, { status: 404 });
        }

        return NextResponse.json(output);
    } catch (error) {
        console.error(`Error fetching output:`, error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params; // <-- await here
        await prisma.savedOutput.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({ error: "Output not found" }, { status: 404 });
        }
        console.error(`Error deleting output:`, error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
