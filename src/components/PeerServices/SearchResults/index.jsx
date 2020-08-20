import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../index.scss';
import './style.scss';
import ResponsiveContainer from '../ResponsiveContainer';
import PostFeed from '../ServiceFeed';
import SidebarAd from '../SidebarAdd';
import PostCategories from '../Categories';

const SearchResultsComponent = ({ searchResults }) => {
  return (
    <ResponsiveContainer>
      <Container style={{ marginTop: 25 }}>
        <Grid>
          <Grid.Column width={3} id="category-column">
            <PostCategories />
          </Grid.Column>

          <Grid.Column
            width={10}
            className="menu tabs-menu"
            id="main-services-column"
          >
            <PostFeed
              allowCreate={false}
              posts={searchResults}
              emptyMessage={global.translate(
                'No results found for your search, please try a new search',
              )}
            />
          </Grid.Column>

          <Grid.Column width={3} id="right-services-side-column">
            <SidebarAd />
          </Grid.Column>
        </Grid>
      </Container>
    </ResponsiveContainer>
  );
};

SearchResultsComponent.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default SearchResultsComponent;
