/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Image, Icon, Grid } from 'semantic-ui-react';

import emailIcon from 'assets/images/email-icon.png';
import otherIcon from 'assets/images/category-icon.png';
import privateIcon from 'assets/images/private-icon.png';
import professionalIcon from 'assets/images/professional-icon.png';

const EditGeneralInfo = ({ userData, setInfoOrEdit }) => {
  const { data } = userData;

  const categoryOptions = [
    {
      key: 1,
      text: global.translate('Private', 301),
      value: 1,
      icon: privateIcon,
    },
    {
      key: 2,
      text: global.translate('Professional', 302),
      value: 2,
      icon: professionalIcon,
    },
    {
      key: 3,
      text: global.translate('Other', 303),
      value: 3,
      icon: otherIcon,
    },
  ];

  const findCategory = CategoryCode => {
    const option = categoryOptions.find(
      option => option.value === CategoryCode,
    );

    return option || categoryOptions[0];
  };
  return (
    <div className="info-phone-and-email">
      <Grid stackable columns={3}>
        <Grid.Column width={8}>
          <span>{global.translate('My phone number (s)', 1700)}</span>
        </Grid.Column>
        <Grid.Column width={6} className="category">
          <span>{global.translate('Category', 343)}</span>
        </Grid.Column>
        <Grid.Column width={2} className="empty-column" />
      </Grid>

      <div className="phone-numbers">
        {data &&
          data.Phones &&
          data.Phones.map(
            (
              {
                Category,
                CategoryCode,
                PhoneNumber,
                PhonePrefix,
                NumberCountryCode,
              },
              idx,
            ) => {
              return (
                <span key={Number(idx)}>
                  <Grid
                    stackable
                    columns={2}
                    className="phone-numbers-grid"
                  >
                    <Grid.Column
                      width={8}
                      className="phone-numbers-column"
                    >
                      <div className="phone-numbers-details">
                        <Image
                          src={`https://www.countryflags.io/${NumberCountryCode}/flat/32.png`}
                          className="ui image inline"
                        />
                        <span>
                          {`+(${PhonePrefix}) ${PhoneNumber}`}
                        </span>
                      </div>
                    </Grid.Column>
                    <Grid.Column
                      width={6}
                      className="phone-numbers-column"
                    >
                      <div className="phone-numbers-details">
                        <Image
                          src={findCategory(CategoryCode).icon}
                          className="ui image inline"
                          size="mini"
                        />
                        <span>
                          {Category ||
                            findCategory(CategoryCode).text}
                        </span>
                      </div>
                    </Grid.Column>
                  </Grid>
                </span>
              );
            },
          )}
      </div>

      <Grid stackable columns={3}>
        <Grid.Column width={8}>
          <span>
            {global.translate('My email address (s)', 1701)}
          </span>
        </Grid.Column>
        <Grid.Column width={6} className="category">
          <span>{global.translate('Category', 343)}</span>
        </Grid.Column>
        <Grid.Column width={2} className="empty-column" />
      </Grid>

      <div className="phone-numbers">
        {data &&
          data.Emails &&
          data.Emails.map(
            ({ Category, Email, CategoryCode }, idx) => {
              return (
                <span key={Number(idx)}>
                  <Grid
                    stackable
                    columns={2}
                    className="phone-numbers-grid"
                  >
                    <Grid.Column
                      width={8}
                      className="phone-numbers-column"
                    >
                      <div className="phone-numbers-details">
                        <Image
                          src={emailIcon}
                          className="ui image inline"
                          size="mini"
                        />
                        <span>{Email}</span>
                      </div>
                    </Grid.Column>
                    <Grid.Column
                      width={6}
                      className="phone-numbers-column"
                    >
                      <div className="phone-numbers-details">
                        <Image
                          src={findCategory(CategoryCode).icon}
                          className="ui image inline"
                          size="mini"
                        />
                        <span>
                          {Category ||
                            findCategory(CategoryCode).text}
                        </span>
                      </div>
                    </Grid.Column>
                  </Grid>
                </span>
              );
            },
          )}
      </div>

      <Form.Button
        type="button"
        primary
        onClick={() => setInfoOrEdit('edit')}
        style={{ marginLeft: 14 }}
      >
        {global.translate('Edit', 820)}
      </Form.Button>
    </div>
  );
};

EditGeneralInfo.propTypes = {
  userData: PropTypes.instanceOf(Object),
  setInfoOrEdit: PropTypes.func.isRequired,
};

EditGeneralInfo.defaultProps = {
  userData: {
    data: {},
  },
};

export default EditGeneralInfo;
