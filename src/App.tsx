import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { SearchDriverOptions } from "@elastic/search-ui";
import CustomResultView from "./CustomResultView";
import "./CustomElasticSearchStyles.css";
import ResultDetail from "./ResultDetail";

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
      conferencedate: { raw: {} },
      publisher: { raw: {} },
      journalname: { raw: {} },
      volume: { raw: {} },
      issue: { raw: {} },
      pages: { raw: {} },
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SearchProvider config={config}>
              <WithSearch
                mapContextToProps={({ wasSearched, results }) => ({
                  wasSearched,
                  results
                })}
              >
                {({ wasSearched, results }) => {
                  return (
                    <div className="App">
                      <ErrorBoundary>
                        <Layout
                          header={
                            <div className="header-wrapper">
                              <div className="app-name">Application Name</div>
                              <div className="search-box-container">
                                <SearchBox
                                  className="search-box"
                                  autocompleteSuggestions={true}
                                  debounceLength={300}
                                />
                              </div>
                            </div>
                          }
                          sideContent={
                            <div>
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
                            </div>
                          }
                          bodyContent={
                            <div>
                              {wasSearched && results.length > 0 ? (
                                <Results
                                  titleField="title"
                                  urlField="url"
                                  shouldTrackClickThrough
                                  resultView={CustomResultView}
                                />
                              ) : (
                                wasSearched && (
                                  <div className="no-results">
                                    <p>No results found.</p>
                                  </div>
                                )
                              )}
                            </div>
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
          }
        />
        <Route path="/detail/:id" element={<ResultDetail />} />
      </Routes>
    </Router>
  );
}
