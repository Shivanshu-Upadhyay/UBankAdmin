import Pagination from "@mui/material/Pagination";

const PaginationComp = ({ setPage, page, totalPage,message }) => {
  const pageNumber = (e, p) => {
    setPage(p);
   
  };
  return (
    <>
      <div className="row my-5">
        <div className="col-8">
          <div className="showingdata">{message}</div>
        </div>
        <div className="col-4">
          <Pagination
            count={totalPage}
            page={page}
            defaultPage={5}
            siblingCount={0}
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
