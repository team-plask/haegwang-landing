"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu } from "@tabler/icons-react";

export interface BlogAuthorCardProps {
  name: string | null;
  profile_picture_url: string | null;
  lawyer_type: string | null;
}

export default function BlogAuthorCard({ authors }: { authors: BlogAuthorCardProps[] }) {
  const [open, setOpen] = useState(false);

  if (!authors || authors.length === 0) {
    return null; 
  }

  return (
    <>
      {/* Desktop Sidebar - Increased width */}
      <aside className="sticky top-24 hidden h-full w-96 flex-col space-y-10 self-start md:flex">
      {authors && authors.length > 0 && (
          <div className="rounded-xl p-5 dark:bg-neutral-800/40">
            <h3 className="mb-6 border-b border-neutral-200 pb-2 font-heading text-2xl font-semibold text-black dark:text-neutral-100">참여 변호사</h3>
            <ul className="space-y-4">
              {authors.map((author, index) => (
                <li key={index}>
                  <div className="group flex items-center gap-3 overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/70 dark:hover:bg-neutral-800">
                    {author.profile_picture_url ? (
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-neutral-100 dark:border-neutral-700">
                        <Image 
                          src={author.profile_picture_url}
                          alt={author.name ?? 'lawyer'}
                          width={56} 
                          height={56} 
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xl font-semibold dark:bg-neutral-700">
                        {author.name?.charAt(0) ?? 'L'}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-900 dark:text-white">{author.name ?? '법무법인 해광'}</span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">{author.lawyer_type ?? '변호사'}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Mobile Toggle and Drawer for authors only */}
      {authors && authors.length > 0 && ( 
        <div className="sticky right-2 top-20 z-50 flex w-full flex-col items-end justify-end self-start md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700"
          >
            <IconMenu className="h-6 w-6 text-black dark:text-white" />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="mt-2 w-full max-w-xs rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800"
              >
                {/* Mobile Lawyers */}
                {authors && authors.length > 0 && (
                  <div className="rounded-lg bg-neutral-50/90 p-4 dark:bg-neutral-800/40">
                    <h3 className="mb-3 text-lg font-semibold text-neutral-800 dark:text-neutral-100">참여 변호사</h3>
                    <ul className="space-y-2">
                      {authors.map((author, index) => (
                        <li key={index} className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-700/50">
                          {author.profile_picture_url ? (
                            <Image 
                              src={author.profile_picture_url}
                              alt={author.name ?? 'lawyer'}
                              width={32} 
                              height={32} 
                              className="rounded-full border border-neutral-200 object-cover dark:border-neutral-600"
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-sm dark:bg-neutral-600">
                              {author.name?.charAt(0) ?? 'L'}
                            </div>
                          )}
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                            {author.name ?? '법무법인 해광'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
} 