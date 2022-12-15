import React from 'react'
import style from './RatingGraph.module.css'
import styled, { keyframes } from 'styled-components'


const rotate = keyframes`
  0% {
   width:0%
  }

  100% {
    width: ${props => props.width};
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Indicator = styled.div`

  animation: ${rotate} 4s linear ;
  width:0%;
  
`;


/**
 * @param {[object]} ratingData should be array of object  **example-**  [{
   * ratingType:'5 star',
   * ratingPercentage:10%
   * }]
 * @param {string} textColor should be string and default color is **#5fa6b3** 
 * @param {string} indicatorColor should be string and default color is **rgba(255,164,28,0.7)** 
 * @param {string} indicatorBorderColor should be string and default color is **rgba(255,164,28,1)** 
 * @param {string} borderSize should be string and default color is **0.5** 
 * @returns 
 */
const RatingGraph = ({ratingData,textColor='#5fa6b3',indicatorColor="rgba(255,164,28,0.7)",indicatorBorderColor='rgba(255,164,28,1)',borderSize='0.5'}) => {
    return (
        <div className={style['ratingGraph-container']}>
            
           {
            ratingData.map((el,i) => {
                return  <div className={style['rating-progressbar--container']} key={`${el?.ratingPercentage}${i}`}>
                <div className={style['rating-type']} style={{color:textColor}}>{el.ratingType}</div>
                <div className={style['rating-container']}>

                <Indicator className={style['rating']}  style={{width:`${el?.ratingPercentage} `, background:`${indicatorColor}`,border:`${borderSize}px solid ${indicatorBorderColor}`}}></Indicator>
                </div>
                <div className={style['rating-value']} style={{color:textColor}}>{parseInt(el?.ratingPercentage.split('%')[0]).toFixed(2)}%</div>
            </div>
            })
           }

        </div>
    )
}

export default RatingGraph
