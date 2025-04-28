import { clerkClient } from "@clerk/nextjs/server";
import { LinearClient } from "@linear/sdk";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const linearRouter = createTRPCRouter({
  getIssues: publicProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;

    if (!userId) {
      throw new Error("User not found");
    }

    const client = await clerkClient()
    const clerkResponse = await client.users.getUserOauthAccessToken(userId, "linear");

    if (!clerkResponse.data) {
      throw new Error("Linear access token not found");
    }

    const accessToken = clerkResponse.data[0]?.token ?? ''

    if (!accessToken) {
      throw new Error("Linear access token not found");
    }

    const linearClient = new LinearClient({
      accessToken,
    });

    // Fetch issues
    const me = await linearClient.viewer;
    const myIssues = await me.assignedIssues();

    // Fetch all states upfront
    const issuesWithStates = await Promise.all(
      myIssues.nodes.map(async (issue) => {
        const state = await issue.state;
        return {
          id: issue.id,
          title: issue.title,
          priority: issue.priority,
          state: state?.name ?? "Unknown",
        };
      })
    );

    return issuesWithStates;
  }),
}); 
