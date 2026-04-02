"use client";

import { useState } from "react";
import { submitSuggestion } from "./actions";

interface Props {
  initialSong?: string;
}

export default function SuggestForm({ initialSong = "" }: Props) {
  const [type, setType] = useState<"new-song" | "correction">("new-song");
  const [songName, setSongName] = useState(initialSong);
  const [details, setDetails] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const result = await submitSuggestion({ type, songName, details, contactEmail: contactEmail || undefined });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? "An unexpected error occurred.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-12 text-center">
        <p className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-3">
          Thank you.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Your submission has been received. We review every suggestion and
          will follow up if we have questions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">

      {/* Type */}
      <fieldset>
        <legend className="text-xs uppercase tracking-wide text-muted-foreground font-sans mb-3">
          Type of submission
        </legend>
        <div className="flex flex-col sm:flex-row gap-3">
          {(["new-song", "correction"] as const).map((option) => (
            <label
              key={option}
              className={`
                flex items-center gap-2.5 px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm
                ${type === option
                  ? "border-gold bg-gold/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-foreground"
                }
              `}
            >
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
                className="accent-gold"
              />
              {option === "new-song" ? "Suggest a new song" : "Correct an existing entry"}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Song name */}
      <div>
        <label htmlFor="songName" className="block text-xs uppercase tracking-wide text-muted-foreground font-sans mb-2">
          {type === "new-song" ? "Song title" : "Which song?"}{" "}
          <span className="text-gold">*</span>
        </label>
        <input
          id="songName"
          type="text"
          required
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder={type === "new-song" ? "e.g. Swing Low, Sweet Chariot" : "e.g. Deep River"}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>

      {/* Details */}
      <div>
        <label htmlFor="details" className="block text-xs uppercase tracking-wide text-muted-foreground font-sans mb-2">
          {type === "new-song" ? "Why should this song be included?" : "What needs to be corrected?"}{" "}
          <span className="text-gold">*</span>
        </label>
        <textarea
          id="details"
          required
          rows={5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={
            type === "new-song"
              ? "Share what you know about the song — its history, where it was documented, why it matters…"
              : "Describe the error and, if you have it, the correct information with a source…"
          }
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-y"
        />
      </div>

      {/* Contact email (optional) */}
      <div>
        <label htmlFor="contactEmail" className="block text-xs uppercase tracking-wide text-muted-foreground font-sans mb-2">
          Contact email{" "}
          <span className="text-muted-foreground font-normal normal-case">(optional)</span>
        </label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          Only used to follow up if we have questions. Not shared or stored publicly.
        </p>
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-indigo-deep text-parchment text-sm font-sans hover:bg-indigo-mid transition-colors disabled:opacity-60 dark:bg-gold dark:text-indigo-deep dark:hover:bg-gold-light"
      >
        {status === "submitting" ? "Submitting…" : "Submit"}
      </button>

    </form>
  );
}
