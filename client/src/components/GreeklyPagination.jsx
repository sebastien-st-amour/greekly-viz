import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const GreeklyPagination = ({
  page,
  totalPages,
  onSelect,
}) => {
  
  const pagination = [];

  if (totalPages <= 5) {

    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={() => onSelect(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

  } else {

    pagination.push(<Pagination.First onClick={() => onSelect(1)}/>);
    pagination.push(<Pagination.Prev onClick={() => onSelect(page - 1)}/>);
    pagination.push(<Pagination.Item active={page === 1} onClick={() => onSelect(1)}>1</Pagination.Item>);

    if (page <= 3) {
      pagination.push(<Pagination.Item active={page === 2} onClick={() => onSelect(2)}>{2}</Pagination.Item>);
      pagination.push(<Pagination.Item active={page === 3} onClick={() => onSelect(3)}>{3}</Pagination.Item>);
      pagination.push(<Pagination.Ellipsis />)
    } else if (page >= totalPages - 2) {
      pagination.push(<Pagination.Ellipsis />)
      pagination.push(<Pagination.Item active={page === totalPages - 2} onClick={() => onSelect(totalPages - 2)}>{totalPages - 2}</Pagination.Item>);
      pagination.push(<Pagination.Item active={page === totalPages - 1} onClick={() => onSelect(totalPages - 1)}>{totalPages - 1}</Pagination.Item>);
    } else {
      pagination.push(<Pagination.Ellipsis />)
      pagination.push(<Pagination.Item onClick={() => onSelect(page - 1)}>{page - 1}</Pagination.Item>);
      pagination.push(<Pagination.Item active>{page}</Pagination.Item>);
      pagination.push(<Pagination.Item onClick={() => onSelect(page + 1)}>{page + 1}</Pagination.Item>);
      pagination.push(<Pagination.Ellipsis />)
    }

      pagination.push(<Pagination.Item active={page === totalPages} onClick={() => onSelect(totalPages)}>{totalPages}</Pagination.Item>);
      pagination.push(<Pagination.Next onClick={() => onSelect(page+1)}/>);
      pagination.push(<Pagination.Last onClick={() => onSelect(totalPages)}/>);
  }

  return (
    <Pagination>
      {pagination}
    </Pagination>
  );
};

GreeklyPagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default GreeklyPagination;