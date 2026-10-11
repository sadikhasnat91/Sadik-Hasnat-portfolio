import React from "react";
import { Loader2, AlertCircle, Inbox } from "lucide-react";
import { Button } from "./button";

export function LoadingSpinner({
  label = "Loading content...",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center p-8 text-center text-[#9AA5B5] ${className}`}
    >
      <Loader2 className="w-6 h-6 animate-spin text-[#C5F467] mb-3" />
      <span className="text-sm font-medium">{label}</span>
      <span className="sr-only">Loading</span>
    </div>
  );
}

export function ErrorState({
  title = "Failed to load",
  message = "An unexpected error occurred while loading this section.",
  onRetry,
  className = "",
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center rounded-xl border border-red-900/40 bg-[#121720] p-8 text-center ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 mb-4">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-base font-semibold text-[#F5F7FA] mb-1 font-[family-name:var(--font-heading)]">
        {title}
      </h3>
      <p className="text-sm text-[#9AA5B5] max-w-sm mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "No items found",
  message = "There is currently no data to display for this view.",
  className = "",
}: {
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-[#29313C] bg-[#121720]/60 p-10 text-center ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-[#161D29] border border-[#29313C] flex items-center justify-center text-[#9AA5B5] mb-4">
        <Inbox className="w-5 h-5" />
      </div>
      <h3 className="text-base font-semibold text-[#F5F7FA] mb-1 font-[family-name:var(--font-heading)]">
        {title}
      </h3>
      <p className="text-sm text-[#9AA5B5] max-w-sm leading-relaxed">
        {message}
      </p>
    </div>
  );
}
