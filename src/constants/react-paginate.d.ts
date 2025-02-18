declare module "react-paginate" {
  import { ComponentType } from "react";

  interface ReactPaginateProps {
    pageCount: number;
    onPageChange: (selectedPage: { selected: number }) => void;
    forcePage?: number;
    marginPagesDisplayed?: number;
    pageRangeDisplayed?: number;
    containerClassName?: string;
    pageClassName?: string;
    pageLinkClassName?: string;
    activeClassName?: string;
    disabledClassName?: string;
    previousLabel?: string;
    nextLabel?: string;
    previousClassName?: string;
    nextClassName?: string;
  }

  const ReactPaginate: ComponentType<ReactPaginateProps>;
  export default ReactPaginate;
}
