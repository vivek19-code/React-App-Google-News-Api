import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import NewsApi from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(
//   <React.StrictMode>
//     <NewsApi/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

const Header = ({loaderStatus}) => (<header id="header">Google News <div className="loader" style={{
    visibility: loaderStatus
      ? "visible"
      : "hidden"
  }}></div>
</header>)

// const ButtonDropDownMenu = ({}) => (<input className="show" defaultValue=" All " type="button"/>)
//
//
// const Search = () => (<div><input className="search-input" placeholder="Search.." size={20} style={{
//     border: '1px solid black'
//   }} type="text"/>
//   <button className="search"><i className="fas fa-search"/></button>
// </div>)

const CategoryButtons = ({name, id, onClick}) => (<button className="button-navbar" id={id} onClick={onClick}>{name}</button>)

const News = ({
  author,
  description,
  title,
  url,
  urlToImage,
  sourceName
}) => (<div className="item-news"><img src={urlToImage} alt="alt"/>
  <h2>
    <a href={url} target="_blank " style={{
        textDecoration: "none"
      }}>{title}</a>
  </h2>
  <p>{description}</p><br/>
  <p className="newsname">
    <a href={url} target="_blank ">
      {sourceName}</a>
  </p>
</div>)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetchStatus: false,
      json: [],
      category: "",
      ButtonsNavbar: [
        "all",
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
      ],
      loaderStatus: false
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    this.setState({fetchStatus: true});
    var url = "";
    this.Req(url);
  }

  Req(url) {
    this.setState({loaderStatus: true});
    var req = new Request(url);
    fetch(req).then(response => response.json()).then(data => {
      this.setState({data: data.articles});
      setTimeout(this.setState({loaderStatus: false}), 1000);
      //console.log(this.state.data)
    });

  }
  onClick(event) {
    const headlines = "https://newsapi.org/v2/top-headlines?pageSize=100&country=in&category=Business&";
    const apiKey = "apiKey=5bb8df76f578431f80c85a4c9bd311ac";
    const id = event.target.id;
    const className = event.target.className;
    var category = "";

    //category
    if (className === "button-navbar") {
      if (id === "all") {
        category = "";

      } else {
        category = "category=" + id + "&";
      }
    }

    //fetch
    var url = headlines + category + apiKey;
    this.Req(url);

  }
  render() {
    const ButtonsNavbar = this.state.ButtonsNavbar.map(function(button, i) {
      return <CategoryButtons name={button} id={button} onClick={this.onClick} key={i}/>;
    }.bind(this));

    const Newspaper = this.state.data.map(function(article, i) {
      if (article.urlToImage != null) {
        return <News author={article.author} title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage} key={"news" + i} sourceName={article.source.name}/>
      } else {
        return null;
      }
    });



    return (<div>
      <Header loaderStatus={this.state.loaderStatus}/>

      <div className="container-navbar">
        {ButtonsNavbar}

      </div>
      <div className="container-news">
        {
          this.state.loaderStatus
            ? null
            : Newspaper
        }
        <h1>Click ALL to load News</h1>
      </div>
    </div>);
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
