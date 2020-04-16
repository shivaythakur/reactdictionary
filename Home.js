import React, { Component } from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';
import AppLogo from "../../assets/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { getDictonaryEntriesForWord } from "../../utils/helper";
import DictEntry from "../../components/DictEntry";

const dictionaryTypes = [
  { title: "Dictionary", value: "dictionary" },
  { title: "Dictionary-US", value: "dictionary-us" },
  { title: "Dictionary", value: "grammar" },
  { title: "Thesaurus", value: "thesaurus" },
]

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      selectedType: "",
      searchVal: "",
      isFocus: false,
      selectedTab: 0,
      dictionary: null,
      loading: false,
    }
    this.speaks = React.createRef()
    this.handleRefs = this.handleRefs.bind(this);
    this.handleSearchPress = this.handleSearchPress.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
    this.handleDictionaryType = this.handleDictionaryType.bind(this);
    this.handleDictionarySearch = this.handleDictionarySearch.bind(this);
  }
  handleDictionaryType(event) {
    this.setState({
      selectedType: event.nativeEvent.srcElement.value
    })
  }
  handleSearchInput(event) {
    this.setState({
      searchVal: event.nativeEvent.srcElement.value
    })
  }
  handleSearchFocus(event) {
    // this.setState({ isFocus: true })
  }
  handleDictionarySearch() {
    getDictonaryEntriesForWord(this.state.searchVal)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            dictionary: JSON.parse(res.response),
            loading: false
          })
        }
        else if (res.status === 400) {
          console.log(JSON.stringify(res.body.json()))  //res.body is undefined.
        }
      })
      .catch(err => {
        if (err.status === 404) {
          this.setState({
            dictionary: null,
            loading: false
          })
        }
      })
  }
  handleSearchPress() {
    if (this.state.searchVal !== "") {
      this.setState({
        loading: true,
        isFocus: true,
        selectedTab: 0
      }, this.handleDictionarySearch)
    }
  }
  handleRefs(ref, index) {
    if (!this.speaks.current) {
      this.speaks.current = {}
    }
    this.speaks.current[index] = ref;
  }
  render() {
    const state = this.state;
    return (
      <div className="app">
        <div className="full col">
          <div className="header row" style={{ height: state.isFocus ? "72px" : "100%" }}>
            {/* <Link to="/" className="logo" onClick={() => this.setState({ isFocus: false, searchVal: "" })}>
              <img src={AppLogo} alt="dictionary logo" />
            </Link> */}
            <div style={{ flex: 1 }} className="col flex-center">
              <div className="search-box row">
                {/* <select className="dict-type" value={state.selectedType} onChange={this.handleDictionaryType}>
                  {
                    dictionaryTypes.map(type => {
                      return (
                        <option key={type.value} value={type.value} >{type.title}</option>
                      )
                    })
                  }
                </select> */}
                <p className = 'dict-type'>Dictionary</p>
                <div className="search-inbox row">
                  <input
                    value={state.searchVal}
                    onFocus={this.handleSearchFocus}
                    placeholder="Search Phase or Word"
                    onChange={this.handleSearchInput}
                  />
                </div>
                <button onClick={this.handleSearchPress} className="search-btn col flex-center">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
              </div>
            </div>
          </div>
          <div className="meaings col">
            {
              state.loading ?
                <div className="col flex-center tab-container bg-white">
                  <div className="activity-indicator"></div>
                </div>
                : state.dictionary == null ?
                  <div className="col flex-center tab-container bg-white">
                    <div className="word-404">No exact matches found for <b><i>"{state.searchVal}"</i></b></div>
                  </div>
                  :
                  <div className="tab-container bg-white col">
                    <div className="row tab-row">
                      {
                        state.dictionary.results[0].lexicalEntries.map((lexical, index) => {
                          return (
                            <div
                              key={lexical.lexicalCategory}
                              style={{}}
                              onClick={() => this.setState({ selectedTab: index })}
                              className={"tab-menu col flex-center " + (state.selectedTab === index ? "tab-active" : "")} >
                              <span>{lexical.lexicalCategory}</span>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="col tab-content">
                      {
                        state.dictionary.results[0].lexicalEntries.map((lexical, i) => {
                          return (
                            <div key={lexical.lexicalCategory} className={state.selectedTab === i ? "full" : ""}>
                              {
                                state.selectedTab === i &&
                                <div className="full tab-item" >

                                  {
                                    lexical.entries.map((entry, j) => {
                                      return (
                                        <ol key={j} className={"col entry-list " + (j === (lexical.entries.length - 1) ? "last-entry" : "")} >
                                          <div className="row" style={{ marginBottom: "16px" }}>
                                            <div className="word-sup">
                                              <span>{lexical.text}</span>
                                              <sup>{j + 1}</sup>
                                            </div>
                                            {
                                              (lexical.pronunciations && lexical.pronunciations[0].audioFile) &&
                                              <div className="word-speak" role="button" onClick={() => this.speaks.current[j].play()}>
                                                <FontAwesomeIcon icon={faVolumeUp} />
                                                <audio src={lexical.pronunciations[0].audioFile} ref={(ref) => this.handleRefs(ref, j)} />
                                              </div>
                                            }
                                          </div>
                                          {
                                            entry.senses.map((sense, k) => {
                                              return (
                                                <li key={k} >
                                                  <div className="row entry-item">
                                                    <div className="numbering" >{k + 1}</div>
                                                    <DictEntry
                                                      registers={sense.registers}
                                                      definitions={sense.definitions}
                                                      examples={sense.examples}
                                                    />
                                                  </div>

                                                  {
                                                    sense.subsenses &&
                                                    <ol className="entry-list sub-list">
                                                      {
                                                        sense.subsenses.map((subsense, m) => {
                                                          return (
                                                            <li key={m}>
                                                              <div className="row entry-item">
                                                                <div className="numbering">{k + 1}.{m + 1}</div>
                                                                <DictEntry
                                                                  registers={subsense.registers}
                                                                  definitions={subsense.definitions}
                                                                  examples={subsense.examples}
                                                                />
                                                              </div>

                                                            </li>
                                                          )
                                                        })
                                                      }
                                                    </ol>
                                                  }
                                                </li>
                                              )
                                            })
                                          }

                                        </ol>
                                      )
                                    })
                                  }
                                </div>
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
