import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, return error
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.text();

    // Create a new Svix instance with your secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occurred", {
            status: 400,
        });
    }

    const eventType = evt.type;

    // 1. Handle user creation (Sign up)
    if (eventType === "user.created") {
        const user = evt.data;

        try {
            await prisma.user.create({
                data: {
                    clerkUserId: user.id,
                    email: user.email_addresses[0]?.email_address ?? "",
                    name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
                    imageUrl: user.image_url,
                },
            });
            console.log(`User ${user.id} created successfully in database.`);
        } catch (error) {
            console.error("Failed to create user in database:", error);
            return new Response("Database error", { status: 500 });
        }
    }

    // 2. Handle user update (Profile changes)
    if (eventType === "user.updated") {
        const user = evt.data;

        try {
            await prisma.user.update({
                where: {
                    clerkUserId: user.id,
                },
                data: {
                    email: user.email_addresses[0]?.email_address ?? "",
                    name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
                    imageUrl: user.image_url,
                },
            });
            console.log(`User ${user.id} updated successfully in database.`);
        } catch (error) {
            console.error("Failed to update user in database:", error);
            return new Response("Database error", { status: 500 });
        }
    }

    // 3. Handle user deletion
    if (eventType === "user.deleted") {
        if (!evt.data.id) {
            return new Response("User ID missing", { status: 400 });
        }

        try {
            await prisma.user.delete({
                where: {
                    clerkUserId: evt.data.id,
                },
            });
            console.log(`User ${evt.data.id} deleted from database.`);
        } catch (error) {
            console.error("Failed to delete user from database:", error);
            return new Response("Database error", { status: 500 });
        }
    }

    return Response.json({ success: true }, { status: 200 });
}