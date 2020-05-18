const SearchFunction = (e, data) => {
  e.persist();
  const search = e.target.value;
  if (search.trim().length > 0) {
    // setIsSearching(true);

    const found = data.filter(
      item =>
        (item.FirstName &&
          item.FirstName.toLowerCase().startsWith(
            search.toLowerCase(),
          )) ||
        (item.LastName &&
          item.LastName.toLowerCase().startsWith(
            search.toLowerCase(),
          )) ||
        (item.PhoneNumber &&
          item.PhoneNumber.toLowerCase().startsWith(
            search.toLowerCase(),
          )) ||
        (item.ContactPID &&
          item.ContactPID.toLowerCase().startsWith(
            search.toLowerCase(),
          )),
    );
    return found;
  } else {
    // setIsSearching(false);
    return data;
  }
};

export default SearchFunction;
