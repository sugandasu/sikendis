import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export interface BreadCrumbItem {
  text: string;
  link: string;
  isCurrentPage: boolean | null;
}

interface BreadCrumbProps {
  breadCrumbs: BreadCrumbItem[];
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ breadCrumbs }) => {
  if (!breadCrumbs) {
    return null;
  }
  return (
    <Breadcrumb fontSize="sm" spacing="8px" color="white">
      {breadCrumbs.map((breadCrumb) => (
        <BreadcrumbItem
          key={breadCrumb.link}
          isCurrentPage={breadCrumb.isCurrentPage}
        >
          {breadCrumb.isCurrentPage ? (
            <BreadcrumbLink href={breadCrumb.link} color="gray.50">
              {breadCrumb.text}
            </BreadcrumbLink>
          ) : (
            <NextLink href={breadCrumb.link}>
              <Link>{breadCrumb.text}</Link>
            </NextLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
