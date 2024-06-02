import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout
} from "@elastic/react-search-ui-views";
// import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";
import CustomResultView from "./CustomResultView";
import "./CustomElasticSearchStyles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "search-fxmnanq2upcgnriv23n2qh2q",
  engineName: "cmsc191",
  endpointBase: "https://cmsc191-kms.ent.asia-southeast1.gcp.elastic-cloud.com"
});

const config: SearchDriverOptions = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      title: { raw: {} },
      authors: { raw: {} },
      publicationcategory: { raw: {} },
      publicationyear: { raw: {} },
      keywords: { raw: {} },
      isecopyavailable: { raw: {} },
      doi: { raw: {} },
      url: { raw: {} },
      booktitle: { raw: {} },
      conferencename: { raw: {} },
      conferencedate: { raw: {} }
    },
    search_fields: {
      title: {},
      authors: {},
      publicationcategory: {},
      publicationyear: {},
      keywords: {},
    },
    disjunctiveFacets: ["publicationyear"],
    facets: {
      publicationcategory: { type: "value", size: 20 },
      publicationyear: { type: "value", size: 20 },
      keywords: { type: "value" },
      isecopyavailable: { type: "value" }
    }
  }
};

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox searchAsYouType={true} debounceLength={300} />}
                  sideContent={<div>
                    <Facet
                      field="publicationcategory"
                      label="Publication Category"
                      isFilterable={true}
                    />
                    <Facet
                      field="publicationyear"
                      label="Publication Year"
                      filterType="any"
                      isFilterable={true}
                    />
                    <Facet
                      field="isecopyavailable"
                      label="E Copy Available"
                      view={BooleanFacet}
                      isFilterable={true}
                    />
                    <Facet
                      field="keywords"
                      label="Keywords"
                      isFilterable={true}
                    />
                  </div>}
                  bodyContent={
                    <Results
                      titleField="title"
                      urlField="url"
                      shouldTrackClickThrough
                      resultView={CustomResultView}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
