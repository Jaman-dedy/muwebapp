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
              emptyMessage={{
                title: global.translate(
                  'No products or services matched',
                  2105,
                ),
                body: global.translate(
                  'No results found for your search, please try a new search',
                  1878,
                ),
              }}
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
