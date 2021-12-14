import { ChevronRightIcon } from "@chakra-ui/icons";
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
    <Breadcrumb
      fontSize="sm"
      spacing="8px"
      separator={<ChevronRightIcon color="white" />}
    >
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
            <Link>
              <BreadcrumbLink href="#" color="gray.50">
                {breadCrumb.text}
              </BreadcrumbLink>
            </Link>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
