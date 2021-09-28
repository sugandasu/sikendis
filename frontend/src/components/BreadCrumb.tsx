import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaHome } from "react-icons";

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
          <BreadcrumbLink href={breadCrumb.link} color="gray.50">
            {breadCrumb.text}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
