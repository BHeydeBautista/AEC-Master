"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import clsx from "clsx";

type DisclosureProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
};

export default function Disclosure({
  title,
  children,
  defaultOpen = false,
  className,
  buttonClassName,
  panelClassName,
}: DisclosureProps) {
  const panelId = useId();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        className={clsx(
          "flex w-full items-center justify-between text-left",
          buttonClassName
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex-1">{title}</span>

        <span
          aria-hidden="true"
          className={clsx(
            "ml-3 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10 transition-transform duration-300",
            open ? "rotate-180" : "rotate-0"
          )}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 20 20"
            fill="none"
            className="opacity-80"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className={clsx(
          "mt-4",
          open ? "block" : "hidden",
          panelClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
