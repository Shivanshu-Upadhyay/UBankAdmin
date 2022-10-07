import Pagination from "@mui/material/Pagination";

const PaginationComp = ({ setPage, page, totalPage,message }) => {
  const pageNumber = (e, p) => {
    setPage(p);
   
  };
  return (
    <>
      <div className="row my-5 align-items-center justify-content-between">
        <div className="col-6">
          <div className="showingdata">{message}</div>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Pagination
            count={totalPage}
            page={page}
            defaultPage={1}
            size="large"
            color="primary"
            onChange={pageNumber}
          />
        </div>
      </div>
    </>
  );
};

export default PaginationComp;
