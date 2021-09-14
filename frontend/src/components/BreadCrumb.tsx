import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
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
    <Breadcrumb fontSize="sm">
      {breadCrumbs.map((breadCrumb) => (
        <BreadcrumbItem
          key={breadCrumb.link}
          isCurrentPage={breadCrumb.isCurrentPage}
        >
          <BreadcrumbLink href={breadCrumb.link} color="gray.500">
            {breadCrumb.text}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
