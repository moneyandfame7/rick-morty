import { uniqBy } from "lodash";
import { useLocation } from "react-router";

export interface IBreadcrumbsConfig {
  id: number;
  label: string;
  path: string;
  isActive?: boolean;
}

export function useMakeArchitectureBreadcrumbs(): IBreadcrumbsConfig[] {
  const location = useLocation();
  const arr: string[] = location.pathname.split("/");
  console.log(arr, "входные");
  console.log(location, "location");

  const newArr = arr.map((path, index) => {
    const isActive = index + 1 === arr.length;
    if (path.length === 0)
      return {
        id: index,
        label: "Home",
        path: "/",
        isActive,
      };

    if (path.includes("character") || path.includes("episode"))
      return {
        id: index,
        label: path[0].toUpperCase() + path.substring(1) + "s",
        path: "/" + path + "?page=1",
        isActive,
      };
    else
      return {
        id: index,
        label: "Information page",
        path: location.pathname,
        isActive,
      };
  });
  console.log(uniqBy(newArr, "path"), "на выходе");
  return uniqBy(newArr, "path");
}
