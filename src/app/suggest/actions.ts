"use server";

import { Resend } from "resend";

export interface SuggestionPayload {
  type: "new-song" | "correction";
  songName: string;
  details: string;
  contactEmail?: string;
}

export interface ActionResult {
  success: boolean;
  error?: string;
}

async function createGitHubIssue(payload: SuggestionPayload): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN not set — skipping GitHub issue creation");
    return;
  }

  const label = payload.type === "new-song" ? "suggestion" : "correction";
  const title =
    payload.type === "new-song"
      ? `Song suggestion: ${payload.songName}`
      : `Correction: ${payload.songName}`;

  const body = [
    `**Type:** ${payload.type === "new-song" ? "New song suggestion" : "Correction to existing entry"}`,
    `**Song:** ${payload.songName}`,
    "",
    "**Details:**",
    payload.details,
    "",
    payload.contactEmail
      ? `**Contact:** ${payload.contactEmail}`
      : "_No contact email provided_",
    "",
    "---",
    "_Submitted via the Deep River suggest form_",
  ].join("\n");

  const res = await fetch(
    "https://api.github.com/repos/cjallday7/deep-river/issues",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({ title, body, labels: [label] }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }
}

async function sendEmailNotification(payload: SuggestionPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const maintainerEmail = process.env.MAINTAINER_EMAIL;

  if (!apiKey || !maintainerEmail) {
    console.warn(
      "RESEND_API_KEY or MAINTAINER_EMAIL not set — skipping email notification"
    );
    return;
  }

  const resend = new Resend(apiKey);
  const subject =
    payload.type === "new-song"
      ? `[Deep River] Song suggestion: ${payload.songName}`
      : `[Deep River] Correction: ${payload.songName}`;

  const text = [
    `Type: ${payload.type === "new-song" ? "New song suggestion" : "Correction"}`,
    `Song: ${payload.songName}`,
    "",
    "Details:",
    payload.details,
    "",
    `Contact: ${payload.contactEmail ?? "Not provided"}`,
  ].join("\n");

  await resend.emails.send({
    from: "Deep River <noreply@deepriver.org>",
    to: maintainerEmail,
    subject,
    text,
  });
}

export async function submitSuggestion(
  payload: SuggestionPayload
): Promise<ActionResult> {
  // Validate required fields
  if (!payload.songName.trim()) {
    return { success: false, error: "Song name is required." };
  }
  if (!payload.details.trim()) {
    return { success: false, error: "Details are required." };
  }

  try {
    await Promise.all([
      createGitHubIssue(payload),
      sendEmailNotification(payload),
    ]);
    return { success: true };
  } catch (err) {
    console.error("Suggestion submission error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again or open a GitHub issue directly.",
    };
  }
}
