import React, {useState} from 'react';
import Head from 'next/head'
import Airtable from 'airtable';
import { orderBy, filter } from "lodash";
function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    }
export async function getStaticProps() {
  const airtable = new Airtable({
    apiKey: 'keyOrfsw2WIwHUgXF',
  });
  let records = []
  try {
    records = await airtable
      .base('appjw6Cxm5rC4EbZV')('Main')
      .select({
        fields: ['Stock', 'Price'],
      })
      .all();
  } catch (e) {
    console.error(e)
  }
  const products = records.map((product) => {
    return {
      Stock: product.get('Stock'),
      Price: product.get('Price'),
    };
  });
  return {
    props: {
      products,
    },
  };
}
const Home = ({ products }) => {
  const [purchased, setPurchase] = useState([])
  return (
    <div>
     <Head>
       <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
       <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open Sans" />
     </Head>
     <div class="w3-top">
       <div class="w3-row w3-padding w3-dark-grey">
         <div class="w3-col s3">
           <a href="index.html" class="w3-button w3-block w3-dark-grey">Home</a>
         </div>
         <div class="w3-col s3">
           <a href="index.html/#about" class="w3-button w3-block w3-dark-grey">About</a>
         </div>
         <div class="w3-col s3">
         <a href="trading" class="w3-button w3-block w3-dark-grey">Trading Centre</a>
         </div>
         <div class="w3-col s3">
           <a href="newsfeed.html" class="w3-button w3-block w3-dark-grey">Newsfeed</a>
         </div>
       </div>
     </div>
     <h1 class="bgimg w3-display-container w3-grayscale-min" style={{ marginTop: '80px' }} id="home">Stock Market Simulation</h1>      
     <div style={{display: 'flex', marginTop: '40px'}}>
           <table className="table1">
      <caption>Trading Centre</caption>
        <th>Stock</th>
        <th>Price</th>
        <th>Buy</th>
        {products.map((product) => (
          <tr style={{ padding: '32px', paddingLeft: '0px' }}>
            <td>
              <b>{product.Stock}</b>
            </td>
            <td>${product.Price}</td>
            <td>
            <button
            type="button"
            class="addValues"
            onClick={() => setPurchase([...purchased, {Price: product.Price, Stock: product.Stock}])}>
            Buy
            </button>
            </td>
          </tr>
        ))}
      </table>
      <table className="table2"  style={{paddingLeft: '50px'}}>
      <caption>My Portfolio</caption>
        <th>Stock</th>
        <th>Price</th>
        <th>Sell</th>
        {purchased.map((product) => (
          <tr style={{ padding: '32px', paddingLeft: '0px' }}>
            <td>
              <b>{product.Stock}</b>
            </td>
            <td>${product.Price}</td>
            <td>
            <button
            type="button"
            class="addValues"
            onClick={() => setPurchase(filter(purchased,(stock) =>stock.Stock != product.Stock
            ))}>
            Sell
            </button>
            </td>
          </tr>
        ))}
      </table>
      </div>
    </div>
  );
}
export default Home





