
import './App.css';

import ReactTable from './component/DynamicTable/DynamicTable';
import RatingGraph from './graph/RatingGraph';

function App() {

  let ratingData = [
    {
      ratingType:'5 Star',
      ratingValue:40,
      total:70
    },
    {
      ratingType:'4 Star',
      ratingValue:20,
      total:70
    },
    {
      ratingType:'3 Star',
      ratingValue:5,
      total:70
    },
    {
      ratingType:'2 Star',
      ratingValue:3,
      total:70
    },
    {
      ratingType:'2 Star',
      ratingValue:2,
      total:70
    }

  ]


  /**
   * value accepted by graph
   * 
   * {
   * ratingType:'djdkd',
   * ratingPercentage:10%
   * }
   * 
   * we have to convert data in this form
   */
  let convertredData = ratingData.map((el) => {
    return {
      ratingType:el.ratingType,
      ratingPercentage:`${(el.ratingValue/el.total)*100}%`
    }
  })

  console.log(convertredData)
  return (
    <div className="App">
      {/* <ReactTable /> */}

      <div className='graphContainer'>
        <RatingGraph ratingData={convertredData} />



        <div>second grapg</div>

        <RatingGraph ratingData={convertredData} borderSize='1' indicatorBorderColor='red' indicatorColor='red' textColor='lightgreen' />
      </div>
    </div>
  );
}

export default App;
