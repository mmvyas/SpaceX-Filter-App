import React from "react";
import FilterComponents from "./FilterComponents";
import FilteredContent from "./FilteredContent";

const FilterMain = props => {
  return (
    <div className="filter-main">
      <FilterComponents
        launchPads={props.launchPads}
        launches={props.launches}
        onInputChange={props.onInputChange}
        onFilter={props.onFilter}
      />
      <FilteredContent items={props.items} />
    </div>
  );
};

export default FilterMain;
