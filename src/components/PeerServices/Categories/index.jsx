import React from 'react';
import './style.scss';
import { Card, List, Placeholder } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import categories from 'containers/PeerServices/categories';
import CategoryItem from './CategoryItem';

function PostCategories({ onItemClick }) {
  const { data, loading } = categories();
  const history = useHistory();

  const location = useLocation();

  const params = queryString.parse(location.search);

  return (
    <Card>
      <Card.Content>
        <List>
          {loading && (
            <>
              {' '}
              {Array(10)
                .fill()
                .map(item => (
                  <List.Item key={item}>
                    {' '}
                    <Placeholder>
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder>
                  </List.Item>
                ))}
            </>
          )}
          {data.map(item => (
            <CategoryItem
              key={item.Category}
              className="category-item cursor-pointer"
              src={item.Icon}
              onClick={() => {
                history.push({
                  pathname: '/market-place/results',
                  search: `?keyword=&categories=${item.Category ||
                    'all'}&proximity=${params.proximity ||
                    ''}&countries=${params.countries || ''}`,
                });

                onItemClick();
              }}
              text={item.CategoryName}
              count={item.ServicesCount}
            />
          ))}
        </List>
      </Card.Content>
    </Card>
  );
}
PostCategories.propTypes = {
  onItemClick: PropTypes.func,
};

PostCategories.defaultProps = {
  onItemClick: () => {},
};
export default PostCategories;
