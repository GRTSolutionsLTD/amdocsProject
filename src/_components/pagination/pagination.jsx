import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginateService } from "./paginate.service";

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
  maxPages: PropTypes.number,
  labels: PropTypes.object,
  styles: PropTypes.object,
  disableDefaultStyles: PropTypes.bool,
};

const defaultProps = {
  initialPage: 1,
  pageSize: 10,
  maxPages: 10,
  labels: {
    first: "First",
    last: "Last",
    previous: "Previous",
    next: "Next",
  },
};

function Pagination(props) {
  const [pager, setPager] = useState({});
  let styles = {};

  if (!props.disableDefaultStyles) {
    styles = {
      ul: {
        margin: 0,
        padding: 0,
        display: "inline-block",
      },
      li: {
        listStyle: "none",
        display: "inline",
        textAlign: "center",
      },
      a: {
        cursor: "pointer",
        padding: "6px 12px",
        display: "block",
        float: "left",
      },
    };
  }

  // merge custom styles with default styles
  if (props.styles) {
    styles = {
      ul: { ...styles.ul, ...props.styles.ul },
      li: { ...styles.li, ...props.styles.li },
      a: { ...styles.a, ...props.styles.a },
    };
  }

  useEffect(() => {
    // set page if items array isn't empty
    if (props.items && props.items.length) {
      setPage(props.initialPage);
    }
    return () => {};
  }, [props.items]);

  function setPage(page) {
    const { items, pageSize, maxPages } = props;

    // get new pager object for specified page
    const currentPager = paginateService.paginate(items.length, page, pageSize, maxPages);

    // get new page of items from items array
    const pageOfItems = items.slice(currentPager.startIndex, currentPager.endIndex + 1);

    // update state
    setPager(currentPager);

    // call change page function in parent component
    props.onChangePage({ ...pager, items: pageOfItems });
  }

  var labels = props.labels;

  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <>
      <ul className="pagination" style={styles.ul}>
        <li
          className={`page-item first ${
            pager.currentPage === 1 ? "disabled" : ""
          }`}
          style={styles.li}
        >
          <a className="page-link" onClick={() => setPage(1)} style={styles.a}>
            {labels.first}
          </a>
        </li>
        <li
          className={`page-item previous ${
            pager.currentPage === 1 ? "disabled" : ""
          }`}
          style={styles.li}
        >
          <a
            className="page-link"
            onClick={() => setPage(pager.currentPage - 1)}
            style={styles.a}
          >
            {labels.previous}
          </a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={`page-item page-number ${
              pager.currentPage === page ? "active" : ""
            }`}
            style={styles.li}
          >
            <a
              className="page-link"
              onClick={() => setPage(page)}
              style={styles.a}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item next ${
            pager.currentPage === pager.totalPages ? "disabled" : ""
          }`}
          style={styles.li}
        >
          <a
            className="page-link"
            onClick={() => setPage(pager.currentPage + 1)}
            style={styles.a}
          >
            {labels.next}
          </a>
        </li>
        <li
          className={`page-item last ${
            pager.currentPage === pager.totalPages ? "disabled" : ""
          }`}
          style={styles.li}
        >
          <a
            className="page-link"
            onClick={() => setPage(pager.totalPages)}
            style={styles.a}
          >
            {labels.last}
          </a>
        </li>
      </ul>
    </>
  );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
