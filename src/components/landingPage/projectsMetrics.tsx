'use client';

import React from 'react';
import { BoxIconLine, GroupIcon } from '@/icons';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '@/graphql/queries/getProjects';
import { Project } from '@/types/projects';
import { useRouter } from 'next/navigation';

export const ProjectsMetrics = () => {
  const router=useRouter()
  const { loading, data } = useQuery<{ projects: Project[] }>(GET_PROJECTS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  if (loading) return <div>Loading...</div>;

  const projects = data?.projects || [];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {projects.map((item, index) => {
        const Icon = index % 2 === 0 ? GroupIcon : BoxIconLine;

        return (
          <div
            key={item.id}
            className={
              "rounded-2xl border bg-white cursor-pointer p-5 hover:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
            }
            onClick={()=>router.push(`/projects/${item.slug}`)}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <Icon className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {item.name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description || 'No description'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
