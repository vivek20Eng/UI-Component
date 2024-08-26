import React from 'react';
import Link from 'next/link';

function BreadCrumbLayout({ breadcrumbs }) {
  return (
    <nav className="bg-gray-900/20 border border-slate-200/50 backdrop-blur-sm px-4 py-2 my-4 rounded-md inline-block">
      <ol className="list-reset flex">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-200">{'>'}</span>
            )}
            {index !== breadcrumbs.length - 1 ? (
              <Link href={crumb.href} className="text-gray-200 hover:text-blue-500">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-red-300 font-bold">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumbLayout;
