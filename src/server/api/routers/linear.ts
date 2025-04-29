import { clerkClient } from "@clerk/nextjs/server";
import { LinearClient } from "@linear/sdk";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const DEVTEAMID = "1234567890"

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

    // Fetch issues with all needed data in a single query
    const issues = await linearClient.issues({
      filter: {
        assignee: { id: { eq: (await linearClient.viewer).id } }
      },
      first: 100,
    });

    const issuesWithStates = await Promise.all(issues.nodes.map(async (issue) => {
      const state = await issue.state;
      return {
        id: issue.id,
        title: issue.title,
        priority: issue.priority,
        state: state?.name ?? "Unknown",
      };
    }));

    return issuesWithStates;
  }),

  getActionableAlerts: publicProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;

    if (!userId) {
      throw new Error("User not found");
    }

    const client = await clerkClient()
    const clerkResponse = await client.users.getUserOauthAccessToken(userId, "linear");

    if (!clerkResponse.data) {
      throw new Error("Linear access token not found");
    }
    /*

    const accessToken = clerkResponse.data[0]?.token ?? ''

    if (!accessToken) {
      throw new Error("Linear access token not found");
    }

    const linearClient = new LinearClient({
      accessToken,
    });

    // Fetch all team issues with all needed data in a single query
    const issues = await linearClient.issues({
      filter: {
        state: { type: { neq: "completed" } }
      },
      first: 100,
    });
    */

    const actionableAlerts = [
      {
        id: '1',
        type: 'resource_allocation',
        title: 'Developer overload detected',
        message: 'Alice may be overloaded with 15 assigned tickets. Consider redistributing work.',
        severity: 'warning',
        timestamp: '2025-04-29T08:30:00Z',
        issues: [
          { 
            id: 'DEV-101', 
            title: 'Add unit tests for auth', 
            url: 'https://linear.app/your-team/issue/DEV-101',
            assignee: { username: 'alice', profileImageUrl: 'https://i.pravatar.cc/150?img=1' }
          },
          { 
            id: 'DEV-102', 
            title: 'Refactor payment flow', 
            url: 'https://linear.app/your-team/issue/DEV-102',
            assignee: { username: 'alice', profileImageUrl: 'https://i.pravatar.cc/150?img=1' }
          },
          { 
            id: 'DEV-103', 
            title: 'Fix onboarding bug', 
            url: 'https://linear.app/your-team/issue/DEV-103',
            assignee: { username: 'alice', profileImageUrl: 'https://i.pravatar.cc/150?img=1' }
          },
        ],
      },
      {
        id: '2',
        type: 'review_bottleneck',
        title: 'Review bottleneck detected',
        message: '3 issues have been stuck in review for over 3 days. Consider assigning a dedicated reviewer.',
        severity: 'critical',
        timestamp: '2025-04-29T09:00:00Z',
        issues: [
          { 
            id: 'DEV-201', 
            title: 'Update API schema docs', 
            url: 'https://linear.app/your-team/issue/DEV-201',
            assignee: { username: 'bob', profileImageUrl: 'https://i.pravatar.cc/150?img=2' }
          },
          { 
            id: 'DEV-202', 
            title: 'Migrate DB to PostgreSQL 15', 
            url: 'https://linear.app/your-team/issue/DEV-202',
            assignee: { username: 'charlie', profileImageUrl: 'https://i.pravatar.cc/150?img=3' }
          },
          { 
            id: 'DEV-203', 
            title: 'Clean up stale branches', 
            url: 'https://linear.app/your-team/issue/DEV-203',
            assignee: { username: 'dave', profileImageUrl: 'https://i.pravatar.cc/150?img=4' }
          },
        ],
      },
      {
        id: '3',
        type: 'stale_work',
        title: 'Stale work detected',
        message: 'Bob has 5 tickets with no updates in 7+ days. Consider checking in.',
        severity: 'warning',
        timestamp: '2025-04-28T15:20:00Z',
        issues: [
          { 
            id: 'DEV-301', 
            title: 'Fix flaky e2e tests', 
            url: 'https://linear.app/your-team/issue/DEV-301',
            assignee: { username: 'bob', profileImageUrl: 'https://i.pravatar.cc/150?img=2' }
          },
          { 
            id: 'DEV-302', 
            title: 'Optimize dashboard rendering', 
            url: 'https://linear.app/your-team/issue/DEV-302',
            assignee: { username: 'bob', profileImageUrl: 'https://i.pravatar.cc/150?img=2' }
          },
        ],
      },
      {
        id: '4',
        type: 'bug_surge',
        title: 'High-priority bug surge',
        message: '5 high-priority bugs were created this week. Consider scheduling a bug bash.',
        severity: 'info',
        timestamp: '2025-04-28T14:10:00Z',
        issues: [
          { 
            id: 'BUG-401', 
            title: 'Crash on mobile login', 
            url: 'https://linear.app/your-team/issue/BUG-401',
            assignee: { username: 'eve', profileImageUrl: 'https://i.pravatar.cc/150?img=5' }
          },
          { 
            id: 'BUG-402', 
            title: 'Data inconsistency in reports', 
            url: 'https://linear.app/your-team/issue/BUG-402',
            assignee: { username: 'frank', profileImageUrl: 'https://i.pravatar.cc/150?img=6' }
          },
          { 
            id: 'BUG-403', 
            title: 'UI broken on Safari', 
            url: 'https://linear.app/your-team/issue/BUG-403',
            assignee: { username: 'grace', profileImageUrl: 'https://i.pravatar.cc/150?img=7' }
          },
        ],
      },
    ]
    

    return actionableAlerts;
  }),
}); 
