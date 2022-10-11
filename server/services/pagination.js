class Pagination{
    pagination(total, page, limit=10) {
        let numOfPages = Math.ceil(total / limit);
        let start = page * limit - limit;
        return { limit, start, numOfPages };
      };
}

module.exports = new Pagination