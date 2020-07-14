//
// // import React, { Fragment } from 'react';
// // import axios from 'axios';
// // import { makeStyles, useTheme } from '@material-ui/core/styles';
// // import Card from '@material-ui/core/Card';
// // import CardActionArea from '@material-ui/core/CardActionArea';
// // import CardActions from '@material-ui/core/CardActions';
// // import CardContent from '@material-ui/core/CardContent';
// // import CardMedia from '@material-ui/core/CardMedia';
// // import Button from '@material-ui/core/Button';
// //
// // import AppBar from '@material-ui/core/AppBar';
// // import Toolbar from '@material-ui/core/Toolbar';
// // import Typography from '@material-ui/core/Typography';
// // import IconButton from '@material-ui/core/IconButton';
// // import MenuIcon from '@material-ui/icons/Menu';
// //
// // class NewsApi extends React.Component {
// // 		constructor() {
// // 			super()
// // 			this.state = {
// // 				Data: []
// // 			}
// // 		}
// // componentDidMount() {
// //   axios.get("https://newsapi.org/v2/top-headlines?pageSize=100&country=in&category=Business&apiKey=5bb8df76f578431f80c85a4c9bd311ac")
// //   	.then(res => {
// //       console.log(res);
// //       	this.setState({	Data: res.data.articles
// // 		})
// // })
// //
// // .catch(responce => {console.log(responce);
// // 				})
// //
// // 		}
// // 		render()
// //     {
// //
// // 				const { Data } = this.state
// //         console.log(Data, 'ddddddddd')
// // 				return (
// //           <div className = "background-style" >
// //   					<header className = "header-color" >
// //                 <AppBar position = "sticky" style = {{width: "100%"	}	} >
// //         					<Toolbar variant = 'regular' >
// //             					<IconButton edge = "start"
// //             					color = 'secondary'
// //             					aria-label = "menu" >
// //             					<MenuIcon / >
// //             					</IconButton>
// //                       <Typography variant = "h4" >
// //             					News
// //                     </Typography>
// //                   </Toolbar>
// //         </AppBar>
// //       </header>
// //       <Fragment>
// //
// //       {Data ? Data.map(each =>
// //         <Card style={{padding:"5px"}}>
// //             <CardContent>
// //               <div>
// //                  <Typography component="h5" variant="h5">
// //                    {each.title}
// // 									   <img src={each.urlToImage} alt="" />
// //                  </Typography>
// //                  <Typography variant="subtitle1" color="textSecondary">
// //                    <a href ={each.url}>Readmore..</a>
// //                  </Typography>
// //                </div>
// //
// //             </CardContent>
// //           </Card>
// //
// //
// //       ) : null}
// //   </Fragment>
// //
// // </div>
// //
// // )}};
// //
// // export default NewsApi;
//
// import React from 'react';
//
//
// const Header = ({loaderStatus}) => (<header id="header">Google News<div className="loader" style={{
//     visibility: loaderStatus
//       ? "visible"
//       : "hidden"
//   }}></div>
// </header>)
//
// const ButtonDropDownMenu = ({}) => (<input className="show" defaultValue=" All " type="button"/>)
//
//
// const Search = () => (<div><input className="search-input" placeholder="Search.." size={20} style={{
//     border: '1px solid black'
//   }} type="text"/>
//   <button className="search"><i className="fas fa-search"/></button>
// </div>)
//
// const CategoryButtons = ({name, id, onClick}) => (<button className="button-navbar" id={id} onClick={onClick}>{name}</button>)
//
// const News = ({
//   author,
//   description,
//   title,
//   url,
//   urlToImage,
//   sourceName
// }) => (<div className="item-news"><img src={urlToImage} alt="alt"/>
//   <h2>
//     <a href={url} target="_blank " style={{
//         textDecoration: "none"
//       }}>{title}</a>
//   </h2>
//   <p>{description}</p><br/>
//   <p className="newsname">
//     <a href={url} target="_blank ">
//       {sourceName}</a>
//   </p>
// </div>)
//
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       fetchStatus: false,
//       json: [],
//       category: "",
//       ButtonsNavbar: [
//         "all",
//         "business",
//         "entertainment",
//         "general",
//         "health",
//         "science",
//         "sports",
//         "technology"
//       ],
//       loaderStatus: false
//     };
//     this.onClick = this.onClick.bind(this);
//   }
//   componentDidMount() {
//     this.setState({fetchStatus: true});
//     var url = "";
//     this.Req(url);
//   }
//
//   Req(url) {
//     this.setState({loaderStatus: true});
//     var req = new Request(url);
//     fetch(req).then(response => response.json()).then(data => {
//       this.setState({data: data.articles});
//       setTimeout(this.setState({loaderStatus: false}), 1000);
//       //console.log(this.state.data)
//     });
//
//   }
//   onClick(event) {
//     const headlines = "https://newsapi.org/v2/top-headlines?pageSize=100&country=in&category=Business&";
//     const apiKey = "apiKey=5bb8df76f578431f80c85a4c9bd311ac";
//     const id = event.target.id;
//     const className = event.target.className;
//     var category = "";
//
//     //category
//     if (className === "button-navbar") {
//       if (id === "all") {
//         category = "";
//
//       } else {
//         category = "category=" + id + "&";
//       }
//     }
//
//     //fetch
//     var url = headlines + category + apiKey;
//     this.Req(url);
//
//   }
//   render() {
//     const ButtonsNavbar = this.state.ButtonsNavbar.map(function(button, i) {
//       return <CategoryButtons name={button} id={button} onClick={this.onClick} key={i}/>;
//     }.bind(this));
//
//     const Newspaper = this.state.data.map(function(article, i) {
//       if (article.urlToImage != null) {
//         return <News author={article.author} title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage} key={"news" + i} sourceName={article.source.name}/>
//       } else {
//         return null;
//       }
//     });
//
//
//
//     return (<div>
//       <Header loaderStatus={this.state.loaderStatus}/>
//
//       <div className="container-navbar">
//         {ButtonsNavbar}
//
//       </div>
//       <div className="container-news">
//         {
//           this.state.loaderStatus
//             ? null
//             : Newspaper
//         }
//
//       </div>
//     </div>);
//   }
// }
// ReactDOM.render(<App />, document.getElementById('root'));
//
//
